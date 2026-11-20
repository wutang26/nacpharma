<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Authenticate User
        |--------------------------------------------------------------------------
        */

        if (! Auth::attempt(
            $credentials,
            $request->boolean('remember')
        )) {
            return back()
                ->withErrors([
                    'email' => 'Email au password si sahihi.',
                ])
                ->onlyInput('email');
        }

        $user = Auth::user();

        /*
        |--------------------------------------------------------------------------
        | Check Business Account
        |--------------------------------------------------------------------------
        |
        | Super Admin hana business_id, hivyo anaendelea kuingia.
        | Business users lazima wawe na business iliyopo na active.
        |
        */

        if ($user->business_id !== null) {

            $business = $user->business;

            if (! $business) {
                Auth::logout();

                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return back()->withErrors([
                    'email' => 'Akaunti yako haiwezi kuthibitishwa. Wasiliana na NACPHARMA.',
                ])->onlyInput('email');
            }

            if ($business->status !== 'active') {
                Auth::logout();

                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return back()->withErrors([
                    'email' => match ($business->status) {
                        'pending' => 'Usajili wako umepokelewa na unasubiri kuidhinishwa na NACPHARMA.',
                        'rejected' => 'Ombi lako la usajili limekataliwa. Wasiliana na NACPHARMA.',
                        'suspended' => 'Akaunti yako imesimamishwa. Wasiliana na NACPHARMA.',
                        default => 'Akaunti yako hairuhusiwi kuingia kwa sasa.',
                    },
                ])->onlyInput('email');
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Regenerate Session
        |--------------------------------------------------------------------------
        */

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('welcome');
    }
}
