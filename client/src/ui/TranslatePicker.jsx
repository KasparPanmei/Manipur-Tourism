import { useEffect, useState } from "react";

const languages = [
    ["en", "English", "EN"],
    ["hi", "हिन्दी", "HI"],
    ["mni-Mtei", "Manipuri (Meiteilon)", "MNI"],
    ["te", "తెలుగు", "TE"],
    ["bn", "বাংলা", "BN"],
];

/* ---------------------------------------------------------
   Select a language through Google's hidden selector
--------------------------------------------------------- */
function selectGoogleLanguage(language) {
    const select = document.querySelector(".goog-te-combo");

    if (!select) {
        return false;
    }

    select.value = language;

    select.dispatchEvent(
        new Event("change", {
            bubbles: true,
        })
    );

    return true;
}

/* ---------------------------------------------------------
   Remove Google's injected UI
--------------------------------------------------------- */
function hideGoogleTranslateUI() {
    /* Top Google Translate banner */
    document
        .querySelectorAll(
            "iframe.goog-te-banner-frame, iframe.goog-te-banner-frame.skiptranslate"
        )
        .forEach((element) => {
            element.style.setProperty("display", "none", "important");
            element.style.setProperty("visibility", "hidden", "important");
            element.style.setProperty("height", "0", "important");
            element.style.setProperty("width", "0", "important");
            element.style.setProperty("border", "0", "important");
        });

    /* Google banner wrapper */
    document
        .querySelectorAll("body > .skiptranslate")
        .forEach((element) => {
            element.style.setProperty("display", "none", "important");
            element.style.setProperty("visibility", "hidden", "important");
            element.style.setProperty("height", "0", "important");
            element.style.setProperty("overflow", "hidden", "important");
        });

    /* Google tooltip */
    document
        .querySelectorAll(
            "#goog-gt-tt, .goog-te-balloon-frame, .goog-tooltip"
        )
        .forEach((element) => {
            element.style.setProperty("display", "none", "important");
            element.style.setProperty("visibility", "hidden", "important");
        });

    /* Prevent Google from moving the page */
    document.documentElement.style.setProperty(
        "top",
        "0px",
        "important"
    );

    document.body.style.setProperty(
        "top",
        "0px",
        "important"
    );

    document.body.style.setProperty(
        "margin-top",
        "0px",
        "important"
    );
}

/* ---------------------------------------------------------
   Component
--------------------------------------------------------- */
export default function TranslatePicker() {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("en");

    useEffect(() => {
        let observer;

        /* -------------------------------------------------
           Google Translate initialization
        ------------------------------------------------- */
        const initGoogleTranslate = () => {
            if (!window.google?.translate) {
                return;
            }

            if (!document.querySelector(".goog-te-combo")) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages:
                            "en,hi,mni-Mtei,te,bn",
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
            }

            /* Hide Google's UI immediately */
            hideGoogleTranslateUI();

            /* Watch for Google injecting the banner later */
            if (!observer) {
                observer = new MutationObserver(() => {
                    hideGoogleTranslateUI();
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            }
        };

        /* Google calls this function from its script */
        window.googleTranslateElementInit =
            initGoogleTranslate;

        /* Google may already be loaded */
        if (window.google?.translate) {
            initGoogleTranslate();
        }

        /* Load Google Translate only once */
        if (
            !document.querySelector(
                'script[data-google-translate="true"]'
            )
        ) {
            const script = document.createElement("script");

            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

            script.async = true;

            script.dataset.googleTranslate = "true";

            document.body.appendChild(script);
        }

        /* Extra protection after Google finishes loading */
        const cleanupInterval = window.setInterval(() => {
            hideGoogleTranslateUI();

            if (document.querySelector(".goog-te-combo")) {
                window.clearInterval(cleanupInterval);
            }
        }, 500);

        return () => {
            window.clearInterval(cleanupInterval);

            if (observer) {
                observer.disconnect();
            }

            delete window.googleTranslateElementInit;
        };
    }, []);

    /* ---------------------------------------------------------
       Choose language
    --------------------------------------------------------- */
    const chooseLanguage = (nextLanguage) => {
        setLanguage(nextLanguage);
        setOpen(false);

        let attempts = 0;

        const applyTranslation = () => {
            const success =
                selectGoogleLanguage(nextLanguage);

            /* Always hide Google's UI after changing language */
            hideGoogleTranslateUI();

            if (success || attempts >= 20) {
                return;
            }

            attempts += 1;

            window.setTimeout(
                applyTranslation,
                250
            );
        };

        applyTranslation();
    };

    const selected =
        languages.find(
            ([code]) => code === language
        ) || languages[0];

    return (
        <div
            className="translate-picker notranslate"
            translate="no"
        >
            {/* -------------------------------------------------
                Hidden Google Translate engine
            ------------------------------------------------- */}
            <div
                id="google_translate_element"
                className="google-translate-engine"
                aria-hidden="true"
            />

            {/* -------------------------------------------------
                Custom language button
            ------------------------------------------------- */}
            <button
                type="button"
                className="tourism-language"
                aria-expanded={open}
                aria-haspopup="listbox"
                onClick={() =>
                    setOpen((value) => !value)
                }
            >
                <span>{selected[2]}</span>

                <span className="material-symbols-outlined">
                    expand_more
                </span>
            </button>

            {/* -------------------------------------------------
                Custom language dropdown
            ------------------------------------------------- */}
            {open && (
                <div
                    className="translate-menu notranslate"
                    translate="no"
                    role="listbox"
                    aria-label="Choose language"
                >
                    {languages.map(
                        ([
                            code,
                            label,
                            shortLabel,
                        ]) => (
                            <button
                                key={code}
                                type="button"
                                role="option"
                                aria-selected={
                                    language === code
                                }
                                className={`notranslate ${language === code
                                        ? "is-selected"
                                        : ""
                                    }`}
                                translate="no"
                                onClick={() =>
                                    chooseLanguage(
                                        code
                                    )
                                }
                            >
                                <span
                                    className="notranslate"
                                    translate="no"
                                >
                                    {label}
                                </span>

                                <small
                                    className="notranslate"
                                    translate="no"
                                >
                                    {shortLabel}
                                </small>
                            </button>
                        )
                    )}
                </div>
            )}
        </div>
    );
}