import React, { useState } from 'react';

const RentButton = ({ className, defaultText, icon }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleRent = () => {
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <button
            type="button"
            className={className}
            onClick={handleRent}
        >
            <span className="material-symbols-outlined text-sm md:text-base">{icon}</span>
            <span>{isAdded ? 'Added to Locker!' : defaultText}</span>
        </button>
    );
};

export default function RentItem() {
    return (
        <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
            <main className="w-full pt-28 bg-surface">
                <div className="flex flex-col w-full">
                    {/* SECTION 1: BREADCRUMBS & EDITORIAL HERO HEADER */}
                    <section className="w-full px-gutter max-w-7xl mx-auto pt-space-md pb-space-lg">
                        <div className="flex flex-wrap items-center gap-space-xs font-label-md text-label-md text-on-surface-variant mb-space-md">
                            <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
                                <span className="material-symbols-outlined text-sm">home</span>Home
                            </a>
                            <span className="text-outline-variant">/</span>
                            <a className="hover:text-primary transition-colors" href="#">Travel & Adventure Gear</a>
                            <span className="text-outline-variant">/</span>
                            <span className="text-primary font-semibold">Official Equipment Rental Depot</span>
                        </div>
                        <div className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl relative overflow-hidden shadow-sm">
                            <div className="relative z-10 max-w-4xl flex flex-col gap-space-sm">
                                <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-full w-fit shadow-sm">
                                    <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
                                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Directorate of Adventure Tourism & Manipur Mountaineering Institute Certified</span>
                                </div>
                                <h1 className="font-headline-lg md:font-display-md text-headline-lg md:text-display-md text-primary tracking-tight mt-space-xs">
                                    Rent Professional Expeditions & <span className="font-display-md italic text-secondary">Sana Keithel</span> Gear
                                </h1>
                                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                                    High-altitude alpine tents, dynamic climbing ropes, solar LED storm lamps, down sleeping bags, and GPS satellite communicators vetted for Dzükou Valley, Shirui Kashong, and Loktak Lake expeditions. 100% sanitized, safety tested, and backed by government-guaranteed refundable deposits.
                                </p>
                                {/* Quick Trust Metrics Strip */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-md mt-space-xs">
                                    <div className="flex items-center gap-space-sm">
                                        <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <span className="material-symbols-outlined text-xl">inventory_2</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-title-md text-title-md text-primary">1,850+</span>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant">Active Gear Units</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-space-sm">
                                        <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <span className="material-symbols-outlined text-xl">eco</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-title-md text-title-md text-secondary">Zero Plastic</span>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant">Bio Kauna Packaged</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-space-sm">
                                        <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <span className="material-symbols-outlined text-xl">hub</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-title-md text-title-md text-primary">5 Trail Depots</span>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant">Direct Trailhead Handover</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-space-sm">
                                        <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <span className="material-symbols-outlined text-xl">currency_rupee</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-title-md text-title-md text-primary">100% Refundable</span>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant">Instant Digital Release</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none hidden lg:block transform translate-x-8 translate-y-8">
                                <span className="material-symbols-outlined text-[240px] text-primary">terrain</span>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: INTERACTIVE GEAR RESERVATION BAR */}
                    <section className="w-full px-gutter max-w-7xl mx-auto -mt-4 z-20">
                        <div className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-xl shadow-primary/5">
                            <div className="flex items-center justify-between gap-space-sm pb-space-sm mb-space-sm">
                                <div className="flex items-center gap-space-xs">
                                    <span className="material-symbols-outlined text-primary text-xl">tune</span>
                                    <h2 className="font-title-lg text-title-lg text-primary">Select Reservation Details & Expedition Base</h2>
                                </div>
                                <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-space-sm py-1 rounded">
                                    Govt. Regulated Tariffs
                                </span>
                            </div>
                            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-md" id="gear-reservation-form">
                                <div className="flex flex-col gap-1">
                                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-primary">storefront</span> Pickup Depot
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-12 bg-surface-container-low rounded-lg text-on-surface px-space-sm font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer">
                                            <option>Imphal Central Depot (Kangla Gate)</option>
                                            <option>Senapati Basecamp (Dzükou Trailhead)</option>
                                            <option>Ukhrul Town Hub (Shirui Kashong Base)</option>
                                            <option>Sendra Island Depot (Loktak Lake)</option>
                                            <option>Bir Tikendrajit Airport Counter (IMF Bay)</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-base">expand_more</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-primary">explore</span> Expedition Type
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-12 bg-surface-container-low rounded-lg text-on-surface px-space-sm font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer">
                                            <option>All Expeditions</option>
                                            <option>Alpine Trekking (Dzükou / Shirui)</option>
                                            <option>Wetland & Kayak Camping (Loktak)</option>
                                            <option>Caving & Spelunking (Tharon / Khoupum)</option>
                                            <option>Highland Leisure Camping</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-base">expand_more</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-primary">calendar_today</span> Handover Date
                                    </label>
                                    <input className="w-full h-12 bg-surface-container-low rounded-lg text-on-surface px-space-sm font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest cursor-pointer" type="date" defaultValue="2025-04-10" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-primary">event_available</span> Return Date
                                    </label>
                                    <div className="relative">
                                        <input className="w-full h-12 bg-surface-container-low rounded-lg text-on-surface px-space-sm font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest cursor-pointer" type="date" defaultValue="2025-04-13" />
                                        <span className="absolute right-3 top-3.5 font-label-sm text-label-sm text-secondary pointer-events-none bg-surface-container-lowest px-1.5 py-0.5 rounded">3 Days</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <button className="w-full h-12 bg-primary text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-space-xs hover:bg-primary-container transition-colors shadow-md" type="button">
                                        <span className="material-symbols-outlined text-base">search_check</span>
                                        <span>Check Availability</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>

                    {/* SECTION 3: CURATED ALL-IN-ONE EXPEDITION GEAR PACKAGES */}
                    <section className="w-full px-gutter max-w-7xl mx-auto pt-space-xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
                            <div>
                                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Complete Field-Tested Ensembles</span>
                                <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Curated All-in-One Expedition Bundles</h2>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                                Assembled in coordination with certified mountain guides of the Manipur Mountaineering Institute. Pre-bundled, inspected, and ready at trailheads.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
                            {/* Card A */}
                            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-56 overflow-hidden">
                                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Dzükou valley lush bamboo hills" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDa1NUKyl118iJNWm2RlT4XCbBiaam8QNV5beqdiuGuss4-k9Nb_q5exBcqO3a28x48ob7L30GKFGy8DxUwKrzSvWDPfiBuKbAtQkKZOTpvleAX-jeCmsXM76voWd7S_n_7IIQFuoeecHQWrzC3a3P0UufesOmsyizLWn_OdqX6jMn--CjKk7Cy-_f0HUn8p24Ulrlc7HHFAJ-Jgp8vYzre-K6TBOSNdwcxkV92Wx99aRH7IiTek-DfQ" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute top-space-sm left-space-sm">
                                            <span className="bg-secondary text-on-secondary font-label-sm text-label-sm px-space-sm py-1 rounded uppercase tracking-wider">
                                                Most Popular • High Altitude
                                            </span>
                                        </div>
                                        <div className="absolute bottom-space-sm left-space-sm right-space-sm flex items-center justify-between text-white">
                                            <span className="font-label-md text-label-md flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm text-secondary-container">thermostat</span> Rated to -5°C
                                            </span>
                                            <span className="font-label-md text-label-md flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm text-primary-fixed">group</span> 2 Trekkers
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-space-lg">
                                        <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">Dzükou Valley Alpine Trekker Bundle</h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                                            Engineered specifically for the gusting winds and frosty microclimates of the Dzükou alpine caldera.
                                        </p>
                                        <div className="bg-surface-container-low rounded-lg p-space-sm mb-space-md">
                                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-space-xs">Kit Contents & Gear Spec:</span>
                                            <ul className="font-body-sm text-body-sm text-on-surface flex flex-col gap-1.5">
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> 4-Season 2-Person Geodesic Wind Tent
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> -5°C Goose Down Sleeping Bags (x2)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Insulated Thermal Ground Mats (x2)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> 500LM Rechargeable Storm Headlamps (x2)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Carbon Fiber FlickLock Trekking Poles (Pair)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Camp Gas Iso-Stove & Anodized Cookset
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-space-lg pt-0">
                                    <div className="bg-surface-container-high/40 rounded-lg p-space-sm mb-space-md flex items-center justify-between">
                                        <div>
                                            <span className="font-headline-sm text-headline-sm text-primary font-bold">₹850</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ day</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-label-sm text-label-sm text-on-surface-variant block">Deposit (Refundable)</span>
                                            <span className="font-title-sm text-title-sm text-on-surface">₹1,500</span>
                                        </div>
                                    </div>
                                    <RentButton
                                        className="w-full h-11 bg-primary text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-space-xs hover:bg-primary-container transition-colors shadow-sm"
                                        defaultText="Reserve Dzükou Bundle"
                                        icon="backpack"
                                    />
                                </div>
                            </div>

                            {/* Card B */}
                            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-56 overflow-hidden">
                                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Shirui Kashong mountain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4QckP2LcMzsYlIr3IzdMR-Gyhk_GEJRQ1qUuREtw0XF4v6jiPwU-r8OjS_6l-K3E_iTLDfXPkUgF88thbno3xH3Yyygat98ACnUiKQRl09CZgnSuXBbnGI33YhhXEDVZw30oihDzsilyLZYbRRu06njf_MvVJtWyD8bbV-nBA-clfHIOFLw8mgo9unnxGn9DCvsx-bY5oCcBQomrWH7ZsU-ANOQvsq3Rfwz1hChUb3yhgxk8oos0qYg" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute top-space-sm left-space-sm">
                                            <span className="bg-primary text-on-primary font-label-sm text-label-sm px-space-sm py-1 rounded uppercase tracking-wider">
                                                Peak & Cliff Tested
                                            </span>
                                        </div>
                                        <div className="absolute bottom-space-sm left-space-sm right-space-sm flex items-center justify-between text-white">
                                            <span className="font-label-md text-label-md flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm text-secondary-container">shield</span> UIAA Certified
                                            </span>
                                            <span className="font-label-md text-label-md flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm text-primary-fixed">altitude</span> 2,835m Ridge
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-space-lg">
                                        <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">Shirui Kashong Mountain Peak Kit</h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                                            Specialized for rugged rocky trails, steep ridge crossings, and the humid highland cloud-forest of Ukhrul.
                                        </p>
                                        <div className="bg-surface-container-low rounded-lg p-space-sm mb-space-md">
                                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-space-xs">Kit Contents & Gear Spec:</span>
                                            <ul className="font-body-sm text-body-sm text-on-surface flex flex-col gap-1.5">
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> 3-Season Weatherproof Ripstop Dome Tent
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> 11mm Dynamic Climbing Rope (30m Dry Treated)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> CE Certified Carabiners (x4) & Sit Harness
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> 1000LM Multi-Mode High Power Storm Lantern
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Fleece Thermal Sleeping Liners & Micro Towels
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> 3L TPU Military Hydration Bladders (x2)
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-space-lg pt-0">
                                    <div className="bg-surface-container-high/40 rounded-lg p-space-sm mb-space-md flex items-center justify-between">
                                        <div>
                                            <span className="font-headline-sm text-headline-sm text-primary font-bold">₹1,100</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ day</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-label-sm text-label-sm text-on-surface-variant block">Deposit (Refundable)</span>
                                            <span className="font-title-sm text-title-sm text-on-surface">₹2,000</span>
                                        </div>
                                    </div>
                                    <RentButton
                                        className="w-full h-11 bg-primary text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-space-xs hover:bg-primary-container transition-colors shadow-sm"
                                        defaultText="Reserve Peak Kit"
                                        icon="landscape"
                                    />
                                </div>
                            </div>

                            {/* Card C */}
                            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-56 overflow-hidden">
                                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Loktak lake floating circular phumdis" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5An2afEhJp6MRuktJaFKAqlxFnpI-vmDgqWVk6wRvaEyPprS--svOnyip6dSLFikuaLNEvuQ5ABPdRwVvEYcw6K8LLSd-43I4MGH6ryAtlsXq3QIPHwwtgAo4QPlmgu00H2aFWToFezVOZIyxF7Azs5Bw4z8oNM5qWpukEQPrPm7HP571dlxLYVm_tMxHMXFE0uJHvPl3dKRpGAAuj8GSZCY-zmrFbHSa2X-nrjmeKU4iL8Q9ubmMuw" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute top-space-sm left-space-sm">
                                            <span className="bg-surface-container-lowest text-on-surface font-label-sm text-label-sm px-space-sm py-1 rounded uppercase tracking-wider shadow-sm">
                                                Water Resistant & Eco
                                            </span>
                                        </div>
                                        <div className="absolute bottom-space-sm left-space-sm right-space-sm flex items-center justify-between text-white">
                                            <span className="font-label-md text-label-md flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm text-secondary-container">kayaking</span> Phumdi Approved
                                            </span>
                                            <span className="font-label-md text-label-md flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm text-primary-fixed">groups</span> 3 Campers
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-space-lg">
                                        <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">Loktak Lake Starlight Floating Pack</h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                                            Tailored for peaceful phumdi overnight stays, birdwatching excursions, and damp lakefront conditions.
                                        </p>
                                        <div className="bg-surface-container-low rounded-lg p-space-sm mb-space-md">
                                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-space-xs">Kit Contents & Gear Spec:</span>
                                            <ul className="font-body-sm text-body-sm text-on-surface flex flex-col gap-1.5">
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Pop-up Moisture-Proof 3-Person Cabin Tent
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Handwoven Kauna Reed Eco-Bedding Mats (x3)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Solar String Lights & Ultrasonic Mosquito Repeller
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Marine-Grade Inflatable Life Vests (x2)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Heavy-Duty 500D Waterproof Dry Bags (20L x 2)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">check</span> Ultralight Foldable Aluminum Camp Stools (x2)
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-space-lg pt-0">
                                    <div className="bg-surface-container-high/40 rounded-lg p-space-sm mb-space-md flex items-center justify-between">
                                        <div>
                                            <span className="font-headline-sm text-headline-sm text-primary font-bold">₹650</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/ day</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-label-sm text-label-sm text-on-surface-variant block">Deposit (Refundable)</span>
                                            <span className="font-title-sm text-title-sm text-on-surface">₹1,000</span>
                                        </div>
                                    </div>
                                    <RentButton
                                        className="w-full h-11 bg-primary text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-space-xs hover:bg-primary-container transition-colors shadow-sm"
                                        defaultText="Reserve Lake Pack"
                                        icon="water"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: INDIVIDUAL EQUIPMENT CATALOG & FILTER PILLS */}
                    <section className="w-full px-gutter max-w-7xl mx-auto pt-space-xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-md gap-space-sm">
                            <div>
                                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">A La Carte Inventory</span>
                                <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Individual Technical Equipment</h2>
                            </div>
                            <div className="flex items-center gap-space-sm">
                                <span className="font-label-md text-label-md text-on-surface-variant">Showing 8 of 64 Available Items</span>
                            </div>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-lg scrollbar-none">
                            <button className="px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap bg-primary text-on-primary shadow-sm">
                                All Gear (64)
                            </button>
                            <button className="px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                                Tents & Shelters (14)
                            </button>
                            <button className="px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                                Lighting & Power (12)
                            </button>
                            <button className="px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                                Ropes, Harness & Climbing (8)
                            </button>
                            <button className="px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                                Sleeping Bags & Mats (10)
                            </button>
                            <button className="px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                                Camp Kitchen & Water (12)
                            </button>
                            <button className="px-space-md py-2 rounded-full font-label-md text-label-md whitespace-nowrap bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                                Navigation & Safety (8)
                            </button>
                        </div>

                        {/* 8 Individual Items Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                            {/* Item 1 */}
                            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-44 rounded-lg overflow-hidden mb-space-sm">
                                        <img className="w-full h-full object-cover" alt="The North Face Alpine Geodesic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIasOUBEa43hM82nzXfLaWpLBnrz7IfS70k3FsNy9GTwurjpgiADnARHi6uRf8v-JQCD18A9b_-YvXIreNyQWbNK8cnTmJJwCtr5hz0P_h6eSRR6z6PtoXy4utqFDE_utMlgpOgznO_xdOiL3Qfzm5Kg_QpPUUGPxS7Ckb-fxdrLUIbJ-Dg3kNJEmhGnCcxGROQ8wRtu5lfKn58MCNjYicjETJry3YK4z3hNaGejjZi5RtMQrT9dlNZQ" />
                                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm text-primary px-2 py-0.5 rounded font-semibold">
                                            IMF Level 4
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Tents & Shelters</span>
                                    <h3 className="font-title-md text-title-md text-primary mt-1 line-clamp-1">The North Face Alpine Geodesic</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                                        Storm-grade 5,000mm hydrostatic head, dual snow vestibules, 2-person capacity.
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <div className="flex items-baseline justify-between mb-space-sm">
                                        <div>
                                            <span className="font-title-lg text-title-lg text-primary font-bold">₹350</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Dep: ₹800</span>
                                    </div>
                                    <RentButton
                                        className="w-full h-10 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-1 transition-colors"
                                        defaultText="Rent Item"
                                        icon="add_circle"
                                    />
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-44 rounded-lg overflow-hidden mb-space-sm">
                                        <img className="w-full h-full object-cover" alt="Petzl Dynamic Rope" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLASSZwIt4A74QyJOSHsVcETZ6OB7U4mZ2c2e36T394pzgX6CXxr4_mCAP18VKLaHdhmo1X3BbyQneWanECKIFTGv76GO-UdJetK_NAXgmfMEMqBzT0uCEZP28jofCtQ1r36Fxcge2C0li-CAq9YGVm_A5qtm1ZLKCvOc9rBZ6qSr3UYi39LYCCHDIUErUGL13k0pspEaKEC1Z1YjxoKtUxkoY031YyTNUaxqxU5H01W82m9BTkNhBRg" />
                                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm text-primary px-2 py-0.5 rounded font-semibold">
                                            CE / UIAA
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Ropes & Climbing</span>
                                    <h3 className="font-title-md text-title-md text-primary mt-1 line-clamp-1">Petzl Dynamic Rope (10.2mm x 50m)</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                                        CE certified, dry-treated hydrophobic sheath, durable kernmantle construction.
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <div className="flex items-baseline justify-between mb-space-sm">
                                        <div>
                                            <span className="font-title-lg text-title-lg text-primary font-bold">₹220</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Dep: ₹600</span>
                                    </div>
                                    <RentButton
                                        className="w-full h-10 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-1 transition-colors"
                                        defaultText="Rent Item"
                                        icon="add_circle"
                                    />
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-44 rounded-lg overflow-hidden mb-space-sm">
                                        <img className="w-full h-full object-cover" alt="Black Diamond storm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz28hutFHhKcsT6h6fiBoJFXNcItVbQokg_Z_n_C3eQOnL8dMejoBfvHNfLIAQocHBJh3gsGQyKSn6ZlxeRCQ59fmrldi8aU0DbEJx8KcyxxlzxB8fTcnWn2b3szPAZk2re81NiL31Td0x3yAwa2oVFajgqHmvT_IeSoZHTDafvXlYE4nxgxcDCzDcrtpy7wH2-qIT_81wrY1aXEVNaj-bi_Ocad1PaVXG2dWLjXpEhP8FOQd_BuUEEA" />
                                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm text-primary px-2 py-0.5 rounded font-semibold">
                                            IP67 Submersible
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Lighting & Power</span>
                                    <h3 className="font-title-md text-title-md text-primary mt-1 line-clamp-1">Black Diamond Storm 500-R</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                                        500 Lumens, USB rechargeable, red, blue and green night vision modes.
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <div className="flex items-baseline justify-between mb-space-sm">
                                        <div>
                                            <span className="font-title-lg text-title-lg text-primary font-bold">₹120</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Dep: ₹300</span>
                                    </div>
                                    <RentButton
                                        className="w-full h-10 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-1 transition-colors"
                                        defaultText="Rent Item"
                                        icon="add_circle"
                                    />
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-44 rounded-lg overflow-hidden mb-space-sm">
                                        <img className="w-full h-full object-cover" alt="Goal Zero Lighthouse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8Knzhn9Iy-eBLKPp2-S86ql07AxCHTRHPYva74kr1kLlkrDJjiop8ldS73KIKY9cweTe6tMoJfp8AytiBwXW6-Gn5xPFmM6hulDIWsVNa26SohRmdqkaD0SdMC6p6XvEv-5YgZNTd-GyfasHw6H5aE3-CX1EGzqqjTTrkAianshf4bzq-3ggzh-lQK68KDbDDCZTjj-ifVE-O3ZPc4bM16IJ0jNl-mAmvrEO0ozhTcQDawu2P5ZoKRw" />
                                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm text-primary px-2 py-0.5 rounded font-semibold">
                                            USB Power Bank
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Lighting & Power</span>
                                    <h3 className="font-title-md text-title-md text-primary mt-1 line-clamp-1">Goal Zero Lighthouse 600</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                                        600LM adjustable directional dial, hand crank backup and phone charger.
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <div className="flex items-baseline justify-between mb-space-sm">
                                        <div>
                                            <span className="font-title-lg text-title-lg text-primary font-bold">₹150</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Dep: ₹350</span>
                                    </div>
                                    <RentButton
                                        className="w-full h-10 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-1 transition-colors"
                                        defaultText="Rent Item"
                                        icon="add_circle"
                                    />
                                </div>
                            </div>

                            {/* Item 5 */}
                            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-44 rounded-lg overflow-hidden mb-space-sm">
                                        <img className="w-full h-full object-cover" alt="Therm-a-rest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-hbr26gxvIPWYqx7Wx5LFGqnSEnSKbwEy3fl6yz1sDt9u0HYgsUuzOA0m2s4r6nO1yog6c2S7BxMlD-znhbAijocdYRetU32rvHUQoSQf6RmRbI8IXwlW5Y7nLfQ3q0aOLLWl0zB1tDP2Ysc73f5Y2NEIz41r0q9v_ABZTltbTh5rim5-Yrf-r8hgjSeAxFDlUt0gXcVVSCUZvsa1XBXLHaOon65hQt_5cdV9innUeQ0lhdQjooiCOQ" />
                                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm text-primary px-2 py-0.5 rounded font-semibold">
                                            R-Value 3.2
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Sleeping Bags & Mats</span>
                                    <h3 className="font-title-md text-title-md text-primary mt-1 line-clamp-1">Therm-a-Rest ProLite Plus</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                                        Self-inflating cold insulation pad, lightweight 650g packable profile.
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <div className="flex items-baseline justify-between mb-space-sm">
                                        <div>
                                            <span className="font-title-lg text-title-lg text-primary font-bold">₹110</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Dep: ₹250</span>
                                    </div>
                                    <RentButton
                                        className="w-full h-10 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-1 transition-colors"
                                        defaultText="Rent Item"
                                        icon="add_circle"
                                    />
                                </div>
                            </div>

                            {/* Item 6 */}
                            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-44 rounded-lg overflow-hidden mb-space-sm">
                                        <img className="w-full h-full object-cover" alt="Quechua Forclaz Trek 900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1O3FE2swgdeUD0qBIgN32Y2vb0qE-8Nks01aCuRVQeupDdDxGztABjBVmnfTdoFV-h3TLdjSl_RoWTCb-NpJzWNaQh3XYaphLO3ZwOWs8PqthEJjS92-rkPa8Tm17pXQpagRn4IpUU2QgtaAuDWATAePRaYKM1nQoH_9WOD90KFbQ1j-KGGhhBo679k7acuKYDD9REdlvWsvETbRp_siZI4EfLrqtPCPVMlxRPrX85Iz5HSh035_34Q" />
                                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm text-primary px-2 py-0.5 rounded font-semibold">
                                            -5°C Comfort
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Sleeping Bags & Mats</span>
                                    <h3 className="font-title-md text-title-md text-primary mt-1 line-clamp-1">Quechua Forclaz Trek 900</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                                        800 Cuin hydrophobic goose down fill, anti-snag baffle zipper.
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <div className="flex items-baseline justify-between mb-space-sm">
                                        <div>
                                            <span className="font-title-lg text-title-lg text-primary font-bold">₹240</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Dep: ₹500</span>
                                    </div>
                                    <RentButton
                                        className="w-full h-10 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-1 transition-colors"
                                        defaultText="Rent Item"
                                        icon="add_circle"
                                    />
                                </div>
                            </div>

                            {/* Item 7 */}
                            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-44 rounded-lg overflow-hidden mb-space-sm">
                                        <img className="w-full h-full object-cover" alt="Black Diamond Trail Pro Shock" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-HeSVKddL2qFi0MC_kdu4kzpv4YPii-9QeriksNdQ6S5SRnDSjTaDaqxlnSLuIsaDTq3v9l7SB-V7JthsJglz3GznmpOavjX3v7C_IophIUIL5FV8xFCKDnhwK9eHxZ23-P-gePnRrrpyZGVFsedo5z_3DjIa26m1xw0N1hPYsVAzMGZXw2cs99I8ut4OEeE4bwX2tMlrk2zvwYXL9M6nOCsId-0XrhxHb4jkUr7EH_2Li4BZYl1MXQ" />
                                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur font-label-sm text-label-sm text-primary px-2 py-0.5 rounded font-semibold">
                                            Carbon Shock
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Trail & Trekking</span>
                                    <h3 className="font-title-md text-title-md text-primary mt-1 line-clamp-1">Black Diamond Trail Pro Shock</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                                        Pair, dual FlickLock Pro adjustment, moisture-wicking cork handles.
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <div className="flex items-baseline justify-between mb-space-sm">
                                        <div>
                                            <span className="font-title-lg text-title-lg text-primary font-bold">₹130</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Dep: ₹300</span>
                                    </div>
                                    <RentButton
                                        className="w-full h-10 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-1 transition-colors"
                                        defaultText="Rent Item"
                                        icon="add_circle"
                                    />
                                </div>
                            </div>

                            {/* Item 8 */}
                            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="relative h-44 rounded-lg overflow-hidden mb-space-sm">
                                        <img className="w-full h-full object-cover" alt="Garmin inReach Mini 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgDFkbCcLNKm9bvvgwgYpSH3H5IFABi3Ua_4DtVcHQzfdJhVgcBTaspqa6KDhBE0Y1udPJQS4P0BncRHDX5e06qboSHA228kmSyPd5wneyqyK8uwcq8VmjfQD8th3Pdb1vq6S-lCq_23OZW64deKUe0_bb23akws326l9c9JVaFpek5fdJLRg4_G0KeuOaEzrFhczNC741HUEP_7Yd5oephhrqgiJi8SLU-IM4lt_tMxpoyxnVrNRWaA" />
                                        <span className="absolute top-2 left-2 bg-secondary text-on-secondary font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold">
                                            Live Satellite SOS
                                        </span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Navigation & Safety</span>
                                    <h3 className="font-title-md text-title-md text-primary mt-1 line-clamp-1">Garmin inReach Mini 2</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                                        100% global Iridium satellite network, 24/7 emergency dispatch SOS link.
                                    </p>
                                </div>
                                <div className="pt-space-md">
                                    <div className="flex items-baseline justify-between mb-space-sm">
                                        <div>
                                            <span className="font-title-lg text-title-lg text-primary font-bold">₹450</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Dep: ₹1,500</span>
                                    </div>
                                    <RentButton
                                        className="w-full h-10 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-1 transition-colors"
                                        defaultText="Rent Item"
                                        icon="add_circle"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 5: HOW GEAR RENTAL WORKS (4-STEP PROCESS) */}
                    <section className="w-full px-gutter max-w-7xl mx-auto pt-space-xl">
                        <div className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl">
                            <div className="text-center max-w-2xl mx-auto mb-space-xl">
                                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Hassle-Free Logistics</span>
                                <h2 className="font-headline-lg text-headline-lg text-primary mt-1">How Gear Rental Works at Manipur Tourism</h2>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                    Coordinated through state trail checkpoints to ensure you pack light, stay safe, and preserve Manipur's pristine ecologies.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg relative">
                                {/* Step 1 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-title-lg text-title-lg mb-space-md shadow-md">
                                        1
                                    </div>
                                    <h3 className="font-title-md text-title-md text-primary mb-space-xs">Book Online & Reserve</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Choose your gear or curated trail bundles, select dates, and lock reservation with an upfront transparent refundable security deposit.
                                    </p>
                                </div>
                                {/* Step 2 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center font-title-lg text-title-lg mb-space-md shadow-sm">
                                        2
                                    </div>
                                    <h3 className="font-title-md text-title-md text-primary mb-space-xs">Trailhead or Airport Handover</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Collect sealed, sanitized, and certified gear at Bir Tikendrajit Airport Bay 2, Senapati, Ukhrul, or Sendra facilitation depots.
                                    </p>
                                </div>
                                {/* Step 3 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-surface-container-lowest text-secondary flex items-center justify-center font-title-lg text-title-lg mb-space-md shadow-sm">
                                        3
                                    </div>
                                    <h3 className="font-title-md text-title-md text-primary mb-space-xs">Explore Sanaleibak Safely</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Trek protected sanctuaries with IMF safety-approved gear, supported by our 24/7 centralized adventure SOS command.
                                    </p>
                                </div>
                                {/* Step 4 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center font-title-lg text-title-lg mb-space-md shadow-sm">
                                        4
                                    </div>
                                    <h3 className="font-title-md text-title-md text-primary mb-space-xs">Drop-Off & Instant Refund</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Return gear at any network hub across Manipur. Automated barcode check initiates instant security deposit refund to your UPI or card.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 6: SAFETY & SANITIZATION AUDIT PROTOCOL & DEPOT LOCATOR */}
                    <section className="w-full px-gutter max-w-7xl mx-auto pt-space-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                            {/* Left Column */}
                            <div className="lg:col-span-7 flex flex-col gap-space-md">
                                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                                    <div className="flex items-center gap-space-xs mb-space-xs">
                                        <span className="material-symbols-outlined text-primary text-xl">health_and_safety</span>
                                        <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Directorate Safety Standard</span>
                                    </div>
                                    <h2 className="font-headline-sm text-headline-sm text-primary mb-space-sm">Institutional Gear Sanitization & Stress Protocol</h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                                        Every piece of equipment passing through the Directorate depot undergoes a 4-tier safety audit prior to dispatch, ensuring absolute reliability in isolated mountainous terrain.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                        <div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-sm">
                                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">cleaning_services</span>
                                            <div>
                                                <h4 className="font-title-sm text-title-sm text-primary">UV-C Tent Disinfection</h4>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Shelters receive 30-minute chamber UV-C irradiation and eco-antimicrobial wash.</p>
                                            </div>
                                        </div>
                                        <div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-sm">
                                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">precision_manufacturing</span>
                                            <div>
                                                <h4 className="font-title-sm text-title-sm text-primary">Rope Tensile & Sheath Log</h4>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Climbing lines inspected centimeter-by-centimeter with calibrated optical scanners.</p>
                                            </div>
                                        </div>
                                        <div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-sm">
                                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">battery_charging_full</span>
                                            <div>
                                                <h4 className="font-title-sm text-title-sm text-primary">Battery Health & SOS Sync</h4>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Lithium battery capacity tested &gt;95%; satellite transmitters synced with state rescue registry.</p>
                                            </div>
                                        </div>
                                        <div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-sm">
                                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">dry_cleaning</span>
                                            <div>
                                                <h4 className="font-title-sm text-title-sm text-primary">Thermal Steam Down Care</h4>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Sleeping bags washed with organic Nikwax down wash and sanitized at 65°C dry cycle.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary text-on-primary rounded-xl p-space-md md:p-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md shadow-md">
                                    <div className="flex items-center gap-space-md">
                                        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-on-secondary">
                                            <span className="material-symbols-outlined text-2xl">support_agent</span>
                                        </div>
                                        <div>
                                            <h3 className="font-title-md text-title-md text-on-primary">Trailside Gear Emergency & Swaps</h3>
                                            <p className="font-body-sm text-body-sm text-on-primary-container">Encountered equipment issues? We arrange on-trail replacement via regional outposts.</p>
                                        </div>
                                    </div>
                                    <a className="bg-surface-container-lowest text-primary px-space-md py-space-xs rounded-lg font-title-sm text-title-sm whitespace-nowrap hover:bg-surface-container-low transition-colors shadow-sm" href="tel:18003453885">
                                        Call 1800-345-3885
                                    </a>
                                </div>
                            </div>

                            {/* Right Column: Trailhead Depots & Map Interactive Area */}
                            <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-space-sm">
                                        <h3 className="font-headline-sm text-headline-sm text-primary">Regional Network Depots</h3>
                                        <span className="bg-surface-container-low text-primary font-label-sm text-label-sm px-2 py-1 rounded">5 Stations</span>
                                    </div>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                                        Pick up in Imphal and drop off at Ukhrul or Senapati without cross-haul fees.
                                    </p>

                                    {/* Interactive Depot List */}
                                    <div className="flex flex-col gap-space-xs mb-space-md">
                                        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start justify-between cursor-pointer hover:bg-surface-container transition-colors">
                                            <div className="flex items-start gap-space-xs">
                                                <span className="material-symbols-outlined text-primary text-base mt-0.5">location_on</span>
                                                <div>
                                                    <h4 className="font-title-sm text-title-sm text-primary">Imphal Central Facilitation Hub</h4>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Directorate of Tourism, North AOC</p>
                                                </div>
                                            </div>
                                            <span className="font-label-sm text-label-sm text-secondary font-semibold">06:00 - 21:00</span>
                                        </div>
                                        <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-start justify-between cursor-pointer hover:bg-surface-container-low transition-colors">
                                            <div className="flex items-start gap-space-xs">
                                                <span className="material-symbols-outlined text-outline text-base mt-0.5">location_on</span>
                                                <div>
                                                    <h4 className="font-title-sm text-title-sm text-on-surface">Senapati Trailhead Outpost</h4>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Dzükou Valley Entry Checkpoint</p>
                                                </div>
                                            </div>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant">05:30 - 19:00</span>
                                        </div>
                                        <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-start justify-between cursor-pointer hover:bg-surface-container-low transition-colors">
                                            <div className="flex items-start gap-space-xs">
                                                <span className="material-symbols-outlined text-outline text-base mt-0.5">location_on</span>
                                                <div>
                                                    <h4 className="font-title-sm text-title-sm text-on-surface">Ukhrul Shirui Base Depot</h4>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Shirui Village Entry Gate, NH 202</p>
                                                </div>
                                            </div>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant">06:00 - 18:30</span>
                                        </div>
                                        <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-start justify-between cursor-pointer hover:bg-surface-container-low transition-colors">
                                            <div className="flex items-start gap-space-xs">
                                                <span className="material-symbols-outlined text-outline text-base mt-0.5">location_on</span>
                                                <div>
                                                    <h4 className="font-title-sm text-title-sm text-on-surface">Loktak Sendra Island Depot</h4>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Sendra Resort Eco-Jetty, Moirang</p>
                                                </div>
                                            </div>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant">07:00 - 20:00</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Static Map View Card */}
                                <div
                                    className="w-full h-44 rounded-lg relative overflow-hidden bg-surface-container flex items-end p-space-sm bg-cover bg-center"
                                    data-location="Imphal, Manipur, India"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWGW3ulAnMAaT4E4Xn5mZMWwsNZiTTETEo5gxueknwqqx9g0cx8B_q0sx0tWbaQx2HgmiX2Lc23ydHPRmjghxoTeY1FgigSTBUU5r9WyokMvi0P7NIM_kU_PuBHIlf4rmdF2q_Rt6MvF9y4vlFflPVgdSSIxt_d3GIvzV28DJaX2ptHFt83YiQKFyrv-oWH8PplmqqPzWBGwx4TZOC_LnnrJu3gUuKKKWf0C8i8Nf-y3-NR7ZMKAg1Ag')" }}>
                                    <div className="bg-surface-container-lowest/90 backdrop-blur px-space-sm py-1.5 rounded text-on-surface text-label-sm font-label-sm flex items-center justify-between w-full shadow-sm">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-primary text-sm">map</span> GPS Trailhead Network View
                                        </span>
                                        <span className="text-primary font-bold">5 Active Hubs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 7: RENTAL POLICIES & TRANSPARENT DEPOSIT BREAKDOWN */}
                    <section className="w-full px-gutter max-w-7xl mx-auto pt-space-xl pb-space-lg">
                        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                            <div className="flex items-center gap-space-xs mb-space-sm">
                                <span className="material-symbols-outlined text-primary text-xl">policy</span>
                                <h3 className="font-headline-sm text-headline-sm text-primary">Transparent Deposit & Eco-Preservation Guidelines</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg pt-space-xs">
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-title-sm text-title-sm text-primary flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-secondary text-base">savings</span> Instant UPI / Card Release
                                    </h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Deposits are held via a pre-authorization hold and automatically reversed upon scanning gear back at any depot within 60 minutes.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-title-sm text-title-sm text-primary flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-primary text-base">verified</span> Normal Wear & Tear Covered
                                    </h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Minor scratches, soil dust, and damp mountain fog residue are completely covered with no deductions under government eco-tourism rules.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-title-sm text-title-sm text-primary flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-secondary text-base">forest</span> Leave No Trace Plastic Ban
                                    </h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Disposable single-use polythene wrappers are prohibited. Gear packages are delivered in reusable handcrafted Kauna reed carriers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}