import { useMemo, useState } from "react";

const homestays = [
    {
        type: "Floating Phumdi",
        district: "Bishnupur District",
        eyebrow: "Loktak Lake Protected Phumdi",
        title: "Sendra Island Floating Phumdi Retreat",
        description:
            "Restful bamboo stilt abodes situated directly over the water. Features bio-sand water filtration and authentic fisherfolk culinary tables.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBrj74iMpMuOalfTsIyKjt_zP2HhtHquUd8lJMGQfkG2o6TQ736Z_0emZaHayT1OoXd0c71dBupM9SEnhZr16wpX6YW7U9LKmLhreBn92luoS_sa01hwVkY5aycetBAzu8oPq0O-bhwsvAnxKhDoJrzKAiTjVF-TRlH44lWPzUY0MoFjJBV0FVBQe3AyvvI8RLsctTSMCpKE_H0NBMu9csnAiOoVndzAp0LmeTwsqcRljJOx8RXMfqvPQ",
        alt: "Traditional bamboo cottage built atop a floating circular phumdi island on tranquil Loktak Lake Manipur at early misty morning with gentle reflections of emerald hills and wooden canoes moored to reed docks",
        badges: ["Council Platinum", "100% Solar-Offgrid"],
        rating: "4.96",
        reviews: "182 reviews",
        tags: ["Lake-view Deck", "Bio-toilets", "Fisherfolk Meals"],
        price: "₹3,450",
    },
    {
        type: "Hill Orchard",
        district: "Ukhrul District",
        eyebrow: "Tangkhul Highland Ridge",
        title: "Shirui Mountain Pine Farmstay",
        description:
            "Nestled within pine groves beneath Shirui Kashong Peak. Organic highland kitchen, wild honey tastings, and wood-fired central hearth.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDsz083T-1qzJmCJ3c_-gAdRf3KtmeIavRhYTe8FU5yCydceBfhb20YcLSfpT4z1f5zSlygiPbFI0LFplRTIRSRceZgka3xdKLJOvW1A6M792wkVX3LDM9BUnaMC2QdQiUqJMOX5QM1uyiWDWqC15v4R27rDnUS4OfKSvEAyPyMn-119F2JiPiWy6_TboQRWWo-jRlWHQdOFteAqWfGoSZQV9co7dq48Bd9SR03r36KJddHcGgzLWhunw",
        alt: "Rustic highland timber cottage surrounded by lush pine trees and organic apple orchards in Ukhrul Manipur with misty rolling hills in the background during afternoon soft golden hour light",
        badges: ["Highland Council Gold", "Hearth Fireplace"],
        rating: "4.92",
        reviews: "114 reviews",
        tags: ["Mist Valley View", "Wild Honey Tasting", "Basecamp Access"],
        price: "₹2,800",
    },
    {
        type: "Heritage Mud-Plaster",
        district: "Imphal East",
        eyebrow: "Ancient Pottery Settlement",
        title: "Andro Earthen Heritage Abode",
        description:
            "Experience age-old coils of coil-pottery with village matriarchs. Adjacent to the 1000-year continuously burning sacred Meitei clan flame.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuApUt1WPs-Kre1EiMLkDIdnPcppxCIUzT3ql4X6qRWZg0EU8FYUoJdlZSWaGpRBkohptW4nhsAoDfvmpEq9es3alS_4mPy7r8YRr1ItWj6BYaBQEGoAKZ3hU7QEtZE_n3-musMOU3pthnDEeGVYUH--X7Absn1Pvb2l9b0c4BTC7d0ts7z6BvUp5Os2z699KB8SulkuXjsNRNqZOmgYdB4UwgfrdHUidG5E3_WyZYvFOB8ltZXmB5qEzw",
        alt: "Traditional Meitei earthen home with hand-plastered terracotta walls courtyard pottery kilns and woven bamboo verandah in Andro village Manipur surrounded by green foothills",
        badges: ["Heritage Vernacular", "Sacred Fire Shrine"],
        rating: "4.97",
        reviews: "153 reviews",
        tags: ["Meitei Courtyard", "Pottery Workshop", "Village Hosts"],
        price: "₹2,400",
    },
];

