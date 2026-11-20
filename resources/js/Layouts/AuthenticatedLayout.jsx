
import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import '../../css/layout.css';

const menuGroups = [
    {
        title: 'MAIN MENU',
        items: [
            {
                label: 'Dashboard',
                icon: 'grid',
                href: '/dashboard',
            },
        ],
    },
    {
        title: 'PHARMACY MANAGEMENT',
        items: [
            { label: 'Products', icon: 'package', href: '/products', arrow: true },
            { label: 'Sales / POS', icon: 'cart', href: '/sales', arrow: true },
            { label: 'Inventory', icon: 'boxes', href: '/inventory', arrow: true },
            { label: 'Purchases', icon: 'purchase', href: '/purchases', arrow: true },
            { label: 'Suppliers', icon: 'truck', href: '/suppliers' },
            { label: 'Customers', icon: 'users', href: '/customers' },
        ],
    },
    {
        title: 'BUSINESS & SYSTEM',
        items: [
            { label: 'Reports', icon: 'chart', href: '/reports' },
            { label: 'Staff & Users', icon: 'user-shield', href: '/users' },

            {
                label: 'Usajili wa Biashara',
                icon: 'clipboard',
                href: '/admin/business-registrations',
                permission: 'business-registrations.view',
            },

            { label: 'Settings', icon: 'settings', href: '/settings' },
        ],
    },
];

function Icon({ name, size = 20 }) {
    const common = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
    };

    const paths = {
        grid: (
            <>
                <rect x="3" y="3" width="7" height="7" rx="2" />
                <rect x="14" y="3" width="7" height="7" rx="2" />
                <rect x="3" y="14" width="7" height="7" rx="2" />
                <rect x="14" y="14" width="7" height="7" rx="2" />
            </>
        ),

        package: (
            <>
                <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                <path d="M3 8v8l9 5 9-5V8M12 13v8" />
                <path d="m7.5 5.5 9 5" />
            </>
        ),

        cart: (
            <>
                <circle cx="9" cy="20" r="1" />
                <circle cx="19" cy="20" r="1" />
                <path d="M2 3h2l2.5 12.5a2 2 0 0 0 2 1.5h9.8a2 2 0 0 0 2-1.6L22 8H5" />
            </>
        ),

        boxes: (
            <>
                <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                <path d="M3 7v10l9 5 9-5V7M12 12v10" />
                <path d="m7 9.5 9-5" />
            </>
        ),

        purchase: (
            <>
                <path d="M4 7h16l-1.5 13h-13L4 7Z" />
                <path d="M9 7a3 3 0 0 1 6 0M8 11h8" />
            </>
        ),

        truck: (
            <>
                <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
                <circle cx="7.5" cy="19" r="2" />
                <circle cx="18" cy="19" r="2" />
            </>
        ),

        users: (
            <>
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </>
        ),

        chart: (
            <>
                <path d="M3 3v18h18" />
                <path d="m7 14 4-4 4 3 6-7" />
            </>
        ),

        'user-shield': (
            <>
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <path d="m19 12 3 1.5v3c0 2-1.3 3.5-3 4.5-1.7-1-3-2.5-3-4.5v-3l3-1.5Z" />
            </>
        ),

        clipboard: (
            <>
                <rect x="5" y="4" width="14" height="17" rx="2" />
                <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" />
            </>
        ),

        settings: (
            <>
                <circle cx="12" cy="12" r="3" />
                <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" />
            </>
        ),

        bell: (
            <>
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
            </>
        ),

        search: (
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
            </>
        ),

        menu: (
            <>
                <path d="M4 6h16M4 12h16M4 18h16" />
            </>
        ),

        close: (
            <>
                <path d="m18 6-12 12M6 6l12 12" />
            </>
        ),

        chevron: <path d="m9 18 6-6-6-6" />,

        down: <path d="m7 10 5 5 5-5" />,

        logout: (
            <>
                <path d="M10 17l5-5-5-5M15 12H3" />
                <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
            </>
        ),
    };

    return (
        <svg {...common}>
            {paths[name] || paths.grid}
        </svg>
    );
}

// Normalize roles and permissions from Inertia shared props.
function getNames(items) {
    if (!Array.isArray(items)) return [];

    return items.map((item) => {
        if (typeof item === 'string') return item;

        return item?.name || item?.permission || '';
    }).filter(Boolean);
}

