export default function HandloomSection() {
  return (
    <section className="handloom-section">

      <div className="handloom-grid">

        {/* Content */}
        <div className="handloom-content">

          <div className="handloom-eyebrow">
            <span className="material-symbols-outlined">
              texture
            </span>

            <span>
              Indigenous Craft Heritage
            </span>
          </div>

          <h2 className="handloom-title">
            The Women Weavers of Ima Keithel &amp; Royal Looms
          </h2>

          <p className="handloom-description">
            Visit Ima Keithel (Mother’s Market)—Asia's largest all-women
            market operating since the 16th century. Discover master artisans
            weaving GI-tagged <em>Moirang Phee</em> and{" "}
            <em>Shaphee Lanphee</em> shawls using centuries of sacred
            geometric motifs.
          </p>

          {/* Statistics */}
          <div className="handloom-stats">

            <div className="handloom-stat">
              <span className="handloom-stat-value">
                5,000+
              </span>

              <p>
                Women entrepreneurs empowered at Ima Keithel
              </p>
            </div>

            <div className="handloom-stat">
              <span className="handloom-stat-value">
                100% Direct
              </span>

              <p>
                Zero-middleman craft purchase to weaver co-ops
              </p>
            </div>

          </div>

          {/* Link */}
          <div className="handloom-action">
            <a href="#">
              <span>
                Explore Handloom Trails &amp; GI Workshops
              </span>

              <span className="material-symbols-outlined">
                arrow_forward
              </span>
            </a>
          </div>

        </div>

        {/* Images */}
        <div className="handloom-images">

          <div className="handloom-image handloom-image-primary">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE8Ob49qEIfCobmwuMSvVDUDZIftViMiqdWLOuR-uRgIG7a-K0EjclCIwZEzkevvbAjnN_Sz1M8FM0bbciWWu9YMJ12QlgSdi2rxWS-CwwUUJcv_oendzDuLlwffBHZY_pbeiwXYlrQJa3M60Lz-5hsZRDnvBl-KMRcZlyNIU95DGkTsPiJK22Hi883zQWP0e7WOCr2DM9suxBLTFxnALhiBNGHGIG0G93WVlwV5wxg4_Zw5mASNiUyw"
              alt="Manipuri master woman artisan weaving traditional Moirang Phee fabric on a handloom."
            />
          </div>

          <div className="handloom-image handloom-image-secondary">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2lxsMtIG7aAe03bXGW_UACpkaM8JT25R1d6mxyR26OF6ZIacaulAiJdLaSTR77G1DFsslMRg5woyxtw0f-2dxan9LJDFp60ZZ1psk7EnRwVNnFH8s41_9Vu8Py1-qUJYmIZSK7VfmzVmLY-ckiGsEra5qmiAJ-ZRZhwESQfjjpe0c0oYRgDaLUUJZ6ho7jQ5KWPEhImlNtkYz0Qrvc03KH_W6Ojeh3EPyU1FGYS_CQC40nhi92jss9g"
              alt="Ima Keithel market in Imphal operated by Manipuri women."
            />
          </div>

        </div>

      </div>

    </section>
  );
}