export default function DispatchSection() {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Subscribed to Manipur Tourism Dispatch! Check your phone for welcome guide."
    );
  };

  return (
    <section className="dispatch-section">
      <div className="dispatch-card">

        {/* Left Content */}
        <div className="dispatch-content">
          <div className="dispatch-label">
            <span className="material-symbols-outlined">
              notifications_active
            </span>

            <span>
              Stay Updated with Manipur Tourism
            </span>
          </div>

          <h3 className="dispatch-title">
            Sangai Festival &amp; Peak Blooming Alerts
          </h3>

          <p className="dispatch-description">
            Receive real-time notifications on Shirui Lily flowering status,
            Sangai Festival ticket rollouts, high-altitude trekking weather,
            and road accessibility notices directly on WhatsApp or Email.
          </p>
        </div>

        {/* Subscription Form */}
        <form
          className="dispatch-form"
          onSubmit={handleSubmit}
        >
          <div className="dispatch-input-wrapper">
            <span className="material-symbols-outlined">
              chat
            </span>

            <input
              className="dispatch-input"
              placeholder="WhatsApp Number or Email"
              required
              type="text"
            />
          </div>

          <button
            className="dispatch-button"
            type="submit"
          >
            Get Instant Dispatch
          </button>
        </form>

      </div>
    </section>
  );
}