<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class CustomerRegistrationController extends Controller
{
    /**
     * Display customer registration page.
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Register a new pharmacy or ADDO.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'business_name' => [
                'required',
                'string',
                'max:255',
            ],

            'business_type' => [
                'required',
                'in:pharmacy,addo',
            ],

            'license_number' => [
                'nullable',
                'string',
                'max:100',
            ],

            'owner_name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'phone' => [
                'required',
                'string',
                'max:30',
            ],

            'region' => [
                'required',
                'string',
                'max:100',
            ],

            'district' => [
                'required',
                'string',
                'max:100',
            ],

            'ward' => [
                'nullable',
                'string',
                'max:100',
            ],

            'address' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'password' => [
                'required',
                'confirmed',
                Password::min(8),
            ],
        ]);

        $business = DB::transaction(function () use ($validated) {

            /*
             * Create business first.
             */
            $business = Business::create([
                'name' => $validated['business_name'],

                'slug' => Str::slug($validated['business_name'])
                    . '-'
                    . Str::lower(Str::random(6)),

                'business_type' => $validated['business_type'],

                'license_number' => $validated['license_number'] ?? null,

                'phone' => $validated['phone'],

                'email' => $validated['email'],

                'region' => $validated['region'],

                'district' => $validated['district'],

                'ward' => $validated['ward'] ?? null,

                'address' => $validated['address'] ?? null,

                'status' => 'pending',

                'registered_by' => null,
            ]);

            /*
             * Create business owner account.
             * User model hashes the password through its hashed cast.
             */
            $owner = User::create([
                'name' => $validated['owner_name'],
                'email' => $validated['email'],
                'password' => $validated['password'],
                'business_id' => $business->id,
            ]);

            /*
             * Connect owner to business.
             */
            $business->update([
                'owner_user_id' => $owner->id,
            ]);

            /*
             * Assign Business Owner role.
             */
            $ownerRole = Role::firstOrCreate([
                'name' => 'Business Owner',
                'guard_name' => 'web',
            ]);

            $owner->assignRole($ownerRole);

            return $business;
        });

        return redirect()
    ->route('registration.success')
    ->with('success', 'Usajili wako umepokelewa kikamilifu.')
    ->with('registered_business', $business->name);
    
    }
}
