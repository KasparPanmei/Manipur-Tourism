import React, { useState, useEffect } from 'react';

// --- DATA ---
const GUIDES = [
    {
        id: 'dr-tomba',
        name: 'Dr. Tomba Meitei',
        title: 'Meitei Royalty Historian & Epigraphist',
        circuit: 'Kangla Fort & Royal Sanctums',
        lic: 'Lic #MN-CUL-0115',
        exp: '12 Yrs Exp.',
        ratingScore: '4.98',
        reviews: '214',
        badge: 'Gold Certified',
        badgeIcon: 'workspace_premium',
        badgeColor: 'text-primary',
        tariff: '₹1,800',
        tariffType: '/ half-day',
        basePrice: 1800,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARFx7DSVpavD1etgZLKOd1nggKQdUEQEl5oXCbje7F6GKIvF0oQNxRiQPHLUJb8Ni5BdT1To1EAiKUWQw4N-YQ2qQzrI8j4tMBmQZ8EbvxMSS-epjoX8GGHZpVNeuXBmgEJZ9mJBYsppvVVt9ygk5MnHESrl14a6ilgIOZT3-LkopvaL7VMkQHrqldT3PxIyltDPjOHwBU_r__3WA8j3n9fmJPSfWeN_A-Bvm7mTS4B_GvGvS6ZFqFIA',
        bio: 'Ph.D. in Classical Meitei Epigraphy and Manipuri Royal Archives from Manipur University. Over twelve years guiding visiting archaeologists, university research fellows, and cultural dignitaries through the sacred inner sanctums of Kangla Fort, the Govindaji Temple complex, and ancient stone megaliths across the Imphal Valley.',
        langs: ['Meiteilon (Native)', 'English (Fluent)', 'Bengali', 'Hindi'],
        creds: ['Directorate of Art & Culture Level-IV Accreditation', 'Exclusive Kangla Fort Royal Archives Escort Pass', 'Manipur State Archaeological Council Member', 'Wilderness & Cultural First Responder (WFR)'],
        gear: ['Archival White Gloves for Palm-Leaf Manuscripts', 'Historical Magnification Loupes', 'Bilingual Printed Meitei Mayek Inscription Booklets', 'Emergency First-Aid Trauma Pouch'],
        tags: [
            { label: 'Meiteilon (Native)', style: 'bg-surface-container text-on-surface' },
            { label: 'English (Fluent)', style: 'bg-surface-container text-on-surface' },
            { label: 'Kangla VIP Entry Access', style: 'bg-primary-fixed text-on-primary-fixed', icon: 'key' }
        ]
    },
    {
        id: 'lunkhim',
        name: 'Lunkhim Haokip',
        title: 'High-Altitude Mountaineer & Search & Rescue',
        circuit: 'Dzükou Valley Ridge Expedition',
        lic: 'Lic #MN-TRK-1093',
        exp: '9 Yrs Exp.',
        ratingScore: '4.96',
        reviews: '188',
        badge: 'Alpine Lead & SAR',
        badgeIcon: 'altitude',
        badgeColor: 'text-secondary',
        tariff: '₹2,500',
        tariffType: '/ day',
        basePrice: 2500,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hIUKaQCphOH3O_xNTE8wtVHoFSx50E7UV_zzx82Tzj5fxzy1kwDXdvPnBWcFXF3M4985_hMBh2Ke8r_d368zA5_HR5rWTlFOnebMlWm4Sd_5SMZKzen_Z4fe5Pyys_Y40u1d0HvTMhLeVJsYjCFuwGZOdeQ1tHNk4di56oyCbMToVJ5dIMQ0YnnJtodZR3fw6RbA776JPGgbrrwIgrCpk1l9etwmMwaqehG8thytiOvPm4lZVHXpNg',
        bio: 'Elite high-altitude trek guide and certified search-and-rescue leader with 260+ successful crossings of the Dzükou Valley South Ridge corridor, Mount Iso, and Shirui Kashong.',
        langs: ['English', 'Thadou-Kuki', 'Nagamese', 'Hindi', 'Meiteilon'],
        creds: ['Wilderness First Responder (WFR) - NOLS Certified', 'Manipur Mountaineering Institute (MMTA) Gold Medalist', 'Leave-No-Trace Master Educator'],
        gear: ['Garmin InReach Satellite SOS Communicator', 'Pulse Oximeter & High-Altitude Medical Kit', 'Emergency Thermal Mylar Bivy Sacks'],
        tags: [
            { label: 'Thadou-Kuki', style: 'bg-surface-container text-on-surface' },
            { label: 'WFR Certified', style: 'bg-secondary-fixed text-on-secondary-fixed', icon: 'emergency' }
        ]
    },
    {
        id: 'memi',
        name: 'Memi Sharon',
        title: 'Tangkhul Botanical Custodian & Shirui Lily Specialist',
        circuit: 'Shirui Kashong & Longpi Craft Trail',
        lic: 'Lic #MN-BOT-0521',
        exp: '8 Yrs Exp.',
        ratingScore: '4.99',
        reviews: '165',
        badge: 'Botanical Forager',
        badgeIcon: 'eco',
        badgeColor: 'text-primary',
        tariff: '₹2,000',
        tariffType: '/ day',
        basePrice: 2000,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbjCc2YXNjVYEw_YH_NErMa-fNM3kRflxGZwow4u6vjXUfRpiYcUsfJGDcig5GNL5wJWqFDveQwsnp4Yde_SJJ_2OGo4WbkykGxWtb5xA0dOlsbjCstoIVLjgxW3nvjoinMrMOr9ieZiRdZdTc0cQcYujYK0-mK58OM_aMYaO4d7_UipNYDJ7RBN_Is9DNiDNKx6umDACEu-JYoTmwYH9eX03M5nK53NtaRS0JwqACCjGp2BcD2hmgzQ',
        bio: 'Native Tangkhul botanist born in the mist-veiled foothills of Ukhrul. Lifelong custodian of the endemic Shirui Lily (Lilium mackliniae), wild mountain orchids, and the centuries-old black pottery artisan trail of Longpi.',
        langs: ['English', 'Tangkhul', 'Meiteilon', 'Hindi'],
        creds: ['Manipur Forest Dept. Eco-Sensitive Zone Permit Liaison', 'GI-Certified Master Evaluator for Longpi Hamlei Crafts'],
        gear: ['Botanical Field Specimen Loupe (20x)', 'Field Press for Non-Destructive Plant Identification'],
        tags: [
            { label: 'Tangkhul', style: 'bg-surface-container text-on-surface' },
            { label: 'GI Craft Accredited', style: 'bg-primary-fixed text-on-primary-fixed' }
        ]
    }
];

