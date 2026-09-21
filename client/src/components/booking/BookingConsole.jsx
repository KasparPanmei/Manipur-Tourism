import { useState } from "react";

const modes = {
  stays: {
    label: "Phumdi & Eco-Stays",
    icon: "holiday_village",
    button: "Find Phumdi Stays",
    buttonClass: "bg-primary-container text-on-primary hover:bg-primary",
    message: "Searching verified phumdi homestays..."
  },
  flights: {
    label: "Flights (IMF Airport)",
    icon: "flight",
    button: "Compare Air Fares",
    buttonClass: "bg-secondary text-on-secondary hover:bg-secondary/90",
    message: "Querying connecting green routes to Imphal Airport (IMF)..."
  },
  cabs: {
    label: "Govt EV Cabs (SOS-Tracked)",
    icon: "electric_car",
    button: "Book Prepaid Cab",
    buttonClass: "bg-primary-container text-on-primary hover:bg-primary",
    message: "Locating registered government tariff EV cabs..."
  },
  guides: {
    label: "Certified Cultural Guides",
    icon: "badge",
    button: "Select Certified Guide",
    buttonClass: "bg-primary-container text-on-primary hover:bg-primary",
    message: "Searching accredited Manipuri cultural interpreters & naturalists..."
  }
};

function Field({ label, icon, children, iconClass = "text-primary" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label-sm text-label-sm text-outline font-bold uppercase tracking-wider">{label}</label>
      <div className="flex items-center bg-surface-container-low px-3 py-2.5 rounded-lg">
        <span className={`material-symbols-outlined ${iconClass} text-[20px] mr-2`}>{icon}</span>
        {children}
      </div>
    </div>
  );
}

const selectClass = "bg-transparent text-on-surface font-body-md text-body-md outline-none w-full cursor-pointer";
const inputClass = "bg-transparent text-on-surface font-body-md text-body-md outline-none w-full cursor-pointer";

