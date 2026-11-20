
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\CustomerRegistrationController;
use App\Http\Controllers\Admin\BusinessRegistrationController;

/*
|--------------------------------------------------------------------------
| Guest Routes
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Welcome Page
    |--------------------------------------------------------------------------
    */

    Route::get('/', function () {
        return Inertia::render('Welcome');
    })->name('welcome');


    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    // Display Login Page
    Route::get('/login', function () {
        return Inertia::render('Welcome');
    })->name('login');

    // Process Login
    Route::post('/login', [
        AuthenticatedSessionController::class,
        'store'
    ])->name('login.store');


    /*
    |--------------------------------------------------------------------------
    | Customer Registration
    |--------------------------------------------------------------------------
    */

    // Display Registration Form
    Route::get('/register', [
        CustomerRegistrationController::class,
        'create'
    ])->name('register');

    // Process Registration
    Route::post('/register', [
        CustomerRegistrationController::class,
        'store'
    ])->name('register.store');


    /*
    |--------------------------------------------------------------------------
    | Registration Success
    |--------------------------------------------------------------------------
    */

    Route::get('/registration/success', function (Request $request) {

        return Inertia::render('Auth/RegistrationSuccess', [
            'businessName' => $request->session()->get('registered_business'),
            'message' => $request->session()->get('success'),
        ]);

    })->name('registration.success');

});


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');


    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    Route::post('/logout', [
        AuthenticatedSessionController::class,
        'destroy'
    ])->name('logout');


    /*
    |--------------------------------------------------------------------------
    | Admin - Business Registration Management
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {

            // View all business registrations
            Route::get('/business-registrations', [
                BusinessRegistrationController::class,
                'index'
            ])
                ->middleware('permission:business-registrations.view')
                ->name('business-registrations.index');


            // View individual business registration
            Route::get('/business-registrations/{business}', [
                BusinessRegistrationController::class,
                'show'
            ])
                ->middleware('permission:business-registrations.view')
                ->name('business-registrations.show');


            // Approve business registration
            Route::post('/business-registrations/{business}/approve', [
                BusinessRegistrationController::class,
                'approve'
            ])
                ->middleware('permission:business-registrations.approve')
                ->name('business-registrations.approve');


            // Reject business registration
            Route::post('/business-registrations/{business}/reject', [
                BusinessRegistrationController::class,
                'reject'
            ])
                ->middleware('permission:business-registrations.reject')
                ->name('business-registrations.reject');

        });

});
