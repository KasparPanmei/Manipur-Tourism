import React, { useState } from 'react';
import Telemetry from '../components/home/TelemetryBar';
const stories = {
    phanek: {
        title: "Phanek Mayek Naibi Heritage",
        text: "The Phanek Mayek Naibi has been worn by Meitei royal women and commoners alike for over a millennium. The bottom border features the distinctive 'Ngangou' (fish fin and lotus blossom) embroidery, which ancient tradition dictated was created strictly on loin looms by hand. Each band tells stories of Clan totems (Salais) of ancient Manipur."
    },
    moirang: {
        title: "Moirang Phee & Royal Lore",
        text: "Woven in the historic lakeside kingdom of Moirang, famous for the legendary romance of Khamba and Thoibi. The Yarung motif is not merely aesthetic—it is a sacred geomantic barrier of stylized serpent teeth reflecting the power of Supreme Lord Pakhangba."
    },
    shaphee: {
        title: "Shaphee Lanphee Warrior Investiture",
        text: "A sacred textile representing victory and cosmic balance. Traditionally, kings presented the Shaphee Lanphee to Naga and Meitei warriors who demonstrated unparalleled valor in protecting the Sanaleibak realm. The embroidery depicts the sun, moon, and mythical animal deities."
    },
    tangkhul: {
        title: "Tangkhul Naga Luirim Shawl",
        text: "Handwoven in the scenic pine-clad heights of Ukhrul. The bold red and white stripes of the Tangkhul Haorao shawl symbolize courage and clan brotherhood. Traditionally spun from wild indigenous mountain cotton and colored with tree bark extracts."
    },
    longpi: {
        title: "Longpi (Nungbi) Serpentine Pottery",
        text: "Unlike conventional clay pottery, Longpi ware is crafted without a potter's wheel. Master potters mix weathered rock and serpentinite clay gathered exclusively from high hill streams of Nungbi. Finished pieces are polished using delicate local leaves that yield a lustrous, obsidian-like sheen."
    },
    innaphi: {
        title: "Gossamer Innaphi Weaving Tradition",
        text: "The Innaphi is celebrated for its whisper-light gossamer texture. Traditionally woven from the finest mulberry and Eri silks, it allows breathability during warm monsoon ceremonies while radiating aristocratic elegance with golden Zari floral inlays."
    },
    kauna: {
        title: "Kauna Wetland Eco-Weaving",
        text: "Kauna is a indigenous reed that grows abundantly in the wetlands of Loktak Lake. Harvested by artisan women, the reeds are sun-dried, sorted by stem thickness, and naturally smoke-cured to give them flexibility, tensile resilience, and organic water resistance without harsh synthetic chemicals."
    },
    enaphee: {
        title: "Natural Plant Pigment Dyeing",
        text: "Kakching and Wangoi weavers continue centuries-old botanic recipes. Brilliant yellows emerge from ground turmeric roots, deep terracottas from madder bark, and lush forest greens from indigenous indigo blends—completely free of synthetic chemical pollutants."
    }
};

const categoriesList = [
    { id: 'all', label: 'All Cultural Crafts (48)' },
    { id: 'attire', label: 'Traditional Attire & Phee (14)' },
    { id: 'gi', label: 'GI Protected Weaves (6)' },
    { id: 'tribal', label: 'Hill Tribe Shawls & Wraps (8)' },
    { id: 'pottery', label: 'Longpi Black Stone Pottery (7)' },
    { id: 'kauna', label: 'Kauna Water Reed Decor (8)' },
    { id: 'jewelry', label: 'Ceremonial Jewelry & Brass (5)' },
];

const quickSearches = [
    'Phanek Mayek Naibi',
    'Moirang Phee',
    'Shaphee Lanphee',
    'Longpi Hamlei',
    'Kauna Basketry',
    'Eri Silk Shawl'
];

