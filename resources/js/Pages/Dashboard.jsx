
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import '../../css/dashboard.css';

function Trend({ value, negative = false }) {
    return (
        <span className={`trend ${negative ? 'trend-negative' : ''}`}>
            {negative ? '↓' : '↑'} {value}
        </span>
    );
}

function StatCard({ icon, label, value, trend, tone, description }) {
    return (
        <article className={`stat-card stat-${tone}`}>
            <div className="stat-card-top">
                <div className="stat-icon">{icon}</div>
                <span className="stat-menu">•••</span>
            </div>
            <p className="stat-label">{label}</p>
            <h2>{value}</h2>
            <div className="stat-bottom">
                <Trend value={trend} negative={tone === 'orange'} />
                <span>{description}</span>
            </div>
            <div className="stat-decoration" />
        </article>
    );
}

function SalesChart() {
    const bars = [38, 53, 45, 63, 72, 55, 83, 69, 92, 74, 61, 86];

    return (
        <div className="sales-chart">
            <div className="chart-y-labels">
                <span>3M</span>
                <span>2M</span>
                <span>1M</span>
                <span>0</span>
            </div>

            <div className="chart-plot">
                <div className="chart-grid">
                    <span /><span /><span /><span />
                </div>
                <div className="chart-bars">
                    {bars.map((height, index) => (
                        <div className="chart-bar-column" key={index}>
                            <div
                                className={`chart-bar ${index === 8 ? 'chart-bar-highlight' : ''}`}
                                style={{ height: `${height}%` }}
                                title={`Sales day ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="chart-x-labels">
                <span>01 Nov</span>
                <span>07 Nov</span>
                <span>14 Nov</span>
                <span>21 Nov</span>
                <span>30 Nov</span>
            </div>
        </div>
    );
}

const recentSales = [
    { id: 'INV-1048', customer: 'Walk-in Customer', product: 'Paracetamol 500mg', amount: 'TZS 12,000', time: '10:42 AM', status: 'Completed' },
    { id: 'INV-1047', customer: 'Amina Juma', product: 'Amoxicillin 500mg', amount: 'TZS 28,000', time: '10:18 AM', status: 'Completed' },
    { id: 'INV-1046', customer: 'Peter Joseph', product: 'Vitamin C 1000mg', amount: 'TZS 18,500', time: '09:55 AM', status: 'Pending' },
    { id: 'INV-1045', customer: 'Walk-in Customer', product: 'Cough Syrup 100ml', amount: 'TZS 9,000', time: '09:21 AM', status: 'Completed' },
];

const alerts = [
    { name: 'Amoxicillin 500mg', batch: 'BTH-24081', expiry: '30 Nov 2026', type: 'expiry' },
    { name: 'Paracetamol 500mg', batch: 'BTH-24062', expiry: '12 Dec 2026', type: 'expiry' },
    { name: 'Vitamin C 1000mg', batch: 'BTH-24110', expiry: 'Low quantity', type: 'stock' },
];

function Dashboard() {
    return (
        <AuthenticatedLayout title="Dashboard">
            <Head title="Dashboard | NACPHARMA" />

            <div className="dashboard-page">
                <section className="dashboard-heading">
                    <div>
                        <div className="eyebrow"><span /> PHARMACY OVERVIEW</div>
                        <h1>Good day, <span>Welcome back!</span></h1>
                        <p>Here is what's happening with your pharmacy today.</p>
                    </div>

                    <div className="dashboard-date">
                        <span className="date-icon">▦</span>
                        <div>
                            <small>REPORTING DATE</small>
                            <strong>{new Date().toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}</strong>
                        </div>
                    </div>
                </section>

                <section className="stats-grid">
                    <StatCard
                        icon="↗"
                        label="Today's Sales"
                        value="TZS 2.45M"
                        trend="12.5%"
                        description="vs yesterday"
                        tone="green"
                    />
                    <StatCard
                        icon="▣"
                        label="Total Products"
                        value="8,750"
                        trend="5.2%"
                        description="in your catalogue"
                        tone="blue"
                    />
                    <StatCard
                        icon="♙"
                        label="Total Customers"
                        value="1,240"
                        trend="8.1%"
                        description="this month"
                        tone="purple"
                    />
                    <StatCard
                        icon="⚠"
                        label="Low Stock Alerts"
                        value="12"
                        trend="2.3%"
                        description="items need attention"
                        tone="orange"
                    />
                </section>

                <section className="dashboard-middle">
                    <article className="panel sales-panel">
                        <div className="panel-heading">
                            <div>
                                <span className="panel-heading-icon">▥</span>
                                <div>
                                    <h3>Sales Performance</h3>
                                    <p>Revenue overview for this month</p>
                                </div>
                            </div>
                            <select aria-label="Sales period" defaultValue="30">
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                                <option value="90">Last 90 days</option>
                            </select>
                        </div>

                        <div className="sales-summary">
                            <strong>TZS 24,850,000</strong>
                            <span><Trend value="12.5%" /> compared to last month</span>
                        </div>

                        <SalesChart />
                    </article>

                    <article className="panel category-panel">
                        <div className="panel-heading">
                            <div>
                                <span className="panel-heading-icon">◉</span>
                                <div>
                                    <h3>Sales by Category</h3>
                                    <p>Product category distribution</p>
                                </div>
                            </div>
                            <span className="mini-period">This month</span>
                        </div>

                        <div className="category-content">
                            <div className="donut-wrap">
                                <div className="donut-chart">
                                    <div className="donut-center">
                                        <small>TOTAL SALES</small>
                                        <strong>24.8M</strong>
                                        <span>TZS</span>
                                    </div>
                                </div>
                            </div>

                            <div className="category-legend">
                                <div><i className="legend-green" /><span>Medicines</span><strong>42%</strong></div>
                                <div><i className="legend-blue" /><span>Antibiotics</span><strong>28%</strong></div>
                                <div><i className="legend-purple" /><span>Vitamins</span><strong>18%</strong></div>
                                <div><i className="legend-orange" /><span>Others</span><strong>12%</strong></div>
                            </div>
                        </div>
                    </article>

                    <article className="promo-card">
                        <div className="promo-orb promo-orb-one" />
                        <div className="promo-orb promo-orb-two" />
                        <div className="promo-content">
                            <span className="promo-brand">✚ NACPHARMA</span>
                            <p>Better care.<br />Smarter business.</p>
                            <small>Manage your pharmacy with confidence.</small>
                            <Link href="/products" className="promo-button">Explore products ↗</Link>
                        </div>
                        <div className="promo-capsule">✚</div>
                    </article>
                </section>

                <section className="dashboard-bottom">
                    <article className="panel recent-panel">
                        <div className="panel-heading">
                            <div>
                                <span className="panel-heading-icon">▤</span>
                                <div>
                                    <h3>Recent Sales</h3>
                                    <p>Your latest transactions</p>
                                </div>
                            </div>
                            <Link href="/sales" className="view-all">View all ↗</Link>
                        </div>

                        <div className="table-scroll">
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>INVOICE</th>
                                        <th>CUSTOMER / PRODUCT</th>
                                        <th>AMOUNT</th>
                                        <th>TIME</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentSales.map((sale) => (
                                        <tr key={sale.id}>
                                            <td className="invoice-id">{sale.id}</td>
                                            <td>
                                                <strong>{sale.customer}</strong>
                                                <small>{sale.product}</small>
                                            </td>
                                            <td className="amount-cell">{sale.amount}</td>
                                            <td>{sale.time}</td>
                                            <td>
                                                <span className={`sale-status ${sale.status.toLowerCase()}`}>
                                                    {sale.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="panel alerts-panel">
                        <div className="panel-heading">
                            <div>
                                <span className="panel-heading-icon alert-heading-icon">⚠</span>
                                <div>
                                    <h3>Pharmacy Alerts</h3>
                                    <p>Items requiring your attention</p>
                                </div>
                            </div>
                            <Link href="/inventory" className="view-all">View all ↗</Link>
                        </div>

                        <div className="alert-list">
                            {alerts.map((alert) => (
                                <div className="alert-item" key={alert.batch}>
                                    <div className={`alert-product-icon ${alert.type}`}>
                                        {alert.type === 'expiry' ? '◷' : '!' }
                                    </div>
                                    <div className="alert-product">
                                        <strong>{alert.name}</strong>
                                        <small>{alert.batch}</small>
                                    </div>
                                    <div className={`alert-expiry ${alert.type}`}>
                                        <small>{alert.type === 'expiry' ? 'EXPIRY / STATUS' : 'INVENTORY'}</small>
                                        <strong>{alert.expiry}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>

                <section className="quick-actions-section">
                    <div className="quick-actions-heading">
                        <div>
                            <h3>Quick Actions</h3>
                            <p>Get things done faster</p>
                        </div>
                    </div>

                    <div className="quick-actions-grid">
                        <Link href="/sales/create" className="quick-action">
                            <span className="quick-action-icon">＋</span>
                            <strong>New Sale</strong>
                            <small>Open POS terminal</small>
                        </Link>
                        <Link href="/products/create" className="quick-action">
                            <span className="quick-action-icon">▣</span>
                            <strong>Add Product</strong>
                            <small>Register medicine</small>
                        </Link>
                        <Link href="/inventory/stock-in" className="quick-action">
                            <span className="quick-action-icon">⇧</span>
                            <strong>Stock In</strong>
                            <small>Update inventory</small>
                        </Link>
                        <Link href="/reports" className="quick-action">
                            <span className="quick-action-icon">▥</span>
                            <strong>Generate Report</strong>
                            <small>View business insights</small>
                        </Link>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
