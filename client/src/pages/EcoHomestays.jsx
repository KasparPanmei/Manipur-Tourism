import React, { useState } from 'react';

export default function HotelsAndReservation() {
    const [ecoFilter, setEcoFilter] = useState('All Eco-Stays');
    const [hotelFilter, setHotelFilter] = useState('All Stays');
    const [diningFilter, setDiningFilter] = useState('All Dining');

    return (
        <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06),0_1px_3px_0_rgba(0,0,0,0.04)]">
                <div className="h-20 max-w-[1320px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-gutter">
                    <div className="flex items-center gap-space-md shrink-0">
                        <img
                            alt="Manipur Tourism Official Emblem Kangla Sha"
                            className="h-9 w-auto object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkLIz-yJaKp9V9zhRIVaUoLUEmB50lxnjnkhYmA2BFe9RzgNS31TL4wimfTWHVb-EfKIFRXmcpVoSBi9kTk2CnPHVVYJLQbwtCv9eY2uGvYTszwIi2ryeoqmUon6KLV7V3W_C-NdWF_Qk9YzrQcnsoFd2CgN0-ltPk7UfdLeQHFT9PN5AxCWZPSbfgNbO6CfKuucd1_wmUB-eQql-CIJvIJnBaCVXxKPbdkv3Qvz9yyegxopcIT5KJ2A"
                        />
                        <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold leading-none">
                                MANIPUR TOURISM
                            </span>
                            <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase font-semibold mt-1">
                                Jewel of India | Government of Manipur
                            </span>
                        </div>
                    </div>

                    <nav className="hidden xl:flex items-center gap-space-xs p-1.5 rounded-xl bg-surface-container-low">
                        <a className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Explore Manipur
                        </a>
                        <a className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Book a Guides
                        </a>
                        <a className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Transportation
                        </a>
                        <a className="px-space-md py-2 rounded-lg font-label-md text-label-md bg-primary-container text-on-primary font-bold shadow-sm transition-colors" href="#">
                            Hotels &amp; Reservation
                        </a>
                        <a className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Traditional Shopping
                        </a>
                        <a className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Rent Item
                        </a>
                    </nav>

                    <div className="flex items-center gap-space-sm shrink-0">
                        <a
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors"
                            href="tel:18003453885"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                            <span className="font-label-sm text-label-sm font-bold tracking-normal">1800-345-3885</span>
                        </a>
                        <div className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-surface-container-low text-on-surface cursor-pointer hover:bg-surface-container transition-colors">
                            <span className="font-label-sm text-label-sm font-semibold">ENG</span>
                            <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
                        </div>
                        <button
                            aria-label="Accessibility Options"
                            className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[20px]">accessibility_new</span>
                        </button>
                        <div className="flex items-center cursor-pointer pl-1">
                            <img
                                alt="Traveler Profile"
                                className="w-8 h-8 rounded-full object-cover shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNP2SmcVVJx49AewC2mg-o8PvLqatEA5Tk6vz60H8bSJ-JmzvCVwYV1PWm8jiitLt_-YZt-fojE7q7I16qNfi6Z5fAw6w5agEyO3VpnDbgrVy3E7TkKbNmMFLqpcq1hHEQQvsTJFYjiT5wlf5Jf45lXDKNZ4mmI72vD7HhElnG6gXWIFtR7dOghMW6U1f0Na5EIxv5tNWM2UlAJJxLgOU6lzsiPW5oAo0fKNap5qJgYsjhzXHy8IT9iw"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full pt-20 bg-surface flex-1">
                <div className="flex flex-col w-full">
                    {/* Top Context Header Section */}
                    <section className="w-full bg-surface py-space-lg px-margin-mobile md:px-margin border-b border-surface-container-high">
                        <div className="max-w-[1320px] mx-auto flex flex-col gap-space-sm">
                            <div className="flex flex-wrap items-center justify-between gap-space-sm">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                                        <span className="material-symbols-outlined text-[14px]">hotel</span>
                                        DIRECTORATE OF HOSPITALITY &amp; ECO-SANCTUARIES • GOVT. OF MANIPUR
                                    </span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    <span>Verified e-ILP Direct Integration • GST Invoicing • Zero Concealed Tariffs</span>
                                </div>
                            </div>

                            <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                                <div className="max-w-3xl">
                                    <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                                        Hotels, Eco-Homestays &amp; Dining Reservation Hub
                                    </h1>
                                    <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                                        Experience regenerative hospitality across the Jewel of India. From off-grid floating phumdi stays and family farmsteads to 5-star royal palaces and authentic Meitei royal feast reservations.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2.5 rounded-xl self-start md:self-auto">
                                    <span className="material-symbols-outlined text-secondary text-[26px]">verified</span>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Hospitality Registry</span>
                                        <span className="font-label-md text-label-md text-on-surface font-bold">280+ Verified Partners</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 1: Verified Indigenous Eco-Homestays */}
                    <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin" id="eco-homestays">
                        <div className="max-w-[1320px] mx-auto">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[22px]">roofing</span>
                                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">SECTION 01 • Authentic Living</span>
                                    </div>
                                    <h2 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                                        Verified Indigenous Eco-Homestays
                                    </h2>
                                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                        Immerse yourself directly with host families. Low carbon impact, zero corporate middlemen, and 82% direct village payout.
                                    </p>
                                </div>

                                {/* Filter Pills */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {['All Eco-Stays', 'Floating Phumdi', 'Hill Orchard', 'Heritage Mud-Plaster', 'Village Farmstay'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setEcoFilter(tab)}
                                            className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${ecoFilter === tab
                                                ? 'bg-primary text-on-primary shadow-sm'
                                                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Homestay Cards Grid (4 Genuine Stays) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
                                {/* Homestay 1 */}
                                <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <img
                                            alt="Traditional bamboo cottage built atop a floating circular phumdi island on tranquil Loktak Lake Manipur"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrj74iMpMuOalfTsIyKjt_zP2HhtHquUd8lJMGQfkG2o6TQ736Z_0emZaHayT1OoXd0c71dBupM9SEnhZr16wpX6YW7U9LKmLhreBn92luoS_sa01hwVkY5aycetBAzu8oPq0O-bhwsvAnxKhDoJrzKAiTjVF-TRlH44lWPzUY0MoFjJBV0FVBQe3AyvvI8RLsctTSMCpKE_H0NBMu9csnAiOoVndzAp0LmeTwsqcRljJOx8RXMfqvPQ"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                            <span className="px-2.5 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm">Council Platinum</span>
                                            <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">82% to Host Family</span>
                                        </div>
                                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white font-body-sm text-body-sm">
                                            <span className="flex items-center gap-1 font-semibold">
                                                <span className="material-symbols-outlined text-[16px] text-yellow-400">star</span> 4.96 (182)
                                            </span>
                                            <span className="text-xs text-white/90">Bishnupur • Loktak</span>
                                        </div>
                                    </div>
                                    <div className="p-space-md flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <img
                                                    alt="Host Oinam Sanatomba"
                                                    className="w-6 h-6 rounded-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNP2SmcVVJx49AewC2mg-o8PvLqatEA5Tk6vz60H8bSJ-JmzvCVwYV1PWm8jiitLt_-YZt-fojE7q7I16qNfi6Z5fAw6w5agEyO3VpnDbgrVy3E7TkKbNmMFLqpcq1hHEQQvsTJFYjiT5wlf5Jf45lXDKNZ4mmI72vD7HhElnG6gXWIFtR7dOghMW6U1f0Na5EIxv5tNWM2UlAJJxLgOU6lzsiPW5oAo0fKNap5qJgYsjhzXHy8IT9iw"
                                                />
                                                <span className="font-label-sm text-label-sm text-outline">Host: Oinam Sanatomba &amp; Family</span>
                                            </div>
                                            <h3 className="font-headline-sm text-[19px] text-on-surface font-bold leading-snug">Sendra Island Floating Phumdi Retreat</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Restful bamboo stilt huts built over living bio-islands with solar off-grid power and bio-sand filtration.
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">wb_sunny</span> Solar Off-grid
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Bio-toilet</span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Fresh Lake Meals</span>
                                            </div>
                                        </div>
                                        <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹3,450</span>
                                                <span className="font-body-sm text-body-sm text-outline">/night</span>
                                            </div>
                                            <button className="px-3.5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-bold transition-colors">
                                                Reserve Homestay
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Homestay 2 */}
                                <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <img
                                            alt="Rustic highland timber cottage in Ukhrul Manipur"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsz083T-1qzJmCJ3c_-gAdRf3KtmeIavRhYTe8FU5yCydceBfhb20YcLSfpT4z1f5zSlygiPbFI0LFplRTIRSRceZgka3xdKLJOvW1A6M792wkVX3LDM9BUnaMC2QdQiUqJMOX5QM1uyiWDWqC15v4R27rDnUS4OfKSvEAyPyMn-119F2JiPiWy6_TboQRWWo-jRlWHQdOFteAqWfGoSZQV9co7dq48Bd9SR03r36KJddHcGgzLWhunw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                            <span className="px-2.5 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm">Highland Gold</span>
                                            <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">82% to Host Family</span>
                                        </div>
                                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white font-body-sm text-body-sm">
                                            <span className="flex items-center gap-1 font-semibold">
                                                <span className="material-symbols-outlined text-[16px] text-yellow-400">star</span> 4.92 (114)
                                            </span>
                                            <span className="text-xs text-white/90">Ukhrul • Shirui Peak</span>
                                        </div>
                                    </div>
                                    <div className="p-space-md flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <img
                                                    alt="Host Vashum Shangrei"
                                                    className="w-6 h-6 rounded-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPYSluoyueewB0OKWdluiU9-CxFtFxxWZ-mRIMcxTtQTXo-di8WhgrgXz7mhgSMBJyIG76R3bu7XnujYFakYuvDM7xfRfH2uLMkgh_3sWlaXotQyKAPRfO5J_aMWALvd0AJblEcr8fPrGL2HqomBCf79Xp8_2mn0EyjY8ga2OratV-73kwhpoG87_d53VV1I3dQZ2DLoPI-elTIx4cDmimDfad4QP_WH7UGJjn1dt4nK-S7OlBr21ISg"
                                                />
                                                <span className="font-label-sm text-label-sm text-outline">Host: Vashum Shangrei</span>
                                            </div>
                                            <h3 className="font-headline-sm text-[19px] text-on-surface font-bold leading-snug">Shirui Mountain Pine Farmstay</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Perched inside organic wild pine groves beneath Shirui Kashong Peak. Authentic family hearth fireplace and wild forest honey tasting.
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">fireplace</span> Fireplace Hearth
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Orchard Honey</span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Trek Basecamp</span>
                                            </div>
                                        </div>
                                        <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹2,800</span>
                                                <span className="font-body-sm text-body-sm text-outline">/night</span>
                                            </div>
                                            <button className="px-3.5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-bold transition-colors">
                                                Reserve Homestay
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Homestay 3 */}
                                <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <img
                                            alt="Traditional Meitei earthen home in Andro village Manipur"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApUt1WPs-Kre1EiMLkDIdnPcppxCIUzT3ql4X6qRWZg0EU8FYUoJdlZSWaGpRBkohptW4nhsAoDfvmpEq9es3alS_4mPy7r8YRr1ItWj6BYaBQEGoAKZ3hU7QEtZE_n3-musMOU3pthnDEeGVYUH--X7Absn1Pvb2l9b0c4BTC7d0ts7z6BvUp5Os2z699KB8SulkuXjsNRNqZOmgYdB4UwgfrdHUidG5E3_WyZYvFOB8ltZXmB5qEzw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                            <span className="px-2.5 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm">Heritage Vernacular</span>
                                            <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">82% to Host Family</span>
                                        </div>
                                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white font-body-sm text-body-sm">
                                            <span className="flex items-center gap-1 font-semibold">
                                                <span className="material-symbols-outlined text-[16px] text-yellow-400">star</span> 4.97 (153)
                                            </span>
                                            <span className="text-xs text-white/90">Imphal East • Andro</span>
                                        </div>
                                    </div>
                                    <div className="p-space-md flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <img
                                                    alt="Host Chandra Devi"
                                                    className="w-6 h-6 rounded-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKiqioC_YDIbCW4sYBwb2yy5G_2QkB9YcAhZpGqJEXIsQn6T1x9QbnjZlpLqQQRLYvh6YiiX0vuMUSau_GmIfdEwLVpGXpr393Ceg82wVsAJ-9VRaZ_NH8guAqY-XhD3aYXn4cd_WdVwtQRvsl3COnucXCGNr-t1x4e7GzefJ_DIdZNR5Z78EqXDpvtZ_yO-zmt9O7hfNTlL1MVewvDE88AkFPD8EyOKj3hjmMyEVvi1zt5OmOiZG_kQ"
                                                />
                                                <span className="font-label-sm text-label-sm text-outline">Host: Chandra Devi &amp; Matriarchs</span>
                                            </div>
                                            <h3 className="font-headline-sm text-[19px] text-on-surface font-bold leading-snug">Andro Earthen Heritage Abode</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Ancient mud-plastered walls and coil pottery courtyard steps from the 1000-year sacred eternal Meitei clan hearth.
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Sacred Flame Tour
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Pottery Class</span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Courtyard Dining</span>
                                            </div>
                                        </div>
                                        <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹2,400</span>
                                                <span className="font-body-sm text-body-sm text-outline">/night</span>
                                            </div>
                                            <button className="px-3.5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-bold transition-colors">
                                                Reserve Homestay
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Homestay 4 */}
                                <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <img
                                            alt="Traditional Naga tribal wooden stilt home in Senapati Dzükou foothills"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsz083T-1qzJmCJ3c_-gAdRf3KtmeIavRhYTe8FU5yCydceBfhb20YcLSfpT4z1f5zSlygiPbFI0LFplRTIRSRceZgka3xdKLJOvW1A6M792wkVX3LDM9BUnaMC2QdQiUqJMOX5QM1uyiWDWqC15v4R27rDnUS4OfKSvEAyPyMn-119F2JiPiWy6_TboQRWWo-jRlWHQdOFteAqWfGoSZQV9co7dq48Bd9SR03r36KJddHcGgzLWhunw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                            <span className="px-2.5 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm">Tribal Heritage</span>
                                            <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">82% to Host Family</span>
                                        </div>
                                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white font-body-sm text-body-sm">
                                            <span className="flex items-center gap-1 font-semibold">
                                                <span className="material-symbols-outlined text-[16px] text-yellow-400">star</span> 4.94 (98)
                                            </span>
                                            <span className="text-xs text-white/90">Senapati • Dzükou Valley</span>
                                        </div>
                                    </div>
                                    <div className="p-space-md flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <img
                                                    alt="Host Lunkhim Haokip"
                                                    className="w-6 h-6 rounded-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjPmIi7YxALJ3FEjElo5ho5Yq_oSWlvHZLH_uXg0rmxb-ph7kgVDMDLNWJ6eI8cM7C6GQRm2_k3sDRC59g4dPhHAJWGHfUz-GyXbo0R0TQQDxyXF5GuIC0Jq3rFZgctZhmw-zKIKmYGf4J-VvG5KuNBw7dps4oTp2DyvpbWrtGiPWYJQSidyPEGkLcld9nAolmMalzz6GiMbyxwoZySpQ_jNuyEvda8JWbKlGPDLi1gR_Jdy2UGofiyg"
                                                />
                                                <span className="font-label-sm text-label-sm text-outline">Host: Pa Haokip Clan</span>
                                            </div>
                                            <h3 className="font-headline-sm text-[19px] text-on-surface font-bold leading-snug">Dzükou Foothills Tribal Homestay</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Eco-constructed cedarwood lodge on the edge of the Senapati alpine pass. Forest foraging with family elders and indigenous herbal teas.
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">eco</span> 100% Organic Meals
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Trail Guide Access</span>
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Mountain Terrace</span>
                                            </div>
                                        </div>
                                        <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹2,200</span>
                                                <span className="font-body-sm text-body-sm text-outline">/night</span>
                                            </div>
                                            <button className="px-3.5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-bold transition-colors">
                                                Reserve Homestay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: Categorized Hotels & Resorts */}
                    <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin" id="hotels-resorts">
                        <div className="max-w-[1320px] mx-auto">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[22px]">apartment</span>
                                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">SECTION 02 • Certified Hospitality</span>
                                    </div>
                                    <h2 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                                        Categorized Hotels &amp; Resorts
                                    </h2>
                                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                        Hand-picked government-registered stays across Imphal, Bishnupur, Ukhrul, and Churachandpur districts.
                                    </p>
                                </div>

                                {/* Hotel Category Filter Tabs */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {['All Stays', 'Luxury Heritage & 5-Star', 'Comfort Boutique Stays', 'Moderate & Eco-Lodge'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setHotelFilter(tab)}
                                            className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${hotelFilter === tab
                                                ? 'bg-primary text-on-primary shadow-sm'
                                                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Hotels Search & Filter Strip */}
                            <div className="p-space-md rounded-2xl bg-surface-container-low mb-space-lg grid grid-cols-1 md:grid-cols-4 gap-space-sm items-center">
                                <div className="flex flex-col gap-1">
                                    <label className="font-label-sm text-label-sm uppercase font-semibold text-outline">District / City</label>
                                    <div className="relative">
                                        <select
                                            defaultValue="Imphal (Capital Precinct)"
                                            className="w-full h-11 pl-3 pr-8 rounded-lg bg-surface-container-lowest text-on-surface font-body-md appearance-none border-0 focus:ring-2 focus:ring-primary/20"
                                        >
                                            <option>Imphal (Capital Precinct)</option>
                                            <option>Bishnupur &amp; Loktak Lake</option>
                                            <option>Ukhrul (Highland District)</option>
                                            <option>Churachandpur &amp; Khuga</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-outline text-[18px]">expand_more</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="font-label-sm text-label-sm uppercase font-semibold text-outline">Dates &amp; Stay Duration</label>
                                    <input
                                        className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md border-0 focus:ring-2 focus:ring-primary/20"
                                        type="text"
                                        defaultValue="15 Oct - 18 Oct (3 Nights)"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="font-label-sm text-label-sm uppercase font-semibold text-outline">Travelers &amp; Room Tier</label>
                                    <div className="relative">
                                        <select
                                            defaultValue="2 Adults • 1 Premium King Room"
                                            className="w-full h-11 pl-3 pr-8 rounded-lg bg-surface-container-lowest text-on-surface font-body-md appearance-none border-0 focus:ring-2 focus:ring-primary/20"
                                        >
                                            <option>2 Adults • 1 Premium King Room</option>
                                            <option>1 Adult • 1 Deluxe Solo Room</option>
                                            <option>4 Adults • 2 Connecting Suites</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-outline text-[18px]">expand_more</span>
                                    </div>
                                </div>

                                <div className="flex items-end">
                                    <button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">filter_alt</span>
                                        <span>Filter Available Rooms</span>
                                    </button>
                                </div>
                            </div>

                            {/* Hotel Cards Grid (Luxury, Comfort, Moderate) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                                {/* Luxury Card */}
                                <div className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden border border-surface-container-high transition-transform duration-300 hover:-translate-y-1.5">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            alt="Luxury 5-star heritage hotel in Imphal Manipur India"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP_9IJf3L69TTm9zXWaanLG77VFn2ZOPMXwodHGWycgDtczD3DGt0C4KwJrPHOSZAjEYZ74eAOvh-E0xFcnQwSIqqVGNoISoOY59wb0iCaxidr5yYSm9rPJciltr5p0engqO8WDXSRujYb41v87k97nL4SM3vFUX8DYgqFD6PSkYWUoytAF90JKo-iCOxTseK_rI1m4MzSrYvN-SvWgJ7YktOo-A1JDfhVoqHTK_7uTxfl6hGgchKn"
                                        />
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-tertiary-container">stars</span> 5-Star Heritage Luxury
                                            </span>
                                            <span className="px-2.5 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">Royal Protocol</span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white font-label-sm text-label-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-yellow-400 text-[14px]">star</span> 4.98 (420 reviews)
                                        </div>
                                    </div>
                                    <div className="p-space-lg flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
                                                <span>IMPHAL PALACE ENCLAVE</span>
                                                <span className="text-secondary font-semibold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">verified</span> e-ILP Fast Track
                                                </span>
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">The Imperial Imphal &amp; Heritage Palace</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Stately neoclassical palatial hotel set within 14 acres of manicured flora and royal water lily ponds. Features premier butler concierge and vintage Kangla transfers.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">54 sq.m Heritage Suite</span>
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">Fine Dining Room</span>
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">Heated Lap Pool</span>
                                            </div>
                                            <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-semibold">
                                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                <span>Free Cancellation up to 24h • Directorate Verified</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-surface-container flex items-baseline justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹7,800</span>
                                                <span className="font-body-sm text-body-sm text-outline">/night + taxes</span>
                                            </div>
                                            <button className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow transition-colors">
                                                Book Room
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Comfort Card */}
                                <div className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden border border-surface-container-high transition-transform duration-300 hover:-translate-y-1.5">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            alt="Comfortable contemporary boutique hotel room in Imphal Manipur"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtGmX_yfYP_-2fQK49oBncwFLBrYbwW3Gln9EwJU0vGrMk5Oh46BZkNpuOEmyH0Zmr-8V3b1F6blhr1181Um3CXDpkTw48Yw6t43p3ibgSQYf3NVm9xp5hLKVaokZtLHLfNl6ivoddiOrACPgYGVH2ZpAqQbBHx50A55yQk2cRz2vLfM2wv-2XhUwzpXBmPTCQ2QUdSb_x2kCXZ_ivxdco0zpQ6MhHExZT5eAi9oPQvuyqVFIxR8HZ"
                                        />
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-primary">local_florist</span> Boutique Comfort
                                            </span>
                                            <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">Indigenous Craft</span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white font-label-sm text-label-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-yellow-400 text-[14px]">star</span> 4.89 (310 reviews)
                                        </div>
                                    </div>
                                    <div className="p-space-lg flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
                                                <span>SANJENTHONG VALLEY VIEW</span>
                                                <span className="text-secondary font-semibold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">verified</span> e-ILP Verified
                                                </span>
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Classic Grande Valley View Boutique</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Airy contemporary suites hand-adorned with authentic handloom Phanek and Kabui tribal tapestries. Private wooden balconies overlooking rolling mist valleys.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">Valley View Balcony</span>
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">Teak Writing Desk</span>
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">Artisan Mini-Bar</span>
                                            </div>
                                            <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-semibold">
                                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                <span>Free Cancellation up to 48h • Directorate Verified</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-surface-container flex items-baseline justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹4,200</span>
                                                <span className="font-body-sm text-body-sm text-outline">/night + taxes</span>
                                            </div>
                                            <button className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow transition-colors">
                                                Book Room
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Moderate Card */}
                                <div className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden border border-surface-container-high transition-transform duration-300 hover:-translate-y-1.5">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            alt="Rustic highland timber cottage in Ukhrul Manipur"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsz083T-1qzJmCJ3c_-gAdRf3KtmeIavRhYTe8FU5yCydceBfhb20YcLSfpT4z1f5zSlygiPbFI0LFplRTIRSRceZgka3xdKLJOvW1A6M792wkVX3LDM9BUnaMC2QdQiUqJMOX5QM1uyiWDWqC15v4R27rDnUS4OfKSvEAyPyMn-119F2JiPiWy6_TboQRWWo-jRlWHQdOFteAqWfGoSZQV9co7dq48Bd9SR03r36KJddHcGgzLWhunw"
                                        />
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-outline">hotel_class</span> Moderate &amp; Basecamp
                                            </span>
                                            <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">Trekker Hub</span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white font-label-sm text-label-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-yellow-400 text-[14px]">star</span> 4.78 (196 reviews)
                                        </div>
                                    </div>
                                    <div className="p-space-lg flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
                                                <span>UKHRUL SHIRUI BASE</span>
                                                <span className="text-secondary font-semibold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">verified</span> e-ILP Verified
                                                </span>
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Shirui Orchid Residency &amp; Basecamp</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Warm pine-paneled rooms equipped with heated spring water, dry boot racks, and a communal fireside trekker lounge for Shirui Kashong and Dzükou climbers.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">Heated Bed Warmers</span>
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">Trekkers Locker</span>
                                                <span className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface">Community Firepit</span>
                                            </div>
                                            <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-semibold">
                                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                <span>Free Cancellation up to 24h • Directorate Verified</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-surface-container flex items-baseline justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹2,100</span>
                                                <span className="font-body-sm text-body-sm text-outline">/night + taxes</span>
                                            </div>
                                            <button className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow transition-colors">
                                                Book Room
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: Curated Restaurants, Food Hotels & Local Culinary Spots */}
                    <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin" id="dining-culinary">
                        <div className="max-w-[1320px] mx-auto">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[22px]">restaurant</span>
                                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">SECTION 03 • Gastronomic Heritage</span>
                                    </div>
                                    <h2 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                                        Curated Restaurants &amp; Culinary Spots
                                    </h2>
                                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                        Taste genuine indigenous flavors. From royal Meitei feasts and wild mountain herb broths to exquisite floating tea lounges.
                                    </p>
                                </div>

                                {/* Dining Category Filters */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {['All Dining', 'Local Manipuri Cuisine (Traditional Thali)', 'Fine Dining & Luxury', 'Artisan Cafes & Tea Lounges'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setDiningFilter(tab)}
                                            className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${diningFilter === tab
                                                ? 'bg-primary text-on-primary shadow-sm'
                                                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dining Spotlight Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                                {/* Culinary Spotlight 1: Local Manipuri Cuisine */}
                                <div className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden border border-surface-container-high transition-transform duration-300 hover:-translate-y-1.5">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            alt="Authentic Manipuri traditional cuisine thali spread served on brass plates and banana leaf"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCziBqaXkpkHjVYdU1b3_I6xuH26eMc1wQiFw0DnfGQcr_SXNVgnMmaS2Vk5CD8O6SGuVUdCL-OecFyTJsuSQ5jB-dxBrajbgss8llx9kwcmSQpKc4ThMR2ZhJG-N8LyM44Dk6P6zKIHkwQJ-vQ_y2f_z79DZU4HvBcJXTZuAL8AaskvexH_suT2phRo3x2pacpU_JOruvVwhFi3kHNojoMLJvba2vIsNskjuQsmZGS07Xx44Z2Y3Bk"
                                        />
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm">Traditional Meitei Kitchen</span>
                                            <span className="px-2.5 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">GI-Tagged Chak-hao</span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white font-label-sm text-label-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-yellow-400 text-[14px]">star</span> 4.95 (510 reviews)
                                        </div>
                                    </div>
                                    <div className="p-space-lg flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
                                                <span>URIPOK, IMPHAL WEST</span>
                                                <span className="text-primary font-semibold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 11:30 AM - 10:00 PM
                                                </span>
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Chak-luk Authentic Meitei Kitchen</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                The canonical indigenous feast. Includes nutrient-dense Chak-hao black rice, boiled medicinal Kangsoi vegetable broth, freshwater Nga Thongba curry, and fermented bamboo shoot Eromba.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm font-bold">Farm-to-Table</span>
                                                <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">Pure Organic</span>
                                                <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">Gluten-Free Rice</span>
                                            </div>
                                            <div className="mt-3 p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2.5">
                                                <span className="material-symbols-outlined text-secondary text-[20px]">person_apron</span>
                                                <p className="font-body-sm text-xs text-on-surface-variant">
                                                    Curated by <strong>Chef Ibechaobi Devi</strong>, guarding 4th-generation royal Meitei court recipes.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-surface-container flex items-baseline justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹450</span>
                                                <span className="font-body-sm text-body-sm text-outline">/Royal Thali</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md font-bold transition-colors">
                                                    Pre-Order
                                                </button>
                                                <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-colors">
                                                    Reserve Table
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Culinary Spotlight 2: Fine Dining & Luxury */}
                                <div className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden border border-surface-container-high transition-transform duration-300 hover:-translate-y-1.5">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            alt="Fine dining luxury restaurant interior in Manipur"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCof-8RxaxquTWQTzYRvFDfdOM8D2w8TJrBWiDMubAd15xpy-WeEuTgp0Xge1XOGotIrA5gYn12VWRE7OR9-B9455w-nbHiJiWDGxGf7Sm-Jq-vpUCIMukqqVr6PGowPpEe8QuzG_FMzkXy_-NrHFSIpns4Bg4iqZF4a3XJ_Lsuj1fBEvnRx9hFJh0IMLjYdTIQC0Cat4HwH5QX7CC-19iXNDc6pWZAMvoWM4FYyY--04USkWfIQIDM"
                                        />
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm">Gourmet Heritage Fusion</span>
                                            <span className="px-2.5 py-1 rounded-full bg-tertiary-container text-on-primary font-label-sm text-label-sm font-bold">Sommelier Curated</span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white font-label-sm text-label-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-yellow-400 text-[14px]">star</span> 4.98 (280 reviews)
                                        </div>
                                    </div>
                                    <div className="p-space-lg flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
                                                <span>KANGLA WEST GATE, IMPHAL</span>
                                                <span className="text-primary font-semibold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 06:30 PM - 11:00 PM
                                                </span>
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">The Royal Kangla Dining Pavilion</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Atmospheric high-ceiling fine dining adorned with hand-carved dragon motifs and warm brass chandeliers. Modern interpretations of heirloom Manipuri fish, wild mushroom, and smoked duck dishes.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm font-bold">Fine Dining</span>
                                                <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">Wine Pairing</span>
                                                <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">Private Dining Salon</span>
                                            </div>
                                            <div className="mt-3 p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2.5">
                                                <span className="material-symbols-outlined text-secondary text-[20px]">restaurant_menu</span>
                                                <p className="font-body-sm text-xs text-on-surface-variant">
                                                    Executive Chef <strong>Bikramjit Singh</strong>, former chef de cuisine at Taj Bengal &amp; culinary scholar.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-surface-container flex items-baseline justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹1,800</span>
                                                <span className="font-body-sm text-body-sm text-outline">/for two</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md font-bold transition-colors">
                                                    Pre-Order
                                                </button>
                                                <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-colors">
                                                    Reserve Table
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Culinary Spotlight 3: Artisan Cafe & Tea Bar */}
                                <div className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-lg overflow-hidden border border-surface-container-high transition-transform duration-300 hover:-translate-y-1.5">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            alt="Traditional bamboo cottage on tranquil Loktak Lake Manipur"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrj74iMpMuOalfTsIyKjt_zP2HhtHquUd8lJMGQfkG2o6TQ736Z_0emZaHayT1OoXd0c71dBupM9SEnhZr16wpX6YW7U9LKmLhreBn92luoS_sa01hwVkY5aycetBAzu8oPq0O-bhwsvAnxKhDoJrzKAiTjVF-TRlH44lWPzUY0MoFjJBV0FVBQe3AyvvI8RLsctTSMCpKE_H0NBMu9csnAiOoVndzAp0LmeTwsqcRljJOx8RXMfqvPQ"
                                        />
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm">Lakefront Artisan Lounge</span>
                                            <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">100% Phumdi Floating</span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white font-label-sm text-label-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-yellow-400 text-[14px]">star</span> 4.91 (335 reviews)
                                        </div>
                                    </div>
                                    <div className="p-space-lg flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
                                                <span>SENDRA JETTY, LOKTAK LAKE</span>
                                                <span className="text-primary font-semibold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">schedule</span> 07:00 AM - 07:00 PM
                                                </span>
                                            </div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Phumdi Floating Cafe &amp; Specialty Tea Bar</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                                Sip rare wild-foraged Ukhrul highland green teas and freshly roasted indigenous shade coffees right above the floating ringed phumdis. Serves hot spicy Singju salad and black rice cakes.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm font-bold">Artisan Tea Lounge</span>
                                                <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">Black Rice Bakery</span>
                                                <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">Sunset Deck</span>
                                            </div>
                                            <div className="mt-3 p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2.5">
                                                <span className="material-symbols-outlined text-secondary text-[20px]">coffee</span>
                                                <p className="font-body-sm text-xs text-on-surface-variant">
                                                    Brewed by artisan sommelier <strong>Linthoingambi</strong>, serving single-estate wild harvest roasts.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-surface-container flex items-baseline justify-between">
                                            <div>
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">₹250</span>
                                                <span className="font-body-sm text-body-sm text-outline">/avg per guest</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md font-bold transition-colors">
                                                    Menu &amp; Snacks
                                                </button>
                                                <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-colors">
                                                    Reserve Deck Table
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: Interactive Transparent Revenue & Legal Impact Ledger */}
                    <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin">
                        <div className="max-w-[1320px] mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                                {/* Left Column: Impact Breakdown Graph & Logic */}
                                <div className="lg:col-span-7 flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[22px]">account_balance</span>
                                        <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Public Financial Transparency</span>
                                    </div>
                                    <h2 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                                        Transparent Community Revenue Ledger
                                    </h2>
                                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                        Every rupee processed on this portal is audited directly by the State Comptroller. We eliminate commissions to ensure funds directly regenerate local rural livelihoods.
                                    </p>

                                    {/* Visual Segmented Progress Bar & Allocation */}
                                    <div className="mt-space-lg p-space-md rounded-2xl bg-surface-container-low">
                                        <div className="flex items-center justify-between text-label-md font-bold mb-3">
                                            <span>Fund Allocation Distribution (Per ₹1,000 Spent)</span>
                                            <span className="text-primary">100% Traceable</span>
                                        </div>

                                        <div className="w-full h-5 rounded-full overflow-hidden flex bg-surface-container">
                                            <div className="h-full bg-primary" style={{ width: '82%' }} title="82% Direct to Host & Guide"></div>
                                            <div className="h-full bg-tertiary-fixed-dim" style={{ width: '10%' }} title="10% Conservation Fund"></div>
                                            <div className="h-full bg-secondary" style={{ width: '5%' }} title="5% EV Infrastructure"></div>
                                            <div className="h-full bg-outline" style={{ width: '3%' }} title="3% Tourist Safety Police"></div>
                                        </div>

                                        {/* Legend Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-md">
                                            <div className="flex items-start gap-2.5">
                                                <div className="w-3.5 h-3.5 rounded-full bg-primary shrink-0 mt-1"></div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md font-bold text-on-surface">82% Direct Host &amp; Homestay Family Payout</span>
                                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Deposited in verified Jan Dhan/Direct DBT accounts within 4 hours.</span>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5">
                                                <div className="w-3.5 h-3.5 rounded-full bg-tertiary-fixed-dim shrink-0 mt-1"></div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md font-bold text-on-surface">10% Village Conservation &amp; Wetland Fund</span>
                                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Supports Loktak Phumdi cleaning &amp; Shirui Kashong ridge restoration.</span>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5">
                                                <div className="w-3.5 h-3.5 rounded-full bg-secondary shrink-0 mt-1"></div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md font-bold text-on-surface">5% Solar &amp; Clean Water Upkeep</span>
                                                    <span className="font-body-sm text-body-sm text-on-surface-variant">District battery charging stations &amp; off-grid solar homestay micro-grids.</span>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5">
                                                <div className="w-3.5 h-3.5 rounded-full bg-outline shrink-0 mt-1"></div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md font-bold text-on-surface">3% Tourist Police Escort System</span>
                                                    <span className="font-body-sm text-body-sm text-on-surface-variant">24/7 dedicated distress helpline &amp; mountain medical kits maintenance.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Safety Assurance & Guarantee Box */}
                                <div className="lg:col-span-5 flex flex-col gap-space-md">
                                    <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="w-10 h-10 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[24px]">verified_user</span>
                                            </span>
                                            <div>
                                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Traveler Safety &amp; Legal Guarantee</h3>
                                                <span className="font-body-sm text-body-sm text-outline">Government of Manipur Protected Booking</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                                <span><strong>Instant DigiLocker e-ILP:</strong> Inner Line Permit pre-approval automatically linked to all booked accommodations, stays, and dining bookings.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                                <span><strong>Free 48-Hour Cancellation:</strong> 100% refund on homestay and hotel room reservations up to 48 hours prior to check-in.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                                <span><strong>Government Verified Receipts:</strong> Official GST invoices issued on Directorate letterhead with verifiable QR verification.</span>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">24/7 Tourist Police Helpdesk</span>
                                                <span className="font-label-lg text-label-lg text-primary font-bold">1800-345-3885 / 0385-2458140</span>
                                            </div>
                                            <a
                                                className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors"
                                                href="tel:18003453885"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">call</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-surface-container-low mt-auto pt-space-xl pb-space-lg">
                <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
                        <div className="flex flex-col gap-space-sm">
                            <div className="flex items-center gap-space-xs">
                                <span className="material-symbols-outlined text-primary text-[28px]">assured_workload</span>
                                <span className="font-headline-sm text-headline-sm text-primary font-bold">Directorate of Tourism</span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                Official Portal of Department of Tourism, Government of Manipur. Fostering regenerative eco-tourism, cultural preservation, and world-class heritage expeditions across the Jewel of India.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold tracking-wider">ISO 9001:2015</span>
                                <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold tracking-wider">GSTC ACCREDITED</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-space-sm">
                            <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">Travelers Essentials</span>
                            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                                <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                                    <span className="material-symbols-outlined text-[16px] text-primary">verified</span> Inner Line Permit (ILP) Portal
                                </a>
                                <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                                    <span className="material-symbols-outlined text-[16px] text-primary">support_agent</span> 24/7 Tourist Assistance Booths
                                </a>
                                <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                                    <span className="material-symbols-outlined text-[16px] text-primary">nature_people</span> Eco-Tourism Conservation Charter
                                </a>
                                <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                                    <span className="material-symbols-outlined text-[16px] text-primary">co2</span> Carbon-Neutral Footprint Offset
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-space-sm">
                            <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">District Tourism Helpdesks</span>
                            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-on-surface">Imphal West &amp; East</span>
                                    <span>0385-2458140</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-on-surface">Bishnupur (Loktak)</span>
                                    <span>03879-222301</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-on-surface">Ukhrul (Shirui Lily)</span>
                                    <span>03876-222814</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-on-surface">Churachandpur</span>
                                    <span>03874-233910</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-space-sm">
                            <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">Responsible Stewardship</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                Protect the floating islands of Loktak and the endangered Sangai brow-antlered deer. Follow zero single-use plastic guidelines across sanctuaries.
                            </p>
                            <div className="p-3 rounded-lg bg-surface-container flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary text-[24px]">shield</span>
                                <div className="flex flex-col">
                                    <span className="font-label-md text-label-md text-on-surface font-semibold">Tourist Police Cell</span>
                                    <span className="font-body-sm text-body-sm text-secondary font-bold">+91 385 2441010</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="font-body-sm text-body-sm text-outline">© 2025 Directorate of Tourism, Government of Manipur. All Rights Reserved.</p>
                        <div className="flex items-center gap-space-md font-body-sm text-body-sm text-outline">
                            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                            <a className="hover:text-primary transition-colors" href="#">RTI Disclosures</a>
                            <a className="hover:text-primary transition-colors" href="#">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
