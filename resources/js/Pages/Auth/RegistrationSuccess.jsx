
import React from 'react';
import { Link } from '@inertiajs/react';
import '../../../css/registration-success.css';

export default function RegistrationSuccess({
    businessName,
    message
}) {
    return (
        <div className="registration-success-page">

            <div className="registration-success-card">

                <div className="success-icon">
                    <span>✓</span>
                </div>

                <div className="success-brand">
                    <span className="success-brand-icon">+</span>
                    <span>NACPHARMA</span>
                </div>

                <div className="success-content">

                    <span className="success-label">
                        USAJILI UMEFANIKIWA
                    </span>

                    <h1>
                        Hongera!
                    </h1>

                    <p className="success-description">
                        {message || 'Usajili wako umepokelewa kikamilifu.'}
                    </p>

                    <div className="success-business">
                        <span>JINA LA BIASHARA</span>
                        <strong>
                            {businessName || 'Biashara yako'}
                        </strong>
                    </div>

                    <div className="success-pending">

                        <div className="pending-icon">
                            <span>◷</span>
                        </div>

                        <div>
                            <strong>
                                Akaunti inasubiri kuidhinishwa
                            </strong>

                            <p>
                                Timu ya NACPHARMA itakagua taarifa
                                za biashara yako. Utaweza kuingia
                                kwenye mfumo baada ya biashara yako
                                kuidhinishwa.
                            </p>
                        </div>

                    </div>

                    <div className="success-note">
                        Tafadhali hifadhi email na namba ya simu
                        ulizotumia wakati wa usajili.
                    </div>

                    <Link
                        href="/"
                        className="success-home-button"
                    >
                        RUDI UKURASA WA MWANZO
                        <span>→</span>
                    </Link>

                </div>

                <div className="success-footer">
                    <span>NAC Technologies</span>
                    <span>Smart Pharmacy. Smarter Business.</span>
                </div>

            </div>

        </div>
    );
}