const CultureHeritageItems = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [eduTab, setEduTab] = useState('motif');
    const [hologramInput, setHologramInput] = useState('');
    const [verifyStatus, setVerifyStatus] = useState(null);
    const [toast, setToast] = useState({ show: false, title: '', sub: '' });
    const [modal, setModal] = useState({ show: false, key: null });

    const matches = (categories, text) => {
        const query = searchTerm.toLowerCase().trim();
        const matchSearch = query === '' || text.toLowerCase().includes(query);
        const matchCat = category === 'all' || categories.includes(category);
        return matchSearch && matchCat;
    };

    const verifyHologram = () => {
        const val = hologramInput.trim();
        if (val.length === 0) {
            setVerifyStatus('empty');
        } else {
            setVerifyStatus('valid');
        }
    };

    const addToCart = (title, price) => {
        const authToken = localStorage.getItem("authToken");
        const authUser = localStorage.getItem("authUser");

        // User is NOT logged in
        if (!authToken || !authUser) {
            // Save the item temporarily so it can be added
            // automatically after successful login.
            localStorage.setItem(
                "pendingCartItem",
                JSON.stringify({
                    title,
                    price
                })
            );

            // Tell Navbar to open the login/account modal
            window.dispatchEvent(
                new CustomEvent("open-account-modal", {
                    detail: {
                        view: "choose"
                    }
                })
            );

            return;
        }

        // User IS logged in
        addAuthenticatedItemToCart(title, price);
    };
    const addAuthenticatedItemToCart = async (title, price) => {
        try {
            const authToken = localStorage.getItem("authToken");

            if (!authToken) {
                return;
            }

            // We will connect this to your actual cart API here.
            // Do not show "Added" until the backend confirms success.

            setToast({
                show: true,
                title: `${title} Added`,
                sub: `₹${price.toLocaleString()} allocated directly to weaver`
            });

            setTimeout(() => {
                setToast(prev => ({
                    ...prev,
                    show: false
                }));
            }, 3200);

        } catch (error) {
            console.error("Add to cart error:", error);

            setToast({
                show: true,
                title: "Unable to Add",
                sub: "Please try again."
            });

            setTimeout(() => {
                setToast(prev => ({
                    ...prev,
                    show: false
                }));
            }, 3200);
        }
    };

    const quickViewStory = (key) => setModal({ show: true, key });
    const closeStoryModal = () => setModal({ show: false, key: null });

    return (
        <div className="bg-surface font-body-md text-on-surface antialiased w-full">
            <Telemetry />

            <div className="w-full pt-4 bg-surface min-h-[calc(100vh-28rem)]">
                <div className="flex flex-col w-full">
                    {/* Subtle Ambient Glow */}
                    <div className="relative w-full overflow-hidden">
                        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary-fixed/30 via-secondary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

                        {/* Section 1: Hero & Heritage Banner */}
                        <section className="max-w-[1360px] mx-auto px-margin pt-space-lg pb-space-xl">
                            {/* Breadcrumb & Top Indicator */}
                            <div className="flex items-center gap-space-xs text-label-md font-label-md text-on-surface-variant mb-space-md">
                                <span className="text-primary font-bold tracking-wider uppercase">Directorate of Tourism</span>
                                <span className="opacity-40">/</span>
                                <span>Cultural Commerce</span>
                                <span className="opacity-40">/</span>
                                <span className="text-secondary font-semibold">GI Certified Handlooms & Crafts</span>
                            </div>

                            {/* Main Headline Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-end">
                                <div className="lg:col-span-8 flex flex-col gap-space-md">
                                    <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm w-fit uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
                                        Direct From Weaver Collectives & Ima Keithel
                                    </div>
                                    <h1 className="font-display-lg text-display-lg text-primary tracking-tight leading-[1.08]">
                                        Handwoven Legacy & Sacred Crafts of <span className="italic font-display-lg text-secondary">Sanaleibak</span>
                                    </h1>
                                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                                        Directly sourced from the maternal weaver guilds of <strong className="text-on-surface font-semibold">Ima Keithel</strong> and master hill artisans. Explore GI-tagged ceremonial weaves, royal silk wraps, Longpi black serpentine cookware, and sustainable Kauna reeds with tamper-proof blockchain authenticity certificates.
                                    </p>
                                </div>

                                {/* Metric Stat Strip */}
                                <div className="lg:col-span-4 flex flex-col gap-3 p-space-lg rounded-xl bg-surface-container-low shadow-sm">
                                    <div className="flex items-center justify-between pb-3 border-b-0">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-[22px]">diversity_3</span>
                                            <span className="font-title-sm text-title-sm text-on-surface">Registered Mothers</span>
                                        </div>
                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">4,120+</span>
                                    </div>
                                    <div className="flex items-center justify-between pb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
                                            <span className="font-title-sm text-title-sm text-on-surface">Protected GI Crafts</span>
                                        </div>
                                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">6 Certified</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-tertiary text-[22px]">savings</span>
                                            <span className="font-title-sm text-title-sm text-on-surface">Direct Remittance</span>
                                        </div>
                                        <span className="font-headline-sm text-headline-sm text-tertiary font-bold">100.0%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Key Trust Badges Bar */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md mt-space-lg pt-space-lg">
                                <div className="flex items-center gap-space-sm p-space-md rounded-lg bg-surface-container-lowest shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                                        <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-title-sm text-title-sm text-on-surface leading-tight">GI Tag Protected</span>
                                        <span className="font-body-sm text-[12px] text-on-surface-variant">Govt of India Patent Registry</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-space-sm p-space-md rounded-lg bg-surface-container-lowest shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-[22px]">payments</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-title-sm text-title-sm text-on-surface leading-tight">100% Direct Remittance</span>
                                        <span className="font-body-sm text-[12px] text-on-surface-variant">Zero intermediary deduction</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-space-sm p-space-md rounded-lg bg-surface-container-lowest shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                                        <span className="material-symbols-outlined text-[22px]">fact_check</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-title-sm text-title-sm text-on-surface leading-tight">Govt Handloom Mark</span>
                                        <span className="font-body-sm text-[12px] text-on-surface-variant">Silk & Handloom Certified</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-space-sm p-space-md rounded-lg bg-surface-container-lowest shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-[22px]">flight_takeoff</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-title-sm text-title-sm text-on-surface leading-tight">Worldwide Insured</span>
                                        <span className="font-body-sm text-[12px] text-on-surface-variant">Tracked air courier dispatch</span>
                                    </div>
                                </div>
                            </div>

                            {/* Search & Popular Tag Interactive Bar */}
                            <div className="mt-space-lg p-space-md rounded-xl bg-surface-container shadow-sm flex flex-col gap-space-sm">
                                <div className="flex flex-col md:flex-row items-center gap-space-sm">
                                    <div className="relative w-full flex-1">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[22px]">search</span>
                                        <input
                                            className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg outline-none focus:ring-2 focus:ring-primary shadow-sm placeholder:text-outline"
                                            id="craft-search"
                                            placeholder="Search by weave name, tribe, GI craft, or district..."
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 w-full md:w-auto">
                                        <select className="h-12 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-title-sm text-title-sm outline-none shadow-sm cursor-pointer hover:bg-surface-container-high transition-colors" defaultValue="all">
                                            <option value="all">District Origin (All)</option>
                                            <option value="imphal-west">Imphal West — Ima Keithel</option>
                                            <option value="ukhrul">Ukhrul — Nungbi Stonecraft</option>
                                            <option value="bishnupur">Bishnupur — Moirang Handloom</option>
                                            <option value="churachandpur">Churachandpur — Tribal Weaves</option>
                                            <option value="tamenglong">Tamenglong — Hill Cotton Guilds</option>
                                        </select>
                                        <button className="h-12 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm flex items-center justify-center gap-2 shadow-sm transition-all shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">manage_search</span>
                                            <span>Find Crafts</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Popular Searches:</span>
                                    {quickSearches.map(term => (
                                        <button
                                            key={term}
                                            className="px-2.5 py-1 rounded bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
                                            onClick={() => setSearchTerm(term)}
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Interactive Filter & Category System */}
                        <section className="max-w-[1360px] mx-auto px-margin pb-space-lg">
                            <div className="flex flex-col gap-space-md">
                                {/* Category Filter Pills */}
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="category-pills">
                                    {categoriesList.map(cat => (
                                        <button
                                            key={cat.id}
                                            className={`px-4 py-2 rounded-lg font-title-sm text-title-sm whitespace-nowrap transition-colors ${category === cat.id ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low hover:bg-surface-container text-on-surface'}`}
                                            onClick={() => setCategory(cat.id)}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Filter Sub-bar */}
                                <div className="flex flex-wrap items-center justify-between gap-space-md p-space-sm px-space-md bg-surface-container-low rounded-lg">
                                    <div className="flex flex-wrap items-center gap-space-md">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Certification:</span>
                                        <label className="flex items-center gap-1.5 cursor-pointer font-body-sm text-body-sm text-on-surface">
                                            <input defaultChecked className="w-4 h-4 accent-primary rounded cursor-pointer" type="checkbox" />
                                            <span>GI Tagged</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer font-body-sm text-body-sm text-on-surface">
                                            <input defaultChecked className="w-4 h-4 accent-primary rounded cursor-pointer" type="checkbox" />
                                            <span>Handloom Mark</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer font-body-sm text-body-sm text-on-surface">
                                            <input className="w-4 h-4 accent-primary rounded cursor-pointer" type="checkbox" />
                                            <span>Silk Mark India</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer font-body-sm text-body-sm text-on-surface">
                                            <input className="w-4 h-4 accent-primary rounded cursor-pointer" type="checkbox" />
                                            <span>Eco-Organic Dye</span>
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-space-sm">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sort by:</span>
                                        <select className="h-9 px-3 bg-surface-container-lowest text-on-surface font-title-sm text-title-sm rounded-lg outline-none shadow-sm cursor-pointer" defaultValue="Curated / Featured">
                                            <option>Curated / Featured</option>
                                            <option>Artisan Direct Price: Low to High</option>
                                            <option>Artisan Direct Price: High to Low</option>
                                            <option>Collector Popularity</option>
                                            <option>GI Heritage Chronology</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Curated Cultural Product Grid */}
                        <section className="max-w-[1360px] mx-auto px-margin pb-space-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg" id="product-catalog-grid">

                                {/* Product 1: Phanek Mayek Naibi */}
                                {matches('attire gi', 'Authentic Phanek Mayek Naibi Traditional Attire Ceremonial Memcha Devi Wangoi Imphal West Ima Keithel Guild') && (
                                    <article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Rich traditional Meitei handwoven Phanek Mayek Naibi silk-cotton sarong wrap with intricate Ngangou fish fin borders and horizontal sacred striped patterns in indigo and terracotta red. Studio display on textured wooden loom bench, soft natural directional morning sunlight highlighting textile weave density." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBw3tfUmoq27g18F4Vqf9MMV3FGNxg17O-5qHRyXo2sRgwweY6_v1Fq5bHU4bofPEnMplQKADn5YV2TOFJ_LIZ8-CviYtb4vteymmhIxsG96-7lyTMyQ5FIAofolsYfPZv1ZjD-KxO42PusCH10SiS_cGCnJj6IOfgWvLErkB7niTdtUPEvj_HN5eeRt3U1oyJAA07RZ9UtA1FMKSHk0YOEbhUftUlxRQCq1KENNibgF7gput0nwdLPA" />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px] text-tertiary">verified</span> GI Tagged • Authenticated
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm shadow-sm">
                                                    Ima Keithel Guild
                                                </span>
                                            </div>
                                            <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface flex items-center justify-center hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-label-sm font-label-sm">
                                                <span className="text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Wangoi, Imphal West
                                                </span>
                                                <span className="text-primary font-semibold">14 Days Loom Time</span>
                                            </div>
                                        </div>
                                        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Traditional Attire / Ceremonial</span>
                                                <h3 className="font-headline-sm text-title-lg text-primary group-hover:text-secondary transition-colors">
                                                    Authentic Phanek Mayek Naibi
                                                </h3>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                                    Handwoven on traditional loin loom with lotus and fish-fin (Ngangou) motifs. Pure handspun cotton-silk blend.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-space-sm pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Artisan Direct Remittance</span>
                                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹4,850</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-label-sm text-label-sm text-secondary block font-semibold">Memcha Devi</span>
                                                        <span className="font-body-sm text-[11px] text-on-surface-variant">Master Weaver</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="px-2 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors text-center" onClick={() => quickViewStory('phanek')}>
                                                        Artisan Story
                                                    </button>
                                                    <button className="px-2 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-1" onClick={() => addToCart('Authentic Phanek Mayek Naibi', 4850)}>
                                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* Product 2: Moirang Phee Royal Shawl */}
                                {matches('gi attire', 'Moirang Phee Royal Shawl Temple Yarung Motif Loktak Handloom Cluster Moirang Women SHG') && (
                                    <article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Exquisite gossamer cotton Moirang Phee dupatta wrap floating gently in air against deep forest green backdrop. Sacred Yarung pyramidal temple teeth embroidered along the borders in gold and jade green silk threads. Soft studio museum grade lighting highlighting sheer transparency." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6SmuDnnKlpwILVHqu4QhCV5UCgIlRyK-D6KShLZuGxnbdKXy6T_u-jVAZvT-PAlx490T7NbEjeieAlCmZ9zqOQu5ikfV4VeO3DdHh96VOCKtjjQnYud9MUAzEqtJRJeDHHaT44mMgC9yTTHj23anFtO1Rl2hwg38ikp9jW-Om9dp3YaRWyO9Brgv5dV_Ey0xINC94xi7spccmXf860Lcja1rwEqsA4mq6aM3Bes604msGTFcdflfueQ" />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px] text-tertiary">military_tech</span> GI Cert. No. 372
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                                                    100% Fine Mulberry Silk
                                                </span>
                                            </div>
                                            <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface flex items-center justify-center hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-label-sm font-label-sm">
                                                <span className="text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Moirang, Loktak Basin
                                                </span>
                                                <span className="text-secondary font-semibold">Temple Yarung Motif</span>
                                            </div>
                                        </div>
                                        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">GI Protected Weaves</span>
                                                <h3 className="font-headline-sm text-title-lg text-primary group-hover:text-secondary transition-colors">
                                                    Moirang Phee Royal Shawl
                                                </h3>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                                    Famous temple tooth pyramidal motif symbolizing Pakhangba deity. Ethereal translucent cotton-silk body.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-space-sm pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Artisan Direct Remittance</span>
                                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹6,200</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-label-sm text-label-sm text-secondary block font-semibold">Loktak Handloom Cluster</span>
                                                        <span className="font-body-sm text-[11px] text-on-surface-variant">Moirang Women SHG</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="px-2 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors text-center" onClick={() => quickViewStory('moirang')}>
                                                        Motif Meaning
                                                    </button>
                                                    <button className="px-2 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-1" onClick={() => addToCart('Moirang Phee Royal Shawl', 6200)}>
                                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* Product 3: Shaphee Lanphee Warrior Shawl */}
                                {matches('gi attire', 'Shaphee Lanphee Warrior Shawl Ceremonial Royal Heritage Khongman Guild State Awardee Loom') && (
                                    <article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Dignified deep black handspun ceremonial shawl Shaphee Lanphee spread out flat, decorated with 10 sacred Meitei motifs: celestial moon, radiant sun, stylized elephant, swift horse, and royal mythical beasts hand-stitched in crimson, yellow, and emerald silk threads." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGwdfErXhT_Ld6WvncdpXTkiuatCUhaL2C5pDOsdZdixw9UWUM8DFFB4n1_ECJuZXa--9KAfj-4CaWlQFAI58QvGm_2qlCs25DPzHj8x9buHkDIKnH3UDMdmRgmI3meVISs_k7Mh49r0OjHEskSXTUyf-FDnDJQjlM8vxGqJ7AUgeq2KOsCAXNq--GDp2eedc8N1HDzKuN8S54Y9j0oxJOdqSZivABWW_VT6IiX9C6I8WbtU_lTdY56g" />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm shadow-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px]">shield</span> GI Tagged Masterpiece
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                                                    10 Sacred Cosmological Motifs
                                                </span>
                                            </div>
                                            <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface flex items-center justify-center hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-label-sm font-label-sm">
                                                <span className="text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Khongman, Imphal East
                                                </span>
                                                <span className="text-primary font-semibold">Heritage Conferred</span>
                                            </div>
                                        </div>
                                        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Ceremonial Royal Heritage</span>
                                                <h3 className="font-headline-sm text-title-lg text-primary group-hover:text-secondary transition-colors">
                                                    Shaphee Lanphee Warrior Shawl
                                                </h3>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                                    Historically conferred by Manipur Kings to brave warriors. Woven on black cotton base with cosmic planetary motifs.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-space-sm pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Artisan Direct Remittance</span>
                                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹8,900</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-label-sm text-label-sm text-secondary block font-semibold">Khongman Guild</span>
                                                        <span className="font-body-sm text-[11px] text-on-surface-variant">State Awardee Loom</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="px-2 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors text-center" onClick={() => quickViewStory('shaphee')}>
                                                        Motif Archive
                                                    </button>
                                                    <button className="px-2 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-1" onClick={() => addToCart('Shaphee Lanphee Warrior Shawl', 8900)}>
                                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* Product 4: Tangkhul Naga Shawl */}
                                {matches('tribal', 'Tangkhul Haorao Luirim Shawl Hill Tribe Shawls Ukhrul Collective Tangkhul Weavers') && (
                                    <article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Heavy organic wool Tangkhul Naga tribal wrap shawl (Haorao Luirim) showing bold geometric scarlet red, chalk white, and charcoal black striped patterns. Natural unbleached fringe ends resting against pine tree bark in Ukhrul hills." src="https://lh3.googleusercontent.com/aida-public/AB6AXuArrYNHuIN53q6iMvQTK_kOVX-RXcnhRO5uaXdH0l9JeljM8iAxjxzLrjVCTE20ceU4TXjG17LI3ADI5oqRXOaXBallpceTEMNYIp2HhnYAEihbrMLhneyxhMwIjxj2TKg68gjrG5vI3Nr6oEF9OoElXsHmTvAE4Fcwu4YT4CaSH8ov-vsI0qKsd6uecN3QG8FHfu2rhDecL5XW3O01I7eeSZaTqYGuEIJoiSTLkC-OgvLkRSUVUXnrVw" />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm shadow-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px]">landscape</span> Authentic Tangkhul Tribe
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                                                    Tree-Bark Organic Dyes
                                                </span>
                                            </div>
                                            <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface flex items-center justify-center hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-label-sm font-label-sm">
                                                <span className="text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Ukhrul Hill District
                                                </span>
                                                <span className="text-tertiary font-semibold">Winter Loin Loom</span>
                                            </div>
                                        </div>
                                        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Hill Tribe Shawls</span>
                                                <h3 className="font-headline-sm text-title-lg text-primary group-hover:text-secondary transition-colors">
                                                    Tangkhul Haorao & Luirim Shawl
                                                </h3>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                                    Bold scarlet, white, and obsidian geometric bands handspun from hill cotton. Dense thermal protection.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-space-sm pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Artisan Direct Remittance</span>
                                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹3,400</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-label-sm text-label-sm text-secondary block font-semibold">Ukhrul Collective</span>
                                                        <span className="font-body-sm text-[11px] text-on-surface-variant">Tangkhul Weavers</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="px-2 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors text-center" onClick={() => quickViewStory('tangkhul')}>
                                                        Tribal Origin
                                                    </button>
                                                    <button className="px-2 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-1" onClick={() => addToCart('Tangkhul Haorao & Luirim Shawl', 3400)}>
                                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* Product 5: Longpi Serpentine Stone Cooking Pot */}
                                {matches('pottery', 'Longpi Stone Cooking Pot Hamlei Black Stone Pottery Master Wungnaoshang Nungbi Potter Clan') && (
                                    <article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Matte black rustic Longpi Hamlei earthenware cooking pot handcrafted without a wheel, featuring natural golden cane woven handles and rounded polished lid. Placed on an earthy clay surface with organic ginger and fresh mountain herbs." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSsWIT63cGZJ2vofvvM8FiGnbjEoczTqQBZRead5kzTn5Fxh2ZXZqx8nCR0_HmZzL79hlg5vdkKgrpvd6BvBhO8VC1uFHdBZn6rVk1eciTfJHrLQT1FZWIM8Jx4g0zl2Ldbgk_cdNpbD8CGK8KhhST5rLM_iaY5475JRYdsonzj6Z1hymcjrdFFb24hnxOm5idZ9xYYGLFDJJncCMzzU8NWOehm7cypIdyImtwf4ydwpc6UPZD8H99zg" />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                <span className="px-2 py-0.5 rounded bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm shadow-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px] text-primary-fixed">diamond</span> 100% Lead-Free & Organic
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                                                    Open Flame & Oven Safe
                                                </span>
                                            </div>
                                            <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface flex items-center justify-center hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-label-sm font-label-sm">
                                                <span className="text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Nungbi (Longpi), Ukhrul
                                                </span>
                                                <span className="text-primary font-semibold">Serpentine & Weathered Rock</span>
                                            </div>
                                        </div>
                                        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Black Stone Pottery</span>
                                                <h3 className="font-headline-sm text-title-lg text-primary group-hover:text-secondary transition-colors">
                                                    Longpi Stone Cooking Pot (Hamlei)
                                                </h3>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                                    Hand-kneaded serpentine clay and crushed weathered rock. Polished with Chiron na leaf without ceramic glaze.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-space-sm pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Artisan Direct Remittance</span>
                                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹2,150</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-label-sm text-label-sm text-secondary block font-semibold">Master Wungnaoshang</span>
                                                        <span className="font-body-sm text-[11px] text-on-surface-variant">Nungbi Potter Clan</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="px-2 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors text-center" onClick={() => quickViewStory('longpi')}>
                                                        Care Guide
                                                    </button>
                                                    <button className="px-2 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-1" onClick={() => addToCart('Longpi Stone Cooking Pot (Hamlei)', 2150)}>
                                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* Product 6: Innaphi Ceremonial Veil Wrap */}
                                {matches('attire gi', 'Innaphi Ceremonial Veil Wrap Traditional Attire Meitei Formal Singjamei Silk Guild') && (
                                    <article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Delicate gossamer pale peach and champagne raw silk Innaphi veil drape, adorned with fine golden Zari floral border and airy transparent texture draped over a traditional wooden mannequin during a festive Meitei ceremony." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKmGx-3GHzW-GiI3E9HAFPZo53NhiBwAKEOfc-bsc4ExS5qVy9Kx2hWGE64Oi0PrrsgLqDv-XOTW_hoqKQqwp7aDr0tYeqPzHSSSl53xTGp9ychTzXS0HUYk2mXwYfvB6LdLkFTrfgkjjR8G0qRlhqx4WUdBdWpYqG9kHjPwwYhqLCdeWZZuTsczCNqVU4xingRhP-__9MSFp9RSutfu4BEboI8GdgvxEkJYTXTwjloNN4aCLqulOzQg" />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px] text-tertiary">check_circle</span> Silk Mark India Certified
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                                                    Lai Haraoba Ceremonial
                                                </span>
                                            </div>
                                            <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface flex items-center justify-center hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-label-sm font-label-sm">
                                                <span className="text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Singjamei, Imphal
                                                </span>
                                                <span className="text-primary font-semibold">Fine Gossamer Silk</span>
                                            </div>
                                        </div>
                                        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Traditional Attire / Meitei Formal</span>
                                                <h3 className="font-headline-sm text-title-lg text-primary group-hover:text-secondary transition-colors">
                                                    Innaphi Ceremonial Veil Wrap
                                                </h3>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                                    Gossamer sheer pastel weave accented with pure golden Zari borders. Traditional celebratory attire for sacred occasions.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-space-sm pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Artisan Direct Remittance</span>
                                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹5,400</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-label-sm text-label-sm text-secondary block font-semibold">Singjamei Silk Guild</span>
                                                        <span className="font-body-sm text-[11px] text-on-surface-variant">Meitei Guild Unit</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="px-2 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors text-center" onClick={() => quickViewStory('innaphi')}>
                                                        Draping Tutorial
                                                    </button>
                                                    <button className="px-2 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-1" onClick={() => addToCart('Innaphi Ceremonial Veil Wrap', 5400)}>
                                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* Product 7: Kauna Reed Tote & Planter Set */}
                                {matches('kauna', 'Kauna Reed Weekend Tote Planter Decor Kumbi SHG Marsh Artisan Unit') && (
                                    <article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Handwoven Kauna water reed tote bag and matching cylindrical indoor planter basket on warm earthen veranda tiles. Smooth natural honey-toned woven reeds, leather shoulder straps, soft golden sunset glow highlighting the tight weave density." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBId0DfmTCOxQ6WbSzQnlkEAUJ0Zcz-sZXmVT-j81fCqTWc-n2ig5oPjKoCmKNLIae-H4dh7F7iUU0oFRzMN5XP6J5WmfG9MNv7DdgGUPAqJZpf64ayoy93GBsrv4O28dc0KnHBJ7RLd9KFwbuaApiXbqwq71Aw3JtF9NWlhr3J342e3w5Bu-QCgF_NNkByX8-YR-z2AZYhPe3CVlOBONUKeF8riRTnfpLctY7HX_A-2POLWyzmTr5Faw" />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm shadow-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px] text-primary">eco</span> Eco-Friendly Wetland Craft
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                                                    Naturally Smoke-Cured
                                                </span>
                                            </div>
                                            <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface flex items-center justify-center hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-label-sm font-label-sm">
                                                <span className="text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Kumbi, Loktak Fringe
                                                </span>
                                                <span className="text-primary font-semibold">100% Biodegradable</span>
                                            </div>
                                        </div>
                                        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Kauna Reed Decor</span>
                                                <h3 className="font-headline-sm text-title-lg text-primary group-hover:text-secondary transition-colors">
                                                    Kauna Reed Weekend Tote & Planter
                                                </h3>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                                    Harvested from organic Loktak marshes. Treated with smoke curing for natural moisture & mildew resistance.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-space-sm pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Artisan Direct Remittance</span>
                                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹1,650</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-label-sm text-label-sm text-secondary block font-semibold">Kumbi Kauna SHG</span>
                                                        <span className="font-body-sm text-[11px] text-on-surface-variant">Marsh Artisan Unit</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="px-2 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors text-center" onClick={() => quickViewStory('kauna')}>
                                                        Eco Story
                                                    </button>
                                                    <button className="px-2 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-1" onClick={() => addToCart('Kauna Reed Weekend Tote & Planter', 1650)}>
                                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* Product 8: Enaphee Khwangchet & Silk Stole */}
                                {matches('attire', 'Enaphee Khwangchet Silk Stole Set Traditional Weaves Kakching Mission Eco-Weaving Guild') && (
                                    <article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                                        <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Traditional Meitei Enaphee Khwangchet ceremonial sash woven with golden turmeric and madder vegetable plant dyes, showcasing diamond lozenge geometric borders. Beautifully folded alongside brass singing bowl and seasonal wild orchids." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfPekDxrpxi4NZl_WnKLSsBJKrIABunXBU6FELfHQHzlYDOqbXyZM5pnbE_31mWga0fMCorWmlgzWaQX4PZIWIV5jk5Timkhu7oz-udWOefmwZwTaCUTwrqCep-dyJHylajj0JX7XgzbsRMUjq6vIXonz_fTPg1fMcMYue5ezPYYkuQvriBvJJSHMTYum2Ah_v8dFiXparT9LJ-wK1YujBObW0vLiKZX9VU5NFTZ-K6hbVx5Vx3X7zBw" />
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[13px] text-tertiary">spa</span> Natural Vegetable Dye
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                                                    Wild Madder & Turmeric
                                                </span>
                                            </div>
                                            <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface flex items-center justify-center hover:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-label-sm font-label-sm">
                                                <span className="text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span> Kakching District
                                                </span>
                                                <span className="text-secondary font-semibold">Waist Sash & Stole</span>
                                            </div>
                                        </div>
                                        <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Traditional Weaves</span>
                                                <h3 className="font-headline-sm text-title-lg text-primary group-hover:text-secondary transition-colors">
                                                    Enaphee Khwangchet Silk Stole Set
                                                </h3>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                                    Handloomed waist sash and ceremonial wrap dyed with indigenous wild madder roots and mountain turmeric.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-space-sm pt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Artisan Direct Remittance</span>
                                                        <span className="font-headline-sm text-headline-sm text-primary font-bold">₹2,800</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-label-sm text-label-sm text-secondary block font-semibold">Kakching Mission</span>
                                                        <span className="font-body-sm text-[11px] text-on-surface-variant">Eco-Weaving Guild</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button className="px-2 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors text-center" onClick={() => quickViewStory('enaphee')}>
                                                        Color Provenance
                                                    </button>
                                                    <button className="px-2 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-1" onClick={() => addToCart('Enaphee Khwangchet Silk Stole Set', 2800)}>
                                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )}

                            </div>
                        </section>

                        {/* Section 4: Spotlight Section — Voices of Ima Keithel */}
                        <section className="max-w-[1360px] mx-auto px-margin pb-space-xl">
                            <div className="bg-primary text-on-primary rounded-xl overflow-hidden shadow-xl">
                                <div className="grid grid-cols-1 lg:grid-cols-12">
                                    {/* Visual & Photographic Side */}
                                    <div className="lg:col-span-6 relative min-h-[440px] bg-surface-container">
                                        <img className="w-full h-full object-cover" data-alt="Atmospheric documentary portrait of an elder Meitei artisan mother seated proudly at Ima Keithel Mothers Market in Imphal, surrounded by rich stacks of handwoven Moirang Phee shawls, ceremonial textiles, and handspun threads in gentle morning ambient market light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc6RUJBr2TE0maKFqHzSC1YwLx3ZRGTu83s9AvKR3ErXHh071ghIOqpkdxYmbXGVAYPb_GSYsKNd5qB9vArNAXFLE_FoqiX0EuiUTCgQpPWqgoVHiT98AJhHOcrnaneQDJRdt1EeunFoqV4GhOUcu_LZBhF4E-J6XxMG05Sz-a9V3676SAOk4kgAyhv1NiGiOUojMdv_g7c6bhLWgrRRmIPsVfWFUZqjy21OzLxpeabhH02pwd16NcDQ" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent lg:hidden"></div>
                                        <div className="absolute bottom-4 left-4 right-4 p-space-md rounded-lg bg-primary/80 backdrop-blur-md flex items-center gap-space-sm text-on-primary">
                                            <span className="material-symbols-outlined text-secondary-fixed text-[32px] shrink-0">history_edu</span>
                                            <div className="flex flex-col">
                                                <span className="font-title-sm text-title-sm">500+ Years of Matriarchal Commerce</span>
                                                <span className="font-body-sm text-[12px] opacity-80">World's only 100% all-women operated mercantile institution founded in 1533 CE</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Editorial & Transparency Side */}
                                    <div className="lg:col-span-6 p-space-lg lg:p-space-xl flex flex-col justify-between gap-space-md">
                                        <div className="flex flex-col gap-space-sm">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm w-fit uppercase tracking-widest">
                                                <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
                                                Artisan Economic Justice
                                            </div>
                                            <h2 className="font-headline-lg text-headline-lg text-on-primary leading-tight">
                                                The Mothers' Market: Voices of Ima Keithel
                                            </h2>
                                            <blockquote className="font-headline-sm text-title-lg italic text-primary-fixed-dim leading-relaxed">
                                                "When you drape a Moirang Phee or wear a Phanek Mayek Naibi, you wrap yourself in five centuries of Meitei mothers' fortitude, prayers, and pride."
                                            </blockquote>
                                            <p className="font-body-md text-body-md text-surface-container-high opacity-90">
                                                Every craft on this portal bypasses commercial middlemen. The Directorate of Tourism and the Directorate of Handlooms directly credit certified weaver bank ledgers under automated public oversight.
                                            </p>
                                        </div>

                                        {/* Transparent Revenue Breakdown Bar Visual */}
                                        <div className="p-space-md rounded-lg bg-primary-container text-on-primary flex flex-col gap-2">
                                            <div className="flex items-center justify-between text-label-sm font-label-sm uppercase tracking-wider">
                                                <span>Fair-Trade Revenue Allocation Model</span>
                                                <span className="text-primary-fixed font-bold">100% Audit Cleared</span>
                                            </div>

                                            {/* SVG Visual Breakdown Bar */}
                                            <div className="w-full h-4 bg-surface/20 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-primary-fixed transition-all" style={{ width: '85%' }} title="85% Direct to Weaver"></div>
                                                <div className="h-full bg-secondary-container transition-all" style={{ width: '10%' }} title="10% Raw Fiber Guild Subsidy"></div>
                                                <div className="h-full bg-tertiary-fixed transition-all" style={{ width: '5%' }} title="5% Insured Eco-Packaging"></div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 pt-1 text-label-sm font-label-sm">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed"></span>
                                                    <span>85% Weaver Remittance</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                                                    <span>10% Fiber Guild Pool</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed"></span>
                                                    <span>5% Eco Kauna Pack</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Link CTA */}
                                        <div className="flex flex-wrap items-center gap-space-md pt-2">
                                            <a className="px-space-lg py-3 rounded-lg bg-surface-container-lowest text-primary font-title-sm text-title-sm hover:bg-surface-container-high transition-colors flex items-center gap-2 shadow-sm" href="#">
                                                <span className="material-symbols-outlined text-[20px]">smart_display</span>
                                                <span>Watch: "Meet the Weavers of Sanaleibak"</span>
                                            </a>
                                            <a className="text-on-primary font-title-sm text-title-sm underline underline-offset-4 hover:text-tertiary-fixed-dim transition-colors flex items-center gap-1" href="#">
                                                Explore Ima Keithel History
                                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Craft Heritage Education & Provenance Verification */}
                        <section className="max-w-[1360px] mx-auto px-margin pb-space-xl">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                                {/* Provenance QR & Hologram Verification Terminal */}
                                <div className="lg:col-span-5 flex flex-col justify-between p-space-lg rounded-xl bg-surface-container shadow-sm">
                                    <div className="flex flex-col gap-space-sm">
                                        <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm uppercase tracking-widest font-bold">
                                            <span className="material-symbols-outlined text-[18px]">verified</span>
                                            Cryptographic Provenance
                                        </div>
                                        <h2 className="font-headline-md text-headline-md text-primary">
                                            Verify Your Craft's GI Provenance
                                        </h2>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                                            Every ceremonial weave and Longpi cookware item shipped through this state platform is embedded with a tamper-evident holographic tag linking to the weaver's loom registry.
                                        </p>

                                        {/* Verification Input */}
                                        <div className="flex flex-col gap-2 pt-space-xs">
                                            <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">Hologram Serial No. or Tag Hash:</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    className="flex-1 h-11 px-3 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-primary"
                                                    id="hologram-input"
                                                    placeholder="e.g. MN-GI-2025-08492"
                                                    type="text"
                                                    value={hologramInput}
                                                    onChange={(e) => setHologramInput(e.target.value)}
                                                />
                                                <button className="h-11 px-4 bg-primary text-on-primary hover:bg-primary-container font-title-sm text-title-sm rounded-lg shadow-sm transition-colors flex items-center gap-1 shrink-0" onClick={verifyHologram}>
                                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                                    Verify
                                                </button>
                                            </div>
                                        </div>

                                        {/* Verification Result Box (Interactive Feedback) */}
                                        {verifyStatus === 'empty' && (
                                            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex items-start gap-3 mt-1">
                                                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 mt-0.5">
                                                    <span className="material-symbols-outlined text-[18px]">info</span>
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-title-sm text-title-sm text-secondary">Please enter tag number</span>
                                                    <span className="font-body-sm text-[12px] text-on-surface-variant">Locate the 12-digit holographic serial on the GI label tag</span>
                                                </div>
                                            </div>
                                        )}

                                        {verifyStatus === 'valid' && (
                                            <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex items-start gap-3 mt-1">
                                                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0 mt-0.5">
                                                    <span className="material-symbols-outlined text-[18px]">verified</span>
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-title-sm text-title-sm text-primary">Valid GI Record Found: {hologramInput.toUpperCase()}</span>
                                                    <span className="font-body-sm text-[12px] text-on-surface-variant">Direct Remittance Ledger: 100% credited to Artisan Society • Verified by CPP-MN</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-space-md border-t-0 text-label-sm font-label-sm text-on-surface-variant mt-4">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                                            Public Ledger Node #MN-04
                                        </span>
                                        <a className="text-primary underline font-semibold hover:text-secondary" href="#">Scan via Camera</a>
                                    </div>
                                </div>

                                {/* Interactive Craft Education & Symbolism Tabs */}
                                <div className="lg:col-span-7 flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-low shadow-sm">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Living Heritage Knowledge Base</span>
                                        <h2 className="font-headline-md text-headline-md text-primary">Craft Care & Cultural Semiotics</h2>
                                    </div>

                                    {/* Tab Navigation */}
                                    <div className="flex items-center gap-2 border-b-0 overflow-x-auto pb-1" id="edu-tabs">
                                        <button
                                            className={`edu-tab px-3 py-1.5 rounded-lg font-title-sm text-title-sm transition-colors whitespace-nowrap ${eduTab === 'motif' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
                                            onClick={() => setEduTab('motif')}
                                        >
                                            Symbolism of Yarung Motif
                                        </button>
                                        <button
                                            className={`edu-tab px-3 py-1.5 rounded-lg font-title-sm text-title-sm transition-colors whitespace-nowrap ${eduTab === 'drape' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
                                            onClick={() => setEduTab('drape')}
                                        >
                                            How to Drape a Phanek
                                        </button>
                                        <button
                                            className={`edu-tab px-3 py-1.5 rounded-lg font-title-sm text-title-sm transition-colors whitespace-nowrap ${eduTab === 'longpi-care' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
                                            onClick={() => setEduTab('longpi-care')}
                                        >
                                            Caring for Longpi Pots
                                        </button>
                                    </div>

                                    {/* Tab Content 1: Yarung Motif */}
                                    {eduTab === 'motif' && (
                                        <div className="edu-panel flex flex-col gap-space-sm" id="tab-content-motif">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
                                                <div className="md:col-span-8 flex flex-col gap-2">
                                                    <h4 className="font-title-lg text-title-lg text-primary">Sacred Yarung: The Pyramidal Dragon Teeth</h4>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                                        The iconic stepped zig-zag border of the <em>Moirang Phee</em> represents the teeth of <strong>Pakhangba</strong>, the ancestral serpentine deity of Manipur. In traditional folklore, wearing this motif is believed to ward off negative spirits and bestow cosmic harmony upon the wearer during festive assemblies.
                                                    </p>
                                                    <div className="flex items-center gap-3 pt-1 text-label-sm font-label-sm text-secondary font-semibold">
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">brush</span> Hand-interlocked extra weft technique</span>
                                                        <span>•</span>
                                                        <span>Origin: Moirang Kingdom</span>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 aspect-square rounded-lg bg-surface-container overflow-hidden">
                                                    <img className="w-full h-full object-cover" data-alt="Macro close-up shot of hand-embroidered Yarung pyramidal motif on sheer white Moirang Phee fabric, showing delicate needlework, gold thread luster, and botanical background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoDqRo3iCjQTIoaVcyeWg3VT734QRbx1XP4lxxLsA_0hXpN_q9865Jbp8_Ww18u_qOO6lmugzG4HxNlfZ60imQHDoDZB5QN-0wh925TSRyFM7PzC6_Hf062cJMS1GQXc5_U-L8pjN35MjGoVcE6mUKHIgkqR_4Ghfj0VTHI38yDNc8iMfLkYGyMVcg2GxwzEFe7Ej7LwsDvm_Vdyzt2JxjkJkAhd6w9eGV40qx_wIZY1IsYzgU2mjH1A" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab Content 2: Draping Tutorial */}
                                    {eduTab === 'drape' && (
                                        <div className="edu-panel flex flex-col gap-space-sm" id="tab-content-drape">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
                                                <div className="md:col-span-8 flex flex-col gap-2">
                                                    <h4 className="font-title-lg text-title-lg text-primary">The Art of Wrapping the Phanek & Innaphi</h4>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                                        Step 1: Wrap the Phanek firmly around the chest (Meitei formal) or waist, crossing the embroidered Ngangou border securely to the right.
                                                        Step 2: Fold the upper rim twice to anchor without safety pins.
                                                        Step 3: Drape the sheer Innaphi or Moirang Phee diagonally over the left shoulder, letting the Yarung motifs cascade gracefully across the back.
                                                    </p>
                                                    <div className="flex items-center gap-3 pt-1 text-label-sm font-label-sm text-primary font-semibold">
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">style</span> Ceremonial etiquette guide</span>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 aspect-square rounded-lg bg-surface-container overflow-hidden">
                                                    <img className="w-full h-full object-cover" data-alt="Demonstration of Meitei woman gracefully securing the handwoven Phanek fabric around the waist with traditional folded pleating technique in soft morning light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZDJbSobokfrSWAsHBr3Cr0MxIhASpBvH8TY4HSJW3JEFEDAvSJkaClsrR-G6_uLt74T0a-AuBUvEpnCLhSdje4netNTDEWRYvkKtZCoVRVfOoM7IGWdLqiVPBTGlD9G0Z2A0WB9Kqgx6QYjayq9lLaNJ1MP89OXw1H50Nl4KpNzg9tIs7NutsgVLdRGqPrd5OyLU9Nap__LbLELL3oqBMRdNtfC4_OpyqOyY9lMfUfPpyj07SgG92rA" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab Content 3: Longpi Care */}
                                    {eduTab === 'longpi-care' && (
                                        <div className="edu-panel flex flex-col gap-space-sm" id="tab-content-longpi-care">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
                                                <div className="md:col-span-8 flex flex-col gap-2">
                                                    <h4 className="font-title-lg text-title-lg text-primary">Seasoning & Maintaining Black Stone Pottery</h4>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                                        Before first use, boil rice starch or warm milk inside the Hamlei pot to naturally seal microscopic stone pores. Always use medium to low heat initially. Clean exclusively with warm water and soft natural brushes—avoid chemical detergents to maintain the organic Chiron leaf patina and alkaline mineral leaching benefits.
                                                    </p>
                                                    <div className="flex items-center gap-3 pt-1 text-label-sm font-label-sm text-secondary font-semibold">
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">outdoor_grill</span> Microwave, stovetop, and open ember safe</span>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 aspect-square rounded-lg bg-surface-container overflow-hidden">
                                                    <img className="w-full h-full object-cover" data-alt="Close-up of seasoning a handcrafted Longpi black stone pot with boiling rice gruel over gentle wood fire, natural steam rising from the dark stone surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD5t5VpF2wi2IDSkeSaTMilk-7vrA8yPxhINCDcv5RXMQ_-hJreFVMsSkOt5Bm5Upo1nrZot_2xx6FYkFT0lbuqaozzz15J8m7UpP6OedXQfDQ8MMzD_AhU8cPYMl8LMy4SaIokgyKO4ieuGf5pVm4dqJ3TRgqZ5RT-aIpyZXFJeDgKFfPRXLUIB74-fhN1rtl8bFFhJ9okaplmbXKulY65kyR4O_x6cdBgn6KKzhDfhiWHUR6BoRRbg" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </section>

                        {/* Section 6: Traveler & Shipping Assurance Bar */}
                        <section className="max-w-[1360px] mx-auto px-margin pb-space-xl">
                            <div className="p-space-lg rounded-xl bg-surface-container-high/70 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-title-sm text-title-sm text-on-surface">Pan-India & Global Express</h3>
                                            <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Air cargo dispatch across all 28 states, union territories, and 45 foreign destinations.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[24px]">policy</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-title-sm text-title-sm text-on-surface">Directorate Inspection Pass</h3>
                                            <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Physical purity and GI verification certificate signed by textile inspectors in every package.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[24px]">compost</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-title-sm text-title-sm text-on-surface">Recycled Loktak Eco-Pack</h3>
                                            <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Zero plastic: cushioned in upcycled water hyacinth pulp and biodegradable Kauna reed wraps.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[24px]">published_with_changes</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-title-sm text-title-sm text-on-surface">15-Day Heritage Exchange</h3>
                                            <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Guaranteed authentic replacement or cooperative refund if handloom weave specifications differ.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Toast Notification element for Add to Bag Micro-Interaction */}
                    <div
                        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 p-space-md rounded-xl bg-primary text-on-primary shadow-xl flex items-center gap-3 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}
                        id="cart-toast"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-title-sm text-title-sm" id="toast-title">{toast.title}</span>
                            <span className="font-body-sm text-[12px] opacity-80" id="toast-sub">{toast.sub}</span>
                        </div>
                    </div>

                    {/* Modal for Story / Motif Archive */}
                    {modal.show && stories[modal.key] && (
                        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4" id="story-modal">
                            <div className="bg-surface-container-lowest max-w-xl w-full rounded-xl p-space-lg shadow-2xl flex flex-col gap-space-md relative max-h-[921px] overflow-y-auto">
                                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high" onClick={closeStoryModal}>
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                                <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                                    Artisan Provenance Ledger
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-primary" id="modal-heading">{stories[modal.key].title}</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed" id="modal-desc">
                                    {stories[modal.key].text}
                                </p>
                                <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between text-body-sm font-body-sm">
                                    <span className="text-on-surface-variant">Certification Authority:</span>
                                    <span className="font-title-sm text-primary font-bold">Directorate of Handlooms, Manipur</span>
                                </div>
                                <button className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm hover:bg-primary-container transition-colors" onClick={closeStoryModal}>
                                    Close Archive File
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer className="w-full bg-surface-container-low text-on-surface mt-space-xl">
                <div className="bg-surface-container-high/60 py-space-md">
                    <div className="max-w-[1360px] mx-auto px-margin flex flex-wrap items-center justify-between gap-space-md">
                        <div className="flex items-center gap-space-md">
                            <div className="flex items-center gap-space-xs text-primary font-title-sm text-title-sm">
                                <span className="material-symbols-outlined text-secondary">military_tech</span>Department of Tourism & Directorate of Handlooms Collaboration
                            </div>
                            <span className="text-outline">|</span>
                            <span className="text-body-sm font-body-sm text-on-surface-variant">Craft Provenance Portal (CPP-MN)</span>
                        </div>
                        <div className="flex items-center gap-space-md">
                            <span className="inline-flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container-lowest text-tertiary font-label-sm text-label-sm shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                <span className="material-symbols-outlined text-[16px] text-tertiary-container">verified</span>ISO 9001:2015 CERTIFIED
                            </span>
                            <span className="inline-flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                <span className="material-symbols-outlined text-[16px] text-primary">award_star</span>GEOGRAPHICAL INDICATION VERIFIED
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1360px] mx-auto px-margin py-space-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl">
                        <div className="flex flex-col gap-space-sm">
                            <h3 className="font-headline-sm text-headline-sm text-primary">Cultural Collections</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Protected GI crafts direct from Meitei and tribal artisanal cooperatives across the valley and hills.</p>
                            <ul className="flex flex-col gap-space-xs mt-space-xs">
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Phanek Mayek Naibi & Inaphee Weaves</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Moirang Phee (Temple Design)</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Shaphee Lanphee (Warrior Shawl)</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Longpi Black Stone Earthenware</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Kauna Reed Craft & Water Basketry</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-space-sm">
                            <h3 className="font-headline-sm text-headline-sm text-primary">Artisans & Welfare</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Strengthening regional livelihoods via fair compensation and transparent trade ledgers.</p>
                            <ul className="flex flex-col gap-space-xs mt-space-xs">
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Ima Keithel Mothers Market Roster</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Cooperative Direct Remittance Policy</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Handloom Purity & Master Weaver Registry</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Tribal Livelihood Uplift Programs</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Artisan Training Centers (Imphal East & West)</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-space-sm">
                            <h3 className="font-headline-sm text-headline-sm text-primary">Shopping & Customs</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Seamless transit protocol and guaranteed domestic/international delivery compliance.</p>
                            <ul className="flex flex-col gap-space-xs mt-space-xs">
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Worldwide Insured Shipping Rates</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">International Airport Export Customs Pass</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Kauna Eco-Packaging Standards</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Silk Mark & Handloom Certification Guide</li>
                                <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Customs Cleared Baggage Tag Protocol</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-space-sm">
                            <h3 className="font-headline-sm text-headline-sm text-primary">Customer Care & Trust</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Verify every piece with cryptographically stamped provenance records.</p>
                            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-start gap-space-sm">
                                <span className="material-symbols-outlined text-[36px] text-primary">qr_code_scanner</span>
                                <div className="flex flex-col">
                                    <span className="font-title-sm text-title-sm text-on-surface">Authenticity QR Scan</span>
                                    <span className="font-body-sm text-[12px] text-on-surface-variant">Validate GI seal & weaver fair wage signature on the public blockchain ledger</span>
                                </div>
                            </div>
                            <div className="mt-space-xs flex flex-col gap-1">
                                <span className="font-label-lg text-label-lg text-on-surface">Directorate Helpline</span>
                                <span className="font-title-md text-title-md text-primary">1800-345-3885 (24x7 Multi-lingual)</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant">tourism-handlooms@manipur.gov.in</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-high py-space-md">
                    <div className="max-w-[1360px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant text-label-md font-label-md">
                        <p>© 2025 Directorate of Tourism & Handlooms, Government of Manipur. All Rights Reserved.</p>
                        <div className="flex items-center gap-space-md">
                            <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
                            <span className="opacity-40">•</span>
                            <a className="hover:text-on-surface transition-colors" href="#">Terms of Heritage Commerce</a>
                            <span className="opacity-40">•</span>
                            <a className="hover:text-on-surface transition-colors" href="#">GI Compliance & Legal IP</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CultureHeritageItems;