const guides = [
    {
        name: "Lunkhim Haokip",
        reg: "Govt Reg #MN-TRK-1093",
        role: "Senior Trek Lead & Dzükou Ridge Expert",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAjPmIi7YxALJ3FEjElo5ho5Yq_oSWlvHZLH_uXg0rmxb-ph7kgVDMDLNWJ6eI8cM7C6GQRm2_k3sDRC59g4dPhHAJWGHfUz-GyXbo0R0TQQDxyXF5GuIC0Jq3rFZgctZhmw-zKIKmYGf4J-VvG5KuNBw7dps4oTp2DyvpbWrtGiPWYJQSidyPEGkLcld9nAolmMalzz6GiMbyxwoZySpQ_jNuyEvda8JWbKlGPDLi1gR_Jdy2UGofiyg",
        specialty: "Mountain Rescue Certified",
        languages: "English, Thadou-Kuki, Nagamese",
        description:
            "12 years leading ridge expeditions across the Nagaland-Manipur Dzükou border. Expert in endemic Rhododendron macrocarpon flora and alpine survival protocol.",
        price: "₹2,500",
        unit: "/ day",
        note: "Includes trail permits & radio",
    },
    {
        name: "Dr. Tomba Meitei",
        reg: "Govt Reg #MN-CUL-0115",
        role: "Royal Historian & Kangla Epigraphist",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAKiqioC_YDIbCW4sYBwb2yy5G_2QkB9YcAhZpGqJEXIsQn6T1x9QbnjZlpLqQQRLYvh6YiiX0vuMUSau_GmIfdEwLVpGXpr393Ceg82wVsAJ-9VRaZ_NH8guAqY-XhD3aYXn4cd_WdVwtQRvsl3COnucXCGNr-t1x4e7GzefJ_DIdZNR5Z78EqXDpvtZ_yO-zmt9O7hfNTlL1MVewvDE88AkFPD8EyOKj3hjmMyEVvi1zt5OmOiZG_kQ",
        specialty: "Meitei Mayek Scholar",
        languages: "English, Meiteilon, Bengali",
        description:
            "Former curator of Manipur State Museum. Decodes royal stone inscriptions, chronicle Puya manuscripts, and sites of the decisive 1891 Anglo-Manipur War.",
        price: "₹1,800",
        unit: "/ half-day",
        note: "Includes Kangla VIP entry clearance",
    },
    {
        name: "Memi Sharon",
        reg: "Govt Reg #MN-BOT-0521",
        role: "Tangkhul Botanical Forager & Storyteller",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBPYSluoyueewB0OKWdluiU9-CxFtFxxWZ-mRIMcxTtQTXo-di8WhgrgXz7mhgSMBJyIG76R3bu7XnujYFakYuvDM7xfRfH2uLMkgh_3sWlaXotQyKAPRfO5J_aMWALvd0AJblEcr8fPrGL2HqomBCf79Xp8_2mn0EyjY8ga2OratV-73kwhpoG87_d53VV1I3dQZ2DLoPI-elTIx4cDmimDfad4QP_WH7UGJjn1dt4nK-S7OlBr21ISg",
        specialty: "Shirui Lily Guardian",
        languages: "English, Tangkhul, Hindi",
        description:
            "Specialist in rare medicinal mountain herbs, indigenous seed preservation methods, and centuries-old black serpentine Longpi Hamlei pottery lore.",
        price: "₹2,000",
        unit: "/ day",
        note: "Includes botanical field handbook",
    },
];

const cabs = [
    {
        number: "01",
        duration: "20 mins",
        route: "Bir Tikendrajit Airport (IMF) ⇄ Royal Citadel & Ima Keithel",
        description:
            "Swift airport transfer straight to Imphal city center hotels or the world-famous Mothers' Market.",
        vehicle: "Tata Tigor EV",
        capacity: "AC • 3 Pax",
        price: "₹350",
    },
    {
        number: "02",
        duration: "1h 15m",
        route: "Imphal Capital ⇄ Loktak Lake & Sendra Phumdis",
        description:
            "Scenic wetland transit with panoramic windows. Includes complementary regional eco-audio tour.",
        vehicle: "Tata Nexon EV",
        capacity: "4 Pax • Luggage",
        price: "₹1,200",
    },
    {
        number: "03",
        duration: "2h 45m",
        route: "Imphal ⇄ Ukhrul Highland Ridge (Shirui Base)",
        description:
            "High-torque electric mountain climb with specialized hill-descent battery regeneration systems.",
        vehicle: "4x4 EV Highland SUV",
        capacity: "4 Pax",
        price: "₹2,400",
    },
    {
        number: "04",
        duration: "1h 40m",
        route: "Imphal ⇄ Churachandpur & Khuga Valley",
        description:
            "Smooth south corridor connection to ethnic handicraft weaving hubs and artificial lakes.",
        vehicle: "7-Seater EV MPV",
        capacity: "Family Class",
        price: "₹1,800",
    },
];

