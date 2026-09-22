import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import AccountModal from "./AccountModal.jsx";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [accountModalView, setAccountModalView] = useState(null);
  useEffect(() => {
    const handleOpenAccountModal = (event) => {
      const view = event.detail?.view || "choose";

      setProfileOpen(false);
      setAccountModalView(view);
    };

    window.addEventListener(
      "open-account-modal",
      handleOpenAccountModal
    );

    return () => {
      window.removeEventListener(
        "open-account-modal",
        handleOpenAccountModal
      );
    };
  }, []);
  const [authUser, setAuthUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("authUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncAuthUser = () => {
      try {
        const savedUser = localStorage.getItem("authUser");
        setAuthUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setAuthUser(null);
      }
    };

    window.addEventListener("auth-user-changed", syncAuthUser);
    window.addEventListener("storage", syncAuthUser);

    return () => {
      window.removeEventListener("auth-user-changed", syncAuthUser);
      window.removeEventListener("storage", syncAuthUser);
    };
  }, []);

  const closeProfile = () => {
    setProfileOpen(false);
    setAccountModalView(null);
  };

  const openAccountModal = (view = "choose") => {
    setProfileOpen(false);
    setAccountModalView(view);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[60] bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06),0_1px_3px_0_rgba(10,92,74,0.04)]">
      <div className="min-h-20 w-full px-5 md:px-5 lg:px-12 flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-2 shrink min-w-0">
          <img
            alt="Manipur Tourism Official Emblem"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkLIz-yJaKp9V9zhRIVaUoLUEmB50lxnjnkhYmA2BFe9RzgNS31TL4wimfTWHVb-EfKIFRXmcpVoSBi9kTk2CnPHVVYJLQbwtCv9eY2uGvYTszwIi2ryeoqmUon6KLV7V3W_C-NdWF_Qk9YzrQcnsoFd2CgN0-ltPk7UfdLeQHFT9PN5AxCWZPSbfgNbO6CfKuucd1_wmUB-eQql-CIJvIJnBaCVXxKPbdkv3Qvz9yyegxopcIT5KJ2A"
          />

          <div className="flex flex-col min-w-0 overflow-hidden">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="font-headline-sm text-primary tracking-tight font-bold leading-none text-[13px] sm:text-headline-sm">
                MANIPUR TOURISM
              </span>
            </Link>

            <span className="font-label-sm text-outline tracking-wider uppercase font-semibold mt-1 text-[8px] sm:text-label-sm">
              Jewel of India | VistaVentures
            </span>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-space-xs p-1.5 rounded-xl bg-surface-container-low">
          <NavItem to="/ExploreManipur">
            Explore Manipur
          </NavItem>

          <NavItem to="/GuideService">
            Guide Service
          </NavItem>

          <NavItem to="/Transportation">
            Transportation
          </NavItem>

          <NavItem to="/EcoHomestays">
            Homestays
          </NavItem>

          <NavItem to="/CultureHeritageItems">
            Cultural Heritage Items
          </NavItem>

          <NavItem to="/RentItem">
            Rental Service
          </NavItem>
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          <Link
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors"
            to="tel:1800-345-3885"
          >
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />

            <span className="font-label-sm font-bold">
              1800-345-3885
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-surface-container-low text-on-surface cursor-pointer hover:bg-surface-container transition-colors">
            <span className="font-label-sm font-semibold">
              ENG
            </span>

            <span className="material-symbols-outlined text-outline text-[18px]">
              expand_more
            </span>
          </div>

          <button
            aria-label="Accessibility Options"
            className="hidden md:flex w-9 h-9 rounded-full bg-surface-container-low items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              accessibility_new
            </span>
          </button>

          <div className="relative">
            <button
              type="button"
              aria-label="Open account"
              aria-expanded={profileOpen}
              onClick={() => {
                if (authUser) {
                  setProfileOpen((prev) => !prev);
                  setAccountModalView(null);
                } else {
                  setProfileOpen(true);
                  setAccountModalView("choose");
                }
              }}
              className="flex items-center gap-2 pl-1"
            >
              {authUser && authUser.role !== "admin" && (
                <span className="hidden lg:block text-sm font-bold text-primary whitespace-nowrap">
                  Hi! {authUser.name || "User"}
                </span>
              )}

              {authUser?.role === "admin" && (
                <span className="hidden lg:block text-sm font-bold text-primary whitespace-nowrap">
                  Admin
                </span>
              )}

              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:ring-2 hover:ring-primary/20 transition-all"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNP2SmcVVJx49AewC2mg-o8PvLqatEA5Tk6vz60H8bSJ-JmzvCVwYV1PWm8jiitLt_-YZt-fojE7q7I16qNfi6Z5fAw6w5agEyO3VpnDbgrVy3E7TkKbNmMFLqpcq1hHEQQvsTJFYjiT5wlf5Jf45lXDKNZ4mmI72vD7HhElnG6gXWIFtR7dOghMW6U1f0Na5EIxv5tNWM2UlAJJxLgOU6lzsiPW5oAo0fKNap5qJgYsjhzXHy8IT9iw"
              />
            </button>

            {profileOpen && authUser && (
              <ProfileDropdown
                user={authUser}
                onCart={() => openAccountModal("cart")}
                onHistory={() => openAccountModal("history")}
                onLogout={closeProfile}
                onNavigate={closeProfile}
              />
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="xl:hidden flex w-10 h-10 shrink-0 rounded-full bg-surface-container-low items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen
          ? "max-h-[600px] opacity-100"
          : "max-h-0 opacity-0"
          }`}
      >
        <nav className="mx-5 md:mx-12 lg:mx-16 mb-4 p-2 rounded-2xl bg-surface-container-low shadow-[0_8px_24px_-4px_rgba(10,92,74,0.10)]">
          <MobileNavItem
            to="/ExploreManipur"
            close={() => setMobileMenuOpen(false)}
          >
            Explore Manipur
          </MobileNavItem>

          <MobileNavItem
            to="/GuideService"
            close={() => setMobileMenuOpen(false)}
          >
            Guide Service
          </MobileNavItem>

          <MobileNavItem
            to="/Transportation"
            close={() => setMobileMenuOpen(false)}
          >
            Transportation
          </MobileNavItem>

          <MobileNavItem
            to="/EcoHomestays"
            close={() => setMobileMenuOpen(false)}
          >
            Homestays
          </MobileNavItem>

          <MobileNavItem
            to="/CultureHeritageItems"
            close={() => setMobileMenuOpen(false)}
          >
            Culture Heritage Items
          </MobileNavItem>

          <MobileNavItem
            to="/RentItem"
            close={() => setMobileMenuOpen(false)}
          >
            Rental Service
          </MobileNavItem>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);

              if (authUser) {
                setProfileOpen((prev) => !prev);
                setAccountModalView(null);
              } else {
                setProfileOpen(true);
                setAccountModalView("choose");
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[21px]">
              account_circle
            </span>

            <span>
              {authUser && authUser.role !== "admin"
                ? `Hi! ${authUser.name || "User"}`
                : authUser?.role === "admin"
                  ? "Admin"
                  : "My Account"}
            </span>
          </button>
        </nav>
      </div>

      {accountModalView && (
        <AccountModal
          initialView={accountModalView}
          onClose={closeProfile}
          onAuthenticated={(user, token) => {
            setAuthUser(user);
            setAccountModalView(null);
            setProfileOpen(true);
            window.dispatchEvent(new Event("auth-user-changed"));
          }}
        />
      )}
    </header>
  );
}

function NavItem({ to, children }) {
  return (
    <Link
      to={to}
      className="px-space-md py-2 rounded-lg font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavItem({ to, close, children }) {
  return (
    <Link
      to={to}
      onClick={close}
      className="flex items-center px-4 py-3 rounded-xl font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
    >
      {children}
    </Link>
  );
}

function ProfileDropdown({
  user,
  onCart,
  onHistory,
  onLogout,
  onNavigate,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("auth-user-changed"));
    onLogout();
  };

  const goToAdmin = () => {
    onNavigate();
    navigate("/admin");
  };

  return (
    <div
      className="absolute right-0 top-full mt-3 w-[300px] max-w-[calc(100vw-2rem)] bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-[0_18px_50px_-12px_rgba(0,67,53,0.22)] overflow-hidden z-[120]"
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className={`p-4 ${user?.role === "admin"
          ? "bg-primary-fixed/30"
          : "bg-surface-container-low"
          }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">
              {user?.role === "admin"
                ? "admin_panel_settings"
                : "person"}
            </span>
          </div>

          <div className="min-w-0">
            <p
              className={`font-bold truncate ${user?.role === "admin"
                ? "text-primary"
                : "text-on-surface"
                }`}
            >
              {user?.role === "admin"
                ? user?.username || "Tourism Administrator"
                : user?.name || "User"}
            </p>

            <p className="text-xs text-outline truncate mt-0.5">
              {user?.role === "admin"
                ? "Administrator"
                : user?.mobile
                  ? `+91 ${user.mobile}`
                  : "Verified user"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-2">
        {user?.role === "admin" ? (
          <>
            <ProfileMenuButton
              icon="dashboard"
              label="Admin Dashboard"
              onClick={goToAdmin}
            />

            <ProfileMenuButton
              icon="receipt_long"
              label="Manage Bookings"
              onClick={onNavigate}
            />

            <ProfileMenuButton
              icon="group"
              label="Manage Users"
              onClick={onNavigate}
            />

            <ProfileMenuButton
              icon="inventory_2"
              label="Manage Products"
              onClick={onNavigate}
            />
          </>
        ) : (
          <>
            <ProfileMenuButton
              icon="person"
              label="Account Details"
              onClick={onNavigate}
            />

            <ProfileMenuButton
              icon="shopping_cart"
              label="My Cart"
              onClick={onCart}
            />

            <ProfileMenuButton
              icon="history"
              label="Booking History"
              onClick={onHistory}
            />
          </>
        )}

        <div className="border-t border-outline-variant/30 my-2" />

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-left"
        >
          <span className="material-symbols-outlined text-[21px]">
            logout
          </span>

          <span className="font-semibold">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
}

function ProfileMenuButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
    >
      <span className="material-symbols-outlined text-[21px]">
        {icon}
      </span>

      <span className="font-semibold">
        {label}
      </span>

      <span className="material-symbols-outlined text-outline ml-auto text-[19px]">
        chevron_right
      </span>
    </button>
  );
}
function AccountChooser({ onUser, onAdmin }) {
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
          No password or registration is required. We'll verify your mobile
          number with a one-time password.
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
          {loading ? "progress_activity" : "sms"}
        </span>

        {loading ? "Sending OTP..." : "Send OTP"}
      </button>

      <p className="text-center text-xs text-outline">
        By continuing, you agree to use the mobile number for account
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
          {loading ? "progress_activity" : "login"}
        </span>

        {loading ? "Verifying..." : "Verify & Sign In"}
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
          Enter your administrator credentials to continue to OTP verification.
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
          {loading ? "progress_activity" : "arrow_forward"}
        </span>

        {loading ? "Checking..." : "Continue"}
      </button>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-surface-container-low text-xs text-on-surface-variant">
        <span className="material-symbols-outlined text-[17px] text-primary">
          shield
        </span>

        <span>
          Administrator access is protected by username, password and
          one-time-password authentication.
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
          Enter the 6-digit administrator OTP to complete sign in.
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
          {loading ? "progress_activity" : "verified"}
        </span>

        {loading ? "Verifying..." : "Verify Administrator"}
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
            event.currentTarget.previousElementSibling;

          input?.focus();
        }}
      >
        {digits.split("").map((digit, index) => (
          <span
            key={index}
            className={`w-10 h-12 sm:w-11 sm:h-13 rounded-xl border flex items-center justify-center text-xl font-bold ${digit.trim()
              ? "border-primary bg-primary/5 text-primary"
              : "border-outline-variant/60 bg-white text-outline"
              }`}
          >
            {digit.trim() || ""}
          </span>
        ))}
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
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <AccountIdentity
        user={user}
        icon="admin_panel_settings"
        admin
      />

      <button
        type="button"
        onClick={() => navigate("/admin")}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
      >
        <span className="material-symbols-outlined text-[22px]">
          dashboard
        </span>

        <span className="font-semibold">
          Admin Dashboard
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
                key={item._id || item.itemId || index}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || "Cart item"}
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
                    {item.name || "Tourism item"}
                  </p>

                  <p className="text-xs text-outline mt-1">
                    Qty: {item.quantity || 1}
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
              ₹{total.toLocaleString("en-IN")}
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
            Your confirmed tourism bookings will appear here.
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
      className: "bg-red-50 text-red-700",
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