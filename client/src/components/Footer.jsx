export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-auto pt-space-xl pb-space-lg">
      <div className="w-full px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[28px]">
                assured_workload
              </span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                Directorate of Tourism
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Official Portal of Department of Tourism, Government of Manipur. Fostering regenerative eco-tourism, cultural preservation, and world-class heritage expeditions across the Jewel of India.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold tracking-wider">
                ISO 9001:2015
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold tracking-wider">
                GSTC ACCREDITED
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">
              Travelers Essentials
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  verified
                </span>
                Inner Line Permit (ILP) Portal
              </a>
              <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  support_agent
                </span>
                24/7 Tourist Assistance Booths
              </a>
              <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  nature_people
                </span>
                Eco-Tourism Conservation Charter
              </a>
              <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  co2
                </span>
                Carbon-Neutral Footprint Offset
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">
              District Tourism Helpdesks
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-on-surface">
                  Imphal West & East
                </span>
                <span>
                  0385-2458140
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-on-surface">
                  Bishnupur (Loktak)
                </span>
                <span>
                  03879-222301
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-on-surface">
                  Ukhrul (Shirui Lily)
                </span>
                <span>
                  03876-222814
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-on-surface">
                  Churachandpur
                </span>
                <span>
                  03874-233910
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">
              Responsible Stewardship
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Protect the floating islands of Loktak and the endangered Sangai brow-antlered deer. Follow zero single-use plastic guidelines across sanctuaries.
            </p>
            <div className="p-3 rounded-lg bg-surface-container flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-[24px]">
                shield
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Tourist Police Cell
                </span>
                <span className="font-body-sm text-body-sm text-secondary font-bold">
                  +91 385 2441010
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-body-sm text-outline">
            © 2026 VistaVentures. All Rights Reserved.
          </p>
          <div className="flex items-center gap-space-md font-body-sm text-body-sm text-outline">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              RTI Disclosures
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
