export default function ILPSection() {
  return (
    <section
      className="ilp-section"
      id="ilp-modal-card"
    >
      <div className="ilp-card">

        {/* Background Emblem */}
        <div className="ilp-watermark">
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />

            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            <circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="ilp-content">

          {/* Main Content */}
          <div className="ilp-main">

            <div className="ilp-badge">
              <span className="material-symbols-outlined">
                vpn_key
              </span>

              <span>
                Mandatory Entry Clearance
              </span>
            </div>

            <h2 className="ilp-title">
              Inner Line Permit (e-ILP) Instant Portal
            </h2>

            <p className="ilp-description">
              All domestic non-indigenous travelers require an active Inner
              Line Permit to enter Manipur under the Bengal Eastern Frontier
              Regulation 1873. Generate your verified digital pass with
              instant QR validation via DigiLocker in under 2 minutes.
            </p>

            <div className="ilp-features">

              <div>
                <span className="material-symbols-outlined">
                  check_circle
                </span>

                <span>
                  Instant QR Delivery to Phone
                </span>
              </div>

              <div>
                <span className="material-symbols-outlined">
                  check_circle
                </span>

                <span>
                  Valid across all 16 Districts
                </span>
              </div>

              <div>
                <span className="material-symbols-outlined">
                  check_circle
                </span>

                <span>
                  Integrated with Airport Express Gates
                </span>
              </div>

            </div>

          </div>

          {/* Fee Card */}
          <div className="ilp-fee-wrapper">

            <div className="ilp-fee-card">

              <div className="ilp-fee-header">
                <span>
                  Regular Permit Fee
                </span>

                <span className="ilp-fee">
                  ₹100
                  <small>/ 15 Days</small>
                </span>
              </div>

              <p>
                Foreign nationals exempt (Register via FRO Form-C instead).
              </p>

              <a
                href="#"
                className="ilp-button"
              >
                Apply for e-ILP Now
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}