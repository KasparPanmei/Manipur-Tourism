import { useState } from "react";

export default function HeritageCrafts() {
    const [activePillar, setActivePillar] = useState("handlooms");
    const [etiquetteOpen, setEtiquetteOpen] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [workshop, setWorkshop] = useState({ title: "", price: "" });

    const openBooking = (title, price) => {
        setWorkshop({ title, price });
        setBookingOpen(true);
    };

    const handleBookingSubmit = (event) => {
        event.preventDefault();
        window.alert("Masterclass Slot Confirmed! An official government reservation slip has been generated.");
        setBookingOpen(false);
    };

    return (
        <main className="w-full pt-20 bg-surface flex-1">
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                    {/* Subtle Ambient Header Section */}
                    <section className="relative w-full bg-surface-container-low py-space-xl overflow-hidden">
                        <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
                        <div className="absolute left-10 -bottom-20 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-2xl pointer-events-none"></div>
                        <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin relative z-10">
                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
                                <div className="max-w-3xl flex flex-col gap-space-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">GI-Certified Heritage &amp; Living Guilds</span>
                                        <span className="text-outline text-xs">/</span>
                                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Directorate of Handlooms &amp; Culture</span>
                                    </div>
                                    <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary tracking-tight font-bold">
                                        Living Heritage, Handlooms &amp; Sacred Arts
                                    </h1>
                                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                                        Connecting global travelers directly to Manipur’s master weavers, serpentine stone sculptors, and sacred classical performers with zero-middlemen patronage.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-container-highest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm" id="openEtiquetteBtn" onClick={() => setEtiquetteOpen(true)}>
                                        <span className="material-symbols-outlined text-[20px] text-primary">auto_stories</span>
                                        <span>Cultural Etiquette Guide</span>
                                    </button>
                                    <a className="flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-[0_4px_14px_rgba(10,92,74,0.25)] transition-all" href="#workshops">
                                        <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                                        <span>Book Masterclasses</span>
                                    </a>
                                </div>
                            </div>
                            {/* Quick Metrics Ribbon */}
                            <div className="mt-space-lg grid grid-cols-2 md:grid-cols-4 gap-gutter pt-space-md">
                                <div className="flex flex-col p-4 rounded-lg bg-surface-container-lowest shadow-sm">
                                    <div className="flex items-center justify-between text-outline mb-1">
                                        <span className="font-label-sm text-label-sm uppercase tracking-wider">Registered Artisans</span>
                                        <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                                    </div>
                                    <span className="font-headline-md text-headline-md font-bold text-primary">14,200+</span>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Across 16 districts</span>
                                </div>
                                <div className="flex flex-col p-4 rounded-lg bg-surface-container-lowest shadow-sm">
                                    <div className="flex items-center justify-between text-outline mb-1">
                                        <span className="font-label-sm text-label-sm uppercase tracking-wider">GI Tags Active</span>
                                        <span className="material-symbols-outlined text-[18px] text-secondary">workspace_premium</span>
                                    </div>
                                    <span className="font-headline-md text-headline-md font-bold text-secondary">7 Official</span>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Handloom &amp; Agro-Crafts</span>
                                </div>
                                <div className="flex flex-col p-4 rounded-lg bg-surface-container-lowest shadow-sm">
                                    <div className="flex items-center justify-between text-outline mb-1">
                                        <span className="font-label-sm text-label-sm uppercase tracking-wider">Ima Keithel Guild</span>
                                        <span className="material-symbols-outlined text-[18px] text-tertiary">groups_2</span>
                                    </div>
                                    <span className="font-headline-md text-headline-md font-bold text-tertiary">5,000+</span>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">100% Matriarchal Commerce</span>
                                </div>
                                <div className="flex flex-col p-4 rounded-lg bg-surface-container-lowest shadow-sm">
                                    <div className="flex items-center justify-between text-outline mb-1">
                                        <span className="font-label-sm text-label-sm uppercase tracking-wider">Living Traditions</span>
                                        <span className="material-symbols-outlined text-[18px] text-primary">museum</span>
                                    </div>
                                    <span className="font-headline-md text-headline-md font-bold text-primary">Ancient Lineage</span>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Kangla &amp; Raas Leela</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Curated Cultural Pillar Explorer Section */}
                    <section className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin py-space-xl w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold mb-1">
                                    <span className="material-symbols-outlined text-[18px]">category</span>
                                    <span>Curated Cultural Pillars</span>
                                </div>
                                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Explore the Living Fabric of Manipur</h2>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                                Select a domain to uncover master lineages, authentic origins, and ethical studio visit requirements.
                            </p>
                        </div>
                        {/* Filter Tab Switcher */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-space-lg no-scrollbar">
                            <button className="pillar-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-primary text-on-primary shadow-sm" data-target="handlooms" onClick={() => setActivePillar("handlooms")}>
                                GI-Tagged Handlooms
                            </button>
                            <button className="pillar-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface" data-target="longpi" onClick={() => setActivePillar("longpi")}>
                                Longpi Black Stone
                            </button>
                            <button className="pillar-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface" data-target="performance" onClick={() => setActivePillar("performance")}>
                                Dance &amp; Thang-Ta
                            </button>
                            <button className="pillar-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface" data-target="landmarks" onClick={() => setActivePillar("landmarks")}>
                                Historical Forts &amp; Memorials
                            </button>
                            <button className="pillar-tab px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap bg-surface-container text-on-surface-variant hover:text-on-surface" data-target="imakeithel" onClick={() => setActivePillar("imakeithel")}>
                                Ima Keithel Feature
                            </button>
                        </div>
                        {/* Tab 1: Handlooms Bento */}
                        <div className={`pillar-panel ${activePillar === "handlooms" ? "block" : "hidden"}`} id="handlooms-panel">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                                {/* Major feature card */}
                                <div className="lg:col-span-7 flex flex-col justify-between p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06)] relative overflow-hidden">
                                    <div className="flex flex-col gap-space-sm z-10">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold tracking-wider">GI REGISTRATION #372</span>
                                            <span className="text-outline font-label-sm text-label-sm">Meitei Royal Weave</span>
                                        </div>
                                        <h3 className="font-headline-md text-headline-md text-primary font-bold">Shaphee Lanphee: Cloth of Valor &amp; Peace</h3>
                                        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                                            Historically gifted by the King of Manipur to valorous warriors and hill tribe chiefs. Woven with deep black cotton and embroidered with cosmological symbols including the celestial horse, sun, moon, and mythical beasts.
                                        </p>
                                    </div>
                                    <div className="mt-space-md rounded-lg overflow-hidden h-72 relative">
                                        <img className="w-full h-full object-cover" data-alt="An elderly Manipuri woman master weaver seated beside an intricate traditional loom, carefully weaving a luxurious black Shaphee Lanphee shawl detailed with striking red and gold geometric motifs and mythological animals. High-contrast, warm diffused sunlight streaming into a traditional timber-framed verandah." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-pBcCJfFUT7I1_YEo-AcilAMUuTwbH3mvyhMXVrsF_m2cWy_GZ1r5oV6jvwlZvAbldirZta-QMoi_f9JAHqeN3mM8C1Oc34hh9CkZQwwcJabTWoJWq1_KuTuD_YdYNRYzw915yFImJ6rHlKnUOx4669OatQ08D2-zVXxFOStXNgF-NP9-V4rI3E3tKJiFrbdDiipX6mTQN6oVTmfM_MKaZnlX-FiKQ-X3GHNUbxSzyLKxEzb6uCqKTg" />
                                        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-md bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">verified</span>
                                            100% Natural Dye Vegetable Indigo &amp; Madder
                                        </div>
                                    </div>
                                </div>
                                {/* 2 Secondary Pillar Cards */}
                                <div className="lg:col-span-5 flex flex-col gap-gutter">
                                    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06)] flex flex-col justify-between">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-28 h-28 rounded-lg overflow-hidden shrink-0">
                                                <img className="w-full h-full object-cover" data-alt="Close up of Moirang Phee fine cotton fabric with iconic saw-tooth pyramid temple border motifs called Moirang Pheejin, woven on a backstrap throw loom with crisp immaculate precision, emerald and ivory color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjMBPETiwTBgOTfpL09E9G0KOlMQwuRbt-9J5hatRx4sTCDvhFTWo555mOlRttmgn8pUivZxW_W1bpwyaBbQCTc98tJIRmBzGJRNtZOfkErQF18DR4eUQ5gB0xw69KB6iJ93r09Y4Nlo07JXDmyqUgHtsFnRaPrj9A7kUqd3W30z6HOnrrwcyQPSQA1jFhK-o7AEKSl_HqTm1I37N8adyxiY-rZjeA7_52SBddaWxmonehnzIjfpF-Og" />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-label-sm text-label-sm text-secondary font-bold">GI #373</span>
                                                    <span className="font-label-sm text-label-sm text-outline">Bishnupur District</span>
                                                </div>
                                                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">Moirang Phee</h4>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                                                    Distinguished by the sacred pyramid-needle design along the border representing the temple horn architecture of Lord Thangjing.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg">
                                            <span className="font-label-sm text-label-sm text-outline font-medium">Studio Visits: Moirang Craft Cluster</span>
                                            <a className="font-label-sm text-label-sm text-primary font-bold hover:underline flex items-center gap-0.5" href="#workshops">View Loom Tour <span className="material-symbols-outlined text-[14px]">arrow_forward</span></a>
                                        </div>
                                    </div>
                                    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06)] flex flex-col justify-between">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-28 h-28 rounded-lg overflow-hidden shrink-0">
                                                <img className="w-full h-full object-cover" data-alt="Ethereal gossamer white Wangkhei Phee sheer muslin textile worn by a Meitei classical dancer, captured in sharp focus showing delicate geometric floral interlacing, regal and ceremonial elegance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSF2s32EMXEwZSKusOx7IsRovSbbHtOe1BVvzlIaiO5hrrq7m_QdFexMo0hXyvz4lWhLzG4o0uZrmZcw3sgv1he4sOqwj1d0Jp8I1Zf7DrdiOGUEW3YdxFS_ugyTmZSiE915BksR1Y7ZDO0anB4hQA-gqhcSLRP4G8mgZstxrFvavVCSs_Nz15QfYDtB1h7DO2S9T9PaWSXQ0evEIR1pejZeVLehwLsP77tA-5nDeTk6dPGtWwwFC3eg" />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-label-sm text-label-sm text-primary font-bold">GI #371</span>
                                                    <span className="font-label-sm text-label-sm text-outline">Imphal East</span>
                                                </div>
                                                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">Wangkhei Phee</h4>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                                                    Ultra-fine, translucent white muslin weave created using untwisted cotton filament yarns, historically reserved for the royal court.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg">
                                            <span className="font-label-sm text-label-sm text-outline font-medium">Studio Visits: Wangkhei Artisan Guild</span>
                                            <a className="font-label-sm text-label-sm text-primary font-bold hover:underline flex items-center gap-0.5" href="#workshops">Meet Weavers <span className="material-symbols-outlined text-[14px]">arrow_forward</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tab 2: Longpi Black Stone */}
                        <div className={`pillar-panel ${activePillar === "longpi" ? "block" : "hidden"}`} id="longpi-panel">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                                <div className="lg:col-span-6 flex flex-col justify-center gap-space-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">UKHRUL DISTRICT</span>
                                        <span className="text-outline font-label-sm text-label-sm">Tangkhul Naga Heritage</span>
                                    </div>
                                    <h3 className="font-headline-lg text-headline-lg text-primary font-bold">Longpi Ham: The Wheel-less Black Serpentine Craft</h3>
                                    <p className="font-body-md text-body-md text-on-surface-variant">
                                        Crafted exclusively in Longpi (Nungbi) village, this ancient Neolithic cookware is sculpted without a potter's wheel. Master Tangkhul artisans grind ground serpentine rock and weathered clay by hand, burnishing the pots with local 'Chiron' plant leaves to achieve a metallic obsidian sheen.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 my-2">
                                        <div className="p-3 rounded-lg bg-surface-container-low">
                                            <span className="font-label-sm text-label-sm text-secondary font-bold block">100% Non-Toxic</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">Zero synthetic chemicals, safe over open fire.</span>
                                        </div>
                                        <div className="p-3 rounded-lg bg-surface-container-low">
                                            <span className="font-label-sm text-label-sm text-primary font-bold block">Mineral Heat Retain</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">Keeps traditional stews warm for hours.</span>
                                        </div>
                                    </div>
                                    <div>
                                        <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-label-md transition-colors" href="#workshops">
                                            Book Longpi Immersion Studio
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="lg:col-span-6 h-80 lg:h-auto rounded-xl overflow-hidden relative">
                                    <img className="w-full h-full object-cover" data-alt="A skilled Tangkhul Naga artisan shaping a smooth matte black Longpi teapot using rounded stone pebbles and bamboo tools, surrounded by polished dark clay cookware in a high-altitude Ukhrul pine forest village workshop. Editorial documentary photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDum918aPJNjQ41OlLdmGQUFbO6dZRiMe1T42cgI8Xr5xPLKn_1PqM1fdXW44T9O1Vtpd2jXeZZGKTHy2g3FOdYtnhB1W9X8g0XgLaRslOTcbmZ5Fqolc16NrjVqFC6reeOlMfgwylqzJTG1DZSV8D26AA9weHpLEGDUn0qBwQll3UkgNR4wzxWR91a_VSU4ArWUWOtPqVFqTT3GTZwmk1J8cid8dkmsMKPwq3m2nLbQRIiiwWB1H4IWw" />
                                    <div className="absolute bottom-4 right-4 bg-inverse-surface/85 backdrop-blur-md px-3.5 py-2 rounded-lg text-inverse-on-surface font-label-sm text-label-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">eco</span>
                                        <span>Carbon-Neutral Hand Sculpting</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tab 3: Performance & Thang-Ta */}
                        <div className={`pillar-panel ${activePillar === "performance" ? "block" : "hidden"}`} id="performance-panel">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                                <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                                    <div>
                                        <span className="px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">UNESCO INTANGIBLE HERITAGE LIST</span>
                                        <h3 className="font-headline-md text-headline-md text-primary font-bold mt-2">Manipuri Classical Raas Leela</h3>
                                        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                            Conceived in the 18th century by King Bhagyachandra, this sacred dance-drama is renowned for its fluid, serene body curves and the iconic flared, mirror-studded *Kumil* cylindrical skirt.
                                        </p>
                                    </div>
                                    <div className="mt-4 rounded-lg overflow-hidden h-52">
                                        <img className="w-full h-full object-cover" data-alt="A graceful Manipuri Raas Leela dancer in a lavishly embroidered cylindrical Kumil skirt adorned with circular mirrors and gold zari work, hands poised in gentle devotional mudra during dusk ceremony at Shree Govindaji temple courtyard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHkdAxKrUemdywyODG3WuMwk200TRsfEJq6ppcq2fhSH89cGYoHjM-E6vdsi7gQgonyuHq3kehTPkJMB8DxjZC6amLBf3c-4Ynxb_3d1cUEcT-poQd0r_VyGf32JiqIwfhbK73PjH80gqtqL66zvS2wWuy4dlX0Po-Z05h_6B_ZbyXYsX85M9_jRr9Uq14fxm6_JWWC9iNBVwtW2PkhqOO0pRS2_XyUBwuz5xJioQTZP5v9hgg2SVnow" />
                                    </div>
                                </div>
                                <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                                    <div>
                                        <span className="px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">MARTIAL DISCIPLINE</span>
                                        <h3 className="font-headline-md text-headline-md text-primary font-bold mt-2">Thang-Ta: The Sword &amp; Spear Art</h3>
                                        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                            An ancient combat system integrating dynamic blade patterns (*Thang*), thrust maneuvers (*Ta*), and sacred breathing meditation. Taught traditionally inside mud-floored *Huyen Langlon* akharas.
                                        </p>
                                    </div>
                                    <div className="mt-4 rounded-lg overflow-hidden h-52">
                                        <img className="w-full h-full object-cover" data-alt="Two dynamic Thang-Ta martial artists in traditional saffron dhotis lunging in mid-air with curved bronze Manipuri swords and animal-hide shields against an ancient red brick courtyard in Kangla Fort, intense focus and discipline." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAvWw7dfjsYfScJjXWlb2Akf5swm4GiYuRthnDrUn1-oDQkmpvFRVX9iaxXxBAzogli5FtUSVmKBPX5ZTR63PdENIAoI0SWqX8Nr8eyJvFbZPxy0iI63_8mTMLtnKTaPwdcG-cIB5nUuE4qGKcrvB7tl41jNb_rficEvpyCgBJUomXEGJFksg66Q6WXI-PiKLtJD5fgvLVkxHPnRN0jab0dDjb2JcI4_Df6rXfDe_V2k2g88CPr3i-uQ" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tab 4: Historical Landmarks */}
                        <div className={`pillar-panel ${activePillar === "landmarks" ? "block" : "hidden"}`} id="landmarks-panel">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
                                    <div className="h-44 overflow-hidden">
                                        <img className="w-full h-full object-cover" data-alt="The imposing Kangla Sha mythical dragon-lion twin statues standing proudly before the moat of Kangla Fort in Imphal, lush green lawns under dramatic monsoon cloud cover, regal historical majesty." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2CHVAH92bx0UVlbdOJ2CyzUfcB7XFb3NTpqE0GgCbHL31Gz1xDdJ1YmpTMckd47aMmqSQN6lfIc5yCIc4PXrlVdERLKo9crJLvVTlNyGSNi2unEeNaeYndM3VgUhE_hYJJhce8N-wDd24_UKLIYm-HO1tlubuAUxUCIOUDiNCvp5A3OGxWE7PyE8WCcMnOEmcm6QHG8PuzDxYgEcmHp6Lzaui4PYfkwaH-9BsWnCaSv3U6jsPlrCySA" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1 justify-between">
                                        <div>
                                            <span className="font-label-sm text-label-sm text-primary font-bold">IMPHAL VALLEY</span>
                                            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">Kangla Fort</h4>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                                The ancient seat of Meitei royalty for over two millennia, housing sacred coronation halls, secret moats, and the iconic Kangla Sha dragon statues.
                                            </p>
                                        </div>
                                        <div className="pt-3 mt-3 flex items-center text-outline font-label-sm text-label-sm">
                                            <span className="material-symbols-outlined text-[16px] mr-1 text-primary">schedule</span> Open daily 7 AM - 5 PM
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
                                    <div className="h-44 overflow-hidden">
                                        <img className="w-full h-full object-cover" data-alt="The INA Memorial Complex at Moirang with the bronze statue of Netaji Subhas Chandra Bose and the Indian tricolor flag fluttering high against the tranquil blue backdrop of Loktak Lake." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ3UmCcL1gBblrtE65BXYDPaSNQr7dgjplMg01rOE-kewm8N1kdq6IIEMYMrkcZ0Et5OzqDt2nFFWNrxEweqj8CVrQmxVFE5tOCMFIMXThTHEC5_OKqmPOtFNeyQKhMYUd-uTQE3Hgsqoo1FreEoQkrCEGMH-LBH4Vf9awHOYE6fp_NFg04KFtMHyxFbjGBS1_DcX-Jcy85edYV7Q9-G4dFT9GdXD16TTuZLG8LsB4iVm3fgNuNNN9dg" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1 justify-between">
                                        <div>
                                            <span className="font-label-sm text-label-sm text-secondary font-bold">MOIRANG</span>
                                            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">INA Memorial Complex</h4>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                                The historic site where the Indian National Army hoisted the first Indian flag on mainland soil on April 14, 1944. Houses rare WWII battlefield archives.
                                            </p>
                                        </div>
                                        <div className="pt-3 mt-3 flex items-center text-outline font-label-sm text-label-sm">
                                            <span className="material-symbols-outlined text-[16px] mr-1 text-secondary">military_tech</span> National War Archive &amp; Gallery
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
                                    <div className="h-44 overflow-hidden">
                                        <img className="w-full h-full object-cover" data-alt="Khongjom War Memorial obelisk monument standing on a scenic green hilltop against a vibrant sunset sky, commemorating Anglo-Manipur war heroes with stone carved inscriptions." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXfAUzsWKa-dczpUJrdBapvpLj2JVG7yB1vwShZqzvC_NEkCqIs8GtQJ2pq7QHmkGTb0mLEJw-JzxICgTb7hVf5uujrI_YXIG8P4qOBYOoDlCB6w0Ykgilw_ibAhO1k0NTUMZuOkCv0KzjVNRoeMrP9xIfqp7xHpAXckDAVhw5A-Hnv1TUFR4ruYuMo4FCiADF-xot0h-qhGR7v6a8QnsRNhGPembjzwaW0sZ1SKLTqw8tosDhfRvKSw" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1 justify-between">
                                        <div>
                                            <span className="font-label-sm text-label-sm text-tertiary font-bold">THOUBAL DISTRICT</span>
                                            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">Khongjom War Memorial</h4>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                                Commemorates the heroic battle of 1891 fought between the soldiers of Manipur led by Paona Brajabasi and the British Empire on the slopes of Kheba Ching.
                                            </p>
                                        </div>
                                        <div className="pt-3 mt-3 flex items-center text-outline font-label-sm text-label-sm">
                                            <span className="material-symbols-outlined text-[16px] mr-1 text-tertiary">landscape</span> Panoramic Kheba Ching viewpoint
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tab 5: Ima Keithel Feature */}
                        <div className={`pillar-panel ${activePillar === "imakeithel" ? "block" : "hidden"}`} id="imakeithel-panel">
                            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                                    <div className="lg:col-span-7 flex flex-col gap-space-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold tracking-wider uppercase">Living Socio-Economic Wonder</span>
                                            <span className="text-outline font-label-sm text-label-sm">Established c. 16th Century</span>
                                        </div>
                                        <h3 className="font-headline-lg text-headline-lg text-primary font-bold">Ima Keithel (Mother's Market)</h3>
                                        <p className="font-body-md text-body-md text-on-surface-variant">
                                            The world’s only commercial market managed entirely by more than 5,000 married women traders. Rooted in the ancient *Lallup* labor system, Ima Keithel has stood for over 500 years not only as a trading hub for fresh produce, hill-grown spices, and woven Phanek skirts, but as the nucleus of socio-political justice and the historic Nupi Lan (Women’s Wars).
                                        </p>
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container">
                                                <span className="material-symbols-outlined text-secondary text-[20px]">female</span>
                                                <span className="font-label-md text-label-md text-on-surface">5,000+ Female Merchants</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container">
                                                <span className="material-symbols-outlined text-primary text-[20px]">currency_rupee</span>
                                                <span className="font-label-md text-label-md text-on-surface">Direct Artisan Trade</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container">
                                                <span className="material-symbols-outlined text-tertiary text-[20px]">policy</span>
                                                <span className="font-label-md text-label-md text-on-surface">Democratic Guild Council</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-5 rounded-xl overflow-hidden h-72">
                                        <img className="w-full h-full object-cover" data-alt="Vibrant wide view inside the high ceiling halls of Ima Keithel market in Imphal, elderly Meitei mothers wearing signature pink and orange phanek garments seated elegantly on wooden platforms with woven baskets of fragrant herbs, textiles and brass ritual wares." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaIqM4bXDP_Rq2bD8flmTZoFMGvHVnp9Kw8y1PJFEpzVe5X4SnXCTWNtupxZJJNTi-nnSUhIGEx5c6MWelgMlDxRnnWcZbOwxXHzCmzER2lV2jy_vC6WjCy3bX43US8cEhDaTtcr41OobTX29RmAkhDLSJVrY2IUAN5vWAlEhG1vbeRWgZAhrRjUy6TfFA5b4JKRoVtXVyU5xk25P8nEDljSYDRPbqjN16heMyFD8XQfHOQvKi2S8rBw" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Interactive Masterclass & Workshop Booking Grid */}
                    <section className="w-full bg-surface-container-low py-space-xl" id="workshops">
                        <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
                                <div>
                                    <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-widest">Hands-on Cultural Apprenticeships</span>
                                    <h2 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">Book Studio Masterclasses with Living Masters</h2>
                                    <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
                                        Immerse yourself directly inside working village guilds. Every booking directly pays the artisan and funds the preservation of endangered indigenous skills.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px] text-primary">verified_user</span>
                                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">100% Guaranteed Fair Remuneration</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                                {/* Card 1: Weave Masterclass */}
                                <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06)] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                                    <div>
                                        <div className="h-48 overflow-hidden relative">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A master silk weaver demonstrating delicate warp thread arrangement on an authentic wooden frame loom in Kakching village, close up of skilled hands guiding a wooden shuttle with emerald raw silk." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkL4LfXFvrSMko0aMmzdjyzrp1Phd3Vd1Sgw8BiYCROTQOjdk9a1fX3c3JZCxqWt577QA2Z2dmpb361WaLvVjaYMNJRkZkdNCIJSqeK1IxbMyDuire-gqLT4-1MmTtobr9x2DPxOJThW1QoKamFx-bc7PvuQkKANJWzhzhkoqjG47zVS3qeblEFnKxEddsfLrhMCnOIYvKvUZjsbovoU5veQ3R5GioYVN6pMuqGQrVsDj1YynAOe3R9g" />
                                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm">
                                                Kakching Loom Cluster
                                            </div>
                                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">
                                                ₹1,800 / Person
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                                                <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span> 3.5 Hours
                                                <span>•</span>
                                                <span className="material-symbols-outlined text-[16px] text-primary">card_membership</span> Raw Silk Scarf Takeaway
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Weave with a National Award Master Weaver</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                One-on-one frame loom apprenticeship under Smt. R.K. Shanti Devi. Learn the foundational tensioning and weave your personal silk stole.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0">
                                        <button className="booking-trigger-btn w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" data-price="₹1,800" data-title="Weave with a National Award Master Weaver" onClick={() => openBooking('Weave with a National Award Master Weaver', '₹1,800')}>
                                            <span className="material-symbols-outlined text-[18px]">event_available</span>
                                            Reserve Studio Slot
                                        </button>
                                    </div>
                                </div>
                                {/* Card 2: Longpi Black Stone Sculpting */}
                                <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06)] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                                    <div>
                                        <div className="h-48 overflow-hidden relative">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Traditional Longpi craftsman guiding a traveler's hands in molding a smooth black serpentine clay bowl without a wheel, surrounded by pine smoke in the misty highlands of Ukhrul." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT4nvKddpV7OZX1WgffxeuE9hegq5_NOmSmOG9ANhFL5DGtn9VkbMaIy3E1ge645f30vcr28_0riu55AxJlmMQ5twsp1lgsbWPp-eddXWFLMmE0pYO5vBeu8KfJojGG5Xm9RQ2Yr8dLUF4PEr_eHBI_E2B0BvwiTA5NTk7g3Z5tCH0xZmZLJeKu3eFWG6yY6ggCekH2vJqgZlU-jsiw8j8yI_h4qDcCI5VTQs66jXz2gUfRLFWEKo_oQ" />
                                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm">
                                                Nungbi Village, Ukhrul
                                            </div>
                                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                                                ₹2,200 / Person
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                                                <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span> 4 Hours
                                                <span>•</span>
                                                <span className="material-symbols-outlined text-[16px] text-secondary">local_fire_department</span> Firing &amp; Takeaway Cup
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Black Stone Sculpting in Longpi Village</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                Crush ground serpentine rock with weathered clay, shape without machinery, and burnish using organic mountain Chiron foliage.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0">
                                        <button className="booking-trigger-btn w-full py-2.5 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" data-price="₹2,200" data-title="Black Stone Sculpting in Longpi Village" onClick={() => openBooking('Black Stone Sculpting in Longpi Village', '₹2,200')}>
                                            <span className="material-symbols-outlined text-[18px]">event_available</span>
                                            Reserve Studio Slot
                                        </button>
                                    </div>
                                </div>
                                {/* Card 3: Thang-Ta Martial Art */}
                                <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06)] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                                    <div>
                                        <div className="h-48 overflow-hidden relative">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Traditional Meitei Akhara training hall with red earthen floor, swords and spears displayed on walls, an instructor demonstrating a defensive stance with ceremonial weapon." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeai8a-DwNguNOVaY_ZqWy3aU0OVK2pn36yqlQohI7S0sL0Fh850jJK-eKbYsFPr5cmG3J2MQz3qxZj14m0wG5mRyqe-AfioHIkWRoeMUrhaJKstUzZi6RaqL8BAgGLaGdvsp1oBV4Hg6oqGmT73UbRWgzB8y7XRPZ0Taw7xZbwpCqCttldMR9ii-oWnDTknG9j-Gcdxfv4K7kViCbBNZ6Hjw5QbJ8cDQBNjmu3M1MLBOs4oX893G8yg" />
                                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm">
                                                Imphal Cultural Center
                                            </div>
                                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">
                                                ₹1,200 / Person
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                                                <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span> 2 Hours
                                                <span>•</span>
                                                <span className="material-symbols-outlined text-[16px] text-primary">self_improvement</span> Sword Footwork &amp; Breathwork
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Thang-Ta Martial &amp; Meditation Immersion</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                Learn sacred defensive blade stances, spear balancing, and ancient Meitei meditative breathing inside a historical earthen akhara.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0">
                                        <button className="booking-trigger-btn w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" data-price="₹1,200" data-title="Thang-Ta Martial &amp; Meditation Immersion" onClick={() => openBooking('Thang-Ta Martial &amp; Meditation Immersion', '₹1,200')}>
                                            <span className="material-symbols-outlined text-[18px]">event_available</span>
                                            Reserve Studio Slot
                                        </button>
                                    </div>
                                </div>
                                {/* Card 4: Sacred Raas Leela & Costume Heritage Tour */}
                                <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06)] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                                    <div>
                                        <div className="h-48 overflow-hidden relative">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Curator carefully displaying the elaborate hand-stitched Kumil mirrored dance costume and traditional headdress at a cultural museum repository near Shree Govindaji temple." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBrJAZe7b39rkEGdS-Kog6vgZzp2-LKsSi_L0CYr_Lgg8S2yoNA0Zaa6j9_jvYyDAG8NbIGt_IILCey_rNxxW87jaA9komznBZ1zrybUjvc3tELwDf4Le0L1jWRLZEXZq5xxWnuxzgZ_vBik9IBDBoZA_6er75DkuNOrZ-10Ts_WUVrjKKOYnLVzjBkzB45UfzpuGv7OBXmw0mGlj4nDWr8qikWzNRhfuXGxab-jqb83MKbM0Wu6QbXw" />
                                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm">
                                                Shree Govindaji Amphitheater
                                            </div>
                                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">
                                                ₹1,500 / Person
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                                                <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span> 2.5 Hours
                                                <span>•</span>
                                                <span className="material-symbols-outlined text-[16px] text-tertiary-container">theater_comedy</span> Guided Costume Archive
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Raas Leela Performance &amp; Costume Tour</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                Exclusive backstage access to the master costume embroiders of the *Kumil* skirt, followed by an evening sacred temple recital.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0">
                                        <button className="booking-trigger-btn w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" data-price="₹1,500" data-title="Raas Leela Performance &amp; Costume Tour" onClick={() => openBooking('Raas Leela Performance &amp; Costume Tour', '₹1,500')}>
                                            <span className="material-symbols-outlined text-[18px]">event_available</span>
                                            Reserve Studio Slot
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Direct Ethical Craft Marketplace Banner */}
                    <section className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin py-space-xl w-full">
                        <div className="p-space-lg md:p-space-xl rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary relative overflow-hidden shadow-lg">
                            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
                                <span className="material-symbols-outlined text-[300px]">verified</span>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
                                <div className="lg:col-span-8 flex flex-col gap-space-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold tracking-wider uppercase">Official Government Portal</span>
                                        <span className="text-on-primary-container text-xs">•</span>
                                        <span className="font-label-sm text-label-sm text-on-primary-container font-medium">100% Direct Artisan Bank Disbursals</span>
                                    </div>
                                    <h2 className="font-headline-lg text-headline-lg md:text-display-md text-on-primary font-bold">
                                        The Directorate Ethical Craft Marketplace
                                    </h2>
                                    <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl">
                                        Every piece bears a tamper-evident holographic QR certification code linking straight to the artisan’s village coordinates, weaving time log, and GI authenticity registry.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[18px] text-primary-fixed">qr_code_scanner</span>
                                            </span>
                                            <span className="font-body-sm text-body-sm font-medium">QR Authenticity Registry</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[18px] text-primary-fixed">account_balance</span>
                                            </span>
                                            <span className="font-body-sm text-body-sm font-medium">Instant UPI / Card Payment</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[18px] text-primary-fixed">public</span>
                                            </span>
                                            <span className="font-body-sm text-body-sm font-medium">Carbon-Neutral Global Shipping</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
                                    <button className="px-6 py-3.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-lg text-label-lg font-bold shadow-md transition-all flex items-center gap-2" id="openMarketplaceModal" onClick={() => window.alert("Redirecting to the authenticated Directorate of Handlooms Direct Marketplace with active GI certificates.")}>
                                        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                        Browse GI-Verified Catalog
                                    </button>
                                    <span className="font-body-sm text-body-sm text-primary-fixed-dim">Over 380 active items shipped weekly</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Cultural Etiquette & Respectful Tourism Modal */}
                    <div className={`fixed inset-0 z-50 ${etiquetteOpen ? "flex" : "hidden"} bg-inverse-surface/50 backdrop-blur-sm items-center justify-center p-4`} id="etiquetteModal">
                        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[921px]">
                            <div className="p-6 bg-primary text-on-primary flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[28px] text-tertiary-fixed">handshake</span>
                                    <div>
                                        <h3 className="font-headline-sm text-headline-sm font-bold">Meitei Cultural Etiquette &amp; Protocol</h3>
                                        <p className="font-body-sm text-body-sm text-on-primary-container">Sacred customs for temple grounds, village looms &amp; Ima Keithel</p>
                                    </div>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary hover:bg-surface-tint" id="closeEtiquetteBtn" onClick={() => setEtiquetteOpen(false)}>
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto flex flex-col gap-4">
                                <div className="flex gap-3 p-3 rounded-lg bg-surface-container-low">
                                    <span className="material-symbols-outlined text-primary text-[24px] shrink-0">footprint</span>
                                    <div>
                                        <h4 className="font-label-md text-label-md text-on-surface font-bold">Removing Footwear at Sacred Looms</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                            In traditional Meitei homes, the loom space (*Phy-sangglen*) is regarded as a sacred precinct consecrated to the goddess *Panthoibi*. Always leave shoes outside before stepping onto the wooden floor.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 p-3 rounded-lg bg-surface-container-low">
                                    <span className="material-symbols-outlined text-secondary text-[24px] shrink-0">photo_camera</span>
                                    <div>
                                        <h4 className="font-label-md text-label-md text-on-surface font-bold">Photography at Ima Keithel</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                            The mothers of Ima Keithel are proud entrepreneurs, not museum exhibits. Always exchange pleasantries and verbally ask for permission before photographing their stalls. Purchasing even a small handmade item or local spice goes a long way.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 p-3 rounded-lg bg-surface-container-low">
                                    <span className="material-symbols-outlined text-tertiary text-[24px] shrink-0">temple_buddhist</span>
                                    <div>
                                        <h4 className="font-label-md text-label-md text-on-surface font-bold">Raas Leela Sacred Decorum</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                            Raas Leela performances are not secular entertainments; they are devotional offerings. Avoid clapping during the performance; respectful silent observance or folded palms (*Khurumba*) is the traditional greeting.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 p-3 rounded-lg bg-surface-container-low">
                                    <span className="material-symbols-outlined text-primary text-[24px] shrink-0">shield_with_heart</span>
                                    <div>
                                        <h4 className="font-label-md text-label-md text-on-surface font-bold">Fair Price Pledge</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                            Avoid aggressive bargaining with rural artisans. Our state handbook sets fair standard floor prices that ensure sustainable livelihoods for traditional craftsmen families.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-surface-container flex justify-end">
                                <button className="px-5 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors" id="dismissEtiquetteBtn" onClick={() => setEtiquetteOpen(false)}>
                                    I Understand &amp; Agree
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Interactive Quick-Booking Drawer Modal */}
                    <div className={`fixed inset-0 z-50 ${bookingOpen ? "flex" : "hidden"} bg-inverse-surface/50 backdrop-blur-sm items-center justify-center p-4`} id="bookingModal">
                        <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden flex flex-col">
                            <div className="p-5 bg-surface-container-high flex items-center justify-between">
                                <div>
                                    <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Artisan Masterclass Reservation</span>
                                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold" id="modalWorkshopTitle">{workshop.title || "Book Workshop"}</h3>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-variant" id="closeBookingBtn" onClick={() => setBookingOpen(false)}>
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                            <form className="p-6 flex flex-col gap-4" id="workshopForm" onSubmit={handleBookingSubmit}>
                                <div>
                                    <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">Preferred Date</label>
                                    <input className="w-full h-12 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary/20" required type="date" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">Participants</label>
                                        <select className="w-full h-12 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none">
                                            <option>1 Participant</option>
                                            <option>2 Participants</option>
                                            <option>3 Participants</option>
                                            <option>Private Group (4+)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">Session Slot</label>
                                        <select className="w-full h-12 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none">
                                            <option>Morning (09:30 AM)</option>
                                            <option>Afternoon (02:00 PM)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">Contact Email / Phone</label>
                                    <input className="w-full h-12 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" placeholder="name@example.com / +91" required type="text" />
                                </div>
                                <div className="p-3 rounded-lg bg-surface-container-low flex justify-between items-center text-on-surface font-label-md text-label-md">
                                    <span>Standard Contribution Fee:</span>
                                    <span className="font-bold text-primary font-headline-sm" id="modalWorkshopPrice">{workshop.price || "₹1,800"}</span>
                                </div>
                                <button className="w-full py-3 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-lg text-label-lg font-bold transition-colors mt-2 shadow-sm" type="submit">
                                    Confirm Masterclass Reservation
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
