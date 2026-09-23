import { useState, useEffect } from "react";
import api from "../services/api.js";

export default function AccountModal({
    initialView = "choose",
    onClose,
    onAuthenticated,
}) {
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
    const [historyLoading, setHistoryLoading] = useState(false);

    const [address, setAddress] = useState(null);
    const [addressLoading, setAddressLoading] = useState(false);
    const [addressSaving, setAddressSaving] = useState(false);
    const [addressEditing, setAddressEditing] = useState(false);
    const [addressForm, setAddressForm] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        landmark: "",
    });

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

        localStorage.setItem(
            "authUser",
            JSON.stringify(user)
        );

        window.dispatchEvent(
            new Event("auth-user-changed")
        );

        setAuthUser(user);
    };

    const loadCart = async (openCart = false) => {
        try {
            const token =
                localStorage.getItem("authToken");

            if (!token) {
                setCartItems([]);

                if (openCart) {
                    setView("cart");
                }

                return;
            }

            const response = await api.get(
                "/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const items =
                response.data?.items || [];

            setCartItems(items);

            if (openCart) {
                setView("cart");
            }

            return items;
        } catch (error) {
            console.error(
                "Load cart error:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                "Unable to load your cart."
            );

            return null;
        }
    };

    useEffect(() => {
        const token =
            localStorage.getItem("authToken");

        if (!token) {
            return;
        }


        if (initialView === "cart") {
            loadCart(false).then((items) => {
                if (items !== null) {
                    setView("cart");
                }
            });

            return;
        }

        if (initialView === "account-details") {
            setView("account-details");
            loadAddress();
            return;
        }

        if (
            initialView === "choose" ||
            initialView === "user-account"
        ) {
            loadCart(false);
        }
    }, [initialView]);


    useEffect(() => {
        const handleCartUpdated = () => {
            loadCart(false);
        };

        window.addEventListener(
            "cart-updated",
            handleCartUpdated
        );

        return () => {
            window.removeEventListener(
                "cart-updated",
                handleCartUpdated
            );
        };
    }, []);

    const openCart = async () => {
        clearMessage();

        const token =
            localStorage.getItem("authToken");

        if (!token) {
            setCartItems([]);
            setView("cart");
            return;
        }

        const items = await loadCart(false);

        /*
         * Only switch to Cart after the request completes.
         */
        if (items !== null) {
            setView("cart");
        }
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

        if (
            view === "user" ||
            view === "admin"
        ) {
            setView("choose");
            return;
        }

        if (view === "checkout") {
            setView("cart");
            return;
        }

        if (view === "cart") {
            if (
                authUser?.role === "user"
            ) {
                setView("user-account");
            } else {
                setView("choose");
            }

            return;
        }

        if (view === "history" || view === "account-details") {
            if (authUser) {
                setView(
                    authUser.role === "admin"
                        ? "admin-account"
                        : "user-account"
                );
            } else {
                setView("choose");
            }

            return;
        }

        setView("choose");
    };


    const sendUserOtp = async () => {
        const cleanedMobile =
            mobile.replace(/\D/g, "");

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
                    mobile:
                        mobile.replace(/\D/g, ""),
                    otp: userOtp,
                }
            );

            const { token, user } =
                response.data || {};

            if (!user) {
                throw new Error(
                    "Authentication response did not contain a user."
                );
            }

            saveAuthentication(
                user,
                token
            );

            await loadCart(false);

            if (onAuthenticated) {
                onAuthenticated(
                    user,
                    token
                );
                return;
            }

            showMessage(
                "Signed in successfully.",
                "success"
            );

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


    const submitAdminCredentials =
        async () => {
            if (
                !adminUsername.trim() ||
                !adminPassword
            ) {
                showMessage(
                    "Enter both username and password."
                );
                return;
            }

            setLoading(true);
            clearMessage();

            try {
                const response =
                    await api.post(
                        "/auth/admin/login",
                        {
                            username:
                                adminUsername.trim(),
                            password:
                                adminPassword,
                        }
                    );

                if (
                    !response.data
                        ?.requiresOtp
                ) {
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
                    error.response?.data
                        ?.message ||
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
            const response =
                await api.post(
                    "/auth/admin/verify-otp",
                    {
                        username:
                            adminUsername.trim(),
                        otp: adminOtp,
                    }
                );

            const { token, user } =
                response.data || {};

            if (
                !user ||
                user.role !== "admin"
            ) {
                throw new Error(
                    "Administrator authentication was not confirmed."
                );
            }

            saveAuthentication(
                user,
                token
            );

            if (onAuthenticated) {
                onAuthenticated(
                    user,
                    token
                );
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


    const openBookingHistory = () => {
        clearMessage();

        const token =
            localStorage.getItem("authToken");

        if (!token) {
            showMessage(
                "Please sign in to view your booking history."
            );
            return;
        }

        /*
         * Change the view immediately.
         * The actual API request is handled by the
         * useEffect below after React has rendered
         * the history view.
         */
        setView("history");
    };


    useEffect(() => {
        if (view !== "history") {
            return;
        }

        let cancelled = false;

        const fetchBookingHistory = async () => {
            const token =
                localStorage.getItem("authToken");

            if (!token) {
                if (!cancelled) {
                    setBookingHistory([]);
                    setHistoryLoading(false);
                }
                return;
            }

            setHistoryLoading(true);
            clearMessage();

            try {
                const response =
                    await api.get(
                        "/bookings/history",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                if (cancelled) {
                    return;
                }

                setBookingHistory(
                    response.data?.bookings ||
                    response.data?.orders ||
                    response.data?.history ||
                    []
                );
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Load booking history error:",
                    error
                );

                showMessage(
                    error.response?.data
                        ?.message ||
                    "Unable to load booking history."
                );
            } finally {
                if (!cancelled) {
                    setHistoryLoading(false);
                }
            }
        };

        fetchBookingHistory();

        return () => {
            cancelled = true;
        };
    }, [view]);


    const loadAddress = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            setAddress(null);
            return null;
        }

        setAddressLoading(true);
        clearMessage();

        try {
            const response = await api.get("/address", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const savedAddress =
                response.data?.address || null;

            setAddress(savedAddress);

            setAddressForm({
                fullName:
                    savedAddress?.fullName ||
                    authUser?.name ||
                    "",

                phone:
                    savedAddress?.phone ||
                    authUser?.mobile ||
                    authUser?.phone ||
                    "",

                addressLine1:
                    savedAddress?.addressLine1 || "",

                addressLine2:
                    savedAddress?.addressLine2 || "",

                city:
                    savedAddress?.city || "",

                district:
                    savedAddress?.district || "",

                state:
                    savedAddress?.state || "",

                pincode:
                    savedAddress?.pincode || "",

                landmark:
                    savedAddress?.landmark || "",
            });

            return savedAddress;

        } catch (error) {
            console.error(
                "Load address error:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                "Unable to load your account address."
            );

            return null;

        } finally {
            setAddressLoading(false);
        }
    };

    const openAccountDetails = async () => {
        clearMessage();
        setAddressEditing(false);
        setView("account-details");

        await loadAddress(false);
    };

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setAddressForm((current) => ({
            ...current,
            [name]: name === "phone" || name === "pincode"
                ? value.replace(/\D/g, "")
                : value,
        }));
    };

    const saveAddress = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            showMessage("Please sign in to save your address.");
            return;
        }

        const required = [
            ["fullName", "Full name"],
            ["phone", "Phone number"],
            ["addressLine1", "Address"],
            ["city", "City"],
            ["district", "District"],
            ["state", "State"],
            ["pincode", "PIN code"],
        ];

        for (const [field, label] of required) {
            if (!String(addressForm[field] || "").trim()) {
                showMessage(`${label} is required.`);
                return;
            }
        }

        const phone = addressForm.phone.replace(/\D/g, "");
        const pincode = addressForm.pincode.replace(/\D/g, "");

        if (phone.length !== 10) {
            showMessage("Please enter a valid 10-digit phone number.");
            return;
        }

        if (pincode.length !== 6) {
            showMessage("Please enter a valid 6-digit PIN code.");
            return;
        }

        setAddressSaving(true);
        clearMessage();

        try {
            const response = await api.put("/address", {
                ...addressForm,
                fullName: addressForm.fullName.trim(),
                phone,
                addressLine1: addressForm.addressLine1.trim(),
                addressLine2: addressForm.addressLine2.trim(),
                city: addressForm.city.trim(),
                district: addressForm.district.trim(),
                state: addressForm.state.trim(),
                pincode,
                landmark: addressForm.landmark.trim(),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAddress(response.data?.address || addressForm);
            setAddressEditing(false);
            showMessage("Address saved successfully.", "success");
        } catch (error) {
            console.error("Save address error:", error);
            showMessage(error.response?.data?.message || "Unable to save your address.");
        } finally {
            setAddressSaving(false);
        }
    };

    const deleteAddress = async () => {
        const token = localStorage.getItem("authToken");
        if (!token || !address?._id) return;

        if (!window.confirm("Are you sure you want to remove your saved address?")) return;

        setAddressSaving(true);
        clearMessage();

        try {
            await api.delete(`/address/${address._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAddress(null);
            setAddressEditing(false);
            showMessage("Saved address removed.", "success");
        } catch (error) {
            console.error("Delete address error:", error);
            showMessage(error.response?.data?.message || "Unable to remove your address.");
        } finally {
            setAddressSaving(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(
            "authToken"
        );

        localStorage.removeItem(
            "authUser"
        );

        window.dispatchEvent(
            new Event(
                "auth-user-changed"
            )
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
                    setUsername={
                        setAdminUsername
                    }
                    setPassword={
                        setAdminPassword
                    }
                    loading={loading}
                    onSubmit={
                        submitAdminCredentials
                    }
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
                    onCart={openCart}
                    onHistory={
                        openBookingHistory
                    }
                    onAccountDetails={openAccountDetails}
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

        if (view === "account-details") {
            return (
                <AccountDetailsView
                    address={address}
                    addressForm={addressForm}
                    loading={addressLoading}
                    saving={addressSaving}
                    editing={addressEditing}
                    onEdit={() => {
                        clearMessage();
                        setAddressEditing(true);
                    }}
                    onCancelEdit={goBack}
                    onChange={handleAddressChange}
                    onSave={saveAddress}
                    onDelete={deleteAddress}
                />
            );
        }

        if (view === "cart") {
            return (
                <CartView
                    items={cartItems}
                    onBack={goBack}
                    onAccountDetails={openAccountDetails}
                    onCartUpdated={() =>
                        loadCart(false)
                    }
                />
            );
        }

        if (view === "history") {
            return (
                <BookingHistory
                    bookings={bookingHistory}
                    loading={historyLoading}
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

                            {view ===
                                "user-otp" &&
                                "Verify Mobile"}

                            {view === "admin" &&
                                "Administrator Login"}

                            {view ===
                                "admin-otp" &&
                                "Administrator OTP"}

                            {view ===
                                "user-account" &&
                                "My Account"}

                            {view ===
                                "admin-account" &&
                                "Administrator"}

                            {view === "cart" &&
                                "My Cart"}

                            {view === "checkout" &&
                                "Confirm Booking"}

                            {view === "history" &&
                                "Booking History"}

                            {view === "account-details" &&
                                "Account Details"}
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
                            className={`mb-5 flex items-start gap-2 p-3 rounded-xl text-sm ${messageType ===
                                "success"
                                ? "bg-primary-fixed/30 text-primary"
                                : "bg-red-50 text-red-700"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[19px] shrink-0">
                                {messageType ===
                                    "success"
                                    ? "check_circle"
                                    : "error"}
                            </span>

                            <span>
                                {message}
                            </span>
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
                    Sign in to access your
                    bookings, cart and
                    account.
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
                        Sign in with mobile
                        number + OTP
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
                        Username + password
                        + OTP
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
                    No password or
                    registration is required.
                    We'll verify your mobile
                    number with a one-time
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
                                    .replace(
                                        /\D/g,
                                        ""
                                    )
                                    .slice(
                                        0,
                                        10
                                    )
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
                By continuing, you agree to use
                the mobile number for account
                verification and booking services.
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
                    Enter the 6-digit OTP sent
                    to{" "}
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
                    Enter your administrator
                    credentials to continue to
                    OTP verification.
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
                            setUsername(
                                event.target.value
                            )
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
                            setPassword(
                                event.target.value
                            )
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
                    Administrator access is
                    protected by username,
                    password and one-time-password
                    authentication.
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
                    Enter the 6-digit administrator
                    OTP to complete sign in.
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
                {digits
                    .split("")
                    .map(
                        (
                            digit,
                            index
                        ) => (
                            <span
                                key={index}
                                className={`w-10 h-12 sm:w-11 sm:h-13 rounded-xl border flex items-center justify-center text-xl font-bold ${digit.trim()
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-outline-variant/60 bg-white text-outline"
                                    }`}
                            >
                                {digit.trim() ||
                                    ""}
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
    onAccountDetails,
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

                onClick={onAccountDetails}
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




function AccountDetailsView({
    address,
    addressForm,
    loading,
    saving,
    editing,
    onEdit,
    onCancelEdit,
    onChange,
    onSave,
    onDelete,
}) {
    if (loading) {
        return (
            <div className="space-y-5 pt-3">
                <div className="text-center py-10">
                    <div className="mx-auto w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-primary animate-spin">progress_activity</span>
                    </div>
                    <h3 className="mt-4 font-bold text-lg">Loading account details</h3>
                    <p className="mt-1 text-sm text-on-surface-variant">Checking your saved address...</p>
                </div>
                <button type="button" onClick={onCancelEdit}
                    className="w-full px-5 py-3 rounded-xl bg-surface-container text-primary font-bold">
                    Back to Account
                </button>
            </div>
        );
    }

    if (!address || editing) {
        return (
            <div className="space-y-5 pt-3">
                <div className="text-center">
                    <div className="mx-auto w-14 h-14 rounded-full bg-primary-fixed/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">
                            {address ? "edit_location_alt" : "add_location_alt"}
                        </span>
                    </div>
                    <h3 className="mt-4 font-bold text-lg">
                        {address ? "Edit Address" : "Add Your Address"}
                    </h3>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        {address ? "Update your saved address details." : "Add an address for a faster and easier checkout."}
                    </p>
                </div>

                <div className="space-y-4">
                    <AddressField label="Full Name" name="fullName" value={addressForm.fullName} onChange={onChange} placeholder="Enter your full name" required />
                    <AddressField label="Phone Number" name="phone" value={addressForm.phone} onChange={onChange} placeholder="10-digit mobile number" type="tel" inputMode="numeric" maxLength={10} required />
                    <AddressField label="Address Line 1" name="addressLine1" value={addressForm.addressLine1} onChange={onChange} placeholder="House number, street, locality" required />
                    <AddressField label="Address Line 2" name="addressLine2" value={addressForm.addressLine2} onChange={onChange} placeholder="Apartment, village, area (optional)" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AddressField label="City" name="city" value={addressForm.city} onChange={onChange} placeholder="City / Town" required />
                        <AddressField label="District" name="district" value={addressForm.district} onChange={onChange} placeholder="District" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AddressField label="State" name="state" value={addressForm.state} onChange={onChange} placeholder="State" required />
                        <AddressField label="PIN Code" name="pincode" value={addressForm.pincode} onChange={onChange} placeholder="6-digit PIN" inputMode="numeric" maxLength={6} required />
                    </div>
                    <AddressField label="Landmark" name="landmark" value={addressForm.landmark} onChange={onChange} placeholder="Nearby landmark (optional)" />
                </div>

                <button type="button" onClick={onSave} disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-container disabled:opacity-60 transition-colors">
                    <span className="material-symbols-outlined">{saving ? "progress_activity" : "save"}</span>
                    {saving ? "Saving Address..." : "Save Address"}
                </button>

                {address && (
                    <button type="button" onClick={onCancelEdit} disabled={saving}
                        className="w-full px-5 py-3 rounded-xl bg-surface-container text-primary font-bold disabled:opacity-60">
                        Cancel
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-5 pt-3">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-outline font-bold">Saved Address</p>
                    <h3 className="font-bold text-lg text-on-surface mt-1">Your Delivery Address</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed/50 text-primary text-[10px] uppercase tracking-wider font-bold">
                    <span className="material-symbols-outlined text-[14px]">verified</span>Saved
                </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-bold text-on-surface">{address.fullName}</h4>
                        <p className="text-sm text-on-surface-variant mt-1">+91 {address.phone}</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-outline-variant/30 space-y-1.5 text-sm text-on-surface-variant">
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.district}</p>
                    <p>{address.state} — {address.pincode}</p>
                    {address.landmark && <p className="pt-1 text-xs text-outline">Landmark: {address.landmark}</p>}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <button type="button" onClick={onEdit}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-container">
                    <span className="material-symbols-outlined text-[18px]">edit</span>Edit Address
                </button>
                <button type="button" onClick={onDelete} disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-700 font-bold hover:bg-red-100 disabled:opacity-60">
                    <span className="material-symbols-outlined text-[18px]">delete</span>Remove
                </button>
            </div>

            <button type="button" onClick={onCancelEdit}
                className="w-full px-5 py-3 rounded-xl bg-surface-container text-primary font-bold">
                Back to Account
            </button>
        </div>
    );
}

function AddressField({ label, name, value, onChange, placeholder, type = "text", inputMode, maxLength, required = false }) {
    return (
        <label className="block">
            <span className="block text-sm font-bold text-on-surface mb-2">
                {label}{required && <span className="text-secondary ml-1">*</span>}
            </span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                inputMode={inputMode}
                maxLength={maxLength}
                autoComplete="off"
                className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/60 bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
        </label>
    );
}

function CartView({
    items,
    onBack,
    onAccountDetails,
    onCartUpdated,
}) {
    const [isPaying, setIsPaying] = useState(false);
    const [address, setAddress] = useState(null);
    const [addressLoading, setAddressLoading] = useState(true);
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const total = items.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.quantity),
        0
    );

    const loadCheckoutAddress = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            setAddress(null);
            setSelectedAddressId("");
            setAddressLoading(false);
            return;
        }

        setAddressLoading(true);

        try {
            const response = await api.get("/address", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const savedAddress =
                response.data?.address || null;

            setAddress(savedAddress);
            setSelectedAddressId(
                savedAddress?._id
                    ? String(savedAddress._id)
                    : ""
            );
        } catch (error) {
            console.error(
                "Load checkout address error:",
                error
            );

            setAddress(null);
            setSelectedAddressId("");
        } finally {
            setAddressLoading(false);
        }
    };

    useEffect(() => {
        loadCheckoutAddress();
    }, []);

    const proceedToBooking = async () => {
        if (!items.length) {
            return;
        }

        if (addressLoading) {
            return;
        }

        if (!address?._id) {
            alert(
                "Please add a delivery address in Account Details before booking."
            );
            if (onAccountDetails) {
                onAccountDetails();
            }
            return;
        }

        if (
            String(selectedAddressId) !==
            String(address._id)
        ) {
            alert("Please select your delivery address.");
            return;
        }

        setCheckoutOpen(true);
    };

    const payAndBook = async () => {
        if (!items.length || isPaying) {
            return;
        }

        if (!address?._id) {
            alert(
                "Please add a delivery address before booking."
            );
            return;
        }

        try {
            setIsPaying(true);

            const token =
                localStorage.getItem("authToken");

            if (!token) {
                setIsPaying(false);

                window.dispatchEvent(
                    new CustomEvent(
                        "open-account-modal",
                        {
                            detail: {
                                view: "choose",
                            },
                        }
                    )
                );

                return;
            }

            /*
             * The server re-checks that this address belongs
             * to the authenticated user and stores a snapshot
             * on the order. The client never sends the address
             * fields directly to the payment API.
             */
            const orderResponse =
                await api.post(
                    "/cart-payment/create-order",
                    {
                        addressId: address._id,
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const order =
                orderResponse.data;

            if (
                !order?.razorpayOrderId
            ) {
                throw new Error(
                    "Razorpay order ID was not returned by the server."
                );
            }

            if (
                !order?.razorpayKeyId
            ) {
                throw new Error(
                    "Razorpay key was not returned by the server."
                );
            }

            if (!window.Razorpay) {
                throw new Error(
                    "Razorpay Checkout is not loaded. Please refresh the page."
                );
            }

            const options = {
                key: order.razorpayKeyId,

                amount:
                    order.amountPaise,

                currency:
                    order.currency ||
                    "INR",

                name: "Manipur Tourism",

                description:
                    "Culture & Heritage Items",

                order_id:
                    order.razorpayOrderId,

                prefill: {
                    name:
                        address.fullName || "",
                    contact:
                        address.phone || "",
                },

                notes: {
                    addressId:
                        String(address._id),
                },

                handler:
                    async function (
                        response
                    ) {
                        try {
                            const verifyResponse =
                                await api.post(
                                    "/cart-payment/verify-payment",
                                    {
                                        orderId:
                                            order.orderId,
                                        razorpay_order_id:
                                            response.razorpay_order_id,
                                        razorpay_payment_id:
                                            response.razorpay_payment_id,
                                        razorpay_signature:
                                            response.razorpay_signature,
                                    },
                                    {
                                        headers: {
                                            Authorization:
                                                `Bearer ${token}`,
                                        },
                                    }
                                );

                            if (
                                verifyResponse
                                    .data
                                    ?.success !==
                                false
                            ) {
                                alert(
                                    "Booking confirmed and payment successful!"
                                );

                                if (
                                    onCartUpdated
                                ) {
                                    await onCartUpdated();
                                }

                                window.dispatchEvent(
                                    new Event(
                                        "cart-updated"
                                    )
                                );

                                setCheckoutOpen(
                                    false
                                );
                            }
                        } catch (error) {
                            console.error(
                                "Payment verification error:",
                                error
                            );

                            alert(
                                error.response
                                    ?.data
                                    ?.message ||
                                error.message ||
                                "Payment verification failed."
                            );
                        } finally {
                            setIsPaying(
                                false
                            );
                        }
                    },

                modal: {
                    ondismiss:
                        async () => {
                            setIsPaying(
                                false
                            );

                            try {
                                await api.post(
                                    "/cart-payment/payment-failed",
                                    {
                                        orderId:
                                            order.orderId,
                                    },
                                    {
                                        headers: {
                                            Authorization:
                                                `Bearer ${token}`,
                                        },
                                    }
                                );
                            } catch (error) {
                                console.error(
                                    "Failed to record payment status:",
                                    error
                                );
                            }
                        },
                },

                theme: {
                    color: "#004335",
                },
            };

            const razorpay =
                new window.Razorpay(
                    options
                );

            razorpay.on(
                "payment.failed",
                async function (
                    response
                ) {
                    console.error(
                        "Razorpay payment failed:",
                        response.error
                    );

                    try {
                        await api.post(
                            "/cart-payment/payment-failed",
                            {
                                orderId:
                                    order.orderId,
                            },
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`,
                                },
                            }
                        );
                    } catch (error) {
                        console.error(
                            "Failed to record payment failure:",
                            error
                        );
                    }

                    alert(
                        response.error
                            ?.description ||
                        "Payment failed. Please try again."
                    );

                    setIsPaying(false);
                }
            );

            razorpay.open();
        } catch (error) {
            console.error(
                "Buy Now error:",
                error
            );

            alert(
                error.response?.data
                    ?.message ||
                error.message ||
                "Unable to create booking."
            );

            setIsPaying(false);
        }
    };

    const removeItem = async (
        itemId
    ) => {
        try {
            const token =
                localStorage.getItem(
                    "authToken"
                );

            if (!token) {
                return;
            }

            await api.delete(
                `/cart/${itemId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            if (onCartUpdated) {
                await onCartUpdated();
            }

            window.dispatchEvent(
                new Event("cart-updated")
            );
        } catch (error) {
            console.error(
                "Remove cart item error:",
                error
            );

            alert(
                error.response?.data
                    ?.message ||
                "Unable to remove item."
            );
        }
    };

    if (checkoutOpen) {
        return (
            <BookingCheckout
                items={items}
                total={total}
                address={address}
                isPaying={isPaying}
                onBack={() =>
                    setCheckoutOpen(false)
                }
                onPay={payAndBook}
            />
        );
    }

    return (
        <div className="space-y-5 pt-3">
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
                        Add cultural and
                        heritage items to your
                        cart to purchase them.
                    </p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {items.map(
                            (item) => (
                                <div
                                    key={
                                        item.itemId
                                    }
                                    className="p-4 rounded-2xl bg-surface-container-low"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-on-surface">
                                                {
                                                    item.name
                                                }
                                            </h3>

                                            <p className="text-sm text-on-surface-variant mt-1">
                                                ₹
                                                {Number(
                                                    item.price
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                                {" × "}
                                                {
                                                    item.quantity
                                                }
                                            </p>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <strong className="block text-primary">
                                                ₹
                                                {(
                                                    Number(
                                                        item.price
                                                    ) *
                                                    Number(
                                                        item.quantity
                                                    )
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(
                                                        item.itemId
                                                    )
                                                }
                                                className="mt-2 text-xs font-bold text-red-600 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                        <span className="font-bold text-on-surface">
                            Total
                        </span>

                        <strong className="text-xl font-bold text-primary">
                            ₹
                            {total.toLocaleString(
                                "en-IN"
                            )}
                        </strong>
                    </div>

                    <div className="rounded-2xl bg-surface-container-low p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-wider font-bold text-outline">
                                    Delivery Address
                                </p>

                                <h3 className="mt-1 font-bold text-on-surface">
                                    Select an address
                                </h3>
                            </div>

                            <span className="material-symbols-outlined text-primary">
                                location_on
                            </span>
                        </div>

                        {addressLoading ? (
                            <div className="mt-4 flex items-center gap-2 text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-[18px] animate-spin">
                                    progress_activity
                                </span>
                                Loading saved address...
                            </div>
                        ) : address ? (
                            <label className="mt-4 block cursor-pointer">
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 hover:border-primary transition-colors">
                                    <input
                                        type="radio"
                                        name="checkout-address"
                                        value={address._id}
                                        checked={
                                            String(
                                                selectedAddressId
                                            ) ===
                                            String(
                                                address._id
                                            )
                                        }
                                        onChange={() =>
                                            setSelectedAddressId(
                                                String(
                                                    address._id
                                                )
                                            )
                                        }
                                        className="mt-1 accent-[#004335]"
                                    />

                                    <div className="min-w-0 text-sm">
                                        <p className="font-bold text-on-surface">
                                            {address.fullName}
                                        </p>

                                        <p className="mt-1 text-on-surface-variant">
                                            {address.addressLine1}
                                            {address.addressLine2
                                                ? `, ${address.addressLine2}`
                                                : ""}
                                        </p>

                                        <p className="text-on-surface-variant">
                                            {address.city},{" "}
                                            {address.district},{" "}
                                            {address.state} -{" "}
                                            {address.pincode}
                                        </p>

                                        <p className="mt-1 text-xs text-outline">
                                            Phone: {address.phone}
                                        </p>

                                        {address.landmark && (
                                            <p className="text-xs text-outline">
                                                Landmark:{" "}
                                                {address.landmark}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </label>
                        ) : (
                            <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
                                No saved address found. Add an address in Account Details before booking.
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={onAccountDetails}
                            className="mt-3 text-sm font-bold text-primary hover:underline"
                        >
                            {address
                                ? "Edit address"
                                : "Add delivery address"}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={proceedToBooking}
                        disabled={
                            addressLoading ||
                            !address ||
                            !selectedAddressId
                        }
                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                        <span className="material-symbols-outlined">
                            arrow_forward
                        </span>

                        Proceed to Booking
                    </button>
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


function BookingCheckout({
    items,
    total,
    address,
    isPaying,
    onBack,
    onPay,
}) {
    return (
        <div className="space-y-5 pt-3">
            <div>
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-outline">
                    Booking Review
                </p>

                <h3 className="mt-1 text-xl font-bold text-primary">
                    Confirm your tourism purchase
                </h3>

                <p className="mt-1 text-sm text-on-surface-variant">
                    Review your saved delivery address and items before opening Razorpay.
                </p>
            </div>

            {address && (
                <div className="rounded-2xl bg-surface-container-low p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-outline">
                                Deliver to
                            </p>

                            <p className="mt-1 font-bold text-on-surface">
                                {address.fullName}
                            </p>

                            <p className="mt-1 text-sm text-on-surface-variant">
                                {address.addressLine1}
                                {address.addressLine2
                                    ? `, ${address.addressLine2}`
                                    : ""}
                            </p>

                            <p className="text-sm text-on-surface-variant">
                                {address.city},{" "}
                                {address.district},{" "}
                                {address.state} -{" "}
                                {address.pincode}
                            </p>

                            <p className="mt-1 text-xs text-outline">
                                Phone: {address.phone}
                            </p>
                        </div>

                        <span className="material-symbols-outlined text-primary">
                            verified
                        </span>
                    </div>
                </div>
            )}

            <div className="rounded-2xl bg-surface-container-low p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-bold text-outline">
                        Order Summary
                    </span>

                    <span className="font-bold text-primary">
                        ₹
                        {total.toLocaleString(
                            "en-IN"
                        )}
                    </span>
                </div>

                <div className="space-y-2">
                    {items.map((item) => (
                        <div
                            key={item.itemId}
                            className="flex items-center justify-between gap-3 text-sm"
                        >
                            <span className="min-w-0 text-on-surface-variant">
                                {item.name} ×{" "}
                                {item.quantity}
                            </span>

                            <span className="shrink-0 font-semibold text-on-surface">
                                ₹
                                {(
                                    Number(item.price) *
                                    Number(item.quantity)
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-3 pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                    <span className="font-bold text-on-surface">
                        Total
                    </span>

                    <span className="text-xl font-bold text-primary">
                        ₹
                        {total.toLocaleString(
                            "en-IN"
                        )}
                    </span>
                </div>
            </div>

            <button
                type="button"
                onClick={onPay}
                disabled={isPaying || !address}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
                <span className="material-symbols-outlined">
                    {isPaying
                        ? "progress_activity"
                        : "payments"}
                </span>

                {isPaying
                    ? "Processing Booking..."
                    : `Confirm Booking • ₹${total.toLocaleString(
                        "en-IN"
                    )}`}
            </button>

            <button
                type="button"
                onClick={onBack}
                disabled={isPaying}
                className="w-full px-5 py-3 rounded-xl bg-surface-container text-primary font-bold hover:bg-surface-container-high disabled:opacity-60 transition-colors"
            >
                Change Address
            </button>
        </div>
    );
}


function BookingHistory({
    bookings,
    loading,
    onBack,
}) {
    return (
        <div className="space-y-4 pt-3">
            {loading ? (
                <div className="text-center py-10">
                    <div className="mx-auto w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-primary animate-spin">
                            progress_activity
                        </span>
                    </div>

                    <h3 className="mt-4 font-bold text-lg">
                        Loading booking history
                    </h3>

                    <p className="mt-1 text-sm text-on-surface-variant">
                        Fetching your latest orders...
                    </p>
                </div>
            ) : bookings.length === 0 ? (
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
                        Your tourism purchases will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {bookings.map((order, index) => {
                        const items = Array.isArray(order.items)
                            ? order.items
                            : [];

                        const totalItems = items.reduce(
                            (total, item) =>
                                total + Number(item.quantity || 0),
                            0
                        );

                        const firstItem = items[0];

                        const orderTitle =
                            firstItem?.name ||
                            (totalItems > 1
                                ? `${totalItems} Tourism Items`
                                : "Tourism Booking");

                        const reference =
                            order.receipt ||
                            order.razorpayOrderId ||
                            order._id ||
                            "—";

                        return (
                            <div
                                key={
                                    order._id ||
                                    order.razorpayOrderId ||
                                    order.receipt ||
                                    index
                                }
                                className="p-4 rounded-2xl bg-surface-container-low"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="font-bold truncate">
                                            {orderTitle}
                                        </p>

                                        {totalItems > 1 && (
                                            <p className="text-xs text-outline mt-1">
                                                {totalItems} items
                                            </p>
                                        )}

                                        <p className="text-xs text-outline mt-1 break-all">
                                            Reference: {reference}
                                        </p>
                                    </div>

                                    <BookingStatus
                                        status={order.status}
                                    />
                                </div>

                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-on-surface-variant">
                                        {order.createdAt
                                            ? new Date(
                                                order.createdAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )
                                            : "Date unavailable"}
                                    </span>

                                    <span className="font-bold text-primary">
                                        ₹
                                        {Number(
                                            order.amount || 0
                                        ).toLocaleString("en-IN")}
                                    </span>
                                </div>

                                {order.razorpayPaymentId && (
                                    <div className="mt-3 pt-3 border-t border-outline-variant/30">
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="text-xs text-outline">
                                                Payment ID
                                            </span>

                                            <span className="text-xs font-medium text-on-surface-variant text-right break-all">
                                                {order.razorpayPaymentId}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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


function BookingStatus({
    status,
}) {
    const normalized = String(
        status || "pending"
    ).toLowerCase();

    const config = {
        paid: {
            label: "Paid",
            className:
                "bg-primary-fixed/50 text-primary",
        },

        pending: {
            label: "Pending",
            className:
                "bg-tertiary-fixed text-tertiary",
        },

        failed: {
            label: "Failed",
            className:
                "bg-red-50 text-red-700",
        },

        cancelled: {
            label: "Cancelled",
            className:
                "bg-red-50 text-red-700",
        },

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
    };

    const current =
        config[normalized] ||
        config.pending;

    return (
        <span
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${current.className}`}
        >
            {current.label}
        </span>
    );
}
