
import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import '../../../css/register.css';

export default function Register() {
    const { flash = {} } = usePage().props;

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
    } = useForm({
        business_name: '',
        business_type: 'pharmacy',
        license_number: '',
        owner_name: '',
        email: '',
        phone: '',
        region: '',
        district: '',
        ward: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const updateField = (event) => {
        const { name, value } = event.target;

        setData(name, value);

        if (errors[name]) {
            clearErrors(name);
        }

        setSubmitMessage('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (processing) {
            return;
        }

        setSubmitMessage('');

        post('/register', {
            preserveScroll: true,
            preserveState: true,
            forceFormData: false,

            onStart: () => {
                console.log('NACPHARMA: Registration started');
            },

            onSuccess: (page) => {
                console.log('NACPHARMA: Registration successful', page);

                // Successful registration should be redirected
                // by Laravel to registration.success.
            },

            onError: (validationErrors) => {
                console.error(
                    'NACPHARMA: Registration validation errors:',
                    validationErrors
                );

                setSubmitMessage(
                    'Kuna taarifa hazijakamilika au tayari zimesajiliwa. Tafadhali kagua sehemu zenye makosa.'
                );
            },

            onHttpException: (error) => {
                console.error('NACPHARMA HTTP error:', error);
                setSubmitMessage(
                    'Imeshindikana kuwasiliana na server. Tafadhali jaribu tena.'
                );
            },

            onNetworkError: (error) => {
                console.error('NACPHARMA network error:', error);
                setSubmitMessage(
                    'Hakuna mawasiliano na server. Hakikisha internet au server inaendelea kufanya kazi.'
                );
            },

            onFinish: () => {
                console.log('NACPHARMA: Registration request finished');
            },
        });
    };

    return (
        <main className="register-page">
            <div className="register-background" />
            <div className="register-overlay" />

            <header className="register-header">
                <Link href="/" className="register-brand">
                    <span className="register-brand-mark">
                        <span>N</span>
                        <b>+</b>
                    </span>

                    <span className="register-brand-name">
                        <strong>NAC<span>PHARMA</span></strong>
                        <small>SMART PHARMACY MANAGEMENT</small>
                    </span>
                </Link>

                <div className="register-header-status">
                    <span />
                    Pharmacy Business Registration
                </div>
            </header>

            <section className="register-content">
                <div className="register-intro">
                    <span className="register-eyebrow">
                        <i />
                        JOIN NACPHARMA
                    </span>

                    <h1>
                        Grow Your Pharmacy.
                        <span> Digitally.</span>
                    </h1>

                    <p>
                        Anza kutumia mfumo wa kisasa wa kusimamia biashara
                        yako ya Pharmacy au ADDO. Dhibiti mauzo, dawa,
                        stock na taarifa za biashara yako sehemu moja.
                    </p>

                    <div className="register-benefits">
                        <div>
                            <span>✚</span>
                            <p>
                                <strong>Smart Inventory</strong>
                                <small>Fuatilia dawa na stock kwa urahisi.</small>
                            </p>
                        </div>

                        <div>
                            <span>⌁</span>
                            <p>
                                <strong>Fast POS</strong>
                                <small>Simamia mauzo na malipo kwa haraka.</small>
                            </p>
                        </div>

                        <div>
                            <span>◷</span>
                            <p>
                                <strong>Expiry Tracking</strong>
                                <small>Fuatilia dawa zinazokaribia ku-expire.</small>
                            </p>
                        </div>
                    </div>

                    <div className="register-intro-note">
                        <span>✓</span>
                        Mfumo mmoja. Usimamizi bora wa biashara yako.
                    </div>
                </div>

                <div className="register-card">
                    <div className="register-card-heading">
                        <div className="register-card-icon">✚</div>

                        <div>
                            <span>CREATE YOUR ACCOUNT</span>
                            <h2>Sajili Biashara Yako</h2>
                            <p>Jaza taarifa zifuatazo kuanza usajili.</p>
                        </div>
                    </div>

                    {flash.success && (
                        <div
                            className="register-alert register-alert-success"
                            role="status"
                        >
                            <strong>✓ Usajili umepokelewa</strong>
                            <p>{flash.success}</p>

                            {flash.registered_business && (
                                <small>
                                    Biashara: {flash.registered_business}
                                </small>
                            )}
                        </div>
                    )}

                    {submitMessage && (
                        <div
                            className="register-alert register-alert-error"
                            role="alert"
                        >
                            {submitMessage}
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div
                            className="register-alert register-alert-error"
                            role="alert"
                        >
                            Tafadhali kagua sehemu zilizo na makosa.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="register-section-title">
                            <span>01</span>
                            TAARIFA ZA BIASHARA
                        </div>

                        <div className="register-form-grid">
                            <div className="register-field full-width">
                                <label htmlFor="business_name">
                                    Jina la Pharmacy / ADDO <b>*</b>
                                </label>

                                <input
                                    id="business_name"
                                    name="business_name"
                                    value={data.business_name}
                                    onChange={updateField}
                                    placeholder="Mfano: Afya Pharmacy"
                                    autoComplete="organization"
                                    required
                                />

                                {errors.business_name && (
                                    <small className="register-field-error">
                                        {errors.business_name}
                                    </small>
                                )}
                            </div>

                            <div className="register-field">
                                <label htmlFor="business_type">
                                    Aina ya Biashara <b>*</b>
                                </label>

                                <select
                                    id="business_type"
                                    name="business_type"
                                    value={data.business_type}
                                    onChange={updateField}
                                    required
                                >
                                    <option value="pharmacy">Pharmacy</option>
                                    <option value="addo">ADDO</option>
                                </select>

                                {errors.business_type && (
                                    <small className="register-field-error">
                                        {errors.business_type}
                                    </small>
                                )}
                            </div>

                            <div className="register-field">
                                <label htmlFor="license_number">
                                    Namba ya Leseni
                                </label>

                                <input
                                    id="license_number"
                                    name="license_number"
                                    value={data.license_number}
                                    onChange={updateField}
                                    placeholder="Namba ya leseni"
                                />

                                {errors.license_number && (
                                    <small className="register-field-error">
                                        {errors.license_number}
                                    </small>
                                )}
                            </div>

                            <div className="register-field">
                                <label htmlFor="phone">
                                    Namba ya Simu <b>*</b>
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={updateField}
                                    placeholder="07XXXXXXXX"
                                    autoComplete="tel"
                                    required
                                />

                                {errors.phone && (
                                    <small className="register-field-error">
                                        {errors.phone}
                                    </small>
                                )}
                            </div>

                            <div className="register-field">
                                <label htmlFor="email">
                                    Email ya Biashara / Mmiliki <b>*</b>
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={updateField}
                                    placeholder="jina@example.com"
                                    autoComplete="email"
                                    required
                                />

                                {errors.email && (
                                    <small className="register-field-error">
                                        {errors.email}
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="register-section-title">
                            <span>02</span>
                            TAARIFA ZA MMILIKI
                        </div>

                        <div className="register-form-grid">
                            <div className="register-field full-width">
                                <label htmlFor="owner_name">
                                    Jina Kamili la Mmiliki <b>*</b>
                                </label>

                                <input
                                    id="owner_name"
                                    name="owner_name"
                                    value={data.owner_name}
                                    onChange={updateField}
                                    placeholder="Ingiza jina lako kamili"
                                    autoComplete="name"
                                    required
                                />

                                {errors.owner_name && (
                                    <small className="register-field-error">
                                        {errors.owner_name}
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="register-section-title">
                            <span>03</span>
                            ENEO LA BIASHARA
                        </div>

                        <div className="register-form-grid">
                            <div className="register-field">
                                <label htmlFor="region">
                                    Mkoa <b>*</b>
                                </label>

                                <input
                                    id="region"
                                    name="region"
                                    value={data.region}
                                    onChange={updateField}
                                    placeholder="Mfano: Tabora"
                                    required
                                />

                                {errors.region && (
                                    <small className="register-field-error">
                                        {errors.region}
                                    </small>
                                )}
                            </div>

                            <div className="register-field">
                                <label htmlFor="district">
                                    Wilaya <b>*</b>
                                </label>

                                <input
                                    id="district"
                                    name="district"
                                    value={data.district}
                                    onChange={updateField}
                                    placeholder="Ingiza wilaya"
                                    required
                                />

                                {errors.district && (
                                    <small className="register-field-error">
                                        {errors.district}
                                    </small>
                                )}
                            </div>

                            <div className="register-field">
                                <label htmlFor="ward">
                                    Kata
                                </label>

                                <input
                                    id="ward"
                                    name="ward"
                                    value={data.ward}
                                    onChange={updateField}
                                    placeholder="Ingiza kata"
                                />

                                {errors.ward && (
                                    <small className="register-field-error">
                                        {errors.ward}
                                    </small>
                                )}
                            </div>

                            <div className="register-field">
                                <label htmlFor="address">
                                    Anwani / Eneo
                                </label>

                                <input
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    onChange={updateField}
                                    placeholder="Mtaa, jengo au eneo"
                                />

                                {errors.address && (
                                    <small className="register-field-error">
                                        {errors.address}
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="register-section-title">
                            <span>04</span>
                            USALAMA WA AKAUNTI
                        </div>

                        <div className="register-form-grid">
                            <div className="register-field">
                                <label htmlFor="password">
                                    Password <b>*</b>
                                </label>

                                <div className="register-password-wrap">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={updateField}
                                        placeholder="Angalau herufi 8"
                                        autoComplete="new-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(value => !value)}
                                        aria-label={
                                            showPassword
                                                ? 'Ficha password'
                                                : 'Onyesha password'
                                        }
                                    >
                                        {showPassword ? 'FICHA' : 'ONA'}
                                    </button>
                                </div>

                                {errors.password && (
                                    <small className="register-field-error">
                                        {errors.password}
                                    </small>
                                )}
                            </div>

                            <div className="register-field">
                                <label htmlFor="password_confirmation">
                                    Rudia Password <b>*</b>
                                </label>

                                <div className="register-password-wrap">
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type={
                                            showPasswordConfirmation
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={data.password_confirmation}
                                        onChange={updateField}
                                        placeholder="Rudia password yako"
                                        autoComplete="new-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswordConfirmation(value => !value)
                                        }
                                        aria-label={
                                            showPasswordConfirmation
                                                ? 'Ficha password'
                                                : 'Onyesha password'
                                        }
                                    >
                                        {showPasswordConfirmation ? 'FICHA' : 'ONA'}
                                    </button>
                                </div>

                                {errors.password_confirmation && (
                                    <small className="register-field-error">
                                        {errors.password_confirmation}
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="register-terms">
                            <span>ⓘ</span>
                            Kwa kuwasilisha fomu hii, unakubali kuwa taarifa
                            zako zitakaguliwa na NACPHARMA kabla ya akaunti
                            kuidhinishwa.
                        </div>

                        <button
                            type="submit"
                            className="register-submit"
                            disabled={processing}
                        >
                            <span>
                                {processing
                                    ? 'INATUMA TAARIFA...'
                                    : 'WASILISHA USAJILI'}
                            </span>

                            <span>
                                {processing ? '...' : '→'}
                            </span>
                        </button>
                    </form>

                    <div className="register-login-link">
                        Tayari una akaunti?{' '}
                        <Link href="/">Ingia hapa</Link>
                    </div>

                    <div className="register-card-footer">
                        <span>✓</span>
                        Secure Pharmacy Business Registration
                    </div>
                </div>
            </section>

            <footer className="register-footer">
                <span>© {new Date().getFullYear()} NACPHARMA</span>
                <span>Smart Pharmacy. Smarter Business.</span>
                <span>
                    POWERED BY <strong>Nac Technologies</strong>
                </span>
            </footer>
        </main>
    );
}
