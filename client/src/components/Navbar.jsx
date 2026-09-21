import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[60] bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06),0_1px_3px_0_rgba(10,92,74,0.04)]">
      <div className="min-h-20 w-full px-5 md:px-5 lg:px-12 flex items-center justify-between gap-gutter">

        {/* Logo & Branding */}
        <div className="flex items-center  gap-2 shrink min-w-0">
          <img
            alt="Manipur Tourism Official Emblem"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkLIz-yJaKp9V9zhRIVaUoLUEmB50lxnjnkhYmA2BFe9RzgNS31TL4wimfTWHVb-EfKIFRXmcpVoSBi9kTk2CnPHVVYJLQbwtCv9eY2uGvYTszwIi2ryeoqmUon6KLV7V3W_C-NdWF_Qk9YzrQcnsoFd2CgN0-ltPk7UfdLeQHFT9PN5AxCWZPSbfgNbO6CfKuucd1_wmUB-eQql-CIJvIJnBaCVXxKPbdkv3Qvz9yyegxopcIT5KJ2A"
          />

          <div className="flex flex-col min-w-0 overflow-hidden">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold leading-none text-[13px] sm:text-headline-sm">
                MANIPUR TOURISM
              </span>
            </Link>

            <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase font-semibold mt-1 text-[8px] sm:text-label-sm">
              Jewel of India | VistaVentures
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-space-xs p-1.5 rounded-xl bg-surface-container-low">
          <Link
            className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            to="/ExploreManipur"
          >
            Explore Manipur
          </Link>

          <Link
            className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            to="/GuideService"
          >
            Guide Service
          </Link>

          <Link
            className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            to="/Transportation"
          >
            Transportation
          </Link>

          <Link
            className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            to="/EcoHomestays"
          >
            Eco Homestays
          </Link>
          <Link
            className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            to="/CultureHeritageItems"
          >
            Culture Heritage Items
          </Link>
          <Link
            className="px-space-md py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            to="/RentalService"
          >
            Rental Service
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1 shrink-0">

          {/* Helpline */}
          <Link
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors"
            to="tel:1800-345-3885"
          >
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />

            <span className="font-label-sm text-label-sm font-bold tracking-normal">
              1800-345-3885
            </span>
          </Link>

          {/* Language */}
          <div className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-surface-container-low text-on-surface cursor-pointer hover:bg-surface-container transition-colors">
            <span className="font-label-sm text-label-sm font-semibold">
              ENG
            </span>

            <span className="material-symbols-outlined text-outline text-[18px]">
              expand_more
            </span>
          </div>

          {/* Accessibility */}
          <button
            aria-label="Accessibility Options"
            className="hidden md:flex w-9 h-9 rounded-full bg-surface-container-low items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              accessibility_new
            </span>
          </button>

          {/* Profile */}
          <div className="hidden md:flex items-center cursor-pointer pl-1">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNP2SmcVVJx49AewC2mg-o8PvLqatEA5Tk6vz60H8bSJ-JmzvCVwYV1PWm8jiitLt_-YZt-fojE7q7I16qNfi6Z5fAw6w5agEyO3VpnDbgrVy3E7TkKbNmMFLqpcq1hHEQQvsTJFYjiT5wlf5Jf45lXDKNZ4mmI72vD7HhElnG6gXWIFtR7dOghMW6U1f0Na5EIxv5tNWM2UlAJJxLgOU6lzsiPW5oAo0fKNap5qJgYsjhzXHy8IT9iw"
            />
          </div>
          {/* Mobile Menu Button */}
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

      {/* Mobile / Tablet Navigation */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen
          ? "max-h-[500px] opacity-100"
          : "max-h-0 opacity-0"
          }`}
      >
        <nav className="mx-5 md:mx-12 lg:mx-16 mb-4 p-2 rounded-2xl bg-surface-container-low shadow-[0_8px_24px_-4px_rgba(10,92,74,0.10)]">

          <Link
            to="/ExploreManipur"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Explore Manipur
          </Link>

          <Link
            to="/GuideService"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Guide Service
          </Link>

          <Link
            to="/Transportation"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Transportation
          </Link>

          <Link
            to="/EcoHomestays"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Eco Homestays
          </Link>
          <Link
            to="/CultureHeritageItems"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Culture Heritage Items
          </Link>
          <Link
            to="/RentalService"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Rental Service
          </Link>

        </nav>
      </div>
    </header>
  );
}

