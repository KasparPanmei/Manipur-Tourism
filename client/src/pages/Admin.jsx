import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api.js";

const PAGE_SIZE = 5;

const NAV_ITEMS = [
    {
        key: "dashboard",
        label: "Master Dashboard",
        icon: "dashboard",
        description: "All booking collections",
    },
    {
        key: "eilp",
        label: "e-ILP Bookings",
        icon: "verified_user",
        description: "Inner Line Permit records",
        configured: true,
    },
    {
        key: "product",
        label: "Product Bookings",
        icon: "shopping_bag",
        description: "Product order records",
    },
    {
        key: "guide",
        label: "Guide Bookings",
        icon: "hiking",
        description: "Guide reservation records",
    },
    {
        key: "transportation",
        label: "Transportation Bookings",
        icon: "directions_car",
        description: "Transport reservation records",
    },
    {
        key: "homestay",
        label: "Homestay Bookings",
        icon: "home_work",
        description: "Homestay reservation records",
    },
    {
        key: "rental",
        label: "Rental Bookings",
        icon: "camping",
        description: "Rental item records",
    },
];

const COLLECTION_META = {
    eilp: {
        label: "e-ILP Bookings",
        shortLabel: "e-ILP",
        icon: "verified_user",
    },
    product: {
        label: "Product Bookings",
        shortLabel: "Products",
        icon: "shopping_bag",
    },
    guide: {
        label: "Guide Bookings",
        shortLabel: "Guides",
        icon: "hiking",
    },
    transportation: {
        label: "Transportation Bookings",
        shortLabel: "Transport",
        icon: "directions_car",
    },
    homestay: {
        label: "Homestay Bookings",
        shortLabel: "Homestays",
        icon: "home_work",
    },
    rental: {
        label: "Rental Bookings",
        shortLabel: "Rentals",
        icon: "camping",
    },
};

const emptyPagination = {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    pages: 0,
};

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));

const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

const getStoredToken = () => localStorage.getItem("authToken");

