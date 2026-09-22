import React, { useState } from 'react';
import './Transportation.css';
import Telemetry from '../components/home/TelemetryBar'

const HeroBooking = () => {
    const [activeTab, setActiveTab] = useState('instant');
    const [vehicleTier, setVehicleTier] = useState('');

    const getPlaceholder = () => {
        switch (activeTab) {
            case 'rental': return 'Imphal Self-Drive Hub, Kangla North Gate';
            case 'shuttle': return 'IMF Airport Terminal 1 Bay 2';
            case 'tour': return 'Hotel Classic Grande / Your Stay Location';
            default: return 'Bir Tikendrajit Intl Airport (IMF) - Bay 2';
        }
    };

    const getVehicleTier = () => {
        if (vehicleTier) return vehicleTier;
        switch (activeTab) {
            case 'rental': return 'suv-4x4';
            case 'shuttle': return 'luxury-coach';
            default: return 'ev-sedan';
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setVehicleTier('');
    };

    return (
        <section className="transport-hero-section">
            <div className="decor-blob primary-blob"></div>
            <div className="decor-blob secondary-blob"></div>

            <div className="transport-hero-container">
                <div className="transport-hero-content">
                    <div className="dept-badge">
                        <span className="material-symbols-outlined icon-small">electric_car</span>
                        <span>Department of Transport & Tourism Collaboration</span>
                    </div>
                    <h1 className="transport-hero-title">Regenerative Transit & Mobility Across Sanaleibak</h1>
                    <p className="transport-hero-desc">
                        Traverse pristine wetlands, forested ridges, and historic valleys in verified carbon-neutral tourist fleets.
                        Experience transparent government-notified tariffs, 24/7 police emergency telemetry, and flexible mountain rentals.
                    </p>
                </div>

                <div className="transport-booking-console">
                    <div className="transport-booking-tabs">
                        <button type="button" className={`tab-btn ${activeTab === 'instant' ? 'active' : ''}`} onClick={() => handleTabChange('instant')}>
                            <span className="material-symbols-outlined icon-medium">bolt</span>
                            <span>Instant Cab (On-Demand)</span>
                        </button>
                        <button type="button" className={`tab-btn ${activeTab === 'tour' ? 'active' : ''}`} onClick={() => handleTabChange('tour')}>
                            <span className="material-symbols-outlined icon-medium">calendar_month</span>
                            <span>Scheduled Tour Cab</span>
                        </button>
                        <button type="button" className={`tab-btn ${activeTab === 'rental' ? 'active' : ''}`} onClick={() => handleTabChange('rental')}>
                            <span className="material-symbols-outlined icon-medium">directions_car</span>
                            <span>Self-Drive 4x4 & Bikes</span>
                        </button>
                        <button type="button" className={`tab-btn ${activeTab === 'shuttle' ? 'active' : ''}`} onClick={() => handleTabChange('shuttle')}>
                            <span className="material-symbols-outlined icon-medium">airport_shuttle</span>
                            <span>Airport & Regional Shuttle</span>
                        </button>
                    </div>

                    <div className="transport-booking-form">
                        <div className="form-grid">
                            <div className="input-group">
                                <label className="input-label">
                                    <span>Pickup Origin</span>
                                    <button className="gps-btn" type="button">
                                        <span className="material-symbols-outlined icon-small">my_location</span>
                                        <span>Use GPS</span>
                                    </button>
                                </label>
                                <div className="input-field">
                                    <span className="material-symbols-outlined text-primary icon-medium">trip_origin</span>
                                    <input type="text" placeholder={getPlaceholder()} />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">
                                    <span>Destination / Circuit</span>
                                    <span className="label-subtitle">Statewide</span>
                                </label>
                                <div className="input-field">
                                    <span className="material-symbols-outlined text-secondary icon-medium">pin_drop</span>
                                    <select defaultValue="loktak">
                                        <option value="loktak">Loktak Lake & Sendra Island (48 km)</option>
                                        <option value="kangla">Kangla Fort & Ima Keithel Heritage (City Core)</option>
                                        <option value="ukhrul">Ukhrul Hills & Shirui Peak (84 km)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Departure Schedule</label>
                                <div className="input-field">
                                    <span className="material-symbols-outlined icon-medium text-muted">schedule</span>
                                    <div className="schedule-display">
                                        <span>Today</span>
                                        <span className="divider-text">|</span>
                                        <span>Pickup Now (~4 min)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Fleet Tier</label>
                                <div className="input-field">
                                    <span className="material-symbols-outlined text-primary icon-medium">tune</span>
                                    <select value={getVehicleTier()} onChange={(e) => setVehicleTier(e.target.value)}>
                                        <option value="ev-sedan">EV Eco Sedan (Tata Nexon)</option>
                                        <option value="suv-4x4">Highland 4x4 (Mahindra Scorpio-N)</option>
                                        <option value="luxury-coach">Group Luxury Coach</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="transport-booking-action-strip">
                            <div className="price-details">
                                <div className="price-col">
                                    <span className="price-label">Regulated Govt Tariff</span>
                                    <div className="price-row">
                                        <span className="price-current">₹1,180</span>
                                        <span className="price-old">₹1,450</span>
                                        <span className="surge-badge">NO SURGE GUARANTEE</span>
                                    </div>
                                </div>
                                <div className="price-features">
                                    <div className="feature-item">
                                        <span className="material-symbols-outlined text-primary icon-small">verified</span>
                                        <span>Fare includes GST & Tolls</span>
                                    </div>
                                    <div className="feature-item">
                                        <span className="material-symbols-outlined text-secondary icon-small">shield</span>
                                        <span>Driver Verified</span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn-primary" type="button">
                                <span>{"Hop In & Let's Go"}</span>
                                <span className="material-symbols-outlined icon-small">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const VehicleShowcase = () => {
    const vehicles = [
        {
            title: "Tata Nexon EV Max",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCu2RrNRsfBTqLRTH0NqjkKntFeS3u7cjiM3QZl5EXdXz_zE0GwCi_ZvoA0TOY1MrE9-5NK9xuG5E6Bb7HmEtRgkx6oJsMxigCp4_xiIP4eit2meIyP37dhkux_URMwhH3d1-_d7k_ip7OIeb-AcPhYLG-ij4fZ7HU5s94cfmBXXaTtjr8-FqzAxKdmht_jfJF-VDf0akppUBwwcty9u_B3TleNmJ7PY3KIbOarZVAC",
            badge: { icon: "eco", text: "100% Zero Emission", theme: "primary" },
            price: "₹12 / km fixed",
            rating: "4.9 ★",
            desc: "Silently cruise Imphal Valley and Loktak Lake with zero emissions.",
            specs: ["5 Passengers", "350 km Range", "3 Large Bags", "SOS Telemetry"]
        },
        {
            title: "Mahindra Scorpio-N 4x4",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2IWeuQOmGNa9VMfi7iiihyhHqZRzbmgNlbepSAEeaGs4G36D_SfAtgpe1nQCUMLmjOfXUPhVW49VxboQjJs2dM2jGiU7xgfHMY5SlPb0alJ7qN3cs_wfybLN7Kd0rdMK02tols0ZpcbUGmuWilJZ3o_MX_gwmftXNpHiU4Z9ODzgxxa7JWLJqxhVghfPe3tN35NoFQ7hQN35eHLgAk1amHeNu3JtYZ64epVAw3Iay",
            badge: { icon: "terrain", text: "Highland Grade 4WD", theme: "secondary" },
            price: "₹3,800 / day",
            rating: "5.0 ★",
            desc: "Engineered for steep inclines, Ukhrul pine trails, and remote waterfalls.",
            specs: ["7 Passengers", "Dual-Range 4WD", "Safari Roof Rack", "Hill Recovery Kit"]
        }
    ];

    return (
        <section className="fleet-section">
            <div className="container">
                <div className="section-header">
                    <div className="header-text">
                        <span className="section-subtitle text-secondary">Sustainable Fleet Registry</span>
                        <h2 className="section-title">Tourism Certified Fleet Categories</h2>
                    </div>
                    <p className="header-desc">
                        Every vehicle is equipped with dual SOS beacons, GPS trackable via Tourist Cell, and piloted by certified chauffeur-guides.
                    </p>
                </div>

                <div className="grid-3">
                    {vehicles.map((v, i) => (
                        <div className="vehicle-card" key={i}>
                            <div className="card-image-wrap">
                                <img src={v.img} alt={v.title} className="card-image" />
                                <div className={`card-badge badge-${v.badge.theme}`}>
                                    <span className="material-symbols-outlined icon-small">{v.badge.icon}</span>
                                    <span>{v.badge.text}</span>
                                </div>
                                <div className={`price-tag text-${v.badge.theme}`}>{v.price}</div>
                            </div>
                            <div className="card-body">
                                <div className="card-header">
                                    <h3 className="card-title">{v.title}</h3>
                                    <span className="rating">{v.rating}</span>
                                </div>
                                <p className="card-desc">{v.desc}</p>
                                <div className="specs-grid">
                                    {v.specs.map((spec, j) => (
                                        <div className="spec-item" key={j}>
                                            <span className={`material-symbols-outlined icon-small text-${v.badge.theme}`}>check_circle</span>
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className={`btn-outline btn-${v.badge.theme}`} type="button">
                                    <span>Book Now</span>
                                    <span className="material-symbols-outlined icon-small">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="telemetry-card">
                        <div className="telemetry-card-header">
                            <span className="radar-badge">Telemetry Radar</span>
                            <span className="live-indicator"><span className="ping-dot"></span><span className="static-dot"></span></span>
                        </div>
                        <h3 className="telemetry-card-title">Imphal Urban & Loktak Basin Grid</h3>
                        <p className="telemetry-card-desc">Average wait times across Imphal West: <strong>3.8 minutes</strong>.</p>

                        <div className="data-visuals">
                            <div className="data-row">
                                <span>Airport Taxi Line:</span> <strong>14 Cabs Ready</strong>
                            </div>
                            <div className="progress-bar"><div className="progress-fill" style={{ width: '85%' }}></div></div>

                            <div className="data-row mt-3">
                                <span>Loktak Eco-Fleet:</span> <strong>8 Cabs Ready</strong>
                            </div>
                            <div className="progress-bar"><div className="progress-fill" style={{ width: '60%' }}></div></div>
                        </div>

                        <button className="btn-light mt-auto" type="button">
                            <span className="material-symbols-outlined icon-small">share_location</span>
                            <span>Open Live Dispatch Telemetry</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Transportation = () => {
    return (
        <div className="transports-page w-full">
            <div className="transports-content">
                <Telemetry />
                <HeroBooking />
                <VehicleShowcase />
            </div>
        </div>
    );
};

export default Transportation;