export default function AuthenticatedLayout({
    children,
    title = 'Dashboard',
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const page = usePage();

    const currentUrl = page.url || '/dashboard';
    const user = page.props.auth?.user;

    const userName = user?.name || 'Pharmacy Administrator';

    const userInitials = userName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    // Get user roles and permissions.
    const roles = getNames(user?.roles);

    const permissions = [
        ...getNames(user?.permissions),
        ...getNames(user?.all_permissions),
        ...getNames(page.props.auth?.permissions),
    ];

    const isSuperAdmin = roles.some((role) =>
        role.toLowerCase() === 'super admin'
    );

    const isAdmin = roles.some((role) =>
        role.toLowerCase() === 'admin'
    );

    // Check permission for a menu item.
    const canAccessMenu = (item) => {
        if (!item.permission) return true;

        if (isSuperAdmin || isAdmin) return true;

        return permissions.includes(item.permission);
    };

    // Filter menu groups based on user permissions.
    const visibleMenuGroups = menuGroups
        .map((group) => ({
            ...group,
            items: group.items.filter(canAccessMenu),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <div className="pharma-shell">

            {/* Mobile Sidebar Backdrop */}
            {sidebarOpen && (
                <button
                    className="sidebar-backdrop"
                    aria-label="Close navigation"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`pharma-sidebar ${
                    sidebarOpen ? 'sidebar-open' : ''
                }`}
            >

                {/* Brand */}
                <div className="brand-area">

                    <div className="brand-symbol">
                        <span>✚</span>
                    </div>

                    <div className="brand-copy">
                        <strong>NACPHARMA</strong>
                        <small>Smart Pharmacy Management</small>
                    </div>

                    <button
                        className="sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <Icon name="close" />
                    </button>

                </div>

                {/* System Status */}
                <div className="sidebar-status">
                    <span className="status-dot" />
                    SYSTEM ONLINE
                </div>

                {/* Navigation */}
                <nav className="sidebar-navigation">

                    {visibleMenuGroups.map((group) => (
                        <div
                            className="menu-group"
                            key={group.title}
                        >

                            <p className="menu-heading">
                                {group.title}
                            </p>

                            {group.items.map((item) => {

                                const active =
                                    currentUrl === item.href ||
                                    (
                                        item.href !== '/dashboard' &&
                                        currentUrl.startsWith(
                                            `${item.href}/`
                                        )
                                    );

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`sidebar-link ${
                                            active ? 'active' : ''
                                        }`}
                                        onClick={() =>
                                            setSidebarOpen(false)
                                        }
                                    >

                                        <span className="sidebar-link-icon">
                                            <Icon name={item.icon} />
                                        </span>

                                        <span className="sidebar-link-label">
                                            {item.label}
                                        </span>

                                        {item.arrow && (
                                            <Icon
                                                name="chevron"
                                                size={16}
                                            />
                                        )}

                                    </Link>
                                );
                            })}

                        </div>
                    ))}

                </nav>

                {/* Sidebar Bottom */}
                <div className="sidebar-bottom">

                    <div className="support-card">

                        <div className="support-icon">
                            ✚
                        </div>

                        <strong>Need assistance?</strong>

                        <p>
                            Our team is here to help you.
                        </p>

                        <a href="mailto:support@nactechnologies.co.tz">
                            Contact Support ↗
                        </a>

                    </div>

                    <div className="sidebar-footer">
                        <span>POWERED BY</span>
                        <strong>NAC TECHNOLOGIES</strong>
                    </div>

                </div>

            </aside>

            {/* Main Content */}
            <main className="pharma-main">

                {/* Header */}
                <header className="pharma-topbar">

                    <div className="topbar-left">

                        <button
                            className="mobile-menu-button"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open navigation"
                        >
                            <Icon name="menu" size={23} />
                        </button>

                        <div className="breadcrumb">
                            <span>Workspace</span>

                            <Icon name="chevron" size={14} />

                            <strong>{title}</strong>
                        </div>

                    </div>

                    <div className="topbar-right">

                        {/* Search */}
                        <label className="global-search">

                            <Icon name="search" size={19} />

                            <input
                                type="search"
                                placeholder="Search anything..."
                            />

                            <kbd>⌘ K</kbd>

                        </label>

                        {/* Notifications */}
                        <button
                            className="notification-button"
                            aria-label="Notifications"
                        >
                            <Icon name="bell" size={20} />
                            <span className="notification-dot" />
                        </button>

                        {/* Profile */}
                        <div className="profile-wrap">

                            <button
                                className="profile-button"
                                onClick={() =>
                                    setProfileOpen(!profileOpen)
                                }
                            >

                                <span className="profile-avatar">
                                    {userInitials || 'PA'}
                                </span>

                                <span className="profile-text">
                                    <strong>{userName}</strong>
                                    <small>
                                        {isSuperAdmin
                                            ? 'Super Administrator'
                                            : isAdmin
                                                ? 'Administrator'
                                                : 'Pharmacy Administrator'}
                                    </small>
                                </span>

                                <Icon name="down" size={16} />

                            </button>

                            {profileOpen && (
                                <div className="profile-dropdown">

                                    <Link href="/settings">
                                        Account settings
                                    </Link>

                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                    >
                                        <Icon name="logout" size={16} />
                                        Sign out
                                    </Link>

                                </div>
                            )}

                        </div>

                    </div>

                </header>

                {/* Page Content */}
                <section className="pharma-page-content">
                    {children}
                </section>

                {/* Footer */}
                <footer className="pharma-page-footer">
                    <span>
                        © {new Date().getFullYear()} NACPHARMA
                    </span>

                    <span>
                        Smart Pharmacy. Smarter Business.
                    </span>
                </footer>

            </main>

        </div>
    );
}
