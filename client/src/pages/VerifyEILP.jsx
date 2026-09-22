import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function VerifyEILP() {
    const { reference } = useParams();

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyPermit = async () => {
            try {
                const response = await api.get(
                    `/eilp/verify/${encodeURIComponent(reference)}`
                );

                setBooking(response.data.booking);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to verify this e-ILP."
                );
            } finally {
                setLoading(false);
            }
        };

        verifyPermit();
    }, [reference]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-surface">
                <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-primary animate-pulse">
                        verified
                    </span>

                    <p className="mt-3 text-primary font-semibold">
                        Verifying e-ILP...
                    </p>
                </div>
            </main>
        );
    }

    if (error || !booking) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-surface px-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <span className="material-symbols-outlined text-6xl text-secondary">
                        cancel
                    </span>

                    <h1 className="mt-4 text-2xl font-bold text-primary">
                        Permit Not Found
                    </h1>

                    <p className="mt-2 text-on-surface-variant">
                        {error || "This e-ILP could not be verified."}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface px-6 py-12">
            <div className="max-w-2xl mx-auto">

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="bg-primary text-white p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">
                                verified
                            </span>
                        </div>

                        <div>
                            <h1 className="font-bold text-xl">
                                e-ILP Verified
                            </h1>

                            <p className="text-white/70 text-sm">
                                Government of Manipur
                            </p>
                        </div>
                    </div>

                    <div className="p-6 space-y-5">

                        <div className="flex justify-between">
                            <span className="text-outline">
                                Permit Reference
                            </span>

                            <strong className="font-mono text-primary">
                                {booking.reference}
                            </strong>
                        </div>

                        <div className="border-t pt-4">
                            <span className="text-outline text-sm">
                                Applicant
                            </span>

                            <p className="font-bold text-lg">
                                {booking.fullName}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <span className="text-outline text-xs uppercase">
                                    Category
                                </span>

                                <p className="font-bold">
                                    CAT {booking.category}
                                </p>
                            </div>

                            <div>
                                <span className="text-outline text-xs uppercase">
                                    Status
                                </span>

                                <p className="text-primary font-bold">
                                    {booking.status?.toUpperCase()}
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <span className="text-outline text-xs uppercase">
                                    Permit Fee
                                </span>

                                <p className="font-bold">
                                    ₹{booking.permitFee}
                                </p>
                            </div>

                            <div>
                                <span className="text-outline text-xs uppercase">
                                    Payment
                                </span>

                                <p className="text-primary font-bold">
                                    {booking.paymentStatus?.toUpperCase()}
                                </p>
                            </div>

                        </div>

                        <div className="bg-primary-fixed/30 rounded-xl p-4 flex gap-3">
                            <span className="material-symbols-outlined text-primary">
                                verified_user
                            </span>

                            <div>
                                <p className="font-bold text-primary">
                                    Digitally Verified Permit
                                </p>

                                <p className="text-sm text-on-surface-variant">
                                    This permit reference has been verified
                                    against the e-ILP system.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}