// --- COMPONENTS ---

const GuideModal = ({ guide, onClose, onBook }) => {
    if (!guide) return null;
    return (
        <div className="fixed inset-0 z-50 bg-inverse-surface/80 backdrop-blur-sm overflow-y-auto p-4 flex items-center justify-center">
            <div className="relative bg-surface-container-lowest w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden my-8 flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                        <span className="font-label-lg font-bold text-primary">Official Directorate Guide Credentials</span>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-variant flex items-center justify-center text-on-surface-variant transition-colors">
                        <span className="material-symbols-outlined text-base">close</span>
                    </button>
                </div>
                <div className="p-6 flex flex-col md:flex-row gap-6 max-h-[78vh] overflow-y-auto">
                    <div className="w-full md:w-56 shrink-0 flex flex-col gap-3">
                        <div className="w-full h-64 rounded-xl overflow-hidden relative shadow-sm">
                            <img src={guide.img} alt="Guide Portrait" className="w-full h-full object-cover" />
                            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm font-bold text-primary flex items-center gap-1 shadow-sm">
                                <span className="material-symbols-outlined text-xs">verified</span> {guide.badge}
                            </div>
                        </div>
                        <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5 text-body-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant text-label-sm">Govt License</span>
                                <span className="font-bold text-primary font-mono text-xs">{guide.lic}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant text-label-sm">Experience</span>
                                <span className="font-semibold text-on-surface text-label-sm">{guide.exp}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant text-label-sm">Rating</span>
                                <div className="flex items-center gap-1 text-label-sm font-bold text-primary">
                                    <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    {guide.ratingScore}
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-xl flex flex-col gap-1">
                            <span className="font-label-sm font-bold text-primary flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">shield_with_heart</span> Tourist Police Linked
                            </span>
                            <span className="text-[11px] text-on-surface-variant leading-snug">Real-time SOS tracking synchronized with Manipur Emergency Response.</span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div>
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h3 className="font-headline-md text-primary font-bold">{guide.name}</h3>
                                    <span className="font-label-md text-secondary font-semibold">{guide.title}</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-headline-sm text-primary font-bold block">{guide.tariff}</span>
                                    <span className="text-xs text-on-surface-variant">Direct Honorarium</span>
                                </div>
                            </div>
                            <p className="font-body-md text-on-surface-variant mt-2 text-sm leading-relaxed">{guide.bio}</p>
                        </div>
                        <div>
                            <h4 className="font-label-sm uppercase tracking-wider text-on-surface font-bold mb-2">Languages Spoken</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {guide.langs.map((l, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-full bg-surface-container text-xs font-semibold text-on-surface">{l}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-label-sm uppercase tracking-wider text-on-surface font-bold mb-2">Official Accreditation & Clearances</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {guide.creds.map((c, i) => (
                                    <div key={i} className="flex items-center gap-1.5 p-2 rounded-lg bg-surface-container-low text-xs">
                                        <span className="material-symbols-outlined text-primary text-sm">verified</span>
                                        <span className="text-on-surface font-medium">{c}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-label-sm uppercase tracking-wider text-on-surface font-bold mb-2">Field Equipment & Safety Gear Included</h4>
                            <div className="flex flex-wrap gap-2">
                                {guide.gear.map((g, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded bg-surface-container-high text-xs text-on-surface font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs text-primary">inventory_2</span>{g}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary-container">verified</span>
                                <span className="text-xs text-on-surface-variant">100% DBT to local guide. Subsidized platform fee.</span>
                            </div>
                            <button onClick={() => onBook(guide)} className="px-6 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-label-lg font-bold rounded-lg shadow-sm transition-transform active:scale-95">
                                Book This Guide Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentModal = ({ totalAmount, onClose }) => {
    const [tab, setTab] = useState('upi');
    const [status, setStatus] = useState('idle'); // 'idle' | 'success'

    const simulatePayment = () => {
        setStatus('success');
        setTimeout(() => {
            onClose();
        }, 3200);
    };

    const getTabClass = (currentTab) =>
        tab === currentTab
            ? "flex items-center gap-3 px-4 py-3.5 text-left font-label-md font-semibold text-primary bg-surface-container-lowest border-l-4 border-primary transition-colors"
            : "flex items-center gap-3 px-4 py-3.5 text-left font-label-md font-semibold text-on-surface-variant hover:bg-surface-container transition-colors";

    return (
        <div className="fixed inset-0 z-50 bg-inverse-surface/85 backdrop-blur-md overflow-y-auto p-4 flex items-center justify-center">
            <div className="relative bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-outline-variant/30">
                <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center p-1.5">
                            <img src="https://lh3.googleusercontent.com/aida/AEtjO1WqpEj8e6ig1Mf5BQZiAhmNUkbieMu8nxalvEdPEq5NwKpzMCtXRn8AUIs6oFSiXhsv5gk_F0IvbiS5cz_f9BpYFIPi0tmEXW1cCKlHCbO8W5fNvo9ijsaJEbcim5tL2FyNrRctf7xB7cZlTLtLtSGRpEC-jKhtwR5zrXtt-nsr077wRVukiaKRnx75gyQSetkKj4Ygj3mXDei0dR7E00cwPotrBO9dKLxpEwPlQTuDfMQEk2YUkzfDi085" alt="Govt Seal" className="w-full h-full object-contain filter brightness-200" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-label-lg font-bold tracking-tight text-white">Directorate of Tourism, Manipur</span>
                                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono font-semibold uppercase">Govt Verified</span>
                            </div>
                            <span className="text-xs text-slate-300 font-mono">Order: #MN-2025-GUIDE-8842</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <span className="text-[11px] text-slate-300 block uppercase font-medium">Payable Amount</span>
                            <span className="text-xl font-bold font-mono text-emerald-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
                    <div className="md:col-span-4 bg-surface-container-low border-r border-outline-variant/30 flex flex-col">
                        <button onClick={() => setTab('upi')} className={getTabClass('upi')}>
                            <span className="material-symbols-outlined text-lg">qr_code_scanner</span>UPI & QR
                        </button>
                        <button onClick={() => setTab('card')} className={getTabClass('card')}>
                            <span className="material-symbols-outlined text-lg">credit_card</span>Card (Debit/Credit)
                        </button>
                        <button onClick={() => setTab('netbanking')} className={getTabClass('netbanking')}>
                            <span className="material-symbols-outlined text-lg">account_balance</span>Netbanking
                        </button>
                        <button onClick={() => setTab('wallet')} className={getTabClass('wallet')}>
                            <span className="material-symbols-outlined text-lg">account_balance_wallet</span>Wallets
                        </button>
                        <div className="mt-auto p-4 text-[11px] text-on-surface-variant flex items-center gap-1 border-t border-outline-variant/30">
                            <span className="material-symbols-outlined text-xs text-primary">lock</span> Secured by Razorpay • 256-bit SSL
                        </div>
                    </div>

                    <div className="md:col-span-8 p-6 flex flex-col justify-between bg-surface-container-lowest">
                        <div className="flex flex-col gap-4">
                            {status === 'success' ? (
                                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 flex flex-col items-center text-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">check_circle</span>
                                    </div>
                                    <h4 className="font-headline-sm text-primary font-bold">Booking & Honorarium Confirmed!</h4>
                                    <p className="font-body-sm text-on-surface-variant text-xs">
                                        Payment ID: <strong className="font-mono text-on-surface">pay_MNP94182LOKTAK</strong><br />
                                        Booking Ref: <strong className="font-mono text-primary">#MN-BKG-9942</strong> • Tourist Police Beacon Active
                                    </p>
                                    <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-bold">Instant SMS & WhatsApp Receipt Sent</span>
                                </div>
                            ) : (
                                <>
                                    {tab === 'upi' && (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-14 h-14 rounded-lg bg-surface-container-lowest p-1 shadow-sm flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-3xl text-primary">qr_code_2</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-label-sm font-bold text-on-surface block">Scan QR code with any UPI App</span>
                                                        <span className="text-xs text-on-surface-variant">GPay, PhonePe, Paytm, BHIM UPI</span>
                                                    </div>
                                                </div>
                                                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-[11px] font-bold font-mono">Instant Sync</span>
                                            </div>
                                            <div className="flex items-center gap-2 my-1">
                                                <div className="flex-1 h-px bg-outline-variant/30"></div>
                                                <span className="text-xs text-on-surface-variant uppercase">or enter UPI ID</span>
                                                <div className="flex-1 h-px bg-outline-variant/30"></div>
                                            </div>
                                            <div className="flex gap-2">
                                                <input type="text" placeholder="username@okhdfcbank" defaultValue="tourist.manipur@oksbi" className="flex-1 h-11 px-3.5 bg-surface-container-low rounded-lg font-body-sm text-on-surface outline-none border border-outline-variant/30" />
                                                <button onClick={simulatePayment} className="px-4 bg-primary text-on-primary font-label-md font-bold rounded-lg hover:bg-primary-container transition-colors">Verify & Pay</button>
                                            </div>
                                        </div>
                                    )}
                                    {tab === 'card' && (
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-1">
                                                <label className="font-label-sm font-semibold text-on-surface">Card Number</label>
                                                <input type="text" placeholder="4532 8920 1142 8091" className="h-11 px-3.5 bg-surface-container-low rounded-lg font-body-sm text-on-surface outline-none border border-outline-variant/30" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="flex flex-col gap-1">
                                                    <label className="font-label-sm font-semibold text-on-surface">Expiry (MM/YY)</label>
                                                    <input type="text" placeholder="10/28" className="h-11 px-3.5 bg-surface-container-low rounded-lg font-body-sm text-on-surface outline-none border border-outline-variant/30" />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label className="font-label-sm font-semibold text-on-surface">CVV</label>
                                                    <input type="password" maxLength="3" placeholder="•••" className="h-11 px-3.5 bg-surface-container-low rounded-lg font-body-sm text-on-surface outline-none border border-outline-variant/30" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Additional Tabs truncated for brevity... */}
                                </>
                            )}
                        </div>

                        {status !== 'success' && (
                            <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-3 mt-4">
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-on-surface-variant">Permit & Guide Escort</span>
                                    <span className="font-label-md font-bold text-on-surface">Direct DBT Transfer</span>
                                </div>
                                <button onClick={simulatePayment} className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-lg font-bold rounded-lg shadow-sm flex items-center gap-2 transition-transform active:scale-95">
                                    <span className="material-symbols-outlined text-sm">lock</span>
                                    <span>Pay ₹{totalAmount.toLocaleString('en-IN')}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ManipurTourismGuides() {
    const [selectedGuide, setSelectedGuide] = useState(GUIDES[0]);
    const [modalGuide, setModalGuide] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Esc listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setModalGuide(null);
                setIsPaymentOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleBookClick = (guide) => {
        setSelectedGuide(guide);
        // Optional: scroll to booking section
        if (window.innerWidth < 1024) {
            document.getElementById('bookingConsole')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const calculateTotal = () => {
        return selectedGuide.basePrice + 120; // 120 is Insurance fee
    };

    return (
        <div className="bg-background font-body-md text-on-surface antialiased">
            {/* HEADER */}


            <main className="w-full pt-20 bg-background">
                <div className="flex flex-col w-full">

                    {/* Top Ambient Banner & Search Deck */}
                    <section className="relative w-full bg-gradient-to-b from-surface-container to-background px-margin-mobile md:px-margin pt-space-lg pb-space-xl">
                        <div className="max-w-[1320px] mx-auto flex flex-col gap-space-md">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
                                <div className="max-w-3xl flex flex-col gap-space-xs">
                                    <div className="flex items-center gap-space-xs">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                                            <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                            Govt. Directorate Licensed Naturalists & Historians
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                                            142 Live on Circuit
                                        </span>
                                    </div>
                                    <h1 className="font-display-md text-display-md text-primary tracking-tight">
                                        Book Certified Local Guides & Field Naturalists
                                    </h1>
                                    <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                                        Connect with 142 Directorate-licensed eco-biologists, tribal epigraphists, high-altitude mountaineers, and cultural custodians across all 16 districts of Manipur. Zero middlemen, 100% direct community honorarium.
                                    </p>
                                </div>
                                <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                                    <div className="flex flex-col pr-space-sm border-r border-outline-variant/30">
                                        <span className="font-headline-sm text-headline-sm text-primary font-bold leading-tight">100%</span>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Direct Honorarium</span>
                                    </div>
                                    <div className="flex flex-col pr-space-sm border-r border-outline-variant/30">
                                        <span className="font-headline-sm text-headline-sm text-tertiary font-bold leading-tight">4.97</span>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Avg. Traveler Rating</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-headline-sm text-headline-sm text-primary-container font-bold leading-tight">24/7</span>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">Tourist Police Linked</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Unified Booking Console */}
                            <div className="w-full bg-surface-container-lowest rounded-xl p-space-sm md:p-space-md shadow-md">
                                <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm items-end" onSubmit={(e) => e.preventDefault()}>
                                    <div className="flex flex-col gap-1">
                                        <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm text-primary">pin_drop</span> Destination / Circuit
                                        </label>
                                        <div className="relative">
                                            <select defaultValue="loktak" className="w-full h-12 px-3.5 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg outline-none cursor-pointer appearance-none">
                                                <option value="all">All Circuits (16 Districts)</option>
                                                <option value="loktak">Keibul Lamjao & Loktak Lake</option>
                                                <option value="dzukou">Dzükou Valley Ridge Corridor</option>
                                                <option value="kangla">Kangla Fort & Royal Imphal</option>
                                            </select>
                                            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-on-surface-variant text-sm">expand_more</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm text-primary">category</span> Expedition Focus
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-12 px-3.5 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg outline-none cursor-pointer appearance-none">
                                                <option value="all">All Disciplines</option>
                                                <option value="wetland">Wildlife & Wetland Naturalists</option>
                                                <option value="alpine">High-Altitude Trekking & SAR</option>
                                            </select>
                                            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-on-surface-variant text-sm">expand_more</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm text-primary">translate</span> Language Spoken
                                        </label>
                                        <div className="relative">
                                            <select defaultValue="eng" className="w-full h-12 px-3.5 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg outline-none cursor-pointer appearance-none">
                                                <option value="eng">English + Meiteilon</option>
                                                <option value="tangkhul">Tangkhul</option>
                                                <option value="hindi">Hindi</option>
                                            </select>
                                            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-on-surface-variant text-sm">expand_more</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm text-primary">calendar_today</span> Schedule & Pace
                                        </label>
                                        <div className="relative">
                                            <select defaultValue="full" className="w-full h-12 px-3.5 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg outline-none cursor-pointer appearance-none">
                                                <option value="half">Half-Day (4 Hours)</option>
                                                <option value="full">Full-Day (8 Hours)</option>
                                                <option value="multi">Multi-Day Expedition (2-4 Days)</option>
                                            </select>
                                            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-on-surface-variant text-sm">expand_more</span>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full h-12 px-6 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-transform active:scale-95 shadow-sm hover:bg-primary-container">
                                        <span className="material-symbols-outlined text-base">person_search</span>
                                        <span>Search 142 Guides</span>
                                    </button>
                                </form>
                            </div>

                            {/* Quick Specialization Filter */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-space-xs">
                                {['All Field Guides', 'Wildlife & Ramsar Wetland', 'Alpine Mountaineering & SAR', 'Meitei Royalty & Epigraphists', 'Indigenous Tribal Lore & Crafts'].map((tag, i) => (
                                    <button key={i} className={`shrink-0 px-4 py-2 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1.5 shadow-sm transition-colors ${i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'}`}>
                                        <span>{tag}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Main Content Layout */}
                    <div className="max-w-[1320px] mx-auto w-full px-margin-mobile md:px-margin py-space-xl grid grid-cols-1 lg:grid-cols-12 gap-gutter">

                        {/* Left Column: Guide Cards */}
                        <div className="lg:col-span-8 flex flex-col gap-space-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-headline-md text-headline-md text-primary">Accredited Field Guides</h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Showing active certified specialists with verified DigiLocker credentials</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">Sort by:</span>
                                    <select className="bg-surface-container-low text-on-surface text-label-sm font-label-sm px-3 py-1.5 rounded-lg outline-none cursor-pointer">
                                        <option>Top Rated & Verified</option>
                                        <option>Most Expeditions Completed</option>
                                        <option>Tariff: Low to High</option>
                                    </select>
                                </div>
                            </div>

                            {/* Guides Mapping */}
                            {GUIDES.map(guide => (
                                <article key={guide.id} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row gap-space-md relative overflow-hidden group hover:shadow-md transition-shadow">
                                    <div className="w-full md:w-56 h-64 md:h-auto rounded-lg overflow-hidden shrink-0 relative">
                                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={guide.name} src={guide.img} />
                                        <div className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-bold ${guide.badgeColor} flex items-center gap-1 shadow-sm`}>
                                            <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>{guide.badgeIcon}</span>
                                            {guide.badge}
                                        </div>
                                        <div className="absolute bottom-2.5 left-2.5 right-2.5 py-1 px-2 rounded bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface font-label-sm text-label-sm flex items-center justify-between">
                                            <span>{guide.lic}</span>
                                            <span className="text-primary-fixed">{guide.exp}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between flex-1 gap-space-xs">
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{guide.name}</h3>
                                                    <span className="font-label-md text-label-md text-secondary font-semibold">{guide.title}</span>
                                                </div>
                                                <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg">
                                                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="font-label-sm text-label-sm font-bold text-on-surface">{guide.ratingScore}</span>
                                                    <span className="font-body-sm text-body-sm text-on-surface-variant">({guide.reviews})</span>
                                                </div>
                                            </div>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">{guide.bio}</p>
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {guide.tags.map((tag, i) => (
                                                    <span key={i} className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${tag.style} ${tag.icon ? 'flex items-center gap-0.5 font-semibold' : ''}`}>
                                                        {tag.icon && <span className="material-symbols-outlined text-xs">{tag.icon}</span>}
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4">
                                            <div>
                                                <div className="flex items-baseline gap-1.5">
                                                    <span className="font-headline-sm text-headline-sm text-primary font-bold">{guide.tariff}</span>
                                                    <span className="font-label-sm text-label-sm text-on-surface-variant">{guide.tariffType}</span>
                                                </div>
                                                <span className="font-label-sm text-label-sm text-primary-container font-semibold flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                                                    Slots open this week
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleBookClick(guide)} className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md font-semibold transition-all">
                                                    Book Guide
                                                </button>
                                                <button onClick={() => setModalGuide(guide)} className="px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Right Column: Interactive Instant Booking Console */}
                        <aside className="lg:col-span-4" id="bookingConsole">
                            <div className="sticky top-28 bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-md">
                                <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-primary-container animate-pulse"></span>
                                        <span className="font-headline-sm text-headline-sm text-primary">Instant Booking Console</span>
                                    </div>
                                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Step 1 of 3</span>
                                </div>

                                {/* Selected Guide Highlight Box */}
                                <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-space-xs">
                                        <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-lg">
                                            {selectedGuide.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-label-lg text-label-lg font-bold text-on-surface">{selectedGuide.name}</span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant truncate w-40">{selectedGuide.circuit}</span>
                                        </div>
                                    </div>
                                    <span className="font-headline-sm text-headline-sm text-primary font-bold">{selectedGuide.tariff}</span>
                                </div>

                                {/* Date & Time Slot Calendar Grid */}
                                <div className="flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between">
                                        <label className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm text-primary">calendar_month</span> Select Date
                                        </label>
                                        <span className="font-label-sm text-label-sm text-primary-container font-semibold">Green = Available</span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 text-center font-label-sm text-label-sm">
                                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                            <span key={day} className={`py-1 ${day === 'Sa' || day === 'Su' ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>{day}</span>
                                        ))}
                                        <button className="py-1.5 rounded text-on-surface-variant/40 line-through cursor-not-allowed">13</button>
                                        <button className="py-1.5 rounded text-on-surface-variant/40 line-through cursor-not-allowed">14</button>
                                        <button className="py-1.5 rounded text-on-surface-variant/40 line-through cursor-not-allowed">15</button>
                                        <button className="py-1.5 rounded bg-primary text-on-primary font-bold shadow-sm">16</button>
                                        <button className="py-1.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold hover:bg-primary hover:text-on-primary transition-colors">17</button>
                                        <button className="py-1.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold hover:bg-primary hover:text-on-primary transition-colors">18</button>
                                        <button className="py-1.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold hover:bg-primary hover:text-on-primary transition-colors">19</button>
                                    </div>
                                </div>

                                {/* Shift Slots Picker */}
                                <div className="flex flex-col gap-space-xs">
                                    <label className="font-label-md text-label-md font-bold text-on-surface">Time Slot</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <label className="cursor-pointer">
                                            <input defaultChecked className="peer hidden" name="timeSlot" type="radio" value="morning" />
                                            <div className="p-2.5 rounded-lg bg-surface-container text-on-surface text-center peer-checked:bg-primary peer-checked:text-on-primary transition-colors">
                                                <span className="font-label-sm text-label-sm font-bold block">Morning Slot</span>
                                                <span className="text-[11px] opacity-85">08:30 AM – 12:30 PM</span>
                                            </div>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input className="peer hidden" name="timeSlot" type="radio" value="afternoon" />
                                            <div className="p-2.5 rounded-lg bg-surface-container text-on-surface text-center peer-checked:bg-primary peer-checked:text-on-primary transition-colors">
                                                <span className="font-label-sm text-label-sm font-bold block">Afternoon Slot</span>
                                                <span className="text-[11px] opacity-85">01:30 PM – 05:30 PM</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* ILP Verification */}
                                <div className="flex flex-col gap-space-xs">
                                    <label className="font-label-md text-label-md font-bold text-on-surface flex items-center justify-between">
                                        <span>Inner Line Permit (ILP) Link</span>
                                        <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">verified_user</span> DigiLocker Sync
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input defaultValue="MNP-2025-9482-T" type="text" className="w-full h-11 px-3.5 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface outline-none" />
                                        <span className="material-symbols-outlined absolute right-3 top-2.5 text-primary text-sm">check_circle</span>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs text-primary-container">info</span>
                                        Valid ILP verified. Tourist police beacon active during tour hours.
                                    </span>
                                </div>

                                {/* Price Breakdown */}
                                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface">
                                        <span>Base Guide Honorarium</span>
                                        <span>{selectedGuide.tariff.split(' ')[0]}</span>
                                    </div>
                                    <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface">
                                        <span>State Tourist Escort Insurance</span>
                                        <span>₹120</span>
                                    </div>
                                    <div className="flex items-center justify-between font-body-sm text-body-sm text-primary-container font-semibold">
                                        <span>Directorate Platform Fee</span>
                                        <span>₹0 (Govt Subsidized)</span>
                                    </div>
                                    <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between font-headline-sm text-headline-sm text-primary font-bold">
                                        <span>Total Payable</span>
                                        <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                {/* Action CTAs */}
                                <button onClick={() => setIsPaymentOpen(true)} className="w-full py-3.5 px-4 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-lg text-label-lg font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95">
                                    <span className="material-symbols-outlined text-base">lock</span>
                                    <span>Confirm & Hold Slot</span>
                                </button>
                                <p className="font-label-sm text-label-sm text-center text-on-surface-variant">
                                    100% money-back guarantee if canceled 24 hours prior. Safe UPI & Cards accepted.
                                </p>
                            </div>
                        </aside>
                    </div>


                </div>
            </main>
            <GuideModal guide={modalGuide} onClose={() => setModalGuide(null)} onBook={handleBookClick} />
            {isPaymentOpen && <PaymentModal totalAmount={calculateTotal()} onClose={() => setIsPaymentOpen(false)} />}

        </div>
    );
}