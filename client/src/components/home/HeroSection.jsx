import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section">

      <div className="hero-grid">

        {/* Hero Content */}
        <div className="hero-content">

          <div className="hero-government-badge">

            <span className="material-symbols-outlined">
              verified
            </span>

            <span>
              Government of Manipur Initiative
            </span>

            <span className="hero-badge-divider">
              •
            </span>

            <span className="hero-regenerative">
              100% Regenerative Tourism
            </span>

          </div>

          <h1 className="hero-title">
            Discover The Jewel of India —

            <span className="hero-title-accent">
              Untouched, Sacred, Electric.
            </span>
          </h1>

          <p className="hero-description">
            Experience the world’s only floating national park on Loktak Lake,
            the birthplace of modern polo, centuries-old handwoven royal silk
            traditions, and mist-cloaked Eastern Himalayan sanctuaries.
          </p>

          <div className="hero-actions">

            <a
              href="#smart-hub"
              className="hero-primary-button"
            >
              Launch Journey Planner

              <span className="material-symbols-outlined">
                arrow_forward
              </span>
            </a>

            <button
              type="button"
              className="hero-secondary-button"
            >
              <span className="material-symbols-outlined">
                badge
              </span>

              <Link to="/EILP" className="hero-secondary-link">
                Apply Instant e-ILP (2 Min)
              </Link>
            </button>

          </div>

          <div className="hero-metrics">

            <div className="hero-metric">
              <span className="hero-metric-value">
                450+
              </span>

              <span className="hero-metric-label">
                Verified Phumdi Eco-Stays
              </span>
            </div>

            <div className="hero-metric">
              <span className="hero-metric-value">
                100%
              </span>

              <span className="hero-metric-label">
                GPS-Tracked EV Fleets
              </span>
            </div>

            <div className="hero-metric">
              <span className="hero-metric-value">
                24/7
              </span>

              <span className="hero-metric-label">
                Tourist Police Escort Line
              </span>
            </div>

          </div>

        </div>

        {/* Hero Image */}
        <div className="hero-visual">

          <div className="hero-image-frame">

            <img
              className="hero-image"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd1XZTt2rJi9LLRw-5nfuHPXQbxWr3tjIN1jKN2LsPA_KJ3Bg1JP3ejXoYBGJWu8tya_JEmGvfeSKc3v2NqK06oI508sjjA62L_cHkUIZwvKUHcJS8yEOQOzaIbcP34cF61crr0icB8SVi1YmKD2_Azw4zo4voy1fEoC7xuPNWfjruY-Fs773PucLYp9laUzsBSyWql4a1mjMD-U20O1euIKj6VYmc5VZB6cc0OyaG5FeJt5wcNx519w"
              alt="Aerial view of Loktak Lake in Manipur"
            />

            <div className="hero-image-overlay" />

            <div className="hero-habitat-card">

              <div className="hero-habitat-info">

                <div className="hero-habitat-icon">
                  <span className="material-symbols-outlined">
                    nature_people
                  </span>
                </div>

                <div className="hero-habitat-text">
                  <p>
                    Protected Biosphere
                  </p>

                  <p>
                    Keibul Lamjao Sanctuary
                  </p>
                </div>

              </div>

              <span className="hero-sangai-badge">
                Sangai 94%
              </span>

            </div>

            <div className="hero-history-badge">

              <span className="material-symbols-outlined">
                castle
              </span>

              <span>
                Kingdom of Kangleipak
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}