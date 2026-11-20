
import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import '../../css/welcome.css';

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=2000&q=90',
        title: 'Your Health, Our Priority.',
        description:
            'Usimamizi wa kisasa wa famasia, dawa na huduma kwa wateja.',
    },
    {
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=90',
        title: 'Smart Pharmacy Management.',
        description:
            'Dhibiti mauzo, stock na biashara yako sehemu moja.',
    },
    {
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2000&q=90',
        title: 'Smarter Business Starts Here.',
        description:
            'Teknolojia inayorahisisha kazi za kila siku za famasia.',
    },
];

export default function Welcome() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    // Inertia login form
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
    } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Background slideshow
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length);
        }, 6500);

        return () => clearInterval(timer);
    }, []);

    // Handle login
    const handleSubmit = (event) => {
        event.preventDefault();

        clearErrors();

        post('/login', {
            preserveScroll: true,
            onSuccess: () => {
                // Laravel redirects authenticated user to dashboard.
            },
        });
    };

    return (
        <main className="welcome-page">

            {/* BACKGROUND SLIDESHOW */}
            <div className="background-slideshow">
                {slides.map((slide, index) => (
                    <div
                        key={slide.image}
                        className={`background-slide ${
                            activeSlide === index ? 'active' : ''
                        }`}
                        style={{
                            backgroundImage: `url("${slide.image}")`,
                        }}
                    />
                ))}
            </div>

            {/* DARK GREEN OVERLAY */}
            <div className="background-overlay" />

            {/* FLOATING MEDICINE ANIMATIONS */}
            <div className="floating-capsules" aria-hidden="true">

                <span className="capsule capsule-one">
                    <i />
                </span>

                <span className="capsule capsule-two">
                    <i />
                </span>

                <span className="capsule capsule-three">
                    <i />
                </span>

                <span className="capsule capsule-four">
                    <i />
                </span>

                <span className="capsule capsule-five">
                    <i />
                </span>

                <span className="capsule capsule-six">
                    <i />
                </span>

                <span className="medical-plus plus-one">+</span>
                <span className="medical-plus plus-two">+</span>
                <span className="medical-plus plus-three">+</span>

            </div>

            {/* HEADER */}
            <header className="welcome-header">

                <a href="/" className="brand">

                    <span className="brand-mark">
                        <span className="brand-shield">N</span>
                        <span className="brand-cross">+</span>
                    </span>

                    <span className="brand-name">
                        <strong>
                            NAC<span>PHARMA</span>
                        </strong>

                        <small>
                            SMART PHARMACY MANAGEMENT
                        </small>
                    </span>

                </a>

                <div className="header-status">
                    <span className="status-dot" />
                    Smart Pharmacy System
                </div>

            </header>

            {/* MAIN CONTENT */}
            <section className="welcome-content">

                {/* LEFT SIDE - INTRODUCTION */}
                <div className="welcome-intro">

                    <div className="intro-label">
                        <span />
                        THE FUTURE OF PHARMACY
                    </div>

                    <h1>
                        {slides[activeSlide].title.split(' ').slice(0, -1).join(' ')}
                        {' '}
                        <span>
                            {slides[activeSlide].title.split(' ').slice(-1)}
                        </span>
                    </h1>

                    <p>
                        {slides[activeSlide].description}
                    </p>

                    <div className="intro-features">

                        <div>
                            <span className="feature-icon">✚</span>
                            <span>Smart Inventory</span>
                        </div>

                        <div>
                            <span className="feature-icon">⌁</span>
                            <span>Fast POS</span>
                        </div>

                        <div>
                            <span className="feature-icon">◷</span>
                            <span>Expiry Tracking</span>
                        </div>

                    </div>

                    {/* SLIDESHOW INDICATORS */}
                    <div className="slide-indicators">

                        {slides.map((slide, index) => (
                            <button
                                key={slide.image}
                                type="button"
                                aria-label={`Show slide ${index + 1}`}
                                className={
                                    activeSlide === index ? 'selected' : ''
                                }
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}

                    </div>

                </div>

                {/* RIGHT SIDE - LOGIN CARD */}
                <div className="login-card">

                    <div className="login-card-top">

                        <div className="login-icon">
                            ✚
                        </div>

                        <span className="secure-label">
                            <span />
                            SECURE ACCESS
                        </span>

                    </div>

                    <h2>Welcome Back</h2>

                    <p className="login-subtitle">
                        Ingia kwenye akaunti yako kuendelea.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* EMAIL */}
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <div className="input-wrapper">

                            <span className="input-icon">
                                ✉
                            </span>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Ingiza email yako"
                                value={data.email}
                                onChange={(event) =>
                                    setData('email', event.target.value)
                                }
                                autoComplete="username"
                                autoFocus
                                required
                            />

                        </div>

                        {errors.email && (
                            <p className="login-message" role="alert">
                                {errors.email}
                            </p>
                        )}

                        {/* PASSWORD */}
                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">

                            <span className="input-icon">
                                ▣
                            </span>

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Ingiza password yako"
                                value={data.password}
                                onChange={(event) =>
                                    setData('password', event.target.value)
                                }
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword((current) => !current)
                                }
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
                            <p className="login-message" role="alert">
                                {errors.password}
                            </p>
                        )}

                        {/* REMEMBER PASSWORD */}
                        <div className="login-options">

                            <label className="remember-option">

                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(event) =>
                                        setData('remember', event.target.checked)
                                    }
                                />

                                <span>
                                    Nikumbuke
                                </span>

                            </label>

                            <a href="mailto:support@nactechnologies.co.tz">
                                Forgot password?
                            </a>

                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={processing}
                        >

                            <span>
                                {processing
                                    ? 'INAINGIA...'
                                    : 'INGIA KWENYE MFUMO'}
                            </span>

                            <span className="button-arrow">
                                →
                            </span>

                        </button>

                        {/* GENERAL LOGIN ERROR */}
                        {errors.email && (
                            <p className="login-message" role="alert">
                                {errors.email}
                            </p>
                        )}

                    </form>

                    {/* LOGIN FOOTER */}
                    <div className="login-card-footer">

                        <span className="footer-shield">
                            ✓
                        </span>

                        Protected Pharmacy Workspace

                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer className="welcome-footer">

                <span>
                    © {new Date().getFullYear()} NACPHARMA
                </span>

                <span>
                    Smart Pharmacy. Smarter Business.
                </span>

                <span>
                    POWERED BY <strong>Nac Technologies</strong>
                </span>

            </footer>

        </main>
    );
}
