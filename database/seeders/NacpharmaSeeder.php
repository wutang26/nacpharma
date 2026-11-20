<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use RuntimeException;

class NacpharmaSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        /*
        |--------------------------------------------------------------------------
        | Permissions
        |--------------------------------------------------------------------------
        */

        $permissions = [
            // Dashboard
            'dashboard.view',

            // Users
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // Roles and permissions
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',
            'permissions.view',
            'permissions.assign',

            // Business Registrations
            'business-registrations.view',
            'business-registrations.approve',
            'business-registrations.reject',

            // Products
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',

            // Categories
            'categories.view',
            'categories.create',
            'categories.edit',
            'categories.delete',

            // Inventory
            'inventory.view',
            'inventory.stock-in',
            'inventory.stock-out',
            'inventory.adjust',

            // Sales and POS
            'sales.view',
            'sales.create',
            'sales.cancel',
            'sales.refund',

            // Customers
            'customers.view',
            'customers.create',
            'customers.edit',
            'customers.delete',

            // Suppliers
            'suppliers.view',
            'suppliers.create',
            'suppliers.edit',
            'suppliers.delete',

            // Purchases
            'purchases.view',
            'purchases.create',
            'purchases.edit',
            'purchases.delete',

            // Reports
            'reports.view',
            'reports.export',

            // Pharmacy operations
            'prescriptions.view',
            'prescriptions.create',
            'prescriptions.edit',
            'prescriptions.dispense',

            // Settings
            'settings.view',
            'settings.edit',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        $superAdminRole = Role::firstOrCreate([
            'name' => 'Super Admin',
            'guard_name' => 'web',
        ]);

        $adminRole = Role::firstOrCreate([
            'name' => 'Admin',
            'guard_name' => 'web',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Super Admin Permissions
        |--------------------------------------------------------------------------
        */

        $superAdminRole->syncPermissions(
            Permission::where('guard_name', 'web')->get()
        );

        /*
        |--------------------------------------------------------------------------
        | Admin Permissions
        |--------------------------------------------------------------------------
        */

        $adminPermissions = [
            'dashboard.view',

            // Users
            'users.view',

            // Business Registrations
            'business-registrations.view',
            'business-registrations.approve',
            'business-registrations.reject',

            // Products
            'products.view',
            'products.create',
            'products.edit',

            // Categories
            'categories.view',
            'categories.create',
            'categories.edit',

            // Inventory
            'inventory.view',
            'inventory.stock-in',
            'inventory.stock-out',
            'inventory.adjust',

            // Sales
            'sales.view',
            'sales.create',
            'sales.cancel',
            'sales.refund',

            // Customers
            'customers.view',
            'customers.create',
            'customers.edit',

            // Suppliers
            'suppliers.view',
            'suppliers.create',
            'suppliers.edit',

            // Purchases
            'purchases.view',
            'purchases.create',
            'purchases.edit',

            // Reports
            'reports.view',
            'reports.export',

            // Prescriptions
            'prescriptions.view',
            'prescriptions.create',
            'prescriptions.edit',
            'prescriptions.dispense',

            // Settings
            'settings.view',
        ];

        $adminRole->syncPermissions($adminPermissions);

        /*
        |--------------------------------------------------------------------------
        | Create Super Admin Account
        |--------------------------------------------------------------------------
        */

        $superAdmin = $this->createUser('super_admin');

        $superAdmin->syncRoles([$superAdminRole]);

        /*
        |--------------------------------------------------------------------------
        | Create Admin Account
        |--------------------------------------------------------------------------
        */

        $admin = $this->createUser('admin');

        $admin->syncRoles([$adminRole]);

        /*
        |--------------------------------------------------------------------------
        | Clear Permission Cache
        |--------------------------------------------------------------------------
        */

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }

    /*
    |--------------------------------------------------------------------------
    | Create System Users
    |--------------------------------------------------------------------------
    */

    private function createUser(string $type): User
    {
        $details = config("nacpharma.{$type}");

        foreach (['name', 'email', 'password'] as $field) {
            if (empty($details[$field])) {
                throw new RuntimeException(
                    "Missing NACPHARMA {$type} {$field} in .env file."
                );
            }
        }

        $user = User::firstOrCreate(
            ['email' => $details['email']],
            [
                'name' => $details['name'],
                'password' => Hash::make($details['password']),
            ]
        );

        return $user;
    }
}