export default function BookingConsole() {
  const [mode, setMode] = useState("stays");
  const [feedback, setFeedback] = useState("");

  const runSearch = (event) => {
    event.preventDefault();
    setFeedback(modes[mode].message);
    window.setTimeout(() => {
      setFeedback("Found available options! Filtering by Govt-accredited eco-standards...");
    }, 1200);
  };

  return (
    <section className="max-w-[1320px] w-full mx-auto px-margin-mobile md:px-margin -mt-12 z-20 relative" id="smart-hub">
      <div className="bg-surface-container-lowest rounded-xl shadow-xl p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-2 border-b-0 pb-4">
          {Object.entries(modes).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => { setMode(key); setFeedback(""); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-label-md text-label-md transition-all shadow-sm ${
                mode === key
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-4">
          {mode === "stays" && (
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end" onSubmit={runSearch}>
              <Field label="Region / Sanctuary" icon="location_on">
                <select className={selectClass} defaultValue="Loktak Lake (Floating Phumdi)">
                  <option>Loktak Lake (Floating Phumdi)</option>
                  <option>Imphal Valley Heritage Zone</option>
                  <option>Ukhrul (Shirui Kashong Hills)</option>
                  <option>Moirang Cultural Circuit</option>
                  <option>Dzukou Border Valley</option>
                </select>
              </Field>
              <Field label="Check-in Date" icon="calendar_today">
                <input className={inputClass} type="date" defaultValue="2025-04-12" />
              </Field>
              <Field label="Check-out Date" icon="event_available">
                <input className={inputClass} type="date" defaultValue="2025-04-16" />
              </Field>
              <Field label="Eco Travelers" icon="group">
                <select className={selectClass} defaultValue="2 Guests • 1 Phumdi Cottage">
                  <option>2 Guests • 1 Phumdi Cottage</option>
                  <option>1 Solo Scholar • 1 Homestay</option>
                  <option>4 Explorers • 2 Heritage Rooms</option>
                  <option>Family (6+) • Sacred Sanctuary Villa</option>
                </select>
              </Field>
              <button className={`w-full text-on-primary py-3 px-4 rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all ${modes.stays.buttonClass}`} type="submit">
                <span className="material-symbols-outlined text-[20px]">search</span><span>{modes.stays.button}</span>
              </button>
            </form>
          )}

          {mode === "flights" && (
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end" onSubmit={runSearch}>
              <Field label="Departure Airport" icon="flight_takeoff" iconClass="text-secondary">
                <select className={selectClass} defaultValue="Delhi (DEL) - Direct">
                  <option>Delhi (DEL) - Direct</option><option>Kolkata (CCU) - Direct</option><option>Guwahati (GAU) - Direct</option><option>Bengaluru (BLR) - 1 Stop</option><option>Mumbai (BOM) - 1 Stop</option>
                </select>
              </Field>
              <Field label="Destination" icon="flight_land">
                <input className={`${inputClass} font-semibold`} readOnly value="Imphal (IMF) Bir Tikendrajit" />
              </Field>
              <Field label="Departure Date" icon="calendar_month">
                <input className={inputClass} type="date" defaultValue="2025-04-12" />
              </Field>
              <Field label="Cabin & Route Type" icon="airline_seat_recline_extra">
                <select className={selectClass} defaultValue="Economy • Low Carbon Route">
                  <option>Economy • Low Carbon Route</option><option>Premium Economy</option><option>Business Class</option>
                </select>
              </Field>
              <button className={`w-full py-3 px-4 rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all ${modes.flights.buttonClass}`} type="submit">
                <span className="material-symbols-outlined text-[20px]">search</span><span>{modes.flights.button}</span>
              </button>
            </form>
          )}

          {mode === "cabs" && (
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end" onSubmit={runSearch}>
              <Field label="Pickup Point" icon="pin_drop">
                <select className={selectClass} defaultValue="IMF Airport Arrival Gate">
                  <option>IMF Airport Arrival Gate</option><option>Kangla Fort Heritage Plaza</option><option>Moirang Town Central Stand</option><option>Sendra Tourist Resort Gate</option>
                </select>
              </Field>
              <Field label="Drop Location / Circuit" icon="route" iconClass="text-secondary">
                <select className={selectClass} defaultValue="Loktak Lake Homestays (45 km)">
                  <option>Loktak Lake Homestays (45 km)</option><option>Shirui Hills Basecamp (Ukhrul 84 km)</option><option>Keibul Lamjao Park Gate (53 km)</option><option>Full Day Imphal Valley Sightseeing</option>
                </select>
              </Field>
              <Field label="Vehicle Class" icon="electric_meter">
                <select className={selectClass} defaultValue="Green EV Sedan (Fixed Govt Fare)">
                  <option>Green EV Sedan (Fixed Govt Fare)</option><option>All-Terrain SUV (Hills & Forest)</option><option>Executive Electric Van (Up to 7)</option>
                </select>
              </Field>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-outline font-bold uppercase tracking-wider">Security Tier</label>
                <div className="flex items-center bg-surface-container-low px-3 py-2.5 rounded-lg text-primary font-semibold font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[20px] mr-2">verified_user</span><span>Tourist Police SOS Monitored</span>
                </div>
              </div>
              <button className={`w-full text-on-primary py-3 px-4 rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all ${modes.cabs.buttonClass}`} type="submit">
                <span className="material-symbols-outlined text-[20px]">local_taxi</span><span>{modes.cabs.button}</span>
              </button>
            </form>
          )}

          {mode === "guides" && (
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end" onSubmit={runSearch}>
              <Field label="Specialization" icon="school">
                <select className={selectClass} defaultValue="Sangai Wildlife & Wetland Ecologist">
                  <option>Sangai Wildlife & Wetland Ecologist</option><option>Kangla Fort & Royal History Scholar</option><option>Handloom & Moirang Phee Textile Master</option><option>WWII Battle of Imphal & INA Specialist</option>
                </select>
              </Field>
              <Field label="Preferred Language" icon="translate" iconClass="text-secondary">
                <select className={selectClass} defaultValue="English & Meiteilon">
                  <option>English & Meiteilon</option><option>Hindi & English</option><option>French & English</option><option>Japanese & English</option><option>German & English</option>
                </select>
              </Field>
              <Field label="Expedition Date" icon="calendar_today">
                <input className={inputClass} type="date" defaultValue="2025-04-13" />
              </Field>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-outline font-bold uppercase tracking-wider">Certification</label>
                <div className="flex items-center bg-surface-container-low px-3 py-2.5 rounded-lg text-primary font-semibold font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[20px] mr-2">workspace_premium</span><span>Ministry of Tourism Verified</span>
                </div>
              </div>
              <button className={`w-full text-on-primary py-3 px-4 rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all ${modes.guides.buttonClass}`} type="submit">
                <span className="material-symbols-outlined text-[20px]">person_search</span><span>{modes.guides.button}</span>
              </button>
            </form>
          )}
        </div>

        {feedback && (
          <div className="mt-4 p-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              <span>{feedback}</span>
            </div>
            <span className="text-outline text-body-sm font-body-sm hidden sm:block">Syncing with State Tourism Registry</span>
          </div>
        )}
      </div>
    </section>
  );
}
