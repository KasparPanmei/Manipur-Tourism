import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import TelemetryBar from "../components/home/TelemetryBar.jsx";
import api from "../services/api.js";
const INITIAL_FORM = {
    fullName: "Ananya Priyadarshini Roy",
    idNumber: "•••• •••• 9842 (Aadhaar Verified)",
    mobileNo: "+91 98301 44521",
    homeState: "West Bengal",
    entryPoint: "Bir Tikendrajit International Airport (IMF), Imphal",
    arrivalDate: "2025-04-12",
    travelPurpose: "Eco-Tourism & Loktak Lake Heritage",
    stayLocation: "Sendra Floating Resort, Loktak (Booking #MN-7712)",
    emergencyName: "Debraj Roy (Father)",
    emergencyPhone: "+91 98300 12890",
};

export default function EILP() {
    const [category, setCategory] = useState("A");
    const [form, setForm] = useState(INITIAL_FORM);
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [termsAccepted, setTermsAccepted] = useState(true);
    const [digiStatus, setDigiStatus] = useState("Connect & Auto-Fill");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [bookingReference, setBookingReference] = useState("");
    const permitFee = category === "B" ? 500 : 100;
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const validWindow = useMemo(() => {
        if (!form.arrivalDate) return "Select arrival date";
        const start = new Date(`${form.arrivalDate}T00:00:00`);
        const end = new Date(start);
        end.setDate(end.getDate() + 15);
        const fmt = new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
        return `${fmt.format(start)} – ${fmt.format(end)}`;
    }, [form.arrivalDate]);
    const permitReference = confirmedBooking?.reference || bookingReference || "";

    const verificationUrl = useMemo(() => {
        if (!permitReference) return "";

        return `${window.location.origin}/verify-eilp/${encodeURIComponent(
            permitReference,
        )}`;
    }, [permitReference]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const categoryClass = (value) =>
        value === category
            ? "category-card text-left p-space-md rounded-xl transition-all relative overflow-hidden bg-primary text-on-primary shadow-md flex flex-col justify-between group cursor-pointer"
            : "category-card text-left p-space-md rounded-xl transition-all relative overflow-hidden bg-surface-container-low text-on-surface hover:bg-surface-container shadow-sm flex flex-col justify-between group cursor-pointer";

    const handleDigiLocker = () => {
        setDigiStatus("Fetching UIDAI...");
        window.setTimeout(() => {
            setForm((current) => ({
                ...current,
                idNumber: "•••• •••• 9842 (Aadhaar Verified)",
            }));
            setDigiStatus("Verified & Linked");
        }, 800);
    };
    const handleAuthorizePayment = async () => {
        if (!termsAccepted || isProcessing) {
            return;
        }

        setIsProcessing(true);
        setPaymentStatus("");

        try {
            await loadRazorpay();

            const { data } = await api.post("/eilp/create-order", {
                category,

                paymentMethod,

                form: {
                    fullName: form.fullName,
                    idNumber: form.idNumber,
                    mobileNo: form.mobileNo,
                    homeState: form.homeState,

                    entryPoint: form.entryPoint,
                    arrivalDate: form.arrivalDate,
                    travelPurpose: form.travelPurpose,
                    stayLocation: form.stayLocation,

                    emergencyName: form.emergencyName,

                    emergencyPhone: form.emergencyPhone,
                },
            });

            const booking = data?.booking;

            if (!booking?.razorpayOrderId || !booking?.razorpayKeyId) {
                throw new Error("The server did not return a valid Razorpay order.");
            }

            setBookingReference(booking.reference);

            const options = {
                key: booking.razorpayKeyId,

                amount: booking.amountPaise,

                currency: booking.currency || "INR",

                name: "Manipur Tourism",

                description: `e-ILP Application ${booking.reference}`,

                order_id: booking.razorpayOrderId,

                prefill: {
                    name: form.fullName,

                    contact: form.mobileNo,
                },

                notes: {
                    booking_reference: booking.reference,

                    category,
                },

                theme: {
                    color: "#004335",
                },

                modal: {
                    ondismiss: () => {
                        setIsProcessing(false);

                        setPaymentStatus(
                            `Payment window closed. Your application ${booking.reference} is saved as pending.`,
                        );
                    },
                },

                handler: async (response) => {
                    try {
                        setPaymentStatus("Verifying payment securely...");

                        const verification = await api.post("/eilp/verify-payment", {
                            reference: booking.reference,

                            razorpay_order_id: response.razorpay_order_id,

                            razorpay_payment_id: response.razorpay_payment_id,

                            razorpay_signature: response.razorpay_signature,
                        });

                        if (!verification.data?.verified) {
                            throw new Error(
                                verification.data?.message || "Payment verification failed.",
                            );
                        }

                        setConfirmedBooking(verification.data.booking);

                        setPaymentStatus(
                            `Payment successful. e-ILP application ${booking.reference} has been confirmed.`,
                        );
                    } catch (error) {
                        if (error.response?.status === 429) {
                            setPaymentStatus(
                                error.response?.data?.message ||
                                "Too many booking attempts. Please wait and try again.",
                            );
                        } else {
                            setPaymentStatus(
                                error.response?.data?.message ||
                                error.message ||
                                "Unable to start the payment. Please try again.",
                            );
                        }
                    } finally {
                        setIsProcessing(false);
                    }
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.on("payment.failed", (response) => {
                console.error("Razorpay payment failed:", response.error);

                setIsProcessing(false);

                setPaymentStatus(
                    `Payment failed. Your application ${booking.reference} has been saved and can be retried.`,
                );
            });

            razorpay.open();
        } catch (error) {
            console.error("e-ILP payment error:", error);

            setIsProcessing(false);

            setPaymentStatus(
                error.response?.data?.message ||
                error.message ||
                "Unable to start the payment. Please try again.",
            );
        }
    };
    const loadRazorpay = () =>
        new Promise((resolve, reject) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const existingScript = document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
            );

            if (existingScript) {
                existingScript.addEventListener("load", () => resolve(true), {
                    once: true,
                });

                existingScript.addEventListener(
                    "error",
                    () => reject(new Error("Unable to load Razorpay Checkout.")),
                    { once: true },
                );

                return;
            }

            const script = document.createElement("script");

            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.async = true;

            script.onload = () => resolve(true);

            script.onerror = () =>
                reject(new Error("Unable to load Razorpay Checkout."));

            document.body.appendChild(script);
        });
    const handleDownloadPDF = () => {
        if (!confirmedBooking) {
            setPaymentStatus("Please complete payment before downloading the e-ILP.");
            return;
        }

        window.print();
    };

    return (
        <div className="flex flex-col w-full">
            <TelemetryBar />
            <section className="w-full bg-surface-container-high py-space-sm px-margin-mobile md:px-margin">
                <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm tracking-wider uppercase">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping"></span>
                        <span className="font-bold text-primary">
                            OFFICIAL CENTRAL CLEARANCE SYSTEM
                        </span>
                        <span className="text-outline">/</span>
                        <span>DEPARTMENT OF HOME AFFAIRS &amp; DIRECTORATE OF TOURISM</span>
                    </div>
                    <div className="flex items-center gap-space-md text-label-sm text-on-surface-variant font-label-sm">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-primary">
                                verified_user
                            </span>
                            BEFR Act 1873 Compliant
                        </span>
                        <span className="hidden sm:inline text-outline">|</span>
                        <span className="flex items-center gap-1 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                                support_agent
                            </span>
                            24/7 ILP Cell: 0385-2458140
                        </span>
                    </div>
                </div>
            </section>

            <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin">
                <div className="max-w-[1320px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                        <div className="lg:col-span-8 flex flex-col gap-space-sm">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm w-fit">
                                <span className="material-symbols-outlined text-[16px]">
                                    bolt
                                </span>
                                <span>FAST-TRACK DIGITAL ENTRY PLATFORM</span>
                            </div>
                            <h1 className="font-headline-lg text-headline-lg md:font-display-md md:text-display-md text-primary tracking-tight font-bold">
                                Official e-ILP Instant Application &amp; QR Pass Clearance
                            </h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                                Under the Bengal Eastern Frontier Regulation 1873, an Inner Line
                                Permit is mandatory for domestic visitors entering Manipur.
                                Complete instant DigiLocker authentication for immediate gate
                                issuance.
                            </p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                                    Digital Gateway Status
                                </span>
                                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>{" "}
                                    SYSTEM NOMINAL
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                                <div className="flex flex-col bg-surface-container-lowest p-space-sm rounded-lg">
                                    <span className="font-headline-sm text-headline-sm font-bold text-primary">
                                        114s
                                    </span>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Avg. Pass Generation
                                    </span>
                                </div>
                                <div className="flex flex-col bg-surface-container-lowest p-space-sm rounded-lg">
                                    <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                                        1,429
                                    </span>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Issued Today
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-[16px] text-primary">
                                    sensors
                                </span>
                                <span>
                                    Bir Tikendrajit Airport &amp; Mao Gate live turnstile sync
                                    active
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-space-lg flex flex-col gap-space-sm">
                        <div className="flex items-center justify-between">
                            <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">
                                Select Permit Class
                            </span>
                            <span className="font-body-sm text-body-sm text-outline">
                                Category A auto-selected for vacationers &amp; leisure travel
                            </span>
                        </div>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm"
                            id="categoryGrid"
                        >
                            <button
                                className={categoryClass("A")}
                                data-cat="A"
                                type="button"
                                onClick={() => setCategory("A")}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/40 rounded-full blur-xl pointer-events-none"></div>
                                <div className="flex flex-col gap-1 z-10">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-sm text-label-sm uppercase font-bold tracking-widest bg-surface-container-lowest/20 px-2 py-0.5 rounded text-white">
                                            CATEGORY A
                                        </span>
                                        <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">
                                            check_circle
                                        </span>
                                    </div>
                                    <span className="font-headline-sm text-headline-sm font-bold mt-2">
                                        Temporary Tourist
                                    </span>
                                    <p className="font-body-sm text-body-sm text-surface-container-high/90">
                                        Leisure, festivals, Loktak exploration &amp; trekking
                                        expeditions.
                                    </p>
                                </div>
                                <div className="pt-space-md flex items-end justify-between z-10">
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-surface-container-high/70 uppercase">
                                            Validity
                                        </span>
                                        <span className="font-label-md text-label-md font-bold">
                                            15 Days (Ext. 30)
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-sm text-label-sm text-surface-container-high/70 uppercase">
                                            Permit Fee
                                        </span>
                                        <span className="font-headline-sm text-headline-sm font-bold text-tertiary-fixed">
                                            ₹100
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <button
                                className={categoryClass("B")}
                                data-cat="B"
                                type="button"
                                onClick={() => setCategory("B")}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-sm text-label-sm uppercase font-bold tracking-widest text-outline">
                                            CATEGORY B
                                        </span>
                                        <span className="material-symbols-outlined text-[20px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                                            radio_button_unchecked
                                        </span>
                                    </div>
                                    <span className="font-headline-sm text-headline-sm font-bold mt-2">
                                        Regular / Trader
                                    </span>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Commercial dealers, procurement, and ongoing business
                                        visits.
                                    </p>
                                </div>
                                <div className="pt-space-md flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-outline uppercase">
                                            Validity
                                        </span>
                                        <span className="font-label-md text-label-md font-bold">
                                            6 Months
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-sm text-label-sm text-outline uppercase">
                                            Permit Fee
                                        </span>
                                        <span className="font-headline-sm text-headline-sm font-bold text-primary">
                                            ₹500
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <button
                                className={categoryClass("C")}
                                data-cat="C"
                                type="button"
                                onClick={() => setCategory("C")}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-sm text-label-sm uppercase font-bold tracking-widest text-outline">
                                            CATEGORY C
                                        </span>
                                        <span className="material-symbols-outlined text-[20px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                                            radio_button_unchecked
                                        </span>
                                    </div>
                                    <span className="font-headline-sm text-headline-sm font-bold mt-2">
                                        Special Labourer
                                    </span>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Infra projects, seasonal contractors with authorized
                                        sponsoring firms.
                                    </p>
                                </div>
                                <div className="pt-space-md flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-outline uppercase">
                                            Validity
                                        </span>
                                        <span className="font-label-md text-label-md font-bold">
                                            Contract Term
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-sm text-label-sm text-outline uppercase">
                                            Permit Fee
                                        </span>
                                        <span className="font-headline-sm text-headline-sm font-bold text-primary">
                                            ₹100
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <button
                                className={categoryClass("D")}
                                data-cat="D"
                                type="button"
                                onClick={() => setCategory("D")}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-sm text-label-sm uppercase font-bold tracking-widest text-secondary font-bold">
                                            CATEGORY D
                                        </span>
                                        <span className="material-symbols-outlined text-[20px] text-secondary">
                                            flight
                                        </span>
                                    </div>
                                    <span className="font-headline-sm text-headline-sm font-bold mt-2">
                                        Foreign Clearance
                                    </span>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        International passport holders via FRO / Indian Visa Bureau.
                                    </p>
                                </div>
                                <div className="pt-space-md flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-outline uppercase">
                                            Protocol
                                        </span>
                                        <span className="font-label-md text-label-md font-bold">
                                            RAP / PAP Clear
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-sm text-label-sm text-outline uppercase">
                                            Channel
                                        </span>
                                        <span className="font-label-md text-label-md font-bold text-secondary">
                                            FRO Direct
                                        </span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
                <div className="max-w-[1320px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                        <div className="lg:col-span-7 flex flex-col gap-space-lg">
                            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center font-label-md text-label-md">
                                        1
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md font-bold text-on-surface">
                                            Identity &amp; KYC
                                        </span>
                                        <span className="font-body-sm text-body-sm text-primary font-semibold">
                                            DigiLocker Verified
                                        </span>
                                    </div>
                                </div>
                                <div className="w-12 h-0.5 bg-surface-container-highest hidden sm:block"></div>
                                <div className="flex items-center gap-3 opacity-90">
                                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center font-label-md text-label-md">
                                        2
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md font-bold text-on-surface">
                                            Route &amp; Stay
                                        </span>
                                        <span className="font-body-sm text-body-sm text-outline">
                                            Checkpoints
                                        </span>
                                    </div>
                                </div>
                                <div className="w-12 h-0.5 bg-surface-container-highest hidden sm:block"></div>
                                <div className="flex items-center gap-3 opacity-90">
                                    <div className="w-8 h-8 rounded-full bg-surface-container-high text-outline font-bold flex items-center justify-center font-label-md text-label-md">
                                        3
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md font-bold text-outline">
                                            Clearance Fee
                                        </span>
                                        <span className="font-body-sm text-body-sm text-outline">
                                            Instant UPI
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[24px]">
                                            fingerprint
                                        </span>
                                        <h2 className="font-headline-sm text-headline-sm font-bold text-primary">
                                            1. Applicant Authentication
                                        </h2>
                                    </div>
                                    <span className="text-label-sm font-label-sm bg-primary-fixed/30 text-on-primary-fixed-variant px-2.5 py-1 rounded-full font-bold">
                                        UIDAI Certified
                                    </span>
                                </div>

                                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
                                    <div className="flex items-center gap-space-md">
                                        <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm">
                                            <span className="material-symbols-outlined text-primary text-[28px]">
                                                lock
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-label-md text-label-md font-bold text-on-surface">
                                                    Fast-Track via DigiLocker
                                                </span>
                                                <span className="material-symbols-outlined text-[16px] text-primary">
                                                    verified
                                                </span>
                                            </div>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                Auto-fetches verified Aadhaar / Passport data in sub-10
                                                seconds without manual photo upload.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className="w-full md:w-auto px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors shrink-0 shadow-sm cursor-pointer"
                                        id="btnDigilocker"
                                        type="button"
                                        onClick={handleDigiLocker}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            sync_saved_locally
                                        </span>
                                        <span>{digiStatus}</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="font-label-md text-label-md font-semibold text-on-surface"
                                            htmlFor="fullName"
                                        >
                                            Full Legal Name (as per Govt ID)
                                        </label>
                                        <input
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                                            id="fullName"
                                            type="text"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            name="fullName"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="font-label-md text-label-md font-semibold text-on-surface"
                                            htmlFor="idNumber"
                                        >
                                            Govt ID Number (Aadhaar / Voter / Pass)
                                        </label>
                                        <input
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                                            id="idNumber"
                                            type="text"
                                            value={form.idNumber}
                                            onChange={handleChange}
                                            name="idNumber"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="font-label-md text-label-md font-semibold text-on-surface"
                                            htmlFor="mobileNo"
                                        >
                                            Mobile Number (e-Pass SMS &amp; WhatsApp)
                                        </label>
                                        <input
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                                            id="mobileNo"
                                            type="tel"
                                            value={form.mobileNo}
                                            onChange={handleChange}
                                            name="mobileNo"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="font-label-md text-label-md font-semibold text-on-surface"
                                            htmlFor="homeState"
                                        >
                                            Permanent Origin State
                                        </label>
                                        <select
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                                            id="homeState"
                                            value={form.homeState}
                                            onChange={handleChange}
                                            name="homeState"
                                        >
                                            <option>West Bengal</option>
                                            <option>Maharashtra</option>
                                            <option>Karnataka</option>
                                            <option>Delhi NCR</option>
                                            <option>Tamil Nadu</option>
                                            <option>Kerala</option>
                                            <option>Other Indian States / UT</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[24px]">
                                            alt_route
                                        </span>
                                        <h2 className="font-headline-sm text-headline-sm font-bold text-primary">
                                            2. Entry Point &amp; Circuit Route
                                        </h2>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-outline">
                                        Checkpoint Sensor Synced
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="font-label-md text-label-md font-semibold text-on-surface"
                                            htmlFor="entryPoint"
                                        >
                                            Designated Point of Entry
                                        </label>
                                        <select
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                                            id="entryPoint"
                                            value={form.entryPoint}
                                            onChange={handleChange}
                                            name="entryPoint"
                                        >
                                            <option>
                                                Bir Tikendrajit International Airport (IMF), Imphal
                                            </option>
                                            <option>
                                                Mao Gate Checkpost (NH-2, Nagaland Border)
                                            </option>
                                            <option>
                                                Jiribam Railway Station / Highway (Assam Border)
                                            </option>
                                            <option>Moreh Integrated Checkpost (ICP, Chandel)</option>
                                            <option>Jessami Checkpoint (Ukhrul Border)</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="font-label-md text-label-md font-semibold text-on-surface"
                                            htmlFor="arrivalDate"
                                        >
                                            Intended Date of Arrival
                                        </label>
                                        <input
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                                            id="arrivalDate"
                                            type="date"
                                            value={form.arrivalDate}
                                            onChange={handleChange}
                                            name="arrivalDate"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="font-label-md text-label-md font-semibold text-on-surface"
                                            htmlFor="travelPurpose"
                                        >
                                            Primary Purpose of Visit
                                        </label>
                                        <select
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                                            id="travelPurpose"
                                            value={form.travelPurpose}
                                            onChange={handleChange}
                                            name="travelPurpose"
                                        >
                                            <option>Eco-Tourism &amp; Loktak Lake Heritage</option>
                                            <option>
                                                Shirui Lily &amp; Ukhrul Mountain Trekking
                                            </option>
                                            <option>Cultural Scholars &amp; Handloom Research</option>
                                            <option>Sangai Festival Attendance</option>
                                            <option>Family Reunion / Personal</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="font-label-md text-label-md font-semibold text-on-surface"
                                            htmlFor="stayLocation"
                                        >
                                            Accommodation / Local Stay Address
                                        </label>
                                        <input
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                                            id="stayLocation"
                                            type="text"
                                            value={form.stayLocation}
                                            onChange={handleChange}
                                            name="stayLocation"
                                        />
                                    </div>
                                </div>

                                <div className="pt-space-xs flex flex-col gap-2">
                                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                                        Next-of-Kin Emergency Contact
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                        <input
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none transition-all"
                                            placeholder="Contact Person Name"
                                            type="text"
                                            value={form.emergencyName}
                                            onChange={handleChange}
                                            name="emergencyName"
                                        />
                                        <input
                                            className="h-12 px-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none transition-all"
                                            placeholder="Emergency Phone"
                                            type="tel"
                                            value={form.emergencyPhone}
                                            onChange={handleChange}
                                            name="emergencyPhone"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[24px]">
                                            account_balance_wallet
                                        </span>
                                        <h2 className="font-headline-sm text-headline-sm font-bold text-primary">
                                            3. Statutory Fee Payment
                                        </h2>
                                    </div>
                                    <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                                        ₹{permitFee.toFixed(2)}
                                    </span>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Non-refundable statutory regulatory fee prescribed under
                                    Manipur Gazette Notification (ILP Amendment). Instant
                                    clearance activates automated digital gate barcode.
                                </p>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                                    <label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                                        <input
                                            checked={paymentMethod === "upi"}
                                            onChange={() => setPaymentMethod("upi")}
                                            className="accent-primary mb-2"
                                            name="paymethod"
                                            type="radio"
                                            value="upi"
                                        />
                                        <span className="material-symbols-outlined text-primary text-[24px]">
                                            qr_code_2
                                        </span>
                                        <span className="font-label-sm text-label-sm font-bold mt-1">
                                            UPI / QR
                                        </span>
                                    </label>
                                    <label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                                        <input
                                            checked={paymentMethod === "card"}
                                            onChange={() => setPaymentMethod("card")}
                                            className="accent-primary mb-2"
                                            name="paymethod"
                                            type="radio"
                                            value="card"
                                        />
                                        <span className="material-symbols-outlined text-primary text-[24px]">
                                            credit_card
                                        </span>
                                        <span className="font-label-sm text-label-sm font-bold mt-1">
                                            RuPay / Cards
                                        </span>
                                    </label>
                                    <label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                                        <input
                                            checked={paymentMethod === "netbanking"}
                                            onChange={() => setPaymentMethod("netbanking")}
                                            className="accent-primary mb-2"
                                            name="paymethod"
                                            type="radio"
                                            value="netbanking"
                                        />
                                        <span className="material-symbols-outlined text-primary text-[24px]">
                                            account_balance
                                        </span>
                                        <span className="font-label-sm text-label-sm font-bold mt-1">
                                            NetBanking
                                        </span>
                                    </label>
                                    <label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all">
                                        <input
                                            checked={paymentMethod === "wallet"}
                                            onChange={() => setPaymentMethod("wallet")}
                                            className="accent-primary mb-2"
                                            name="paymethod"
                                            type="radio"
                                            value="wallet"
                                        />
                                        <span className="material-symbols-outlined text-primary text-[24px]">
                                            account_balance_wallet
                                        </span>
                                        <span className="font-label-sm text-label-sm font-bold mt-1">
                                            Wallet
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-start gap-2 pt-space-xs">
                                    <input
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                                        id="termsCheck"
                                        type="checkbox"
                                    />
                                    <label
                                        className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer"
                                        htmlFor="termsCheck"
                                    >
                                        I solemnly certify that all details entered match my
                                        official government identity. I agree to abide by the inner
                                        line travel circuit restrictions and local customary laws of
                                        Manipur.
                                    </label>
                                </div>
                                <button
                                    className="w-full py-3.5 px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-container shadow-md transition-all cursor-pointer"
                                    id="btnSubmitClearance"
                                    type="button"
                                    onClick={handleAuthorizePayment}
                                    disabled={isProcessing || !termsAccepted}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        verified
                                    </span>
                                    <span>
                                        {isProcessing
                                            ? "Authorizing Payment..."
                                            : `Authorize Payment & Issue e-ILP Pass (₹${permitFee})`}
                                    </span>
                                </button>
                                {paymentStatus && (
                                    <div
                                        className="rounded-lg bg-primary-fixed/30 px-4 py-3 text-primary font-label-md text-label-md"
                                        role="status"
                                    >
                                        {paymentStatus}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="eilp-preview-column lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-24">
                            {paymentStatus && (
                                <div
                                    className={`rounded-xl p-4 border ${confirmedBooking
                                        ? "bg-primary-fixed/30 border-primary/20 text-primary"
                                        : "bg-surface-container text-primary border-outline-variant/40"
                                        }`}
                                    role="status"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[22px]">
                                            {confirmedBooking ? "verified" : "info"}
                                        </span>

                                        <div className="flex flex-col gap-1">
                                            <span className="font-label-md text-label-md font-bold">
                                                {confirmedBooking
                                                    ? "Payment Confirmed"
                                                    : "Application Status"}
                                            </span>

                                            <span className="font-body-sm text-body-sm">
                                                {paymentStatus}
                                            </span>

                                            {bookingReference && (
                                                <span className="font-mono text-[11px] mt-1 opacity-80">
                                                    Reference: {bookingReference}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <span className="font-label-lg text-label-lg font-bold text-primary uppercase tracking-wider">
                                    Live e-ILP Digital Document Preview
                                </span>

                                <span
                                    className={`inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold px-2 py-0.5 rounded ${confirmedBooking
                                        ? "text-primary bg-primary-fixed/40"
                                        : "text-outline bg-surface-container"
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${confirmedBooking
                                            ? "bg-primary animate-pulse"
                                            : "bg-outline"
                                            }`}
                                    ></span>

                                    {confirmedBooking ? "VERIFIED" : "PREVIEW"}
                                </span>
                            </div>

                            <div
                                className="eilp-print-document w-full
        bg-surface-container-lowest
        rounded-2xl
        p-space-lg
        shadow-xl
        relative
        overflow-hidden
        flex
        flex-col
        gap-space-md"
                            >
                                {/* Decorative background */}

                                <div className="absolute -right-8 -bottom-8 w-60 h-60 opacity-5 pointer-events-none">
                                    <svg
                                        className="w-full h-full text-primary"
                                        fill="currentColor"
                                        viewBox="0 0 100 100"
                                    >
                                        <circle
                                            cx="50"
                                            cy="50"
                                            fill="none"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />

                                        <path d="M50 15 L60 40 L85 40 L65 55 L72 80 L50 65 L28 80 L35 55 L15 40 L40 40 Z"></path>
                                    </svg>
                                </div>

                                <div className="flex items-center justify-between pb-space-sm bg-surface-container-low -mx-space-lg -mt-space-lg p-space-md">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shadow-sm">
                                            <span className="material-symbols-outlined text-[20px]">
                                                shield
                                            </span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="font-label-sm text-label-sm font-bold text-primary tracking-wide leading-none">
                                                GOVERNMENT OF MANIPUR
                                            </span>

                                            <span className="font-label-sm text-label-sm text-outline tracking-wider mt-0.5">
                                                INNER LINE PERMIT (e-ILP)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <span className="font-label-sm text-label-sm font-bold text-secondary bg-secondary-fixed px-2 py-0.5 rounded">
                                            {category === "A" && "TOURIST - CAT A"}
                                            {category === "B" && "REGULAR - CAT B"}
                                            {category === "C" && "LABOURER - CAT C"}
                                            {category === "D" && "FOREIGN - CAT D"}
                                        </span>

                                        <span className="text-[10px] font-mono text-outline mt-1 break-all">
                                            REF: {permitReference || "PENDING"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-space-md items-start pt-space-xs">
                                    {/* ICON-ONLY PROFILE */}

                                    <div className="w-20 h-24 rounded-lg bg-primary-fixed/30 border border-primary/10 shrink-0 flex items-center justify-center relative">
                                        <span className="material-symbols-outlined text-primary text-[52px]">
                                            account_circle
                                        </span>

                                        <div className="absolute bottom-0 inset-x-0 bg-primary/90 py-0.5 text-center text-[9px] font-bold text-white tracking-widest uppercase">
                                            VERIFIED
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-1 gap-1">
                                        <div className="flex items-baseline justify-between">
                                            <span className="font-label-sm text-label-sm text-outline uppercase">
                                                Applicant Name
                                            </span>

                                            <span className="font-label-sm text-label-sm text-primary font-bold">
                                                {confirmedBooking ? "KYC VERIFIED" : "KYC PENDING"}
                                            </span>
                                        </div>

                                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">
                                            {form.fullName || "Your Full Name"}
                                        </span>

                                        {/* APPLICATION DETAILS */}

                                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 bg-surface-container-low p-2 rounded-lg">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-outline font-semibold uppercase">
                                                    Permit Reference
                                                </span>

                                                <span className="font-mono text-label-md text-label-md font-bold text-primary">
                                                    {confirmedBooking?.reference ||
                                                        bookingReference ||
                                                        "PENDING"}
                                                </span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-outline font-semibold uppercase">
                                                    Valid Window
                                                </span>

                                                <span className="font-label-md text-label-md font-bold text-on-surface">
                                                    {validWindow}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-space-sm bg-surface-container-low/60 p-space-sm rounded-lg text-body-sm">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-outline">
                                            Mobile Number
                                        </span>

                                        <span className="font-semibold text-on-surface">
                                            {form.mobileNo || "Not provided"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-outline">
                                            Home State
                                        </span>

                                        <span className="font-semibold text-on-surface">
                                            {form.homeState || "Not provided"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-outline">
                                            Permit Category
                                        </span>

                                        <span className="font-semibold text-primary">
                                            Category {category}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-outline">
                                            Permit Fee
                                        </span>

                                        <span className="font-semibold text-secondary">
                                            ₹{permitFee}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-space-sm bg-surface-container-low/60 p-space-sm rounded-lg text-body-sm">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-outline">
                                            Entry Point
                                        </span>

                                        <span className="font-semibold text-on-surface">
                                            {form.entryPoint
                                                ? form.entryPoint.split(",")[0]
                                                : "Not selected"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-outline">
                                            Arrival Date
                                        </span>

                                        <span className="font-semibold text-on-surface">
                                            {form.arrivalDate || "Not selected"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col col-span-2">
                                        <span className="text-[10px] uppercase font-bold text-outline">
                                            Travel Purpose
                                        </span>

                                        <span className="font-semibold text-on-surface">
                                            {form.travelPurpose || "Not provided"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col col-span-2">
                                        <span className="text-[10px] uppercase font-bold text-outline">
                                            Accommodation
                                        </span>

                                        <span className="font-semibold text-on-surface">
                                            {form.stayLocation || "Not provided"}
                                        </span>
                                    </div>
                                </div>

                                {confirmedBooking && (
                                    <div className="rounded-xl bg-primary-fixed/20 border border-primary/10 p-space-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-primary text-[20px]">
                                                payments
                                            </span>

                                            <span className="font-label-md text-label-md font-bold text-primary">
                                                PAYMENT VERIFIED
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-outline">
                                                    Payment Method
                                                </span>

                                                <span className="font-label-md text-label-md font-bold text-on-surface uppercase">
                                                    {paymentMethod}
                                                </span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-outline">
                                                    Amount Paid
                                                </span>

                                                <span className="font-label-md text-label-md font-bold text-primary">
                                                    ₹{confirmedBooking.permitFee}
                                                </span>
                                            </div>

                                            <div className="flex flex-col col-span-2">
                                                <span className="text-[10px] uppercase font-bold text-outline">
                                                    Razorpay Payment ID
                                                </span>

                                                <span className="font-mono text-[11px] font-semibold text-on-surface break-all">
                                                    {confirmedBooking.razorpayPaymentId || "Verified"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded-xl shadow-sm">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-label-sm text-label-sm font-bold text-primary flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">
                                                qr_code_scanner
                                            </span>
                                            Digital e-ILP QR Pass
                                        </span>

                                        <span className="font-body-sm text-body-sm text-outline text-[11px] leading-tight">
                                            {confirmedBooking
                                                ? "Payment verified. Present this digital pass at the designated entry checkpoint."
                                                : "QR pass will become active after successful payment verification."}
                                        </span>

                                        <span className="text-[10px] font-mono text-outline mt-1">
                                            {confirmedBooking
                                                ? `REF: ${confirmedBooking.reference}`
                                                : "STATUS: PAYMENT REQUIRED"}
                                        </span>
                                    </div>

                                    <div className="w-24 h-24 bg-white p-1 rounded-lg shrink-0 shadow-inner flex items-center justify-center">
                                        {confirmedBooking && verificationUrl ? (
                                            <QRCodeSVG
                                                value={verificationUrl}
                                                size={88}
                                                bgColor="#ffffff"
                                                fgColor="#004335"
                                                level="H"
                                                includeMargin={false}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-outline">
                                                <span className="material-symbols-outlined text-[36px]">
                                                    qr_code_2
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {confirmedBooking && (
                                    <div className="grid grid-cols-2 gap-space-sm pt-space-xs no-print">
                                        <button
                                            className="py-2.5 px-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors cursor-pointer"
                                            type="button"
                                            onClick={handleDownloadPDF}
                                            disabled={!confirmedBooking}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                download
                                            </span>

                                            <span>Download PDF</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-start gap-3">
                                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px] shrink-0">
                                    info
                                </span>

                                <div className="flex flex-col gap-1">
                                    <span className="font-label-md text-label-md font-bold text-on-surface">
                                        Inspection &amp; Spot Check Rule
                                    </span>

                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Carry your digital pass on smartphone or printed copy
                                        alongside original photo ID. Random verifications occur at
                                        designated checkpoints.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin">
                <div className="max-w-[1320px] mx-auto flex flex-col gap-space-lg">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
                        <div className="flex flex-col gap-1">
                            <span className="font-label-sm text-label-sm uppercase font-bold text-outline tracking-wider">
                                STATE BORDER RECEPTIVITY
                            </span>
                            <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
                                Official Designated e-ILP Checkpoints
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-primary-fixed/40 text-primary font-label-sm text-label-sm font-semibold">
                                All 5 Checkposts Fully Functional
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-all">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[20px]">
                                            flight_land
                                        </span>
                                    </span>
                                    <span className="font-label-sm text-label-sm text-primary font-bold bg-surface-container px-2 py-0.5 rounded">
                                        24 HOURS OPEN
                                    </span>
                                </div>
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    Imphal Airport (IMF)
                                </span>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Automated smart e-gates situated inside Domestic Arrivals
                                    luggage carousel concourse. QR code instant scan clearance.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-space-xs text-outline font-label-sm text-label-sm">
                                <span>District: Imphal West</span>
                                <span className="text-primary font-semibold">
                                    Fast Gate Active
                                </span>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-all">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[20px]">
                                            directions_car
                                        </span>
                                    </span>
                                    <span className="font-label-sm text-label-sm text-primary font-bold bg-surface-container px-2 py-0.5 rounded">
                                        05:00 – 22:00
                                    </span>
                                </div>
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    Mao Gate (NH-02)
                                </span>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Primary highway entry point connecting Kohima/Dimapur to
                                    Imphal. Dedicated lane for pre-approved e-ILP barcode holders.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-space-xs text-outline font-label-sm text-label-sm">
                                <span>District: Senapati</span>
                                <span className="text-primary font-semibold">
                                    Fast Lane 1 &amp; 2
                                </span>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-all">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[20px]">
                                            train
                                        </span>
                                    </span>
                                    <span className="font-label-sm text-label-sm text-primary font-bold bg-surface-container px-2 py-0.5 rounded">
                                        TRAIN SCHEDULED
                                    </span>
                                </div>
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    Jiribam Rail Post
                                </span>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Assam-Manipur border rail terminus and NH-37 roadway. Tourist
                                    facilitating counter at railway station platform.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-space-xs text-outline font-label-sm text-label-sm">
                                <span>District: Jiribam</span>
                                <span className="text-primary font-semibold">
                                    Physical Desk Synced
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
                <div className="max-w-[1320px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                        <div className="lg:col-span-5 flex flex-col gap-space-md">
                            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-outline">
                                Statutory Notice &amp; Help
                            </span>
                            <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
                                Frequently Addressed Inquiries &amp; Legal Framework
                            </h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Inner Line Permit provisions are governed under Section 2, 3
                                &amp; 4 of the Bengal Eastern Frontier Regulation, 1873 as
                                adapted for the State of Manipur.
                            </p>

                            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm mt-space-sm">
                                <span className="font-label-md text-label-md font-bold text-primary">
                                    Official e-ILP Monitoring Unit
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-secondary text-[24px]">
                                        call
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-outline">
                                            ILP State Control Room
                                        </span>
                                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                            0385-2458140
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[24px]">
                                        chat
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-outline">
                                            WhatsApp Support Channel
                                        </span>
                                        <span className="font-label-md text-label-md font-bold text-on-surface">
                                            +91 87989 31221
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[24px]">
                                        mail
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm text-outline">
                                            Official Inquiries Email
                                        </span>
                                        <span className="font-label-md text-label-md font-bold text-on-surface">
                                            support-ilp@manipur.gov.in
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 flex flex-col gap-space-sm">
                            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-2">
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    Who is completely exempted from obtaining an e-ILP in Manipur?
                                </span>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Permanent indigenous residents of Manipur, Serving Armed
                                    Forces, Paramilitary Personnel and Central Government officers
                                    posted within Manipur on duty (along with verified dependents)
                                    upon presenting their official military or department photo
                                    service credentials.
                                </p>
                            </div>

                            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-2">
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    Can I extend my Category A Tourist Permit beyond 15 days?
                                </span>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Yes. A 15-day Tourist Permit can be extended online up to a
                                    total of 30 days directly through this portal under the
                                    "Extend Permit" module, or by presenting your passport/e-pass
                                    reference at the Deputy Commissioner (DC) Office in Imphal
                                    West or Churachandpur with an additional nominal fee of ₹100.
                                </p>
                            </div>

                            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-2">
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    Is a separate Protected Area Permit (PAP) needed for foreign
                                    passport holders?
                                </span>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Foreign nationals do not require an Inner Line Permit.
                                    However, all foreign passport holders must register with the
                                    Foreigners Registration Office (FRO) within 24 hours of
                                    arrival in Imphal through their hotel or the FRO kiosk at Bir
                                    Tikendrajit Airport. Nationals of Afghanistan, China, and
                                    Pakistan require prior clearance from the Ministry of Home
                                    Affairs (MHA), Government of India.
                                </p>
                            </div>

                            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-2">
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    What happens if my entry flight or road journey is delayed?
                                </span>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    The e-ILP provides a 48-hour arrival grace period window prior
                                    to the designated start date. If your rescheduled arrival
                                    exceeds 48 hours, you can update your travel date once without
                                    incurring any additional charges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