const filters = [
    "All Types",
    "Floating Phumdi",
    "Hill Orchard",
    "Forest Edge",
    "Heritage Mud-Plaster",
];

function SectionHeading({ icon, eyebrow, title, description, children }) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
            <div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                        {icon}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                        {eyebrow}
                    </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                    {title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    {description}
                </p>
            </div>
            {children}
        </div>
    );
}

function HomestayCard({ stay, onAction }) {
    return (
        <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <div className="relative h-56 w-full overflow-hidden group">
                <img
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105"
                    alt={stay.alt}
                    src={stay.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm">
                        {stay.badges[0]}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold">
                        {stay.badges[1]}
                    </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-body-sm text-body-sm">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-yellow-400">
                            star
                        </span>
                        {stay.rating} ({stay.reviews})
                    </span>
                    <span>{stay.district}</span>
                </div>
            </div>

            <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                        {stay.eyebrow}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                        {stay.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        {stay.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {stay.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t-0 flex items-center justify-between gap-3">
                    <div>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                            {stay.price}
                        </span>
                        <span className="font-body-sm text-body-sm text-outline">
                            {" "}
                            / night
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => onAction("Guide/Cab")}
                            className="px-3.5 py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md font-semibold transition-colors"
                        >
                            + Guide/Cab
                        </button>
                        <button
                            type="button"
                            onClick={() => onAction(`Reserve: ${stay.title}`)}
                            className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-bold transition-colors"
                        >
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GuideCard({ guide, onAction }) {
    return (
        <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
                <div className="flex items-start gap-4">
                    <img
                        className="w-16 h-16 rounded-full object-cover shrink-0 transform transition-transform duration-700 hover:scale-105"
                        alt={guide.role}
                        src={guide.image}
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                {guide.name}
                            </span>
                            <span
                                className="material-symbols-outlined text-primary text-[18px]"
                                title="Government Verified"
                            >
                                verified
                            </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline font-semibold">
                            {guide.reg}
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary font-semibold mt-0.5">
                            {guide.role}
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                        {guide.specialty}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        {guide.languages}
                    </span>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                    {guide.description}
                </p>
            </div>

            <div className="mt-6 pt-4 border-t-0 flex items-center justify-between gap-3">
                <div>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        {guide.price}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                        {" "}
                        {guide.unit}
                    </span>
                    <p className="font-label-sm text-label-sm text-outline mt-0.5">
                        {guide.note}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => onAction(`Hire Guide: ${guide.name}`)}
                    className="px-5 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold transition-colors"
                >
                    Hire Guide
                </button>
            </div>
        </div>
    );
}

function CabCard({ cab, onAction }) {
    return (
        <div className="p-space-md rounded-2xl bg-surface-container-lowest flex flex-col justify-between shadow-sm">
            <div>
                <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-2">
                    <span>CORRIDOR {cab.number}</span>
                    <span className="flex items-center gap-1 text-primary font-bold">
                        <span className="material-symbols-outlined text-[14px]">
                            bolt
                        </span>
                        {cab.duration}
                    </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {cab.route}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                    {cab.description}
                </p>
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold">
                        {cab.vehicle}
                    </span>
                    <span className="px-2 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold">
                        {cab.capacity}
                    </span>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t-0 flex items-center justify-between">
                <div>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        {cab.price}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline"> fixed</span>
                </div>
                <button
                    type="button"
                    onClick={() => onAction(`Pre-Book: Corridor ${cab.number}`)}
                    className="px-4 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-semibold transition-colors"
                >
                    Pre-Book
                </button>
            </div>
        </div>
    );
}

export default function EcoHomestays() {
    const [activeService, setActiveService] = useState("bundle");
    const [activeFilter, setActiveFilter] = useState("All Types");
    const [destination, setDestination] = useState(
        "Loktak Lake & Keibul Lamjao (Bishnupur)"
    );
    const [dateRange, setDateRange] = useState("14 Oct 2025 - 18 Oct 2025");
    const [travelers, setTravelers] = useState("2 Adults, 1 Eco-Room");
    const [guide, setGuide] = useState("Indigenous Wildlife & Birding");
    const [cab, setCab] = useState("Airport Pick-up + 3 Days Circuit EV");
    const [feedback, setFeedback] = useState("");

    const filteredHomestays = useMemo(() => {
        if (activeFilter === "All Types") return homestays;
        return homestays.filter((stay) => stay.type === activeFilter);
    }, [activeFilter]);

    const runSearch = () => {
        setFeedback(
            `Availability requested for ${destination} • ${dateRange} • ${travelers}`
        );
    };

    const action = (message) => {
        setFeedback(message);
    };

    return (
        <main className="w-full pt-20 bg-surface flex-1">
            <div className="flex flex-col w-full">
                {/* Top Context Sub-header */}
                <section className="w-full bg-surface py-space-lg px-margin-mobile md:px-margin">
                    <div className="max-w-[1320px] mx-auto flex flex-col gap-space-sm">
                        <div className="flex flex-wrap items-center justify-between gap-space-sm">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                                <span className="material-symbols-outlined text-[14px]">
                                    format_image_left
                                </span>
                                DIRECTORATE OF ECO-TOURISM & COMMUNITY MOBILITY • GOVT. OF
                                MANIPUR
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                100% Direct Village Revenue Audit • Zero Middlemen • GST &
                                e-ILP Synced
                            </span>
                        </div>

                        <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                            <div className="max-w-3xl">
                                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                                    Regenerative Stays, Guides & Green Cabs
                                </h1>
                                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                                    Reserve indigenous floating phumdi eco-stays, certified local
                                    naturalists, and Directorate-approved SOS-tracked electric
                                    cabs across Manipur’s 16 districts.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2.5 rounded-xl self-start md:self-auto">
                                <span className="material-symbols-outlined text-secondary text-[26px]">
                                    energy_savings_leaf
                                </span>
                                <div className="flex flex-col">
                                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                                        Mission 2025
                                    </span>
                                    <span className="font-label-md text-label-md text-on-surface font-bold">
                                        Net-Zero Tourism Grid
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Unified Booking Console */}
                <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
                    <div className="max-w-[1320px] mx-auto">
                        <div className="flex flex-wrap items-center gap-2 mb-4" id="service-tabs">
                            {[
                                ["bundle", "verified", "All-in-One Tri-Bundle (Save 15%)"],
                                ["stays", "home", "Eco-Homestays (68 verified)"],
                                ["guides", "explore", "Certified Field Guides (142 licensed)"],
                                ["cabs", "electric_bolt", "Green EV Cabs (95 fleets)"],
                            ].map(([key, icon, label]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setActiveService(key)}
                                    className={`px-5 py-2.5 rounded-full font-label-md text-label-md shadow-md flex items-center gap-2 transition-all ${activeService === key
                                        ? "bg-primary-container text-on-primary"
                                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {icon}
                                    </span>
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-md">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-primary">
                                            location_on
                                        </span>
                                        Destination / Circuit
                                    </label>
                                    <select
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        className="w-full h-12 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option>Loktak Lake & Keibul Lamjao (Bishnupur)</option>
                                        <option>Shirui Hills & Longpi Village (Ukhrul)</option>
                                        <option>Imphal Royal Citadel & Andro Village</option>
                                        <option>Dzükou Valley & Senapati Heights</option>
                                        <option>Khuga Dam & Behiang Valley (Churachandpur)</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-primary">
                                            calendar_today
                                        </span>
                                        Check-in & Departure
                                    </label>
                                    <input
                                        value={dateRange}
                                        onChange={(e) => setDateRange(e.target.value)}
                                        className="w-full h-12 pl-3 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        type="text"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-primary">
                                            group
                                        </span>
                                        Travelers & Stays
                                    </label>
                                    <select
                                        value={travelers}
                                        onChange={(e) => setTravelers(e.target.value)}
                                        className="w-full h-12 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option>2 Adults, 1 Eco-Room</option>
                                        <option>1 Adult, 1 Solo Pod</option>
                                        <option>4 Adults, 2 Cottages (Family)</option>
                                        <option>6+ Eco-Expedition Crew</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-primary">
                                            person_search
                                        </span>
                                        Field Naturalist
                                    </label>
                                    <select
                                        value={guide}
                                        onChange={(e) => setGuide(e.target.value)}
                                        className="w-full h-12 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option>Indigenous Wildlife & Birding</option>
                                        <option>High-Altitude Ridge Trekker</option>
                                        <option>Kangla Historical & Epigraphy Scholar</option>
                                        <option>Tangkhul Ethnobotanist & Forager</option>
                                        <option>No Guide Required</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-primary">
                                            electric_car
                                        </span>
                                        EV Cab Allocation
                                    </label>
                                    <select
                                        value={cab}
                                        onChange={(e) => setCab(e.target.value)}
                                        className="w-full h-12 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option>Airport Pick-up + 3 Days Circuit EV</option>
                                        <option>Inter-District Transit Only</option>
                                        <option>Point-to-Point Shuttle Only</option>
                                        <option>Self-Drive EV Station Pass</option>
                                        <option>No Transport Required</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-space-md pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-primary text-[18px]">
                                        check_circle
                                    </span>
                                    <span>
                                        Includes mandatory ILP verification pre-clearance at Imphal
                                        Airport
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={runSearch}
                                    className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        search_insights
                                    </span>
                                    <span>Search Live Availability & Calculate Bundle Price</span>
                                </button>
                            </div>

                            {feedback && (
                                <div className="mt-4 p-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md flex items-center justify-between gap-4">
                                    <span>{feedback}</span>
                                    <button
                                        type="button"
                                        onClick={() => setFeedback("")}
                                        className="text-outline hover:text-primary"
                                        aria-label="Dismiss"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Tri-Bundle Spotlight */}
                <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin">
                    <div className="max-w-[1320px] mx-auto">
                        <div className="flex flex-col lg:flex-row items-stretch rounded-3xl bg-surface-container-lowest shadow-xl overflow-hidden">
                            <div className="w-full lg:w-2/3 p-space-lg md:p-space-xl flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                                            Directorate Curated Triple-Bundle
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                                            Instant e-ILP Linked
                                        </span>
                                    </div>
                                    <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                                        Loktak Floating Haven & Brow-Antlered Deer Trail (3D/2N)
                                    </h2>
                                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                        A comprehensive conservation journey combining off-grid
                                        phumdi living, Sangai deer tracking with licensed
                                        biologists, and zero-emission transit across Bishnupur
                                        district.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-lg">
                                        {[
                                            [
                                                "01",
                                                "STAY",
                                                "Thanga Phumdi Solar Cottage",
                                                "Off-grid solar, bio-toilet, open lake balcony, Chak-hao black rice porridge breakfast.",
                                                "Base Rate",
                                                "₹3,450 / night",
                                            ],
                                            [
                                                "02",
                                                "GUIDE",
                                                "Naobi Ningthoujam",
                                                "Govt Lic #MN-WLD-0482. Wildlife biologist, Meiteilon/English, high-zoom optics provided.",
                                                "Day Tariff",
                                                "₹2,200 / day",
                                            ],
                                            [
                                                "03",
                                                "GREEN CAB",
                                                "Tata Nexon EV Max",
                                                "Fleet #MN-01-EV-4412. Airport pickup, 24/7 SOS GPS, verified community driver.",
                                                "Circuit Cap",
                                                "₹2,400 flat",
                                            ],
                                        ].map(([num, label, title, desc, rateLabel, rate]) => (
                                            <div
                                                key={num}
                                                className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between"
                                            >
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-sm">
                                                            {num}
                                                        </span>
                                                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold">
                                                            {label}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1">
                                                        {title}
                                                    </h3>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                                                        {desc}
                                                    </p>
                                                </div>
                                                <div className="mt-4 pt-3 border-t-0 flex items-baseline justify-between">
                                                    <span className="font-body-sm text-body-sm text-outline">
                                                        {rateLabel}
                                                    </span>
                                                    <span className="font-label-md text-label-md text-on-surface font-bold">
                                                        {rate}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 p-4 rounded-xl bg-surface-container flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[24px]">
                                            forest
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md text-on-surface font-bold">
                                            Estimated Carbon Reduction: 46.8 kg CO₂e
                                        </span>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                                            Compared to conventional fossil fuel taxis & city hotels.
                                            Certified by Manipur State Remote Sensing Centre.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 bg-primary p-space-lg md:p-space-xl text-on-primary flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-md text-label-md uppercase tracking-wider text-on-primary-container">
                                            Bundle Summary
                                        </span>
                                        <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold tracking-wide">
                                            SAVE 15%
                                        </span>
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 font-body-sm text-body-sm text-on-primary/80">
                                        {[
                                            ["Homestay Stay (2 Nights)", "₹6,900"],
                                            ["Certified Naturalist (2 Days)", "₹4,400"],
                                            ["EV Airport & Sanctuary Transfer", "₹2,400"],
                                        ].map(([label, value]) => (
                                            <div key={label} className="flex justify-between items-center">
                                                <span>{label}</span>
                                                <span className="font-semibold text-on-primary">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="my-2 h-[1px] bg-on-primary/10" />
                                        <div className="flex justify-between items-center text-on-primary/60">
                                            <span>Standard Package Price</span>
                                            <span className="line-through">₹13,700</span>
                                        </div>
                                        <div className="flex justify-between items-center text-tertiary-fixed font-semibold">
                                            <span>Tri-Bundle Eco-Subsidy (-15%)</span>
                                            <span>-₹2,055</span>
                                        </div>
                                        <div className="flex justify-between items-center text-on-primary-container">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">
                                                    compost
                                                </span>
                                                Bamboo Offset (3 Culms)
                                            </span>
                                            <span>Included Free</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-4 rounded-xl bg-primary-container/80">
                                        <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider">
                                            Final Directorate Total
                                        </span>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="font-headline-lg text-headline-lg text-on-primary font-bold">
                                                ₹11,645
                                            </span>
                                            <span className="font-body-sm text-body-sm text-on-primary/70">
                                                all taxes & ILP fees incl.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col gap-3">
                                    <button
                                        type="button"
                                        onClick={() => action("Complete 3-in-1 eco-circuit selected")}
                                        className="w-full py-4 rounded-xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            shopping_bag
                                        </span>
                                        <span>Book Complete 3-in-1 Eco-Circuit</span>
                                    </button>
                                    <p className="font-body-sm text-body-sm text-center text-on-primary/60">
                                        Secure payments via UPI, RuPay, Visa, DigiLocker e-ILP
                                        verification in 60s.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Homestays */}
                <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
                    <div className="max-w-[1320px] mx-auto">
                        <SectionHeading
                            icon="roofing"
                            eyebrow="Community Dwellings"
                            title="Verified Indigenous Eco-Homestays"
                            description="Stay in low-impact heritage structures owned by local indigenous families. Zero corporate intermediaries."
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${activeFilter === filter
                                            ? "bg-primary text-on-primary shadow-sm"
                                            : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </SectionHeading>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                            {filteredHomestays.map((stay) => (
                                <HomestayCard key={stay.title} stay={stay} onAction={action} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Guides */}
                <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin">
                    <div className="max-w-[1320px] mx-auto">
                        <SectionHeading
                            icon="badge"
                            eyebrow="Field Naturalists & Curators"
                            title="Licensed Naturalists, Storytellers & High-Altitude Guides"
                            description="Certified by Directorate of Tourism & Wildlife Institute of India. Trained in Leave-No-Trace & CPR wilderness rescue."
                        >
                            <button
                                type="button"
                                onClick={() => action("Showing all 142 licensed guides")}
                                className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold hover:underline"
                            >
                                <span>View all 142 licensed guides</span>
                                <span className="material-symbols-outlined text-[18px]">
                                    arrow_forward
                                </span>
                            </button>
                        </SectionHeading>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                            {guides.map((item) => (
                                <GuideCard key={item.name} guide={item} onAction={action} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Electric Cabs */}
                <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
                    <div className="max-w-[1320px] mx-auto">
                        <SectionHeading
                            icon="ev_station"
                            eyebrow="Zero-Emission Transport Grid"
                            title="Directorate-Sanctioned Electric Tourist Cabs"
                            description="State-regulated non-surge electric vehicles monitored via real-time satellite telemetry with direct Tourist Police SOS integration."
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-sm text-label-sm font-semibold">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                                <span>95 Cabs Active • Fixed Government Mileage Tariffs • Zero Surge</span>
                            </div>
                        </SectionHeading>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
                            {cabs.map((cabItem) => (
                                <CabCard key={cabItem.number} cab={cabItem} onAction={action} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Financial Transparency */}
                <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin">
                    <div className="max-w-[1320px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
                            <div className="p-space-xl rounded-3xl bg-surface-container-lowest shadow-md">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">
                                        account_balance
                                    </span>
                                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                                        Public Financial Transparency
                                    </span>
                                </div>
                                <h2 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                                    Transparent Community Revenue Ledger
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                    Every rupee processed on this portal is audited directly by
                                    the State Comptroller. We eliminate commissions to ensure
                                    funds directly regenerate local rural livelihoods.
                                </p>

                                <div className="mt-6">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-md text-label-md text-on-surface font-bold">
                                            Fund Allocation Distribution (Per ₹1,000 Spent)
                                        </span>
                                        <span className="font-label-sm text-label-sm text-primary font-bold">
                                            100% Traceable
                                        </span>
                                    </div>

                                    <div className="mt-5 flex flex-col gap-4">
                                        {[
                                            [
                                                "82%",
                                                "Direct Host & Guide Payout",
                                                "Deposited in verified Jan Dhan/Direct DBT accounts within 4 hours.",
                                            ],
                                            [
                                                "10%",
                                                "Village Conservation Fund",
                                                "Supports Loktak Phumdi cleaning & Shirui Kashong ridge restoration.",
                                            ],
                                            [
                                                "5%",
                                                "Solar & EV Grid Upkeep",
                                                "District battery charging stations & off-grid solar homestay micro-grids.",
                                            ],
                                            [
                                                "3%",
                                                "Tourist Police Escort System",
                                                "24/7 dedicated distress helpline & mountain medical kits maintenance.",
                                            ],
                                        ].map(([percent, title, desc]) => (
                                            <div key={percent} className="grid grid-cols-[64px_1fr] gap-3 items-start">
                                                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                                                    {percent}
                                                </span>
                                                <div>
                                                    <span className="font-label-md text-label-md text-on-surface font-bold">
                                                        {title}
                                                    </span>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                                        {desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-space-xl rounded-3xl bg-primary text-on-primary shadow-md flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined">
                                            verified_user
                                        </span>
                                        <span className="font-label-sm text-label-sm text-on-primary-container uppercase font-bold tracking-wider">
                                            Traveler Safety & Legal Guarantee
                                        </span>
                                    </div>
                                    <h2 className="font-headline-lg text-headline-lg font-bold mt-1">
                                        Government of Manipur Protected Booking
                                    </h2>

                                    <div className="mt-6 flex flex-col gap-5">
                                        {[
                                            [
                                                "Instant DigiLocker e-ILP",
                                                "Inner Line Permit pre-approval automatically linked to all booked accommodations and cabs.",
                                            ],
                                            [
                                                "Free 48-Hour Cancellation",
                                                "100% refund on homestay reservations up to 48 hours prior to check-in.",
                                            ],
                                            [
                                                "Government Verified Receipts",
                                                "GST invoices issued on Directorate letterhead with verifiable QR verification.",
                                            ],
                                        ].map(([title, desc]) => (
                                            <div key={title} className="flex items-start gap-3">
                                                <span className="material-symbols-outlined text-primary-fixed text-[20px] mt-0.5">
                                                    check_circle
                                                </span>
                                                <div>
                                                    <span className="font-label-md text-label-md font-bold">
                                                        {title}
                                                    </span>
                                                    <p className="font-body-sm text-body-sm text-on-primary/75 mt-1">
                                                        {desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 p-4 rounded-xl bg-primary-container/80 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[28px]">
                                        support_agent
                                    </span>
                                    <div>
                                        <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider">
                                            24/7 Tourist Police Helpdesk
                                        </span>
                                        <div className="font-headline-sm text-headline-sm font-bold">
                                            1800-345-3885 / 0385
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {feedback && (
                            <div className="mt-6 p-4 rounded-xl bg-primary/10 text-primary font-label-md text-label-md flex items-center justify-between">
                                <span>{feedback}</span>
                                <button type="button" onClick={() => setFeedback("")}>
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
