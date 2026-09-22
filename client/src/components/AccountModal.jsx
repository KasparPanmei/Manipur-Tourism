import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function AccountModal({
    initialView = "choose",
    onClose,
    onAuthenticated,
}) {
    const navigate = useNavigate();

    const [view, setView] = useState(initialView);

    const [mobile, setMobile] = useState("");
    const [userOtp, setUserOtp] = useState("");

    const [adminUsername, setAdminUsername] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminOtp, setAdminOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("error");

    const [authUser, setAuthUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("authUser");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [cartItems, setCartItems] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);

    const showMessage = (text, type = "error") => {
        setMessage(text);
        setMessageType(type);
    };

    const clearMessage = () => {
        setMessage("");
    };

    const saveAuthentication = (user, token) => {
        if (token) {
            localStorage.setItem("authToken", token);
        }

        localStorage.setItem("authUser", JSON.stringify(user));

        window.dispatchEvent(new Event("auth-user-changed"));

        setAuthUser(user);
    };

    const goBack = () => {
        clearMessage();

        if (view === "user-otp") {
            setView("user");
            return;
        }

        if (view === "admin-otp") {
            setView("admin");
            return;
        }

        if (view === "user" || view === "admin") {
            setView("choose");
            return;
        }

        if (view === "cart" || view === "history") {
            setView(
                authUser?.role === "admin"
                    ? "admin-account"
                    : "user-account"
            );
            return;
        }

        setView("choose");
    };


    const sendUserOtp = async () => {
        const cleanedMobile = mobile.replace(/\D/g, "");

        if (cleanedMobile.length !== 10) {
            showMessage(
                "Please enter a valid 10-digit mobile number."
            );
            return;
        }

        setLoading(true);
        clearMessage();

        try {
            const response = await api.post(
                "/auth/user/send-otp",
                {
                    mobile: cleanedMobile,
                }
            );

            showMessage(
                response.data?.message ||
                "OTP sent successfully. Please check your mobile.",
                "success"
            );

            setView("user-otp");
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                "Unable to send OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const verifyUserOtp = async () => {
        if (!/^\d{6}$/.test(userOtp)) {
            showMessage(
                "Please enter the 6-digit OTP."
            );
            return;
        }

        setLoading(true);
        clearMessage();

        try {
            const response = await api.post(
                "/auth/user/verify-otp",
                {
                    mobile: mobile.replace(/\D/g, ""),
                    otp: userOtp,
                }
            );

            const { token, user } = response.data || {};

            if (!user) {
                throw new Error(
                    "Authentication response did not contain a user."
                );
            }

            saveAuthentication(user, token);
            if (onAuthenticated) {
                onAuthenticated(user, token);
                return;
            }

            showMessage(
                "Signed in successfully.",
                "success"
            );

            /*
             * Keep the modal open briefly so the user sees
             * the successful authentication message.
             */
            setTimeout(() => {
                setView("user-account");
                clearMessage();
            }, 450);
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                error.message ||
                "OTP verification failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const submitAdminCredentials = async () => {
        if (!adminUsername.trim() || !adminPassword) {
            showMessage(
                "Enter both username and password."
            );
            return;
        }

        setLoading(true);
        clearMessage();

        try {
            const response = await api.post(
                "/auth/admin/login",
                {
                    username: adminUsername.trim(),
                    password: adminPassword,
                }
            );

            if (!response.data?.requiresOtp) {
                throw new Error(
                    "The server did not request administrator OTP."
                );
            }

            showMessage(
                response.data?.message ||
                "Credentials verified. Enter your administrator OTP.",
                "success"
            );

            setView("admin-otp");
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                "Administrator authentication failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const verifyAdminOtp = async () => {
        if (!/^\d{6}$/.test(adminOtp)) {
            showMessage(
                "Please enter the 6-digit administrator OTP."
            );
            return;
        }

        setLoading(true);
        clearMessage();

        try {
            const response = await api.post(
                "/auth/admin/verify-otp",
                {
                    username: adminUsername.trim(),
                    otp: adminOtp,
                }
            );

            const { token, user } = response.data || {};

            if (!user || user.role !== "admin") {
                throw new Error(
                    "Administrator authentication was not confirmed."
                );
            }

            saveAuthentication(user, token);

            if (onAuthenticated) {
                onAuthenticated(user, token);
            }

            onClose();
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                error.message ||
                "Administrator OTP verification failed."
            );
        } finally {
            setLoading(false);
        }
    };


    const loadCart = async () => {
        setLoading(true);
        clearMessage();

        try {
            const token =
                localStorage.getItem("authToken");

            const response = await api.get(
                "/cart",
                {
                    headers: token
                        ? {
                            Authorization:
                                `Bearer ${token}`,
                        }
                        : {},
                }
            );

            setCartItems(
                response.data?.items ||
                response.data?.cart?.items ||
                []
            );

            setView("cart");
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                "Unable to load your cart."
            );
        } finally {
            setLoading(false);
        }
    };


    const loadBookingHistory = async () => {
        setLoading(true);
        clearMessage();

        try {
            const token =
                localStorage.getItem("authToken");

            const response = await api.get(
                "/bookings/history",
                {
                    headers: token
                        ? {
                            Authorization:
                                `Bearer ${token}`,
                        }
                        : {},
                }
            );

            setBookingHistory(
                response.data?.bookings ||
                response.data?.history ||
                []
            );

            setView("history");
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                "Unable to load booking history."
            );
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");

        window.dispatchEvent(
            new Event("auth-user-changed")
        );

        setAuthUser(null);

        setMobile("");
        setUserOtp("");

        setAdminUsername("");
        setAdminPassword("");
        setAdminOtp("");

        setCartItems([]);
        setBookingHistory([]);

        clearMessage();

        setView("choose");
    };


    const renderView = () => {
        if (view === "choose") {
            return (
                <AccountChooser
                    onUser={() => {
                        clearMessage();
                        setView("user");
                    }}
                    onAdmin={() => {
                        clearMessage();
                        setView("admin");
                    }}
                />
            );
        }

        if (view === "user") {
            return (
                <UserMobileLogin
                    mobile={mobile}
                    setMobile={setMobile}
                    loading={loading}
                    onSubmit={sendUserOtp}
                />
            );
        }

        if (view === "user-otp") {
            return (
                <UserOtpVerification
                    mobile={mobile}
                    otp={userOtp}
                    setOtp={setUserOtp}
                    loading={loading}
                    onSubmit={verifyUserOtp}
                    onResend={sendUserOtp}
                />
            );
        }

        if (view === "admin") {
            return (
                <AdminLogin
                    username={adminUsername}
                    password={adminPassword}
                    setUsername={setAdminUsername}
                    setPassword={setAdminPassword}
                    loading={loading}
                    onSubmit={submitAdminCredentials}
                />
            );
        }

        if (view === "admin-otp") {
            return (
                <AdminOtpVerification
                    otp={adminOtp}
                    setOtp={setAdminOtp}
                    loading={loading}
                    onSubmit={verifyAdminOtp}
                />
            );
        }

        if (view === "user-account") {
            return (
                <UserAccount
                    user={authUser}
                    onCart={loadCart}
                    onHistory={loadBookingHistory}
                    onLogout={logout}
                />
            );
        }

        if (view === "admin-account") {
            return (
                <AdminAccount
                    user={authUser}
                    onLogout={logout}
                />
            );
        }

        if (view === "cart") {
            return (
                <CartView
                    items={cartItems}
                    onBack={goBack}
                />
            );
        }

        if (view === "history") {
            return (
                <BookingHistory
                    bookings={bookingHistory}
                    onBack={goBack}
                />
            );
        }

        return null;
    };


    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="profile-popup relative w-full max-w-md max-h-[calc(100vh-2rem)] bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/30 shrink-0">
                    <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.18em] text-outline font-bold">
                            Manipur Tourism
                        </p>

                        <h2 className="font-headline-sm text-primary text-xl font-bold mt-1 truncate">
                            {view === "choose" &&
                                "My Account"}

                            {view === "user" &&
                                "User Sign In"}

                            {view === "user-otp" &&
                                "Verify Mobile"}

                            {view === "admin" &&
                                "Administrator Login"}

                            {view === "admin-otp" &&
                                "Administrator OTP"}

                            {view === "user-account" &&
                                "My Account"}

                            {view === "admin-account" &&
                                "Administrator"}

                            {view === "cart" &&
                                "My Cart"}

                            {view === "history" &&
                                "Booking History"}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container transition-colors shrink-0"
                        aria-label="Close account"
                    >
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                </div>

                {/* BACK */}
                {view !== "choose" && (
                    <button
                        type="button"
                        onClick={goBack}
                        className="absolute left-6 top-[76px] z-10 w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                        aria-label="Go back"
                    >
                        <span className="material-symbols-outlined text-[19px]">
                            arrow_back
                        </span>
                    </button>
                )}

                {/* CONTENT */}
                <div className="p-6 overflow-y-auto">
                    {message && (
                        <div
                            className={`mb-5 flex items-start gap-2 p-3 rounded-xl text-sm ${messageType === "success"
                                ? "bg-primary-fixed/30 text-primary"
                                : "bg-red-50 text-red-700"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[19px] shrink-0">
                                {messageType === "success"
                                    ? "check_circle"
                                    : "error"}
                            </span>

                            <span>{message}</span>
                        </div>
                    )}

                    {renderView()}
                </div>
            </div>
        </div>
    );
}

function AccountChooser({
    onUser,
    onAdmin,
}) {
    return (
        <div className="space-y-5">
            <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary-fixed/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-4xl">
                        person
                    </span>
                </div>

                <h3 className="mt-4 font-headline-sm text-xl font-bold text-on-surface">
                    Welcome to Manipur Tourism
                </h3>

                <p className="mt-2 text-sm text-on-surface-variant">
                    Sign in to access your bookings, cart and account.
                </p>
            </div>

            <button
                type="button"
                onClick={onUser}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors text-left"
            >
                <span className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">
                        phone_android
                    </span>
                </span>

                <span className="min-w-0">
                    <span className="block font-bold text-on-surface">
                        Continue as User
                    </span>

                    <span className="block text-xs text-outline mt-1">
                        Sign in with mobile number + OTP
                    </span>
                </span>

                <span className="material-symbols-outlined text-outline ml-auto">
                    chevron_right
                </span>
            </button>

            <div className="relative py-1">
                <div className="border-t border-outline-variant/40" />

                <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 px-3 bg-surface-container-lowest text-xs text-outline">
                    Restricted access
                </span>
            </div>

            <button
                type="button"
                onClick={onAdmin}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-primary/15 hover:bg-primary/5 transition-colors text-left"
            >
                <span className="w-11 h-11 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">
                        admin_panel_settings
                    </span>
                </span>

                <span className="min-w-0">
                    <span className="block font-bold text-on-surface">
                        Administrator Login
                    </span>

                    <span className="block text-xs text-outline mt-1">
                        Username + password + OTP
                    </span>
                </span>

                <span className="material-symbols-outlined text-outline ml-auto">
                    chevron_right
                </span>
            </button>
        </div>
    );
}


function UserMobileLogin({
    mobile,
    setMobile,
    loading,
    onSubmit,
}) {
    return (
        <div className="space-y-5 pt-3">
            <div className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary-fixed/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">
                        phone_android
                    </span>
                </div>

                <h3 className="mt-4 font-headline-sm text-xl font-bold">
                    Sign in as User
                </h3>

                <p className="mt-2 text-sm text-on-surface-variant">
                    No password or registration is required. We'll
                    verify your mobile number with a one-time
                    password.
                </p>
            </div>

            <label className="block">
                <span className="block text-sm font-bold text-on-surface mb-2">
                    Mobile Number
                </span>

                <div className="flex rounded-xl border border-outline-variant/60 bg-white overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                    <span className="px-3 flex items-center text-sm font-semibold text-outline bg-surface-container-low border-r border-outline-variant/40">
                        +91
                    </span>

                    <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={10}
                        value={mobile}
                        onChange={(event) =>
                            setMobile(
                                event.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 10)
                            )
                        }
                        placeholder="Enter mobile number"
                        className="w-full px-4 py-3.5 bg-transparent outline-none text-on-surface"
                    />
                </div>
            </label>

            <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
                <span className="material-symbols-outlined">
                    {loading
                        ? "progress_activity"
                        : "sms"}
                </span>

                {loading
                    ? "Sending OTP..."
                    : "Send OTP"}
            </button>

            <p className="text-center text-xs text-outline">
                By continuing, you agree to use the mobile number
                for account verification and booking services.
            </p>
        </div>
    );
}


function UserOtpVerification({
    mobile,
    otp,
    setOtp,
    loading,
    onSubmit,
    onResend,
}) {
    return (
        <div className="space-y-5 pt-3">
            <div className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary-fixed/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">
                        verified_user
                    </span>
                </div>

                <h3 className="mt-4 font-headline-sm text-xl font-bold">
                    Verify your mobile
                </h3>

                <p className="mt-2 text-sm text-on-surface-variant">
                    Enter the 6-digit OTP sent to{" "}
                    <strong className="text-on-surface">
                        +91 {mobile}
                    </strong>
                </p>
            </div>

            <OtpInput
                value={otp}
                onChange={setOtp}
                autoFocus
                label="One-Time Password"
            />

            <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
                <span className="material-symbols-outlined">
                    {loading
                        ? "progress_activity"
                        : "login"}
                </span>

                {loading
                    ? "Verifying..."
                    : "Verify & Sign In"}
            </button>

            <button
                type="button"
                onClick={onResend}
                disabled={loading}
                className="w-full text-sm font-bold text-primary hover:text-primary-container disabled:opacity-50"
            >
                Resend OTP
            </button>
        </div>
    );
}


function AdminLogin({
    username,
    password,
    setUsername,
    setPassword,
    loading,
    onSubmit,
}) {
    return (
        <div className="space-y-5 pt-3">
            <div className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary-fixed/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">
                        admin_panel_settings
                    </span>
                </div>

                <h3 className="mt-4 font-headline-sm text-xl font-bold">
                    Administrator Access
                </h3>

                <p className="mt-2 text-sm text-on-surface-variant">
                    Enter your administrator credentials to
                    continue to OTP verification.
                </p>
            </div>

            <label className="block">
                <span className="block text-sm font-bold mb-2">
                    Username
                </span>

                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                        person
                    </span>

                    <input
                        type="text"
                        autoComplete="username"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        placeholder="Administrator username"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant/60 bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </div>
            </label>

            <label className="block">
                <span className="block text-sm font-bold mb-2">
                    Password
                </span>

                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                        lock
                    </span>

                    <input
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Administrator password"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant/60 bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </div>
            </label>

            <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
                <span className="material-symbols-outlined">
                    {loading
                        ? "progress_activity"
                        : "arrow_forward"}
                </span>

                {loading
                    ? "Checking..."
                    : "Continue"}
            </button>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-surface-container-low text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[17px] text-primary">
                    shield
                </span>

                <span>
                    Administrator access is protected by username,
                    password and one-time-password authentication.
                </span>
            </div>
        </div>
    );
}


function AdminOtpVerification({
    otp,
    setOtp,
    loading,
    onSubmit,
}) {
    return (
        <div className="space-y-5 pt-3">
            <div className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary-fixed/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">
                        security
                    </span>
                </div>

                <h3 className="mt-4 font-headline-sm text-xl font-bold">
                    Two-Step Verification
                </h3>

                <p className="mt-2 text-sm text-on-surface-variant">
                    Enter the 6-digit administrator OTP to complete
                    sign in.
                </p>
            </div>

            <OtpInput
                value={otp}
                onChange={setOtp}
                autoFocus
                label="Administrator OTP"
            />

            <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
                <span className="material-symbols-outlined">
                    {loading
                        ? "progress_activity"
                        : "verified"}
                </span>

                {loading
                    ? "Verifying..."
                    : "Verify Administrator"}
            </button>

            <div className="text-center text-xs text-outline">
                Keep your administrator OTP private.
            </div>
        </div>
    );
}


function OtpInput({
    value,
    onChange,
    label,
    autoFocus = false,
}) {
    const digits = String(value || "")
        .padEnd(6, " ")
        .slice(0, 6);

    const handleChange = (event) => {
        onChange(
            event.target.value
                .replace(/\D/g, "")
                .slice(0, 6)
        );
    };

    return (
        <label className="block">
            <span className="block text-sm font-bold text-center mb-3">
                {label}
            </span>

            <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={value}
                onChange={handleChange}
                autoFocus={autoFocus}
                aria-label={label}
                className="absolute opacity-0 pointer-events-none"
            />

            <div
                className="flex items-center justify-center gap-2 cursor-text"
                onClick={(event) => {
                    const input =
                        event.currentTarget
                            .previousElementSibling;

                    input?.focus();
                }}
            >
                {digits.split("").map(
                    (digit, index) => (
                        <span
                            key={index}
                            className={`w-10 h-12 sm:w-11 sm:h-13 rounded-xl border flex items-center justify-center text-xl font-bold ${digit.trim()
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-outline-variant/60 bg-white text-outline"
                                }`}
                        >
                            {digit.trim() || ""}
                        </span>
                    )
                )}
            </div>
        </label>
    );
}


function UserAccount({
    user,
    onCart,
    onHistory,
    onLogout,
}) {
    return (
        <div className="space-y-3">
            <AccountIdentity
                user={user}
                icon="person"
            />

            <button
                type="button"
                onClick={onCart}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
                <span className="material-symbols-outlined text-[22px]">
                    shopping_cart
                </span>

                <span className="font-semibold">
                    My Cart
                </span>

                <span className="material-symbols-outlined text-outline ml-auto">
                    chevron_right
                </span>
            </button>

            <button
                type="button"
                onClick={onHistory}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
                <span className="material-symbols-outlined text-[22px]">
                    history
                </span>

                <span className="font-semibold">
                    Booking History
                </span>

                <span className="material-symbols-outlined text-outline ml-auto">
                    chevron_right
                </span>
            </button>

            <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
                <span className="material-symbols-outlined text-[22px]">
                    person
                </span>

                <span className="font-semibold">
                    Account Details
                </span>
            </button>

            <div className="border-t border-outline-variant/30 my-4" />

            <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
                <span className="material-symbols-outlined">
                    logout
                </span>

                <span className="font-semibold">
                    Sign Out
                </span>
            </button>
        </div>
    );
}


function AdminAccount({
    user,
    onLogout,
}) {
    return (
        <div className="space-y-3">
            <AccountIdentity
                user={user}
                icon="admin_panel_settings"
                admin
            />

            <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
                <span className="material-symbols-outlined text-[22px]">
                    dashboard
                </span>

                <span className="font-semibold">
                    Admin Dashboard
                </span>
            </button>

            <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
                <span className="material-symbols-outlined text-[22px]">
                    receipt_long
                </span>

                <span className="font-semibold">
                    Manage Bookings
                </span>
            </button>

            <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
                <span className="material-symbols-outlined text-[22px]">
                    group
                </span>

                <span className="font-semibold">
                    Manage Users
                </span>
            </button>

            <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
                <span className="material-symbols-outlined text-[22px]">
                    inventory_2
                </span>

                <span className="font-semibold">
                    Manage Products
                </span>
            </button>

            <div className="border-t border-outline-variant/30 my-4" />

            <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
                <span className="material-symbols-outlined">
                    logout
                </span>

                <span className="font-semibold">
                    Sign Out
                </span>
            </button>
        </div>
    );
}


function AccountIdentity({
    user,
    icon,
    admin = false,
}) {
    return (
        <div
            className={`flex items-center gap-4 p-4 rounded-2xl mb-4 ${admin
                ? "bg-primary-fixed/30"
                : "bg-surface-container-low"
                }`}
        >
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">
                    {icon}
                </span>
            </div>

            <div className="min-w-0">
                <h3
                    className={`font-bold truncate ${admin
                        ? "text-primary"
                        : "text-on-surface"
                        }`}
                >
                    {user?.name ||
                        (admin
                            ? "Tourism Administrator"
                            : "Tourism User")}
                </h3>

                <p className="text-xs text-outline truncate">
                    {admin
                        ? "Administrator"
                        : user?.mobile
                            ? `+91 ${user.mobile}`
                            : "Verified user"}
                </p>
            </div>
        </div>
    );
}


function CartView({
    items,
    onBack,
}) {
    const total = items.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.quantity || 1),
        0
    );

    return (
        <div className="space-y-4 pt-3">
            <div className="flex items-center justify-between">
                <p className="text-sm text-on-surface-variant">
                    {items.length} item
                    {items.length === 1 ? "" : "s"} in your cart
                </p>

                <span className="text-xs font-bold uppercase tracking-wider text-outline">
                    Cart
                </span>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-10">
                    <div className="mx-auto w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-outline">
                            shopping_cart
                        </span>
                    </div>

                    <h3 className="mt-4 font-bold text-lg">
                        Your cart is empty
                    </h3>

                    <p className="mt-1 text-sm text-on-surface-variant">
                        Items you add to your cart will appear here.
                    </p>
                </div>
            ) : (
                <>
                    <div className="space-y-2">
                        {items.map((item, index) => (
                            <div
                                key={
                                    item._id ||
                                    item.itemId ||
                                    index
                                }
                                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low"
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={
                                            item.name ||
                                            "Cart item"
                                        }
                                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-lg bg-primary-fixed/30 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary">
                                            inventory_2
                                        </span>
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold truncate">
                                        {item.name ||
                                            "Tourism item"}
                                    </p>

                                    <p className="text-xs text-outline mt-1">
                                        Qty:{" "}
                                        {item.quantity || 1}
                                    </p>
                                </div>

                                <p className="font-bold text-primary">
                                    ₹
                                    {(
                                        Number(item.price || 0) *
                                        Number(item.quantity || 1)
                                    ).toLocaleString("en-IN")}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-primary text-white">
                        <span className="font-semibold">
                            Total
                        </span>

                        <span className="text-lg font-bold">
                            ₹
                            {total.toLocaleString("en-IN")}
                        </span>
                    </div>
                </>
            )}

            <button
                type="button"
                onClick={onBack}
                className="w-full px-5 py-3 rounded-xl bg-surface-container text-primary font-bold hover:bg-surface-container-high transition-colors"
            >
                Back to Account
            </button>
        </div>
    );
}


function BookingHistory({
    bookings,
    onBack,
}) {
    return (
        <div className="space-y-4 pt-3">
            {bookings.length === 0 ? (
                <div className="text-center py-10">
                    <div className="mx-auto w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-outline">
                            history
                        </span>
                    </div>

                    <h3 className="mt-4 font-bold text-lg">
                        No bookings yet
                    </h3>

                    <p className="mt-1 text-sm text-on-surface-variant">
                        Your confirmed tourism bookings will
                        appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {bookings.map((booking, index) => (
                        <div
                            key={
                                booking._id ||
                                booking.bookingReference ||
                                booking.reference ||
                                index
                            }
                            className="p-4 rounded-2xl bg-surface-container-low"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="font-bold truncate">
                                        {booking.title ||
                                            booking.bookingType ||
                                            "Tourism Booking"}
                                    </p>

                                    <p className="text-xs text-outline mt-1">
                                        Reference:{" "}
                                        {booking.bookingReference ||
                                            booking.reference ||
                                            "—"}
                                    </p>
                                </div>

                                <BookingStatus
                                    status={booking.status}
                                />
                            </div>

                            <div className="mt-3 flex items-center justify-between text-sm">
                                <span className="text-on-surface-variant">
                                    {booking.bookingDate
                                        ? new Date(
                                            booking.bookingDate
                                        ).toLocaleDateString("en-IN")
                                        : "Date unavailable"}
                                </span>

                                <span className="font-bold text-primary">
                                    ₹
                                    {Number(
                                        booking.amount || 0
                                    ).toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button
                type="button"
                onClick={onBack}
                className="w-full px-5 py-3 rounded-xl bg-surface-container text-primary font-bold hover:bg-surface-container-high transition-colors"
            >
                Back to Account
            </button>
        </div>
    );
}

function BookingStatus({ status }) {
    const normalized = String(
        status || "pending"
    ).toLowerCase();

    const config = {
        confirmed: {
            label: "Confirmed",
            className:
                "bg-primary-fixed/50 text-primary",
        },

        completed: {
            label: "Completed",
            className:
                "bg-primary-fixed/50 text-primary",
        },

        cancelled: {
            label: "Cancelled",
            className:
                "bg-red-50 text-red-700",
        },

        pending: {
            label: "Pending",
            className:
                "bg-tertiary-fixed text-tertiary",
        },
    };

    const current =
        config[normalized] || config.pending;

    return (
        <span
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${current.className}`}
        >
            {current.label}
        </span>
    );
}