function StatusBadge({ children, tone = "neutral" }) {
    const tones = {
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        warning: "bg-amber-50 text-amber-800 border-amber-200",
        danger: "bg-red-50 text-red-700 border-red-200",
        neutral: "bg-surface-container-low text-on-surface-variant border-outline-variant/40",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${tones[tone] || tones.neutral}`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {children}
        </span>
    );
}

function getPaymentTone(status) {
    if (status === "paid") return "success";
    if (status === "failed") return "danger";
    return "warning";
}

function getBookingTone(status) {
    if (status === "confirmed") return "success";
    if (status === "cancelled") return "danger";
    return "warning";
}

export default function Admin() {
    const [activeNav, setActiveNav] = useState("dashboard");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [eilpRecords, setEilpRecords] = useState([]);
    const [eilpPagination, setEilpPagination] = useState(emptyPagination);
    const [counts, setCounts] = useState({
        eilp: 0,
        product: 0,
        guide: 0,
        transportation: 0,
        homestay: 0,
        rental: 0,
    });
    const [loadingDashboard, setLoadingDashboard] = useState(true);
    const [loadingRecords, setLoadingRecords] = useState(false);
    const [error, setError] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);

    const totalBookings = useMemo(
        () => Object.values(counts).reduce((sum, value) => sum + Number(value || 0), 0),
        [counts]
    );

    const activeCollection =
        activeNav === "dashboard" ? null : COLLECTION_META[activeNav];

    const fetchDashboard = useCallback(async () => {
        try {
            setLoadingDashboard(true);
            setError("");

            const token = getStoredToken();
            const response = await api.get("/admin/dashboard", {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            const serverCounts = response.data?.counts || {};

            setCounts({
                eilp: Number(serverCounts.eilp || 0),
                product: Number(serverCounts.product || 0),
                guide: Number(serverCounts.guide || 0),
                transportation: Number(serverCounts.transportation || 0),
                homestay: Number(serverCounts.homestay || 0),
                rental: Number(serverCounts.rental || 0),
            });
        } catch (err) {
            console.error("Admin dashboard fetch error:", err);
            setError(
                err.response?.data?.message ||
                "Unable to load dashboard data. Check the admin API and authentication."
            );
        } finally {
            setLoadingDashboard(false);
        }
    }, []);

    const fetchEilpRecords = useCallback(async () => {
        try {
            setLoadingRecords(true);
            setError("");

            const token = getStoredToken();
            const response = await api.get("/admin/bookings/eilp", {
                params: {
                    page,
                    limit: PAGE_SIZE,
                    search: search.trim(),
                },
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            setEilpRecords(response.data?.records || []);
            setEilpPagination(response.data?.pagination || emptyPagination);
        } catch (err) {
            console.error("e-ILP booking fetch error:", err);
            setEilpRecords([]);
            setEilpPagination(emptyPagination);
            setError(
                err.response?.data?.message ||
                "Unable to load e-ILP booking records."
            );
        } finally {
            setLoadingRecords(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    useEffect(() => {
        if (activeNav === "eilp") {
            fetchEilpRecords();
        }
    }, [activeNav, fetchEilpRecords]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
        }, 250);

        return () => clearTimeout(timer);
    }, [search]);

    const selectNav = (key) => {
        setActiveNav(key);
        setPage(1);
        setSearch("");
        setError("");
    };

    const handleExport = () => {
        window.alert(
            "Export is ready to be connected to a server-side CSV endpoint. The live e-ILP data is already available through the admin API."
        );
    };

    const renderCount = (key) => {
        if (key !== "eilp" && !Object.prototype.hasOwnProperty.call(counts, key)) {
            return "—";
        }
        return counts[key] ?? 0;
    };

    return (
        <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
            <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest border-r border-outline-variant/40 z-50 flex flex-col max-md:w-[78px]">
                <div className="h-24 px-6 max-md:px-3 flex items-center gap-3.5 border-b border-outline-variant/30">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                        <span className="material-symbols-outlined">travel_explore</span>
                    </div>

                    <div className="flex flex-col max-md:hidden">
                        <span className="font-display font-bold text-lg text-primary tracking-tight leading-tight">
                            VistaVentures
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-outline">
                            Admin Directorate
                        </span>
                    </div>
                </div>

                <div className="px-5 max-md:px-2 pt-5 pb-2">
                    <div className="px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-lg">
                            verified_user
                        </span>
                        <div className="flex flex-col max-md:hidden">
                            <span className="text-[11px] font-bold tracking-wide uppercase text-primary">
                                Admin Protected
                            </span>
                            <span className="text-[10px] text-on-surface-variant font-medium">
                                Booking Data Node
                            </span>
                        </div>
                    </div>
                </div>

                <nav className="flex flex-col gap-1.5 px-4 max-md:px-2 mt-3">
                    {NAV_ITEMS.map((item) => {
                        const active = activeNav === item.key;
                        const count =
                            item.key === "dashboard"
                                ? totalBookings
                                : item.configured
                                    ? counts[item.key]
                                    : null;

                        return (
                            <button
                                key={item.key}
                                type="button"
                                title={item.label}
                                onClick={() => selectNav(item.key)}
                                className={`w-full flex items-center gap-3 px-3.5 max-md:px-2.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${active
                                    ? "bg-primary text-on-primary shadow-sm"
                                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px] shrink-0">
                                    {item.icon}
                                </span>
                                <span className="truncate max-md:hidden">{item.label}</span>
                                {count !== null && (
                                    <span
                                        className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full max-md:hidden ${active
                                            ? "bg-white/20 text-white"
                                            : "bg-surface-container text-outline"
                                            }`}
                                    >
                                        {count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-auto p-5 max-md:p-2 border-t border-outline-variant/30">
                    <div className="p-3.5 rounded-xl bg-surface-container-low/80 border border-outline-variant/40 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                        <div className="max-md:hidden">
                            <div className="text-xs font-bold text-primary tracking-wide">
                                Live Database Sync
                            </div>
                            <div className="text-[10px] text-outline mt-0.5">
                                MongoDB • Admin Node
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="ml-72 max-md:ml-[78px] min-h-screen flex flex-col">
                <header className="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/40 px-6 lg:px-10 min-h-20 flex items-center justify-between gap-5">
                    <div className="relative w-full max-w-2xl">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl">
                            search
                        </span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low/70 border border-transparent focus:border-primary/30 focus:bg-surface-container-lowest text-on-surface placeholder:text-outline text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/10"
                            placeholder="Search e-ILP reference, applicant, state..."
                            type="search"
                        />
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={fetchDashboard}
                            className="p-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
                            title="Refresh dashboard"
                        >
                            <span className="material-symbols-outlined">refresh</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleExport}
                            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-xs font-semibold text-on-surface hover:bg-surface-container-low"
                        >
                            <span className="material-symbols-outlined text-[17px] text-primary">
                                download
                            </span>
                            Export
                        </button>

                        <div className="h-7 w-px bg-outline-variant/50" />

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined">admin_panel_settings</span>
                            </div>
                            <div className="hidden lg:flex flex-col">
                                <span className="text-sm font-semibold leading-tight">Admin</span>
                                <span className="text-[11px] text-outline">Super Admin</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 lg:py-8 max-w-[1600px] w-full mx-auto flex flex-col gap-6 lg:gap-8">
                    {error && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
                            <span className="material-symbols-outlined">error</span>
                            <div className="text-sm flex-1">{error}</div>
                            <button
                                type="button"
                                onClick={() => setError("")}
                                className="text-red-700"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                    )}

                    {activeNav === "dashboard" ? (
                        <MasterDashboard
                            counts={counts}
                            totalBookings={totalBookings}
                            loading={loadingDashboard}
                            onSelect={selectNav}
                        />
                    ) : activeNav === "eilp" ? (
                        <EilpRecords
                            records={eilpRecords}
                            pagination={eilpPagination}
                            loading={loadingRecords}
                            page={page}
                            onPageChange={setPage}
                            search={search}
                            onSearchChange={setSearch}
                            onViewBooking={setSelectedBooking}
                        />
                    ) : (
                        <CollectionPlaceholder
                            collection={activeCollection}
                            total={counts[activeNav] || 0}
                        />
                    )}
                </main>
            </div>

            {selectedBooking && (
                <ApplicantDetailsModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    );
}

function MasterDashboard({ counts, totalBookings, loading, onSelect }) {
    const cards = [
        {
            key: "eilp",
            title: "e-ILP Bookings",
            icon: "verified_user",
            value: counts.eilp,
            description: "Live records from EILPBooking",
        },
        {
            key: "product",
            title: "Product Bookings",
            icon: "shopping_bag",
            value: counts.product,
            description: "Collection not connected yet",
        },
        {
            key: "guide",
            title: "Guide Bookings",
            icon: "hiking",
            value: counts.guide,
            description: "Collection not connected yet",
        },
        {
            key: "transportation",
            title: "Transportation",
            icon: "directions_car",
            value: counts.transportation,
            description: "Collection not connected yet",
        },
        {
            key: "homestay",
            title: "Homestay Bookings",
            icon: "home_work",
            value: counts.homestay,
            description: "Collection not connected yet",
        },
        {
            key: "rental",
            title: "Rental Bookings",
            icon: "camping",
            value: counts.rental,
            description: "Collection not connected yet",
        },
    ];

    return (
        <>
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Live Booking Collections
                    </div>
                    <h1 className="font-display text-3xl lg:text-[34px] font-bold text-primary tracking-tight mt-1">
                        Master Booking Dashboard
                    </h1>
                    <p className="text-sm text-on-surface-variant mt-2 max-w-3xl">
                        Collection totals are fetched from MongoDB. Each service can be
                        connected to its own model later without changing the dashboard
                        structure.
                    </p>
                </div>

                <div className="px-5 py-4 rounded-2xl bg-primary text-on-primary shadow-sm min-w-[190px]">
                    <div className="text-[11px] uppercase tracking-wider opacity-80">
                        Total configured bookings
                    </div>
                    <div className="text-3xl font-bold mt-1">
                        {loading ? "…" : totalBookings}
                    </div>
                    <div className="text-xs opacity-80 mt-1">Across available collections</div>
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {cards.map((card) => (
                    <button
                        key={card.key}
                        type="button"
                        onClick={() => card.key === "eilp" && onSelect(card.key)}
                        className={`text-left p-6 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-xs transition-all ${card.key === "eilp"
                            ? "hover:-translate-y-0.5 hover:border-primary/30 cursor-pointer"
                            : "opacity-80 cursor-default"
                            }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">{card.icon}</span>
                            </div>
                            {card.key === "eilp" ? (
                                <StatusBadge tone="success">Live</StatusBadge>
                            ) : (
                                <StatusBadge>Pending model</StatusBadge>
                            )}
                        </div>

                        <div className="mt-5">
                            <div className="text-xs font-semibold uppercase tracking-wider text-outline">
                                {card.title}
                            </div>
                            <div className="text-3xl font-bold text-on-surface mt-2">
                                {loading ? "…" : card.value}
                            </div>
                            <div className="text-xs text-on-surface-variant mt-2">
                                {card.description}
                            </div>
                        </div>

                        {card.key === "eilp" && (
                            <div className="mt-5 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-semibold text-primary">
                                <span>Open records</span>
                                <span className="material-symbols-outlined text-base">
                                    arrow_forward
                                </span>
                            </div>
                        )}
                    </button>
                ))}
            </section>

            <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-xs overflow-hidden">
                <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="font-display text-xl font-bold text-primary">
                            Collection Status
                        </h2>
                        <p className="text-xs text-outline mt-1">
                            Future collections follow the same count + paginated-record pattern.
                        </p>
                    </div>
                    <span className="material-symbols-outlined text-primary">database</span>
                </div>

                <div className="divide-y divide-outline-variant/20">
                    {Object.entries(COLLECTION_META).map(([key, meta]) => (
                        <div
                            key={key}
                            className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-[20px]">
                                        {meta.icon}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">{meta.label}</div>
                                    <div className="text-[11px] text-outline">
                                        {key === "eilp"
                                            ? "Connected to MongoDB"
                                            : "Awaiting model and route"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-lg font-bold text-primary">
                                    {counts[key] || 0}
                                </span>
                                {key === "eilp" && (
                                    <button
                                        type="button"
                                        onClick={() => onSelect("eilp")}
                                        className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-xs font-semibold text-primary hover:bg-surface-container"
                                    >
                                        View
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

function EilpRecords({
    records,
    pagination,
    loading,
    page,
    onPageChange,
    onViewBooking,
}) {
    const pages = Math.max(1, pagination.pages || 1);

    return (
        <>
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                        <span className="material-symbols-outlined text-base">verified_user</span>
                        MongoDB • EILPBooking
                    </div>
                    <h1 className="font-display text-3xl lg:text-[34px] font-bold text-primary tracking-tight mt-1">
                        e-ILP Bookings
                    </h1>
                    <p className="text-sm text-on-surface-variant mt-2">
                        All e-ILP records are fetched from the EILPBooking collection with
                        server-side pagination.
                    </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40">
                    <div className="text-[11px] uppercase tracking-wider text-outline">
                        Total records
                    </div>
                    <div className="text-2xl font-bold text-primary">
                        {pagination.total}
                    </div>
                </div>
            </section>

            <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-xs overflow-hidden">
                <div className="px-5 sm:px-6 py-4 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="font-display text-lg font-bold text-primary">
                            Permit Records
                        </h2>
                        <p className="text-xs text-outline mt-1">
                            {pagination.total
                                ? `Showing ${Math.min(
                                    (page - 1) * PAGE_SIZE + 1,
                                    pagination.total
                                )}–${Math.min(page * PAGE_SIZE, pagination.total)} of ${pagination.total
                                }`
                                : "No records found"}
                        </p>
                    </div>

                    <StatusBadge tone="success">Live MongoDB Data</StatusBadge>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] text-left text-sm">
                        <thead>
                            <tr className="bg-surface-container-low/60 text-outline text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/30">
                                <th className="py-4 px-6">Reference / Date</th>
                                <th className="py-4 px-6">Applicant</th>
                                <th className="py-4 px-6">Category</th>
                                <th className="py-4 px-6">Travel</th>
                                <th className="py-4 px-6">Amount / Payment</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-outline-variant/20">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="py-16 text-center text-outline">
                                        <span className="material-symbols-outlined animate-spin text-2xl">
                                            progress_activity
                                        </span>
                                        <div className="mt-2 text-sm">Loading e-ILP records…</div>
                                    </td>
                                </tr>
                            ) : records.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="py-16 text-center">
                                        <span className="material-symbols-outlined text-4xl text-outline-variant">
                                            inbox
                                        </span>
                                        <div className="mt-2 font-semibold text-on-surface">
                                            No e-ILP bookings found
                                        </div>
                                        <div className="text-xs text-outline mt-1">
                                            The EILPBooking collection currently returned no matching
                                            records.
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                records.map((booking) => (
                                    <tr
                                        key={booking._id || booking.reference}
                                        className="hover:bg-surface-container-low/40 transition-colors"
                                    >
                                        <td className="py-4 px-6 align-top">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-primary font-mono text-xs">
                                                    {booking.reference || "—"}
                                                </span>
                                                <span className="text-xs text-outline">
                                                    {formatDate(booking.createdAt)}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 align-top">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold">{booking.fullName || "—"}</span>
                                                <span className="text-xs text-on-surface-variant">
                                                    {booking.mobileNo || "—"}
                                                </span>
                                                <span className="text-xs text-outline">
                                                    {booking.homeState || "—"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 align-top">
                                            <div className="flex flex-col gap-1">
                                                <span className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/10 text-xs font-semibold">
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        verified_user
                                                    </span>
                                                    Category {booking.category || "—"}
                                                </span>
                                                <span className="text-xs text-outline">
                                                    Arrival: {booking.arrivalDate || "—"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 align-top">
                                            <div className="flex flex-col gap-1 max-w-[260px]">
                                                <span className="font-medium">
                                                    {booking.entryPoint || "—"}
                                                </span>
                                                <span className="text-xs text-outline line-clamp-2">
                                                    {booking.travelPurpose || "—"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 align-top">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold">
                                                    {formatCurrency(booking.permitFee)}
                                                </span>
                                                <span className="text-xs text-outline capitalize">
                                                    {booking.paymentMethod || "—"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 align-top">
                                            <div className="flex flex-col items-start gap-1.5">
                                                <StatusBadge tone={getPaymentTone(booking.paymentStatus)}>
                                                    {booking.paymentStatus || "pending"}
                                                </StatusBadge>
                                                <StatusBadge tone={getBookingTone(booking.status)}>
                                                    {booking.status || "pending"}
                                                </StatusBadge>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 align-top text-right">
                                            <button
                                                type="button"
                                                onClick={() => onViewBooking(booking)}
                                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-xs font-semibold text-primary hover:bg-surface-container hover:border-primary/30 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">
                                                    visibility
                                                </span>
                                                <span>View Details</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    page={page}
                    pages={pages}
                    total={pagination.total}
                    onPageChange={onPageChange}
                />
            </section>
        </>
    );
}

function Pagination({ page, pages, total, onPageChange }) {
    const pageNumbers = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(pages, page + 2);

    for (let number = start; number <= end; number += 1) {
        pageNumbers.push(number);
    }

    return (
        <div className="px-5 sm:px-6 py-4 border-t border-outline-variant/30 bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-outline">
                Page {page} of {pages} • {total} total records • 5 per page
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-xs font-semibold disabled:opacity-40 hover:bg-surface-container"
                >
                    Previous
                </button>

                {start > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => onPageChange(1)}
                            className="px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-semibold"
                        >
                            1
                        </button>
                        {start > 2 && <span className="px-1 text-outline">…</span>}
                    </>
                )}

                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        type="button"
                        onClick={() => onPageChange(number)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${number === page
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-lowest border border-outline-variant/40 hover:bg-surface-container"
                            }`}
                    >
                        {number}
                    </button>
                ))}

                {end < pages && (
                    <>
                        {end < pages - 1 && <span className="px-1 text-outline">…</span>}
                        <button
                            type="button"
                            onClick={() => onPageChange(pages)}
                            className="px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-semibold"
                        >
                            {pages}
                        </button>
                    </>
                )}

                <button
                    type="button"
                    disabled={page >= pages}
                    onClick={() => onPageChange(page + 1)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-xs font-semibold disabled:opacity-40 hover:bg-surface-container"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

function CollectionPlaceholder({ collection, total }) {
    return (
        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-xs p-8 lg:p-12">
            <div className="max-w-2xl mx-auto text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">
                        {collection?.icon || "database"}
                    </span>
                </div>

                <h1 className="font-display text-3xl font-bold text-primary mt-5">
                    {collection?.label || "Collection"}
                </h1>

                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                    This section is intentionally ready for the same MongoDB logic, but
                    its model/collection has not been added yet. Once its model exists,
                    add one count query to the master dashboard and one paginated query
                    to this section.
                </p>

                <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
                    <span className="text-xs uppercase tracking-wider text-outline">
                        Current records
                    </span>
                    <span className="text-xl font-bold text-primary">{total}</span>
                </div>
            </div>
        </section>
    );
}


function ApplicantDetailsModal({ booking, onClose }) {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="applicant-details-title"
        >
            <button
                type="button"
                aria-label="Close applicant details"
                onClick={onClose}
                className="absolute inset-0 bg-on-surface/50 backdrop-blur-sm cursor-default"
            />

            <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-2xl flex flex-col">
                <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-outline-variant/30 flex items-center justify-between gap-4 shrink-0">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-primary">
                            <span className="material-symbols-outlined text-[17px]">verified_user</span>
                            e-ILP Applicant Record
                        </div>
                        <h2 id="applicant-details-title" className="font-display text-xl sm:text-2xl font-bold text-on-surface mt-1 truncate">
                            {booking.fullName || "Applicant Details"}
                        </h2>
                        <p className="text-xs text-outline mt-1 font-mono">
                            {booking.reference || "No reference"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-10 h-10 shrink-0 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="overflow-y-auto px-5 sm:px-7 py-5 sm:py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <DetailSection title="Applicant Information" icon="person">
                            <DetailItem label="Full Name" value={booking.fullName} />
                            <DetailItem label="ID Number" value={booking.idNumber} mono />
                            <DetailItem label="Mobile Number" value={booking.mobileNo} />
                            <DetailItem label="Home State" value={booking.homeState} />
                        </DetailSection>

                        <DetailSection title="Permit Information" icon="badge">
                            <DetailItem label="Reference" value={booking.reference} mono />
                            <DetailItem label="Category" value={booking.category ? `Category ${booking.category}` : null} />
                            <DetailItem label="Permit Fee" value={formatCurrency(booking.permitFee)} />
                            <DetailItem
                                label="Permit Status"
                                value={
                                    booking.status ? (
                                        <StatusBadge tone={getBookingTone(booking.status)}>
                                            {booking.status}
                                        </StatusBadge>
                                    ) : "—"
                                }
                            />
                        </DetailSection>

                        <DetailSection title="Travel Information" icon="flight_takeoff">
                            <DetailItem label="Entry Point" value={booking.entryPoint} />
                            <DetailItem label="Arrival Date" value={booking.arrivalDate} />
                            <DetailItem label="Travel Purpose" value={booking.travelPurpose} />
                            <DetailItem label="Stay / Accommodation" value={booking.stayLocation} />
                        </DetailSection>

                        <DetailSection title="Emergency Contact" icon="contact_emergency">
                            <DetailItem label="Emergency Contact" value={booking.emergencyName} />
                            <DetailItem label="Emergency Phone" value={booking.emergencyPhone} />
                        </DetailSection>

                        <DetailSection title="Payment Information" icon="payments">
                            <DetailItem
                                label="Payment Method"
                                value={
                                    booking.paymentMethod
                                        ? String(booking.paymentMethod).replace(
                                            /^./,
                                            (char) => char.toUpperCase()
                                        )
                                        : null
                                }
                            />
                            <DetailItem
                                label="Payment Status"
                                value={
                                    booking.paymentStatus ? (
                                        <StatusBadge tone={getPaymentTone(booking.paymentStatus)}>
                                            {booking.paymentStatus}
                                        </StatusBadge>
                                    ) : "—"
                                }
                            />
                            <DetailItem label="Amount Paid" value={formatCurrency(booking.permitFee)} />
                        </DetailSection>

                        <DetailSection title="Record Information" icon="database">
                            <DetailItem label="Created At" value={formatDate(booking.createdAt)} />
                            <DetailItem label="Updated At" value={formatDate(booking.updatedAt)} />
                            <DetailItem label="Database ID" value={booking._id} mono />
                        </DetailSection>
                    </div>
                </div>

                <div className="px-5 sm:px-7 py-4 border-t border-outline-variant/30 bg-surface-container-low/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-2 text-xs text-outline">
                        <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                        Admin-only applicant record
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-colors"
                    >
                        <span className="material-symbols-outlined text-[17px]">close</span>
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
}

function DetailSection({ title, icon, children }) {
    return (
        <section className="rounded-2xl border border-outline-variant/40 bg-surface-container-low/35 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 border-b border-outline-variant/30 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </div>
                <h3 className="text-sm font-bold text-primary">{title}</h3>
            </div>
            <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                {children}
            </div>
        </section>
    );
}

function DetailItem({ label, value, mono = false }) {
    return (
        <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider font-bold text-outline mb-1">
                {label}
            </div>
            <div className={`text-sm font-medium text-on-surface break-words ${mono ? "font-mono text-xs" : ""}`}>
                {value || "—"}
            </div>
        </div>
    );
}
