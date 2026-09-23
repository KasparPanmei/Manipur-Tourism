import React, { useState } from 'react';

const Transportation = () => {
    const [activeTab, setActiveTab] = useState('instant');
    const [pickupInput, setPickupInput] = useState('Bir Tikendrajit Intl Airport (IMF) - Bay 2');
    const [destination, setDestination] = useState('loktak');
    const [vehicleTier, setVehicleTier] = useState('ev-sedan');

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        if (tabName === 'rental') {
            setPickupInput('Imphal Self-Drive Hub, Kangla North Gate');
            setVehicleTier('suv-4x4');
        } else if (tabName === 'shuttle') {
            setPickupInput('IMF Airport Terminal 1 Bay 2');
            setVehicleTier('luxury-coach');
        } else if (tabName === 'tour') {
            setPickupInput('Hotel Classic Grande / Your Stay Location');
            setVehicleTier('ev-sedan');
        } else {
            setPickupInput('Bir Tikendrajit Intl Airport (IMF) - Bay 2');
            setVehicleTier('ev-sedan');
        }
    };

    const handleUseGps = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPickupInput(`GPS Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`);
                },
                () => {
                    setPickupInput('Current GPS Location (Imphal)');
                }
            );
        }
    };

    return (
        <div className="flex flex-col w-full bg-surface font-body-md text-on-surface antialiased min-h-screen">
            {/* Hero & Primary Booking Section */}
            <section className="relative w-full bg-surface-container-low pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
                {/* Ambient Decor */}
                <div className="absolute -top-24 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin relative z-10">
                    {/* Title & Value Prop */}
                    <div className="max-w-3xl mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-label-sm font-semibold uppercase tracking-wider mb-4">
                            <span className="material-symbols-outlined text-[16px]">electric_car</span>
                            <span>Department of Transport &amp; Tourism Collaboration</span>
                        </div>
                        <h1 className="font-display-lg text-display-md-mobile md:text-display-lg text-primary tracking-tight leading-tight mb-4">
                            Regenerative Transit &amp; Mobility Across Sanaleibak
                        </h1>
                        <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                            Traverse pristine wetlands, forested ridges, and historic valleys in verified carbon-neutral tourist fleets. Experience transparent government-notified tariffs, 24/7 police emergency telemetry, and flexible mountain rentals.
                        </p>
                    </div>

                    {/* Booking Console Box */}
                    <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden">
                        {/* Service Tabs */}
                        <div className="bg-surface-container-low p-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-label-md">
                            <button
                                type="button"
                                className={`tab-btn flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg transition-all duration-200 ${activeTab === 'instant'
                                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                                    }`}
                                onClick={() => handleTabChange('instant')}
                            >
                                <span className="material-symbols-outlined text-[20px]">bolt</span>
                                <span>Instant Cab (On-Demand)</span>
                            </button>
                            <button
                                type="button"
                                className={`tab-btn flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg transition-all duration-200 ${activeTab === 'tour'
                                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                                    }`}
                                onClick={() => handleTabChange('tour')}
                            >
                                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                <span>Scheduled Tour Cab</span>
                            </button>
                            <button
                                type="button"
                                className={`tab-btn flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg transition-all duration-200 ${activeTab === 'rental'
                                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                                    }`}
                                onClick={() => handleTabChange('rental')}
                            >
                                <span className="material-symbols-outlined text-[20px]">directions_car</span>
                                <span>Rent vehicle</span>
                            </button>
                            <button
                                type="button"
                                className={`tab-btn flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg transition-all duration-200 ${activeTab === 'shuttle'
                                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                                    }`}
                                onClick={() => handleTabChange('shuttle')}
                            >
                                <span className="material-symbols-outlined text-[20px]">airport_shuttle</span>
                                <span>Airport &amp; Regional Shuttle</span>
                            </button>
                        </div>

                        {/* Input Console Body */}
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Pickup Point */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-sm uppercase font-bold text-outline tracking-wider flex items-center justify-between">
                                        <span>Pickup Origin</span>
                                        <button
                                            onClick={handleUseGps}
                                            className="text-primary font-semibold hover:underline flex items-center gap-1 normal-case text-label-sm"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">my_location</span>
                                            <span>Use GPS</span>
                                        </button>
                                    </label>
                                    <div className="flex items-center gap-3 bg-surface-container-low px-3.5 py-3 rounded-lg">
                                        <span className="material-symbols-outlined text-primary text-[20px]">trip_origin</span>
                                        <input
                                            className="bg-transparent w-full text-on-surface font-semibold text-body-md focus:outline-none placeholder-outline"
                                            placeholder="Enter landmark or hotel..."
                                            type="text"
                                            value={pickupInput}
                                            onChange={(e) => setPickupInput(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Destination */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-sm uppercase font-bold text-outline tracking-wider flex items-center justify-between">
                                        <span>Destination / Circuit</span>
                                        <span className="text-xs text-on-surface-variant font-normal">Statewide</span>
                                    </label>
                                    <div className="flex items-center gap-3 bg-surface-container-low px-3.5 py-3 rounded-lg">
                                        <span className="material-symbols-outlined text-secondary text-[20px]">pin_drop</span>
                                        <select
                                            className="bg-transparent w-full text-on-surface font-semibold text-body-md focus:outline-none cursor-pointer"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                        >
                                            <option value="loktak">Loktak Lake &amp; Sendra Island (48 km)</option>
                                            <option value="kangla">Kangla Fort &amp; Ima Keithel Heritage (City Core)</option>
                                            <option value="ukhrul">Ukhrul Hills &amp; Shirui Peak (84 km)</option>
                                            <option value="keibul">Keibul Lamjao Floating Park (52 km)</option>
                                            <option value="dzukou">Dzükou Valley Trailhead (Mao Pass)</option>
                                            <option value="moreh">Moreh Border Trading Post (110 km)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-sm uppercase font-bold text-outline tracking-wider">Departure Schedule</label>
                                    <div className="flex items-center gap-3 bg-surface-container-low px-3.5 py-3 rounded-lg">
                                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">schedule</span>
                                        <div className="flex items-center gap-2 w-full text-on-surface font-semibold text-body-md">
                                            <span>Today</span>
                                            <span className="text-outline">|</span>
                                            <span>Pickup Now (~4 min)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Type */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-label-sm uppercase font-bold text-outline tracking-wider">Fleet Tier</label>
                                    <div className="flex items-center gap-3 bg-surface-container-low px-3.5 py-3 rounded-lg">
                                        <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                                        <select
                                            className="bg-transparent w-full text-on-surface font-semibold text-body-md focus:outline-none cursor-pointer"
                                            value={vehicleTier}
                                            onChange={(e) => setVehicleTier(e.target.value)}
                                        >
                                            <option value="ev-sedan">EV Eco Sedan (Tata Nexon / Tigor)</option>
                                            <option value="suv-4x4">Highland 4x4 (Mahindra Scorpio-N)</option>
                                            <option value="auto-rickshaw">Green E-Rickshaw (Short City Hop)</option>
                                            <option value="luxury-coach">Group Luxury Coach (Force Urbania)</option>
                                            <option value="himalayan">Expedition Bike (Royal Enfield 450)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Price Calculation & Dispatch Action Strip */}
                            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pt-4 bg-surface-container-low/60 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-label-sm uppercase font-bold text-outline tracking-wider">Regulated Govt Tariff</span>
                                        <div className="flex items-baseline gap-2 mt-0.5">
                                            <span className="font-display-md text-headline-lg font-bold text-primary">₹1,180</span>
                                            <span className="text-label-sm text-on-surface-variant line-through">₹1,450</span>
                                            <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[11px] font-bold tracking-wide">
                                                NO SURGE GUARANTEE
                                            </span>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-4 text-body-sm text-on-surface-variant pl-4 border-none">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                            <span>Fare includes GST, Tolls &amp; IMF Airport Parking</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-secondary text-[18px]">shield</span>
                                            <span>Driver Verified</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-primary text-on-primary font-label-lg font-bold hover:bg-primary-container transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                        type="button"
                                    >
                                        <span>Hop In &amp; Let's Go</span>
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Vehicle Radar & Fleet Showcase */}
            <section className="w-full py-16 bg-surface">
                <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-label-sm uppercase font-bold text-secondary tracking-widest">Sustainable Fleet Registry</span>
                            <h2 className="font-display-md text-headline-md md:text-display-md text-primary font-bold mt-1">
                                Tourism Certified Fleet Categories
                            </h2>
                        </div>
                        <p className="font-body-md text-on-surface-variant max-w-md">
                            Every vehicle is equipped with dual SOS beacons, GPS trackable via Tourist Cell, and piloted by Department of Tourism certified regional chauffeur-guides.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Vehicle Card 1: Nexon EV */}
                        <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full bg-surface-container">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Tata Nexon EV Max"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu2RrNRsfBTqLRTH0NqjkKntFeS3u7cjiM3QZl5EXdXz_zE0GwCi_ZvoA0TOY1MrE9-5NK9xuG5E6Bb7HmEtRgkx6oJsMxigCp4_xiIP4eit2meIyP37dhkux_URMwhH3d1-_d7k_ip7OIeb-AcPhYLG-ij4fZ7HU5s94cfmBXXaTtjr8-FqzAxKdmht_jfJF-VDf0akppUBwwcty9u_B3TleNmJ7PY3KIbOarZVAC"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">eco</span>
                                    <span>100% Zero Emission</span>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-bold text-label-sm">
                                    ₹12 / km fixed
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Tata Nexon EV Max</h3>
                                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-label-sm">4.9 ★</span>
                                </div>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Silently cruise Imphal Valley and Loktak Lake with zero emissions. High battery thermal management tuned for humid hill conditions.
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-label-sm text-on-surface-variant mb-6 mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">airline_seat_recline_normal</span>
                                        <span>5 Passengers</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">battery_charging_full</span>
                                        <span>350 km Range</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">luggage</span>
                                        <span>3 Large Bags</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                                        <span>SOS Telemetry</span>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-surface-container text-primary font-label-md font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2" type="button">
                                    <span>Book Nexon EV</span>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {/* Vehicle Card 2: Scorpio-N 4x4 */}
                        <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full bg-surface-container">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Mahindra Scorpio-N 4x4"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2IWeuQOmGNa9VMfi7iiihyhHqZRzbmgNlbepSAEeaGs4G36D_SfAtgpe1nQCUMLmjOfXUPhVW49VxboQjJs2dM2jGiU7xgfHMY5SlPb0alJ7qN3cs_wfybLN7Kd0rdMK02tols0ZpcbUGmuWilJZ3o_MX_gwmftXNpHiU4Z9ODzgxxa7JWLJqxhVghfPe3tN35NoFQ7hQN35eHLgAk1amHeNu3JtYZ64epVAw3Iay"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-secondary text-on-secondary text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">terrain</span>
                                    <span>Highland Grade 4WD</span>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-secondary font-bold text-label-sm">
                                    ₹3,800 / day
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Mahindra Scorpio-N 4x4</h3>
                                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-label-sm">5.0 ★</span>
                                </div>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Engineered for steep inclines, Ukhrul pine trails, and remote Tamenglong waterfalls. Includes high ground clearance and all-weather winch.
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-label-sm text-on-surface-variant mb-6 mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">airline_seat_recline_normal</span>
                                        <span>7 Passengers</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">explore</span>
                                        <span>Dual-Range 4WD</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">roofing</span>
                                        <span>Safari Roof Rack</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">emergency</span>
                                        <span>Hill Recovery Kit</span>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-surface-container text-secondary font-label-md font-bold hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center gap-2" type="button">
                                    <span>Book 4x4 Mountain SUV</span>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {/* Vehicle Card 3: Royal Enfield Himalayan */}
                        <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full bg-surface-container">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Royal Enfield Himalayan 450"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWM4jWKLiBOSjc3l7E17lsS4eEvZJseBd2wb2skdPRF9Sm8deEslw8Y-FDqwdLMv7Nhhrz37C7QURHB5HN0FNKYT5E8AHN0kdRkGaq7cg7jxdr_ljsqad-0CM8aO0Jsh9T_6wg7JsvEKefHBiBvgj_e4hW5E_fgguOT5YjvJ2lPePFzbGZI_ZGvBubTsoPvUh3PhdY1BkrY3OUGhphkKrFtHna_7U5-KMApEFSdWl2"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">two_wheeler</span>
                                    <span>Solo / Duo Trek</span>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-tertiary font-bold text-label-sm">
                                    ₹1,850 / day
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">RE Himalayan 450 Solo</h3>
                                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-label-sm">4.9 ★</span>
                                </div>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Pure mountain exploration freedom. Delivered with waterproof aluminum hard-cases, USB fast-charger, and DOT-certified dual helmets.
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-label-sm text-on-surface-variant mb-6 mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-tertiary">speed</span>
                                        <span>452cc Sherpa Engine</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-tertiary">backpack</span>
                                        <span>Twin Panniers Included</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-tertiary">phonelink_ring</span>
                                        <span>GPS Phone Mount</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-tertiary">handshake</span>
                                        <span>Security Deposit Free</span>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-surface-container text-tertiary font-label-md font-bold hover:bg-tertiary hover:text-on-tertiary transition-colors flex items-center justify-center gap-2" type="button">
                                    <span>Rent Himalayan 450</span>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {/* Vehicle Card 4: Force Urbania */}
                        <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full bg-surface-container">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Force Urbania Coach"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjITNiDfQFio_WEhn2xuR3NJmp8O1jb9x0tsXtYMH7ryyTX-Rw9HRl7viqFqzYJTsL_AhmJAPRjq0m76-DRAH4WcZZDm2tRXAjqM6edHDKCf79icV7Fus1GUKUYPWlgm-G-2v6bgG7m-5T1T3Xj1ZlcA4JE9XyRz1BdnUKGa9ifZxM1ZMfh7Jja1Qa7UHD0S9djpQgOgYpn4e_y7FxbXzwefgX5I5Z_7qdS2kGsQqf"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">groups</span>
                                    <span>Delegation &amp; Family</span>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-bold text-label-sm">
                                    ₹5,200 / day
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Force Urbania Coach</h3>
                                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-label-sm">4.8 ★</span>
                                </div>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Premium reclining captain chairs, dual AC climate zones, and massive luggage bays tailored for cultural tour delegations and film crews.
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-label-sm text-on-surface-variant mb-6 mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">event_seat</span>
                                        <span>12 Reclining Seats</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">wifi</span>
                                        <span>High-Speed WiFi</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">mic</span>
                                        <span>PA Audio System</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
                                        <span>Senior Chauffeur</span>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-surface-container text-primary font-label-md font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2" type="button">
                                    <span>Book Group Coach</span>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {/* Vehicle Card 5: Green E-Rickshaw */}
                        <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full bg-surface-container">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Manipur Green E-Rickshaw"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-BMq8xdOIhkluW5gdghP1QDsI-xVL92YKmIdbIViurgqw0BaBb12xCOsPqu28XWJkF5-GvrbQQywQcwJ-_Bnv31p3rb5b-XlLo0XqWzLa2qdtcib868RgCVNyofUwc824MyHQpnJviHeabAiYFTSfi660W4FO5VoFmOF2K6s9zXSQvpN2EulMxaq30tttMMe95JWjpeZkxpQ65LRjs8avLzyA3At3yhrhCjJQDeI1"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary-container text-on-primary text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">electric_bolt</span>
                                    <span>Heritage Zone Hop</span>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-bold text-label-sm">
                                    ₹30 Flat Base
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Manipur Green E-Rickshaw</h3>
                                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-label-sm">4.7 ★</span>
                                </div>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Hop between Kangla Fort, Ima Keithel Market, and Govindaji Temple with zero noise and hassle-free QR payments.
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-label-sm text-on-surface-variant mb-6 mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                                        <span>3 - 4 Commuters</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">qr_code_2</span>
                                        <span>UPI / Card QR</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">speed</span>
                                        <span>Speed Cap: 30 km/h</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-primary">local_parking</span>
                                        <span>Easy Market Alighting</span>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-surface-container text-primary font-label-md font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2" type="button">
                                    <span>Hail Nearby E-Rickshaw</span>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {/* Real-Time Radar Mini Map Card */}
                        <div className="flex flex-col bg-primary text-on-primary rounded-xl overflow-hidden shadow-sm p-6 justify-between relative">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-2.5 py-1 rounded bg-primary-container text-primary-fixed text-label-sm font-bold uppercase tracking-wider">
                                        Telemetry Radar
                                    </span>
                                    <span className="flex h-2.5 w-2.5 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary-fixed"></span>
                                    </span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold mb-2">Imphal Urban &amp; Loktak Basin Grid</h3>
                                <p className="font-body-sm text-primary-fixed leading-relaxed mb-6">
                                    Average wait times across Imphal West: <strong>3.8 minutes</strong>. Sendra / Bishnupur Lake Corridor has 22 active EV units waiting at rapid charge stations.
                                </p>

                                {/* Data visual telemetry indicator */}
                                <div className="bg-primary-container/60 p-4 rounded-lg space-y-3 mb-4">
                                    <div className="flex justify-between text-body-sm">
                                        <span className="text-surface">Airport Taxi Line:</span>
                                        <span className="font-bold text-primary-fixed">14 Cabs Ready</span>
                                    </div>
                                    <div className="w-full bg-primary/40 rounded-full h-2">
                                        <div className="bg-primary-fixed h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-body-sm">
                                        <span className="text-surface">Loktak Eco-Fleet:</span>
                                        <span className="font-bold text-primary-fixed">8 Cabs Ready</span>
                                    </div>
                                    <div className="w-full bg-primary/40 rounded-full h-2">
                                        <div className="bg-primary-fixed h-2 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 pt-4">
                                <button className="w-full py-3 rounded-lg bg-surface text-primary font-bold text-label-md hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 cursor-pointer" type="button">
                                    <span className="material-symbols-outlined text-[18px]">share_location</span>
                                    <span>Open Live Dispatch Telemetry</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Fixed-Tariff Sightseeing & Circuit Day Charters */}
            <section className="w-full py-16 bg-surface-container-low">
                <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
                    <div className="max-w-2xl mb-12">
                        <span className="text-label-sm uppercase font-bold text-primary tracking-widest">Transparent Govt-Notified Rates</span>
                        <h2 className="font-display-md text-headline-md md:text-display-md text-primary font-bold mt-1 mb-3">
                            Popular Fixed-Tariff Sightseeing Charters
                        </h2>
                        <p className="font-body-md text-on-surface-variant">
                            Book full-day curated circuits with complete driver allowances, fuel, toll, and state entry clearance covered. Zero surprise fees, zero haggling.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Circuit 1: Imphal Heritage */}
                        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-bold text-label-sm">8 HRS / 60 KM</span>
                                    <span className="text-label-sm text-outline">Circuit #MT-01</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Imphal Heritage &amp; Kangla Sacred Sites</h3>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Kangla Fort, Govindaji Temple, Ima Keithel Mothers' Market, Manipur State Museum &amp; War Cemetery.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                                        <span>English &amp; Manipuri Speaking Driver</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                                        <span>All Parking &amp; Gate Tolls Included</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-4 flex items-baseline justify-between mb-4">
                                    <span className="text-label-sm text-outline uppercase font-semibold">Regulated Rate</span>
                                    <span className="font-display-md text-headline-md font-bold text-primary">₹2,200</span>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md font-bold hover:bg-primary-container transition-colors" type="button">
                                    Reserve Circuit
                                </button>
                            </div>
                        </div>

                        {/* Circuit 2: Loktak Lake & Sangai Sanctuary */}
                        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative">
                            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-secondary text-on-secondary font-bold text-label-sm uppercase tracking-wider">
                                Most Popular
                            </div>
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-bold text-label-sm">10 HRS / 110 KM</span>
                                    <span className="text-label-sm text-outline">Circuit #MT-02</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Loktak Lake, Phumdis &amp; Sangai Sanctuary</h3>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Keibul Lamjao National Park (Sangai Deer), Sendra Island viewpoint, INA War Memorial Moirang &amp; Phumdi boat link.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                                        <span>Keibul Eco-Zone Permit Sync</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                                        <span>EV Rapid Charge Top-up Free</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-4 flex items-baseline justify-between mb-4">
                                    <span className="text-label-sm text-outline uppercase font-semibold">Regulated Rate</span>
                                    <span className="font-display-md text-headline-md font-bold text-secondary">₹3,400</span>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-colors" type="button">
                                    Reserve Circuit
                                </button>
                            </div>
                        </div>

                        {/* Circuit 3: Ukhrul Pine Ridges */}
                        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold text-label-sm">12 HRS / 190 KM</span>
                                    <span className="text-label-sm text-outline">Circuit #MT-03</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Ukhrul Pine Ridges &amp; Shirui Expedition</h3>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Shirui Lily Peak basecamp, Phangrei picnic meadows, Longpi Black Pottery crafting village &amp; Tangkhul tribal kitchens.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                                        <span>Highland 4WD Vehicle Mandated</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                                        <span>Forest Dept Green Entry Clearance</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-4 flex items-baseline justify-between mb-4">
                                    <span className="text-label-sm text-outline uppercase font-semibold">Regulated Rate</span>
                                    <span className="font-display-md text-headline-md font-bold text-tertiary">₹4,800</span>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-tertiary text-on-tertiary font-label-md font-bold hover:bg-tertiary-container transition-colors" type="button">
                                    Reserve Circuit
                                </button>
                            </div>
                        </div>

                        {/* Circuit 4: Dzükou Valley Trekker Drop */}
                        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-bold text-label-sm">RETURN PASS / 160 KM</span>
                                    <span className="text-label-sm text-outline">Circuit #MT-04</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Dzükou Valley Trekker Pass (Mao Base)</h3>
                                <p className="font-body-sm text-on-surface-variant mb-4">
                                    Expedition drop at Mount Isii trailhead with scheduled trekker pickup 24-48 hours later. Luggage storage included at base depot.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                                        <span>Two-Way Mountain Shuttle Link</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                                        <span>Base Camp Radio Checkpoint Check</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-4 flex items-baseline justify-between mb-4">
                                    <span className="text-label-sm text-outline uppercase font-semibold">Regulated Rate</span>
                                    <span className="font-display-md text-headline-md font-bold text-primary">₹3,600</span>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md font-bold hover:bg-primary-container transition-colors" type="button">
                                    Reserve Circuit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Airport Pre-Paid Taxi & Terminal Desk Guide */}
            <section className="w-full py-16 bg-surface">
                <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5">
                            <span className="text-label-sm uppercase font-bold text-primary tracking-widest">Arrivals Concierge</span>
                            <h2 className="font-display-md text-headline-md md:text-display-md text-primary font-bold mt-1 mb-4">
                                Bir Tikendrajit International Airport (IMF) Bay 2
                            </h2>
                            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                                Arriving into Imphal? Skip unverified local touts. Our official Pre-Paid Mobility Desk is situated right after baggage carousels 1 &amp; 2 at Terminal 1. Your Inner Line Permit (ILP) QR code syncs directly with our dispatch terminal.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-low">
                                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-md shrink-0">1</div>
                                    <div>
                                        <h4 className="font-headline-sm text-body-lg text-on-surface font-bold mb-1">Verify e-ILP &amp; Get Instant Token</h4>
                                        <p className="font-body-sm text-on-surface-variant">Present your entry permit QR at Kiosk 3 for an instantaneous pre-printed government tariff slip with chauffeur contact.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-low">
                                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-md shrink-0">2</div>
                                    <div>
                                        <h4 className="font-headline-sm text-body-lg text-on-surface font-bold mb-1">Board at Dedicated Bay 2 Turnstile</h4>
                                        <p className="font-body-sm text-on-surface-variant">Dedicated tourist taxi parking with covered luggage assistance trolleys and accessible EV fast charging berths.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-low">
                                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-md shrink-0">3</div>
                                    <div>
                                        <h4 className="font-headline-sm text-body-lg text-on-surface font-bold mb-1">Direct Hotel / Homestay Check-in Drop</h4>
                                        <p className="font-body-sm text-on-surface-variant">Fixed rate drops into Imphal Central (₹450), Sendra Loktak (₹1,180), or Churachandpur (₹1,950).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-md">
                                <div className="flex items-center justify-between mb-6 pb-4">
                                    <div>
                                        <span className="text-label-sm uppercase font-bold text-secondary tracking-wider">Airport Tariff Card</span>
                                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Standard Airport Transfer Tariffs</h3>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-primary-container text-primary-fixed text-label-sm font-bold">Updated Nov 2025</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-body-sm">
                                        <thead>
                                            <tr className="text-outline uppercase text-label-sm">
                                                <th className="py-3 px-4 font-bold">Destination Zone</th>
                                                <th className="py-3 px-4 font-bold">Est. Duration</th>
                                                <th className="py-3 px-4 font-bold">EV Sedan</th>
                                                <th className="py-3 px-4 font-bold">SUV 4x4</th>
                                                <th className="py-3 px-4 font-bold text-right">Instant Book</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-on-surface">
                                            <tr className="hover:bg-surface-container-low transition-colors">
                                                <td className="py-3.5 px-4 font-semibold">Imphal City Center (Kangla, MG Avenue)</td>
                                                <td className="py-3.5 px-4 text-on-surface-variant">15 - 20 mins</td>
                                                <td className="py-3.5 px-4 font-bold text-primary">₹450</td>
                                                <td className="py-3.5 px-4 font-bold">₹750</td>
                                                <td className="py-3.5 px-4 text-right">
                                                    <button className="px-3 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-bold text-label-sm transition-colors" type="button">Select</button>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-surface-container-low transition-colors">
                                                <td className="py-3.5 px-4 font-semibold">Sendra Cottages &amp; Loktak Lake</td>
                                                <td className="py-3.5 px-4 text-on-surface-variant">50 - 60 mins</td>
                                                <td className="py-3.5 px-4 font-bold text-primary">₹1,180</td>
                                                <td className="py-3.5 px-4 font-bold">₹1,650</td>
                                                <td className="py-3.5 px-4 text-right">
                                                    <button className="px-3 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-bold text-label-sm transition-colors" type="button">Select</button>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-surface-container-low transition-colors">
                                                <td className="py-3.5 px-4 font-semibold">Churachandpur Peace Grounds</td>
                                                <td className="py-3.5 px-4 text-on-surface-variant">1 hr 30 mins</td>
                                                <td className="py-3.5 px-4 font-bold text-primary">₹1,950</td>
                                                <td className="py-3.5 px-4 font-bold">₹2,500</td>
                                                <td className="py-3.5 px-4 text-right">
                                                    <button className="px-3 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-bold text-label-sm transition-colors" type="button">Select</button>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-surface-container-low transition-colors">
                                                <td className="py-3.5 px-4 font-semibold">Ukhrul Town Center (Hill District)</td>
                                                <td className="py-3.5 px-4 text-on-surface-variant">2 hrs 45 mins</td>
                                                <td className="py-3.5 px-4 text-on-surface-variant italic">Hill Pass Rec.</td>
                                                <td className="py-3.5 px-4 font-bold text-secondary">₹3,400</td>
                                                <td className="py-3.5 px-4 text-right">
                                                    <button className="px-3 py-1 rounded bg-surface-container hover:bg-secondary hover:text-on-secondary text-secondary font-bold text-label-sm transition-colors" type="button">Select</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 pt-4 flex items-center justify-between text-body-sm text-on-surface-variant">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                        Tariff fixed by Manipur Transport Dept Notice No. 4/TO/2024
                                    </span>
                                    <a className="font-bold text-primary hover:underline" href="tel:03852458140">IMF Desk: 0385-2458140</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tourist Police SOS & Safety Infrastructure Strip */}
            <section className="w-full py-12 bg-surface-container">
                <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
                    <div className="bg-primary text-on-primary rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden">
                        {/* Abstract BG Watermark */}
                        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-[280px]">shield</span>
                        </div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-on-secondary text-label-sm font-bold uppercase tracking-wider mb-3">
                                    <span className="material-symbols-outlined text-[16px]">gpp_good</span>
                                    <span>Statewide Tourist Safety Protocol</span>
                                </div>
                                <h3 className="font-headline-lg text-headline-lg font-bold mb-3">
                                    Integrated Tourist Police &amp; Emergency Dispatch
                                </h3>
                                <p className="font-body-md text-primary-fixed max-w-2xl leading-relaxed mb-6">
                                    Every passenger cab is fitted with tamper-proof panic SOS buttons linked to district satellite response vehicles. Drivers undergo compulsory biometric verification and zero-alcohol testing prior to each tour assignment.
                                </p>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">contact_phone</span>
                                        <div>
                                            <div className="text-[11px] uppercase tracking-wider text-primary-fixed">Imphal HQ Dispatch</div>
                                            <div className="font-bold text-on-primary">+91 385 2441010</div>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-primary-container hidden sm:block"></div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">local_police</span>
                                        <div>
                                            <div className="text-[11px] uppercase tracking-wider text-primary-fixed">Loktak Lake Patrol</div>
                                            <div className="font-bold text-on-primary">03879-222301</div>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-primary-container hidden sm:block"></div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">sos</span>
                                        <div>
                                            <div className="text-[11px] uppercase tracking-wider text-primary-fixed">Direct Emergency Helpline</div>
                                            <div className="font-bold text-tertiary-fixed">112 / 1800-345-3885</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                                <div className="bg-surface-container-lowest text-on-surface p-5 rounded-xl shadow-md w-full max-w-xs text-center">
                                    <span className="material-symbols-outlined text-secondary text-[40px] mb-2">emergency_home</span>
                                    <h4 className="font-bold text-body-lg text-primary mb-1">One-Touch Cab SOS</h4>
                                    <p className="text-body-sm text-on-surface-variant mb-4">In-cab physical buttons alert nearest highway patrol within 90 seconds.</p>
                                    <a
                                        className="w-full py-2 rounded-lg bg-secondary text-on-secondary font-bold text-label-md flex items-center justify-center gap-2 hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                                        href="tel:112"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                        <span>Dial 112 Emergency</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Transportation;

