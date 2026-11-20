<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class BusinessRegistrationController extends Controller
{
    /**
     * Display all business registrations.
     */
    public function index(Request $request): Response
    {
        $query = Business::with(['owner:id,name,email'])
            ->latest();

        if ($request->filled('status') &&
            in_array($request->status, ['pending', 'active', 'rejected', 'suspended'], true)) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = trim($request->search);

            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('license_number', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Admin/BusinessRegistrations/Index', [
            'businesses' => $query->paginate(10)->withQueryString(),

            'filters' => [
                'status' => $request->status,
                'search' => $request->search,
            ],

            'statistics' => [
                'total' => Business::count(),
                'pending' => Business::where('status', 'pending')->count(),
                'approved' => Business::where('status', 'active')->count(),
                'rejected' => Business::where('status', 'rejected')->count(),
            ],
        ]);
    }

    /**
     * Display a single registration.
     */
    public function show(Business $business): Response
    {
        $business->load([
            'owner:id,name,email',
            'registrar:id,name,email',
            'approver:id,name,email',
            'rejector:id,name,email',
        ]);

        return Inertia::render('Admin/BusinessRegistrations/Show', [
            'business' => $business,
        ]);
    }

    /**
     * Approve a pending business registration.
     */
    public function approve(Business $business)
    {
        DB::transaction(function () use ($business) {
            $lockedBusiness = Business::whereKey($business->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($lockedBusiness->status !== 'pending') {
                throw ValidationException::withMessages([
                    'business' => 'Usajili huu tayari umefanyiwa uamuzi.',
                ]);
            }

            $lockedBusiness->update([
                'status' => 'active',
                'approved_at' => now(),
                'approved_by' => Auth::id(),
                'rejected_at' => null,
                'rejected_by' => null,
                'rejection_reason' => null,
            ]);
        });

        return redirect()
            ->route('admin.business-registrations.index')
            ->with('success', 'Usajili wa biashara umeidhinishwa kikamilifu.');
    }

    /**
     * Reject a pending business registration.
     */
    public function reject(Request $request, Business $business)
    {
        $validated = $request->validate([
            'rejection_reason' => [
                'required',
                'string',
                'min:5',
                'max:2000',
            ],
        ], [
            'rejection_reason.required' => 'Tafadhali eleza sababu ya kukataa usajili.',
            'rejection_reason.min' => 'Sababu ya kukataa iwe na angalau herufi 5.',
            'rejection_reason.max' => 'Sababu imezidi urefu unaoruhusiwa.',
        ]);

        DB::transaction(function () use ($business, $validated) {
            $lockedBusiness = Business::whereKey($business->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($lockedBusiness->status !== 'pending') {
                throw ValidationException::withMessages([
                    'business' => 'Usajili huu tayari umefanyiwa uamuzi.',
                ]);
            }

            $lockedBusiness->update([
                'status' => 'rejected',
                'rejected_at' => now(),
                'rejected_by' => Auth::id(),
                'rejection_reason' => $validated['rejection_reason'],
                'approved_at' => null,
                'approved_by' => null,
            ]);
        });

        return redirect()
            ->route('admin.business-registrations.index')
            ->with('success', 'Usajili wa biashara umekataliwa.');
    }
}
