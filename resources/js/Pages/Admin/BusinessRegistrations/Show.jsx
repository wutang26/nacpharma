
import React from 'react';
import { Link, router, useForm } from '@inertiajs/react';

import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

import '../../../../css/business-registrations.css';

export default function Show({ business }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        rejection_reason: '',
    });

    // Approve business registration
    const approve = () => {
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

    // Reject business registration
    const reject = (event) => {
        event.preventDefault();

        post(
            `/admin/business-registrations/${business.id}/reject`,
            {
                preserveScroll: true,
            }
        );
    };

    // Format dates
    const formatDate = (date) => {
        if (!date) return '—';

        return new Date(date).toLocaleString('sw-TZ', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Status labels
    const statusLabels = {
        pending: 'Inasubiri Approval',
        active: 'Imeidhinishwa',
        rejected: 'Imekataliwa',
        suspended: 'Imesimamishwa',
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

                        <h1>Taarifa za Biashara</h1>

                        <p>
                            Kagua taarifa za usajili kabla ya kufanya uamuzi.
                        </p>
                    </div>

                    <Link
                        href="/admin/business-registrations"
                        className="br-back-link"
                    >
                        ← Rudi kwenye Orodha
                    </Link>

                </div>

                {/* Business Details */}
                <div className="br-details-card">

                    {/* Business Heading */}
                    <div className="br-details-heading">

                        <div>
                            <span className="br-eyebrow">
                                BUSINESS PROFILE
                            </span>

                            <h2>{business.name}</h2>

                            <p>
                                {business.business_type === 'pharmacy'
                                    ? 'Pharmacy'
                                    : 'ADDO'}
                            </p>
                        </div>

                        <span
                            className={`br-status br-status-${business.status}`}
                        >
                            {statusLabels[business.status] || business.status}
                        </span>

                    </div>

                    {/* Business Information */}
                    <div className="br-details-section">

                        <h3>1. Taarifa za Biashara</h3>

                        <div className="br-details-grid">

                            <Detail
                                label="Jina la Biashara"
                                value={business.name}
                            />

                            <Detail
                                label="Aina ya Biashara"
                                value={
                                    business.business_type === 'pharmacy'
                                        ? 'Pharmacy'
                                        : 'ADDO'
                                }
                            />

                            <Detail
                                label="Namba ya Leseni"
                                value={business.license_number}
                            />

                            <Detail
                                label="Namba ya Simu"
                                value={business.phone}
                            />

                            <Detail
                                label="Email ya Biashara"
                                value={business.email}
                            />

                            <Detail
                                label="Mkoa"
                                value={business.region}
                            />

                            <Detail
                                label="Wilaya"
                                value={business.district}
                            />

                            <Detail
                                label="Kata"
                                value={business.ward}
                            />

                            <Detail
                                label="Anuani"
                                value={business.address}
                            />

                            <Detail
                                label="Tarehe ya Usajili"
                                value={formatDate(business.created_at)}
                            />

                        </div>

                    </div>

                    {/* Owner Information */}
                    <div className="br-details-section">

                        <h3>2. Taarifa za Mmiliki</h3>

                        <div className="br-details-grid">

                            <Detail
                                label="Jina la Mmiliki"
                                value={business.owner?.name}
                            />

                            <Detail
                                label="Email ya Mmiliki"
                                value={business.owner?.email}
                            />

                        </div>

                    </div>

                    {/* Approval Information */}
                    {business.status === 'active' && (
                        <div className="br-details-section">

                            <h3>3. Taarifa za Approval</h3>

                            <div className="br-details-grid">

                                <Detail
                                    label="Aliyeidhinisha"
                                    value={business.approver?.name}
                                />

                                <Detail
                                    label="Tarehe ya Approval"
                                    value={formatDate(business.approved_at)}
                                />

                            </div>

                        </div>
                    )}

                    {/* Rejection Information */}
                    {business.status === 'rejected' && (
                        <div className="br-details-section">

                            <h3>3. Taarifa za Rejection</h3>

                            <div className="br-details-grid">

                                <Detail
                                    label="Aliyekataa"
                                    value={business.rejector?.name}
                                />

                                <Detail
                                    label="Tarehe ya Rejection"
                                    value={formatDate(business.rejected_at)}
                                />

                            </div>

                            <div className="br-rejection-reason">

                                <strong>Sababu ya Kukataa</strong>

                                <p>
                                    {business.rejection_reason ||
                                        'Hakuna sababu iliyorekodiwa.'}
                                </p>

                            </div>

                        </div>
                    )}

                    {/* Pending Registration Decisions */}
                    {business.status === 'pending' && (
                        <div className="br-details-section">

                            <h3>3. Uamuzi wa Usajili</h3>

                            <p className="br-decision-description">
                                Hakiki taarifa zote kabla ya kuidhinisha au
                                kukataa usajili huu.
                            </p>

                            <div className="br-decision-buttons">

                                <button
                                    type="button"
                                    className="br-action-approve"
                                    onClick={approve}
                                >
                                    ✓ Approve Registration
                                </button>

                            </div>

                            {/* Rejection Form */}
                            <form
                                onSubmit={reject}
                                className="br-reject-form"
                            >

                                <label htmlFor="rejection_reason">
                                    Sababu ya kukataa usajili
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
                                    rows="4"
                                    placeholder="Eleza sababu ya kukataa usajili..."
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

                                <button
                                    type="submit"
                                    className="br-action-reject"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Inatuma...'
                                        : 'Deny Registration'}
                                </button>

                            </form>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

// Reusable Detail Component
function Detail({ label, value }) {
    return (
        <div className="br-detail-item">
            <span>{label}</span>
            <strong>{value || '—'}</strong>
        </div>
    );
}

// Inertia Authenticated Layout
Show.layout = (page) => (
    <AuthenticatedLayout title="Taarifa za Biashara">
        {page}
    </AuthenticatedLayout>
);