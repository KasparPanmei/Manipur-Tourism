import TelemetryBar from "../components/home/TelemetryBar";
import HeroSection from "../components/home/HeroSection";

import ILPSection from "../components/home/ILPSection";
import CircuitGrid from "../components/home/CircuitGrid";
import HandloomSection from "../components/home/HandloomSection";
import DispatchSection from "../components/home/DispatchSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <TelemetryBar />
      <HeroSection />
      <ILPSection />
      <CircuitGrid />
      <HandloomSection />
      <DispatchSection />
    </div>
  );
}