
import React, { useState } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

import '../../../../css/business-registrations.css';

export default function Index({
    businesses,
    statistics,
    filters = {},
}) {
    const { flash = {} } = usePage().props;

    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        rejection_reason: '',
    });

    // Apply search and filters
    const applyFilters = (event) => {
        event.preventDefault();

        router.get(
            '/admin/business-registrations',
            {
                search,
                status,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Clear filters
    const clearFilters = () => {
        setSearch('');
        setStatus('');

        router.get(
            '/admin/business-registrations',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Approve business
    const approveBusiness = (business) => {
        const confirmed = window.confirm(
            `Una uhakika unataka kuidhinisha ${business.name}?`
        );

        if (!confirmed) return;

        router.post(
            `/admin/business-registrations/${business.id}/approve`,
            {},
            {
                preserveScroll: true,
            }
        );
    };

    // Open rejection modal
    const openRejectModal = (business) => {
        setSelectedBusiness(business);
        setShowRejectModal(true);

        reset();
        clearErrors();
    };

    // Close rejection modal
    const closeRejectModal = () => {
        if (processing) return;

        setShowRejectModal(false);
        setSelectedBusiness(null);

        reset();
        clearErrors();
    };

    // Reject business
    const rejectBusiness = (event) => {
        event.preventDefault();

        if (!selectedBusiness) return;

        post(
            `/admin/business-registrations/${selectedBusiness.id}/reject`,
            {
                preserveScroll: true,

                onSuccess: () => {
                    setShowRejectModal(false);
                    setSelectedBusiness(null);
                    reset();
                },
            }
        );
    };

    // Status labels
    const statusLabel = (value) => {
        const labels = {
            pending: 'Inasubiri',
            active: 'Imeidhinishwa',
            rejected: 'Imekataliwa',
            suspended: 'Imesimamishwa',
        };

        return labels[value] || value;
    };

    // Business type labels
    const businessTypeLabel = (value) => {
        return value === 'pharmacy' ? 'Pharmacy' : 'ADDO';
    };

    // Date formatting
    const formatDate = (date) => {
        if (!date) return '—';

        return new Date(date).toLocaleDateString('sw-TZ', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="br-page">
            <div className="br-container">

                {/* Page Header */}
                <div className="br-page-header">
                    <div>
                        <span className="br-eyebrow">
                            NACPHARMA ADMINISTRATION
                        </span>

                        <h1>Usajili wa Biashara</h1>

                        <p>
                            Simamia maombi ya usajili wa Pharmacy na ADDO.
                        </p>
                    </div>

                    <div className="br-header-icon">
                        <span>✚</span>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash.success && (
                    <div className="br-alert br-alert-success">
                        <span>✓</span>
                        {flash.success}
                    </div>
                )}

                {flash.error && (
                    <div className="br-alert br-alert-danger">
                        <span>!</span>
                        {flash.error}
                    </div>
                )}

                {/* Statistics */}
                <div className="br-stats-grid">

                    <div className="br-stat-card">
                        <div className="br-stat-icon br-icon-total">
                            ▦
                        </div>

                        <div>
                            <span>Jumla ya Biashara</span>
                            <strong>{statistics.total}</strong>
                        </div>
                    </div>

                    <div className="br-stat-card">
                        <div className="br-stat-icon br-icon-pending">
                            ◷
                        </div>

                        <div>
                            <span>Zinasubiri Approval</span>
                            <strong>{statistics.pending}</strong>
                        </div>
                    </div>

                    <div className="br-stat-card">
                        <div className="br-stat-icon br-icon-approved">
                            ✓
                        </div>

                        <div>
                            <span>Zilizoidhinishwa</span>
                            <strong>{statistics.approved}</strong>
                        </div>
                    </div>

                    <div className="br-stat-card">
                        <div className="br-stat-icon br-icon-rejected">
                            ×
                        </div>

                        <div>
                            <span>Zilizokataliwa</span>
                            <strong>{statistics.rejected}</strong>
                        </div>
                    </div>

                </div>

                {/* Main Content */}
                <div className="br-panel">

                    <div className="br-panel-header">
                        <div>
                            <h2>Orodha ya Usajili</h2>

                            <p>
                                Kagua taarifa kabla ya kufanya uamuzi.
                            </p>
                        </div>

                        <span className="br-record-count">
                            {businesses.total} Biashara
                        </span>
                    </div>

                    {/* Filters */}
                    <form
                        className="br-filters"
                        onSubmit={applyFilters}
                    >

                        <div className="br-search">
                            <span>⌕</span>

                            <input
                                type="search"
                                placeholder="Tafuta jina, simu, email au leseni..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
                        </div>

                        <select
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value)
                            }
                        >
                            <option value="">Status zote</option>
                            <option value="pending">Inasubiri</option>
                            <option value="active">Imeidhinishwa</option>
                            <option value="rejected">Imekataliwa</option>
                            <option value="suspended">Imesimamishwa</option>
                        </select>

                        <button
                            type="submit"
                            className="br-filter-button"
                        >
                            Tafuta
                        </button>

                        <button
                            type="button"
                            className="br-clear-button"
                            onClick={clearFilters}
                        >
                            Futa Filters
                        </button>

                    </form>

                    {/* Businesses Table */}
                    <div className="br-table-wrapper">
                        <table className="br-table">

                            <thead>
                                <tr>
                                    <th>Biashara</th>
                                    <th>Aina</th>
                                    <th>Mmiliki</th>
                                    <th>Mawasiliano</th>
                                    <th>Tarehe</th>
                                    <th>Status</th>
                                    <th>Vitendo</th>
                                </tr>
                            </thead>

                            <tbody>
                                {businesses.data.length > 0 ? (
                                    businesses.data.map((business) => (
                                        <tr key={business.id}>

                                            <td>
                                                <div className="br-business-name">
                                                    <strong>
                                                        {business.name}
                                                    </strong>

                                                    <small>
                                                        {business.license_number ||
                                                            'Leseni haijawekwa'}
                                                    </small>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="br-type">
                                                    {businessTypeLabel(
                                                        business.business_type
                                                    )}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="br-owner">
                                                    <strong>
                                                        {business.owner?.name ||
                                                            'Haijapatikana'}
                                                    </strong>

                                                    <small>
                                                        {business.owner?.email || '—'}
                                                    </small>
                                                </div>
                                            </td>

                                            <td>
                                                {business.phone}
                                            </td>

                                            <td>
                                                {formatDate(business.created_at)}
                                            </td>

                                            <td>
                                                <span
                                                    className={`br-status br-status-${business.status}`}
                                                >
                                                    {statusLabel(business.status)}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="br-actions">

                                                    <Link
                                                        href={`/admin/business-registrations/${business.id}`}
                                                        className="br-action-view"
                                                    >
                                                        Angalia
                                                    </Link>

                                                    {business.status === 'pending' && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                className="br-action-approve"
                                                                onClick={() =>
                                                                    approveBusiness(business)
                                                                }
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="br-action-reject"
                                                                onClick={() =>
                                                                    openRejectModal(business)
                                                                }
                                                            >
                                                                Deny
                                                            </button>
                                                        </>
                                                    )}

                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">
                                            <div className="br-empty">
                                                <span>▦</span>

                                                <strong>
                                                    Hakuna usajili uliopatikana
                                                </strong>

                                                <p>
                                                    Jaribu kubadilisha utafutaji au filter.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="br-pagination">

                        <span>
                            Inaonyesha {businesses.from || 0}–{businesses.to || 0}
                            {' '}kati ya {businesses.total} biashara
                        </span>

                        <div className="br-pagination-links">
                            {businesses.links.map((link, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={!link.url}
                                    className={link.active ? 'active' : ''}
                                    onClick={() =>
                                        link.url && router.visit(link.url)
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>

                    </div>

                </div>

                {/* Page Footer */}
                <div className="br-footer">
                    NACPHARMA · Smart Pharmacy. Smarter Business.
                </div>

            </div>

            {/* Reject Modal */}
            {showRejectModal && selectedBusiness && (
                <div className="br-modal-overlay">

                    <div className="br-modal">

                        <div className="br-modal-header">

                            <div className="br-modal-icon">
                                !
                            </div>

                            <button
                                type="button"
                                onClick={closeRejectModal}
                                disabled={processing}
                                className="br-modal-close"
                            >
                                ×
                            </button>

                        </div>

                        <h2>Kataa Usajili</h2>

                        <p>
                            Unaenda kukataa usajili wa{' '}
                            <strong>{selectedBusiness.name}</strong>.
                            Tafadhali eleza sababu ya kukataa.
                        </p>

                        <form onSubmit={rejectBusiness}>

                            <label htmlFor="rejection_reason">
                                Sababu ya kukataa
                            </label>

                            <textarea
                                id="rejection_reason"
                                value={data.rejection_reason}
                                onChange={(event) =>
                                    setData(
                                        'rejection_reason',
                                        event.target.value
                                    )
                                }
                                placeholder="Andika sababu ya kukataa usajili..."
                                rows="4"
                                required
                            />

                            {errors.rejection_reason && (
                                <span className="br-field-error">
                                    {errors.rejection_reason}
                                </span>
                            )}

                            {errors.business && (
                                <span className="br-field-error">
                                    {errors.business}
                                </span>
                            )}

                            <div className="br-modal-actions">

                                <button
                                    type="button"
                                    className="br-modal-cancel"
                                    onClick={closeRejectModal}
                                    disabled={processing}
                                >
                                    Ghairi
                                </button>

                                <button
                                    type="submit"
                                    className="br-modal-confirm"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Inatuma...'
                                        : 'Thibitisha Deny'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

// Inertia Authenticated Layout
Index.layout = (page) => (
    <AuthenticatedLayout title="Usajili wa Biashara">
        {page}
    </AuthenticatedLayout>
);