export default function LoktakLakeGuide() {
    return (
        <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
            {/* Uniform Portal Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06),0_1px_3px_0_rgba(0,0,0,0.04)]">
                <div className="h-20 max-w-[1320px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 shrink-0">
                        <img
                            alt="Manipur Tourism Official Emblem"
                            className="h-8 w-auto object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkLIz-yJaKp9V9zhRIVaUoLUEmB50lxnjnkhYmA2BFe9RzgNS31TL4wimfTWHVb-EfKIFRXmcpVoSBi9kTk2CnPHVVYJLQbwtCv9eY2uGvYTszwIi2ryeoqmUon6KLV7V3W_C-NdWF_Qk9YzrQcnsoFd2CgN0-ltPk7UfdLeQHFT9PN5AxCWZPSbfgNbO6CfKuucd1_wmUB-eQql-CIJvIJnBaCVXxKPbdkv3Qvz9yyegxopcIT5KJ2A"
                        />
                        <div className="flex flex-col">
                            <span className="font-headline-sm text-[20px] md:text-headline-sm text-primary tracking-tight font-bold leading-none">
                                MANIPUR TOURISM
                            </span>
                            <span className="text-[11px] text-outline tracking-wider uppercase font-semibold mt-1">
                                Jewel of India | Government of Manipur
                            </span>
                        </div>
                    </div>

                    <nav className="hidden xl:flex items-center gap-1 p-1.5 rounded-xl bg-surface-container-low">
                        <a className="px-3 py-2 rounded-lg text-[14px] font-bold bg-primary-container text-on-primary shadow-sm" href="#">
                            Explore Manipur
                        </a>
                        <a className="px-3 py-2 rounded-lg text-[14px] font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Book a Guides
                        </a>
                        <a className="px-3 py-2 rounded-lg text-[14px] font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Transportation
                        </a>
                        <a className="px-3 py-2 rounded-lg text-[14px] font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Hotels &amp; Reservation
                        </a>
                        <a className="px-3 py-2 rounded-lg text-[14px] font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Traditional Shopping
                        </a>
                        <a className="px-3 py-2 rounded-lg text-[14px] font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
                            Rent Item
                        </a>
                    </nav>

                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors"
                            href="tel:18003453885"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                            <span className="text-[12px] font-bold tracking-normal">1800-345-3885</span>
                        </a>
                        <div className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-surface-container-low text-on-surface cursor-pointer hover:bg-surface-container transition-colors">
                            <span className="text-[12px] font-semibold">ENG</span>
                            <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
                        </div>
                        <button
                            aria-label="Accessibility Options"
                            className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[20px]">accessibility_new</span>
                        </button>
                        <div className="flex items-center cursor-pointer pl-1">
                            <img
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNP2SmcVVJx49AewC2mg-o8PvLqatEA5Tk6vz60H8bSJ-JmzvCVwYV1PWm8jiitLt_-YZt-fojE7q7I16qNfi6Z5fAw6w5agEyO3VpnDbgrVy3E7TkKbNmMFLqpcq1hHEQQvsTJFYjiT5wlf5Jf45lXDKNZ4mmI72vD7HhElnG6gXWIFtR7dOghMW6U1f0Na5EIxv5tNWM2UlAJJxLgOU6lzsiPW5oAo0fKNap5qJgYsjhzXHy8IT9iw"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="w-full pt-20 bg-surface flex-1">
                {/* Breadcrumb & Top Indicator Strip */}
                <section className="w-full bg-surface-container-low border-b border-outline-variant/50 py-3">
                    <div className="max-w-[1320px] mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between gap-3 text-[13px]">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                            <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
                                <span className="material-symbols-outlined text-[16px]">home</span> Home
                            </a>
                            <span className="text-outline">/</span>
                            <a className="hover:text-primary transition-colors" href="#">
                                Explore Manipur
                            </a>
                            <span className="text-outline">/</span>
                            <a className="hover:text-primary transition-colors" href="#">
                                Bishnupur District
                            </a>
                            <span className="text-outline">/</span>
                            <span className="text-primary font-bold">Loktak Lake &amp; Keibul Lamjao</span>
                        </div>
                        <div className="flex items-center gap-4 text-body-sm">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-[12px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Ramsar Wetland #461
                            </span>
                            <span className="hidden md:inline-flex items-center gap-1 text-on-surface-variant text-[12px]">
                                <span className="material-symbols-outlined text-primary text-[15px]">pin_drop</span> Moirang, Bishnupur, Manipur 795133
                            </span>
                        </div>
                    </div>
                </section>

                {/* Destination Hero Showcase & Title */}
                <section className="relative w-full bg-surface-container-low pb-10 pt-6">
                    <div className="max-w-[1320px] mx-auto px-4 md:px-8">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2.5 py-1 rounded bg-primary-container text-on-primary text-[11px] font-bold uppercase tracking-wider">
                                        Natural Wonder of Manipur
                                    </span>
                                    <span className="px-2.5 py-1 rounded bg-surface-container text-secondary font-bold text-[11px] uppercase tracking-wider">
                                        World's Only Floating Lake
                                    </span>
                                </div>
                                <h1 className="font-display-lg text-[34px] sm:text-[44px] md:text-[52px] text-primary font-bold tracking-tight leading-none mb-3">
                                    Loktak Lake
                                </h1>
                                <p className="font-body-md text-on-surface-variant max-w-2xl flex items-center gap-2 text-[14px] md:text-[15px]">
                                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                                    <span><strong>Location:</strong> Moirang, Bishnupur District, Manipur • 39 km (24 mi) from Capital Imphal</span>
                                </p>
                            </div>

                            {/* Direct Guide Booking CTA Pill */}
                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                <a
                                    className="px-6 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-[15px] shadow-lg hover:bg-primary-container transition-all flex items-center gap-2.5 group"
                                    href="#book-guide"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-primary-fixed group-hover:scale-110 transition-transform">
                                        badge
                                    </span>
                                    <span>Book a Guide for Loktak</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </a>
                                <button
                                    type="button"
                                    className="px-4 py-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant hover:bg-surface-container text-primary font-bold text-[14px] flex items-center gap-1.5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                    <span>Share</span>
                                </button>
                                <button
                                    type="button"
                                    className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant hover:bg-surface-container text-secondary flex items-center justify-center transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[22px]">favorite_border</span>
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Photo Grid / Gallery Component */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-2xl overflow-hidden shadow-md">
                            {/* Main Hero Image */}
                            <div className="md:col-span-8 relative group overflow-hidden h-[340px] md:h-[440px] bg-inverse-surface">
                                <img
                                    alt="Panoramic aerial view of Loktak Lake and traditional circular phumdis"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt3u_7vLe0m7vQuR7_f5xdkOkOyYKNOcJFnskzgGVVlkPsvdcLfpXmAeUg8hfOsJ7xwntPqoXD_sHg457MJ2iyaFLnSma7RTdAt-SwBavJVEFmp97bNOxkeq2ORo3GTLxLjQsHhVcqih31_49ZaLtHsfYnk9qfCgrqavtHfn_UbmJt9XBuRV1WbpXe389k_xvlQ6-QYmnNRs61XWrg8LGHhhkNvGMn0fnOjS2m_GmzinYWy9mioy8F"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                                    <span className="px-2.5 py-0.5 rounded bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider w-max mb-1">
                                        Sendra Viewpoint Panoramas
                                    </span>
                                    <p className="text-[17px] font-bold">
                                        Circular Floating Phumdis with Indigenous Fishermen in Wooden Dugouts
                                    </p>
                                </div>
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[12px] flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span>Live Ecological Sanctuary Condition: Pristine</span>
                                </div>
                            </div>

                            {/* Secondary Image & Gallery Thumbnails Column */}
                            <div className="md:col-span-4 flex flex-col gap-4">
                                <div className="relative group overflow-hidden h-[212px] rounded-xl bg-inverse-surface">
                                    <img
                                        alt="Endangered Sangai brow-antlered deer at Keibul Lamjao National Park Loktak Lake"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuABFKQQdGs11YxgIFZxOXDHLrXGp6xkSdaeVLZxDEktMqLAfk8CAqlC-akLNLDdi93-biErNsqp-XXgv1TaY6iI55tOSz_PpIMOvTyCk9sJRUt8gkAkWDVNCKUCfAqPoopiSV7YAOwnA3Ny_Mqy78efG4HeRpr_tP4-SbU4TJBU_dY2F1oDCGElDtQPphWRe4VhG2s_u54q3ViX1Nla7qppEIxFZ8oa717GA724iRHsibny3bMDGDBG"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                                            Keibul Lamjao National Park
                                        </span>
                                        <p className="text-[13px] font-bold leading-tight">Home of the Endangered Sangai (Dancing Deer)</p>
                                    </div>
                                </div>

                                {/* Thumbnails Strip */}
                                <div className="grid grid-cols-3 gap-2 h-[212px]">
                                    <div className="relative rounded-lg overflow-hidden group">
                                        <img
                                            alt="Fishermen huts on phumdis"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt3u_7vLe0m7vQuR7_f5xdkOkOyYKNOcJFnskzgGVVlkPsvdcLfpXmAeUg8hfOsJ7xwntPqoXD_sHg457MJ2iyaFLnSma7RTdAt-SwBavJVEFmp97bNOxkeq2ORo3GTLxLjQsHhVcqih31_49ZaLtHsfYnk9qfCgrqavtHfn_UbmJt9XBuRV1WbpXe389k_xvlQ6-QYmnNRs61XWrg8LGHhhkNvGMn0fnOjS2m_GmzinYWy9mioy8F"
                                        />
                                        <div className="absolute inset-0 bg-primary/20"></div>
                                    </div>
                                    <div className="relative rounded-lg overflow-hidden group">
                                        <img
                                            alt="Sangai deer roaming"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuABFKQQdGs11YxgIFZxOXDHLrXGp6xkSdaeVLZxDEktMqLAfk8CAqlC-akLNLDdi93-biErNsqp-XXgv1TaY6iI55tOSz_PpIMOvTyCk9sJRUt8gkAkWDVNCKUCfAqPoopiSV7YAOwnA3Ny_Mqy78efG4HeRpr_tP4-SbU4TJBU_dY2F1oDCGElDtQPphWRe4VhG2s_u54q3ViX1Nla7qppEIxFZ8oa717GA724iRHsibny3bMDGDBG"
                                        />
                                        <div className="absolute inset-0 bg-primary/20"></div>
                                    </div>
                                    <button
                                        type="button"
                                        className="relative rounded-lg overflow-hidden flex flex-col items-center justify-center p-2 bg-primary-container text-on-primary hover:bg-primary transition-colors text-center group"
                                    >
                                        <span className="material-symbols-outlined text-[28px] mb-1 group-hover:scale-110 transition-transform">
                                            photo_library
                                        </span>
                                        <span className="font-bold text-[12px] leading-tight">Visit Gallery</span>
                                        <span className="text-[10px] text-primary-fixed mt-0.5">+18 Photos</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Activity Tags */}
                        <div className="flex flex-wrap items-center gap-2.5 mt-5">
                            <span className="px-3.5 py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-bold text-primary text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px]">waves</span> Lake
                            </span>
                            <span className="px-3.5 py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-bold text-primary text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px]">forest</span> Nature
                            </span>
                            <span className="px-3.5 py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-bold text-primary text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px]">sailing</span> Boating
                            </span>
                            <span className="px-3.5 py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-bold text-primary text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px]">photo_camera</span> Sight Seeing
                            </span>
                            <span className="px-3.5 py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-bold text-primary text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px]">pets</span> Wildlife
                            </span>
                            <span className="px-3.5 py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-bold text-primary text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px]">kayaking</span> Adventure
                            </span>
                            <span className="px-3.5 py-1 rounded-lg bg-secondary/10 border border-secondary/20 font-bold text-secondary text-[12px] uppercase tracking-wider ml-auto flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">event</span> Loktak Day: 15th October
                            </span>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <section className="w-full py-12 bg-surface">
                    <div className="max-w-[1320px] mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                            {/* Left Column (8 cols): Verbatim Descriptions & Narrative Sections */}
                            <div className="lg:col-span-8 space-y-8">
                                {/* Overview & Geological Description */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/40 space-y-4">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span className="material-symbols-outlined text-[24px]">info</span>
                                        <h2 className="font-headline-sm text-headline-sm text-primary">About Loktak Lake</h2>
                                    </div>

                                    <p className="font-body-lg text-body-md md:text-[16px] text-on-surface leading-relaxed">
                                        The Loktak Lake is a freshwater lake in Northeast India. It is the largest freshwater lake in South Asia. It is a pulsating lake, with a surface area varying from <strong>250 sq km to 500 sq km</strong> during the rainy season with a typical area of <strong>287 sq km</strong>. The lake is located at Moirang in Manipur state, India.
                                    </p>

                                    <div className="p-4 rounded-xl bg-surface-container-low border-l-4 border-primary space-y-1">
                                        <div className="font-bold text-primary text-[14px]">Etymology &amp; The Phumdis</div>
                                        <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                            The name Loktak comes from the Meitei language, meaning <em>"stream's end."</em> It is famous for its circular floating swamps, known as <strong>phumdis</strong> floating over it, which are a masses of vegetation, soil and organic matter at various stage of decomposition.
                                        </p>
                                    </div>

                                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                                        The largest of all the phumdis covers an area of <strong>40 km² (15 sq mi)</strong> and is situated on the southeastern shore of the lake. Located on this phumdi, <strong>Keibul Lamjao National Park</strong> is the only floating national park in the world. The park is the last natural refuge of the endangered <strong>Sangai (state animal)</strong>, Manipur brow-antlered deer, one of three subspecies of Eld's deer.
                                    </p>

                                    {/* Loktak Day Highlight Box */}
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                                        <span className="material-symbols-outlined text-secondary text-[32px] shrink-0">celebration</span>
                                        <div>
                                            <h4 className="font-bold text-secondary text-[15px]">State Observance: Loktak Day</h4>
                                            <p className="text-body-sm text-on-surface">
                                                The Loktak Day is observed every year on the <strong>15th of October</strong> at the periphery of the Loktak lake, celebrating the wetland's heritage and biodiversity.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Socio-Economic & Ecological Ramsar Recognition */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/40 space-y-4">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span className="material-symbols-outlined text-[24px]">water</span>
                                        <h3 className="font-headline-sm text-headline-sm text-primary">Socio-Economic Importance &amp; Ramsar Status</h3>
                                    </div>
                                    <p className="text-on-surface text-[15px] leading-relaxed">
                                        This ancient lake plays an important role in the economy of Manipur. It serves as a source of water for hydropower generation, irrigation and drinking water supply. The fishermen's community, living on the edges of the lake and on phumdis, also known as <strong>"phumshangs"</strong>, heavily depends on it for their livelihood, maintaining a unique lifestyle. The lake's biodiversity supports a host of flora and fauna, making it a hotspot for nature enthusiasts and ecologists.
                                    </p>
                                    <div className="p-4 rounded-xl bg-error-container/20 border border-error-container/40">
                                        <div className="flex items-start gap-2.5">
                                            <span className="material-symbols-outlined text-error text-[20px] mt-0.5">eco</span>
                                            <div>
                                                <h5 className="font-bold text-on-surface text-[14px]">Conservation &amp; Global Ramsar Recognition</h5>
                                                <p className="text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                                                    Human activities have led to severe pressure on the lake ecosystem. Rural and urban hamlets around the lake have a population of about <strong>100,000 people</strong>. Recognized for its ecological significance, Loktak Lake was designated a wetland of international importance under the <strong>Ramsar Convention in 1990</strong> and listed in the <strong>Montreux Record in 1993</strong>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Climate & Seasonal Conditions */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/40 space-y-4">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span className="material-symbols-outlined text-[24px]">thermostat</span>
                                        <h3 className="font-headline-sm text-headline-sm text-primary">Climate &amp; Rainfall</h3>
                                    </div>
                                    <p className="text-on-surface text-[15px] leading-relaxed">
                                        With an average annual rainfall of <strong>1,183 mm (46.57 in)</strong> tropical monsoon climate prevails in the valley. Temperatures range from <strong>0 to 35 °C (32 to 95 °F)</strong>. <strong>February and March are the driest months.</strong>
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                        <div className="p-3.5 rounded-xl bg-surface-container-low text-center">
                                            <span className="text-label-sm uppercase font-bold text-outline">Average Rainfall</span>
                                            <div className="font-headline-sm text-primary font-bold mt-1">1,183 mm</div>
                                            <span className="text-xs text-on-surface-variant">Tropical monsoon</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-surface-container-low text-center">
                                            <span className="text-label-sm uppercase font-bold text-outline">Temperature Range</span>
                                            <div className="font-headline-sm text-primary font-bold mt-1">0°C – 35°C</div>
                                            <span className="text-xs text-on-surface-variant">32°F to 95°F</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-surface-container-low text-center">
                                            <span className="text-label-sm uppercase font-bold text-secondary">Driest Window</span>
                                            <div className="font-headline-sm text-secondary font-bold mt-1">Feb – Mar</div>
                                            <span className="text-xs text-on-surface-variant">Ideal clarity for boating</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Visitor Information, Sendra, Phubala & INA Museum */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/40 space-y-5">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span className="material-symbols-outlined text-[24px]">travel_explore</span>
                                        <h3 className="font-headline-sm text-headline-sm text-primary">Visitor Information &amp; Key Attractions</h3>
                                    </div>
                                    <p className="text-on-surface text-[15px] leading-relaxed">
                                        Well connected by road and air, Imphal, the capital city of Manipur is <strong>39 km (24 mi)</strong> away from the lake, by road. The lake is a unique destination for tourism. The lake offers excellent opportunities for visitors to enjoy the beauty of the lake and its several islands located inside it that are studded with floating phumdis of different geometrical shapes. The important islands which offer facilities for visitors are the <strong>Sendra and Phubala</strong>.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        {/* Sendra Tourist Home */}
                                        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                                                    <span className="material-symbols-outlined text-[20px]">hotel</span>
                                                    <h4>Sendra Tourist Home</h4>
                                                </div>
                                                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                                    The Sendra Tourist Home on the island with an attached Cafeteria in the middle of the lake is an ideal tourist spot. Visitors get a bird's eye view of life on the lake—small islands that are actually floating weed on which the lake people live.
                                                </p>
                                            </div>
                                            <span className="mt-3 text-xs font-bold text-primary flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">check</span> Government Guest House &amp; Cafe
                                            </span>
                                        </div>

                                        {/* Phubala Island Resort */}
                                        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                                                    <span className="material-symbols-outlined text-[20px]">villa</span>
                                                    <h4>Phubala Resort</h4>
                                                </div>
                                                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                                    Phubala resort, on the Phubala, is 40 km (25 mi) from Imphal. It offers serene lakeside vantage points, water sports access, and cottage stays.
                                                </p>
                                            </div>
                                            <span className="mt-3 text-xs font-bold text-primary flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">directions_car</span> 40 km from Imphal Airport
                                            </span>
                                        </div>
                                    </div>

                                    {/* INA Museum Moirang */}
                                    <div className="p-5 rounded-xl bg-surface-container border border-outline-variant/60 flex items-start gap-4">
                                        <span className="material-symbols-outlined text-secondary text-[32px] shrink-0 mt-0.5">museum</span>
                                        <div>
                                            <h4 className="font-bold text-on-surface text-[15px]">Indian National Army (INA) Museum, Moirang</h4>
                                            <p className="text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                                                At Moirang town on the fringe of the Loktak is the <strong>Indian National Army (INA) Museum</strong> which will be of interest to tourists. The exhibits include letters, photographs, badges of ranks and other articles associated with the INA. A bronze statue of Netaji Subash Chandra Bose in uniform stands in the lawn.
                                            </p>
                                            <div className="mt-2 text-xs font-semibold text-secondary">
                                                Historic Site: First Tricolour hoisted on Indian soil by INA on 14 April 1944.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dedicated Certified Guide Booking Integration Section */}
                                <div id="book-guide" className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                                    <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                                        <span className="material-symbols-outlined text-[220px]">badge</span>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold uppercase tracking-wider mb-3">
                                            <span className="material-symbols-outlined text-[14px]">verified</span>
                                            <span>Direct Booking Integration</span>
                                        </div>
                                        <h3 className="font-display-md text-headline-md md:text-[28px] font-bold mb-2">
                                            Book a Certified Guide for Loktak Lake
                                        </h3>
                                        <p className="text-body-md text-primary-fixed max-w-xl leading-relaxed mb-6 text-[14px] md:text-[15px]">
                                            Explore Keibul Lamjao floating sanctuary, navigate phumdi waterways with local dugout boatmen, and discover INA Moirang history alongside Department of Tourism accredited indigenous naturalists.
                                        </p>

                                        {/* Guide Selection Cards */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            {/* Guide 1 */}
                                            <div className="bg-surface-container-lowest text-on-surface rounded-xl p-4 shadow flex items-center gap-3.5">
                                                <img
                                                    alt="Guide Avatar"
                                                    className="w-14 h-14 rounded-full object-cover border-2 border-primary shrink-0"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNP2SmcVVJx49AewC2mg-o8PvLqatEA5Tk6vz60H8bSJ-JmzvCVwYV1PWm8jiitLt_-YZt-fojE7q7I16qNfi6Z5fAw6w5agEyO3VpnDbgrVy3E7TkKbNmMFLqpcq1hHEQQvsTJFYjiT5wlf5Jf45lXDKNZ4mmI72vD7HhElnG6gXWIFtR7dOghMW6U1f0Na5EIxv5tNWM2UlAJJxLgOU6lzsiPW5oAo0fKNap5qJgYsjhzXHy8IT9iw"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="font-bold text-[14px] text-primary truncate">Thoiba Singh</h5>
                                                        <span className="text-xs font-bold text-secondary">4.9 ★</span>
                                                    </div>
                                                    <p className="text-xs text-on-surface-variant truncate">Keibul Sangai Specialist • 8 yrs</p>
                                                    <div className="text-[12px] font-bold text-primary mt-1">₹1,200 / Half Day</div>
                                                </div>
                                            </div>

                                            {/* Guide 2 */}
                                            <div className="bg-surface-container-lowest text-on-surface rounded-xl p-4 shadow flex items-center gap-3.5">
                                                <img
                                                    alt="Guide Avatar"
                                                    className="w-14 h-14 rounded-full object-cover border-2 border-secondary shrink-0"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjITNiDfQFio_WEhn2xuR3NJmp8O1jb9x0tsXtYMH7ryyTX-Rw9HRl7viqFqzYJTsL_AhmJAPRjq0m76-DRAH4WcZZDm2tRXAjqM6edHDKCf79icV7Fus1GUKUYPWlgm-G-2v6bgG7m-5T1T3Xj1ZlcA4JE9XyRz1BdnUKGa9ifZxM1ZMfh7Jja1Qa7UHD0S9djpQgOgYpn4e_y7FxbXzwefgX5I5Z_7qdS2kGsQqf"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="font-bold text-[14px] text-primary truncate">Memi Devi</h5>
                                                        <span className="text-xs font-bold text-secondary">5.0 ★</span>
                                                    </div>
                                                    <p className="text-xs text-on-surface-variant truncate">Phumdi Culture &amp; INA Historian</p>
                                                    <div className="text-[12px] font-bold text-primary mt-1">₹1,500 / Full Day</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Instant Booking Action */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-primary-container">
                                            <div className="text-xs text-primary-fixed">
                                                • Regulated Government Honorarium • Certified by Directorate of Tourism • Includes Insurance
                                            </div>
                                            <button
                                                type="button"
                                                className="px-8 py-3.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[15px] hover:bg-tertiary-fixed-dim transition-colors shadow-lg flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">person_check</span>
                                                <span>Book My Guide Now</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Right Column (4 cols): Sidebar with Weather, Pricing, Timings, Tips & Best Time */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Live Weather Card */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/40">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-label-sm uppercase font-bold text-outline tracking-wider">
                                            Moirang Weather Radar
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-bold text-[11px]">
                                            LIVE SYNC
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pb-4 border-b border-outline-variant/40">
                                        <div>
                                            <div className="font-display-md text-[38px] font-bold text-on-surface leading-none">24°C</div>
                                            <div className="text-primary font-bold text-[16px] mt-1 flex items-center gap-1.5">
                                                <span>Sunny</span>
                                                <span className="text-amber-500 text-[20px]">☀️</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant mt-0.5">
                                                Feels like: <strong>22°C</strong>
                                            </div>
                                        </div>

                                        <div className="text-right text-xs text-on-surface-variant space-y-1">
                                            <div className="flex items-center justify-end gap-1">
                                                <span className="material-symbols-outlined text-[15px] text-amber-600">wb_sunny</span>
                                                <span>Sunrise: <strong>05:37 AM</strong></span>
                                            </div>
                                            <div className="flex items-center justify-end gap-1">
                                                <span className="material-symbols-outlined text-[15px] text-amber-800">wb_twilight</span>
                                                <span>Sunset: <strong>05:37 PM</strong></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5 Days Forecast */}
                                    <div className="pt-4">
                                        <div className="text-label-sm uppercase font-bold text-outline mb-2">5 Days Forecast:</div>
                                        <div className="space-y-2 text-xs">
                                            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low">
                                                <span className="font-semibold text-on-surface">Friday, 1 Sep</span>
                                                <span className="text-on-surface-variant flex items-center gap-1">🌤️ 20°C</span>
                                            </div>
                                            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low">
                                                <span className="font-semibold text-on-surface">Saturday, 2 Sep</span>
                                                <span className="text-on-surface-variant flex items-center gap-1">⛅ 22°C</span>
                                            </div>
                                            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low">
                                                <span className="font-semibold text-on-surface">Sunday, 3 Sep</span>
                                                <span className="text-on-surface-variant flex items-center gap-1">☀️ 27°C</span>
                                            </div>
                                            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low">
                                                <span className="font-semibold text-on-surface">Monday, 4 Sep</span>
                                                <span className="text-on-surface-variant flex items-center gap-1">🌦️ 18°C</span>
                                            </div>
                                            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low">
                                                <span className="font-semibold text-on-surface">Tuesday, 5 Sep</span>
                                                <span className="text-on-surface-variant flex items-center gap-1">🌧️ 16°C</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Entry Ticket Pricing Table */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/40">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-primary text-[22px]">confirmation_number</span>
                                        <h4 className="font-headline-sm text-[18px] font-bold text-primary">Entry Ticket Pricing for Loktak Lake</h4>
                                    </div>

                                    {/* For Local Visitor */}
                                    <div className="mb-4">
                                        <div className="text-[12px] font-bold text-outline uppercase tracking-wider mb-1.5">
                                            For local visitor
                                        </div>
                                        <div className="rounded-lg overflow-hidden border border-outline-variant/50 text-xs">
                                            <div className="flex justify-between p-2.5 bg-surface-container-low font-semibold border-b border-outline-variant/40">
                                                <span>Adult</span>
                                                <span className="font-bold text-primary">INR 100</span>
                                            </div>
                                            <div className="flex justify-between p-2.5 bg-surface-container-lowest font-semibold">
                                                <span>Child</span>
                                                <span className="font-bold text-primary">INR 50</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* For Outsider & Foreigner */}
                                    <div>
                                        <div className="text-[12px] font-bold text-secondary uppercase tracking-wider mb-1.5">
                                            For Outsider &amp; Foreigner
                                        </div>
                                        <div className="rounded-lg overflow-hidden border border-outline-variant/50 text-xs">
                                            <div className="flex justify-between p-2.5 bg-secondary/5 font-semibold border-b border-outline-variant/40">
                                                <span>Adult</span>
                                                <span className="font-bold text-secondary">INR 200</span>
                                            </div>
                                            <div className="flex justify-between p-2.5 bg-surface-container-lowest font-semibold">
                                                <span>Child</span>
                                                <span className="font-bold text-secondary">INR 100</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-outline-variant/40 text-[11px] text-on-surface-variant flex items-center justify-between">
                                        <span>Direct e-Ticket &amp; UPI accepted</span>
                                        <span className="font-bold text-primary cursor-pointer hover:underline">Instant Gate Pass →</span>
                                    </div>
                                </div>

                                {/* Opening and Closing Time Table */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/40">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-primary text-[22px]">schedule</span>
                                        <h4 className="font-headline-sm text-[18px] font-bold text-primary">Opening and Closing Time</h4>
                                    </div>

                                    <div className="rounded-lg overflow-hidden border border-outline-variant/50 text-xs divide-y divide-outline-variant/40">
                                        <div className="flex justify-between p-2 hover:bg-surface-container-low">
                                            <span className="font-semibold text-on-surface">Monday</span>
                                            <span className="font-bold text-primary">06:00 AM - 05:00 PM</span>
                                        </div>
                                        <div className="flex justify-between p-2 hover:bg-surface-container-low">
                                            <span className="font-semibold text-on-surface">Tuesday</span>
                                            <span className="font-bold text-primary">06:00 AM - 05:00 PM</span>
                                        </div>
                                        <div className="flex justify-between p-2 hover:bg-surface-container-low">
                                            <span className="font-semibold text-on-surface">Wednesday</span>
                                            <span className="font-bold text-primary">06:00 AM - 05:00 PM</span>
                                        </div>
                                        <div className="flex justify-between p-2 hover:bg-surface-container-low">
                                            <span className="font-semibold text-on-surface">Thursday</span>
                                            <span className="font-bold text-primary">06:00 AM - 05:00 PM</span>
                                        </div>
                                        <div className="flex justify-between p-2 hover:bg-surface-container-low">
                                            <span className="font-semibold text-on-surface">Friday</span>
                                            <span className="font-bold text-primary">06:00 AM - 05:00 PM</span>
                                        </div>
                                        <div className="flex justify-between p-2 hover:bg-surface-container-low">
                                            <span className="font-semibold text-on-surface">Saturday</span>
                                            <span className="font-bold text-primary">06:00 AM - 05:00 PM</span>
                                        </div>
                                        <div className="flex justify-between p-2 hover:bg-surface-container-low">
                                            <span className="font-semibold text-on-surface">Sunday</span>
                                            <span className="font-bold text-primary">06:00 AM - 05:00 PM</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-[11px] text-outline italic">
                                        *Boating is permitted during daylight hours only.
                                    </div>
                                </div>

                                {/* Tips Card */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/40">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-secondary text-[22px]">lightbulb</span>
                                        <h4 className="font-headline-sm text-[18px] font-bold text-on-surface">Tips when visiting Loktak Lake</h4>
                                    </div>

                                    <ul className="space-y-3 text-body-sm text-on-surface-variant text-[13px]">
                                        <li className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">check_circle</span>
                                            <span>Carry water and light snacks, but ensure you do not litter the area.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">check_circle</span>
                                            <span>Use binoculars for a closer look at distant wildlife and migratory waterfowl.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">check_circle</span>
                                            <span>Wear comfortable shoes suitable for walking and boarding phumdi dugouts.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">check_circle</span>
                                            <span>Respect the fragile environment and the local fishing community.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Best Time to Visit Card */}
                                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/40">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-primary text-[22px]">calendar_month</span>
                                        <h4 className="font-headline-sm text-[18px] font-bold text-primary">Best Time to Visit Loktak Lake</h4>
                                    </div>

                                    <p className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed mb-3">
                                        The best time to visit Loktak Lake is during the post-monsoon and winter months, which stretch from <strong>October to March</strong>. During this period, the weather is generally cool and pleasant, making it an ideal time for sightseeing and engaging in outdoor activities. The temperate climate ensures that visitors can comfortably explore the lake's unique floating islands.
                                    </p>

                                    <p className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed mb-3">
                                        Tourists visiting Loktak Lake can enjoy boat rides, witness indigenous fishing methods, and observe diverse flora and fauna. Additionally, the winter season in Manipur hosts cultural festivals like the <strong>Sangai Festival in November</strong>, providing a chance to immerse in local culture.
                                    </p>

                                    <div className="p-3 rounded-lg bg-error-container/20 border border-error-container/40 text-xs text-error font-semibold">
                                        <strong>Monsoon Advisory:</strong> It's best to avoid the monsoon months (<strong>May to September</strong>) due to heavy rainfall causing water level rise and activity restrictions.
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>
            </main>

            {/* Uniform Portal Footer */}
            <footer className="w-full bg-surface-container-low mt-auto pt-10 pb-8 border-t border-outline-variant/40">
                <div className="max-w-[1320px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[28px]">assured_workload</span>
                                <span className="font-headline-sm text-headline-sm text-primary font-bold">Directorate of Tourism</span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                Official Portal of Department of Tourism, Government of Manipur. Fostering regenerative eco-tourism, cultural preservation, and world-class heritage expeditions across the Jewel of India.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-bold text-[11px] tracking-wider">ISO 9001:2015</span>
                                <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-bold text-[11px] tracking-wider">GSTC ACCREDITED</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-label-lg text-on-surface font-bold uppercase tracking-wider text-[13px]">Travelers Essentials</span>
                            <div className="flex flex-col gap-2 font-body-sm text-on-surface-variant text-[13px]">
                                <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                                    <span className="material-symbols-outlined text-[16px] text-primary">verified</span> Inner Line Permit (ILP) Portal
                                </a>
                                <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                                    <span className="material-symbols-outlined text-[16px] text-primary">support_agent</span> 24/7 Tourist Assistance Booths
                                </a>
                                <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                                    <span className="material-symbols-outlined text-[16px] text-primary">nature_people</span> Eco-Tourism Conservation Charter
                                </a>
                                <a className="hover:text-primary transition-colors flex items-center gap-1.5" href="#">
                                    <span className="material-symbols-outlined text-[16px] text-primary">co2</span> Carbon-Neutral Footprint Offset
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-label-lg text-on-surface font-bold uppercase tracking-wider text-[13px]">District Tourism Helpdesks</span>
                            <div className="flex flex-col gap-2 font-body-sm text-on-surface-variant text-[13px]">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-on-surface">Imphal West &amp; East</span>
                                    <span>0385-2458140</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-on-surface">Bishnupur (Loktak)</span>
                                    <span>03879-222301</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-on-surface">Ukhrul (Shirui Lily)</span>
                                    <span>03876-222814</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-on-surface">Churachandpur</span>
                                    <span>03874-233910</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-label-lg text-on-surface font-bold uppercase tracking-wider text-[13px]">Responsible Stewardship</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                Protect the floating islands of Loktak and the endangered Sangai brow-antlered deer. Follow zero single-use plastic guidelines across sanctuaries.
                            </p>
                            <div className="p-3 rounded-lg bg-surface-container flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary text-[24px]">shield</span>
                                <div className="flex flex-col">
                                    <span className="font-label-md text-on-surface font-semibold text-[13px]">Tourist Police Cell</span>
                                    <span className="font-body-sm text-secondary font-bold">+91 385 2441010</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/40 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="font-body-sm text-[12px] text-outline">
                            © 2025 Directorate of Tourism, Government of Manipur. All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-4 font-body-sm text-[12px] text-outline">
                            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                            <a className="hover:text-primary transition-colors" href="#">RTI Disclosures</a>
                            <a className="hover:text-primary transition-colors" href="#">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
