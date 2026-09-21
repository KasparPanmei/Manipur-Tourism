export default function CircuitGrid() {
  const circuits = [
    {
      location: "Bishnupur & Moirang",
      title: "Keibul Lamjao & Loktak Lake",
      description:
        "Boat across floating circular islands, spot the endangered dancing Sangai deer, and stay inside low-impact local fishermen homestays.",
      duration: "2 Days • 1 Night",
      rating: "4.96 (1,240)",
      badge: "UNESCO Biosphere Tentative",
      badgeClass: "circuit-badge-primary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuApATfbalW9Rn1Oz3jvwQ4sR4590lbeTKQHnGb9PXeptxZx0OJwNbwgzHhduLzLpt12Ob12w1A-3nWs0uHqpMkjPa4npyKcxzVGlWpxkOwWvJ5CyXoYZ-FyTe_3Bz8OTwW4mwQMfsjnTmAaUqlorjXEDbGzumi1KQfxwUkq9sDpqtPCWOICMyJre3p4OXnUPfKq0noTW1QV53zM1_v-iUEgJG9zLVIEnQ_u5-RvuKH4bt1u7v8TXM1-2w",
      alt: "Loktak Lake and floating phumdis in Manipur",
    },

    {
      location: "Imphal Heartland",
      title: "Kangla Fort & Royal Pologrounds",
      description:
        "Delve into the historic seat of Manipur's royal dynasty, sacred sanctums of Lord Pakhangba, and Mapal Kangjeibung, world's oldest polo arena.",
      duration: "Full Day Guided",
      rating: "4.92 (980)",
      badge: "Royal Archaeology",
      badgeClass: "circuit-badge-secondary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmhPrR7eYftVSZ3Ugk7RQnmYt1bsuQFukLMAXMcmvInuEMTxQsPt0DPdFMCuXLzNJWOxXGYUxE7z9NFV0KbxJpHOJ_KQgdhjLE-vjRzMfpwnvuPcthVXjwp3LfeQQ6TnxCdyeuuBStqbGTnE9bLMZRCm2fWw_BVKxL4v45WwzkyooTvBuocTn29-sjfodFLaGKX4X-hhMSoQeSp3pH7YYNadvLcxxT_sD1MGQhNI5PRdurKxDja5LV5A",
      alt: "Kangla Fort in Imphal Manipur",
    },

    {
      location: "Ukhrul Hills",
      title: "Shirui Peak & Tangkhul Pottery",
      description:
        "Hike to the native ridge of Lilium mackliniae found nowhere else on earth, combined with Longpi black stone pottery village workshops.",
      duration: "3 Days • 2 Nights",
      rating: "4.88 (640)",
      badge: "Botanical Wonder",
      badgeClass: "circuit-badge-tertiary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDsz083T-1qzJmCJ3c_-gAdRf3KtmeIavRhYTe8FU5yCydceBfhb20YcLSfpT4z1f5zSlygiPbFI0LFplRTIRSRceZgka3xdKLJOvW1A6M792wkVX3LDM9BUnaMC2QdQiUqJMOX5QM1uyiWDWqC15v4R27rDnUS4OfKSvEAyPyMn-119F2JiPiWy6_TboQRWWo-jRlWHQdOFteAqWfGoSZQV9co7dq48Bd9SR03r36KJddHcGgzLWhunw",
      alt: "Shirui Kashong Peak in Ukhrul",
    },

    {
      location: "Moirang & Maibam Lokpa",
      title: "INA Memorial & Red Hill Peace Trail",
      description:
        "Stand where the Indian tricolor was first unfurled on liberated mainland soil in 1944; trace the epic Battle of Imphal historical sites.",
      duration: "Full Day Excursion",
      rating: "4.95 (1,110)",
      badge: "WWII Peace Heritage",
      badgeClass: "circuit-badge-primary-container",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDltMHbeQUJ3RbTeXiwuYlQutexfQcsuXjp7EnKef2tKYtUcaaVLNm4aQOJ2WCRV0itCNTNPPDtnqF2F0GXI85NBiEFJnMhYVIqaOz9adsHbcHkC8CKTiDR-44EFn8FBE_5WiYrVbU-QMFYTAxScycNOrRkQnXpsBTh-IXu42L1sjQ9LPPSmMtUVZyRkIhz6EPmJYMMRXmdIMMMeSLaHPN81fBNhfunfrgGMakN4RF1IG6KxIBjhdIWAg",
      alt: "INA Memorial and Red Hill Peace Trail in Moirang",
    },
  ];

  return (
    <section className="circuit-section">

      <div className="circuit-header">

        <div>
          <span className="circuit-eyebrow">
            Handpicked Itineraries
          </span>

          <h2 className="circuit-title">
            Crown Jewels of Manipur
          </h2>

          <p className="circuit-description">
            Signature journeys curated by local custodians,
            preservationists, and eco-biologists.
          </p>
        </div>

        <a href="#" className="circuit-view-all">
          View All 18 Protected Circuits

          <span className="material-symbols-outlined">
            arrow_right_alt
          </span>
        </a>

      </div>

      <div className="circuit-grid">

        {circuits.map((circuit) => (
          <article
            className="circuit-card"
            key={circuit.title}
          >

            <div className="circuit-image-wrapper">

              <img
                src={circuit.image}
                alt={circuit.alt}
                className="circuit-image"
              />

              <div
                className={`circuit-badge ${circuit.badgeClass}`}
              >
                {circuit.badge}
              </div>

              <div className="circuit-rating">
                <span className="material-symbols-outlined">
                  star
                </span>

                {circuit.rating}
              </div>

            </div>

            <div className="circuit-card-content">

              <div className="circuit-card-text">

                <span className="circuit-location">
                  {circuit.location}
                </span>

                <h3>
                  {circuit.title}
                </h3>

                <p>
                  {circuit.description}
                </p>

              </div>

              <div className="circuit-card-footer">

                <div>
                  <span>
                    Duration
                  </span>

                  <strong>
                    {circuit.duration}
                  </strong>
                </div>

                <a href="#">
                  Details
                </a>

              </div>

            </div>

          </article>
        ))}

      </div>

    </section>
  );
}