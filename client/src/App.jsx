import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ExploreManipur from "./pages/ExploreManipur.jsx";
import EcoHomestays from "./pages/EcoHomestays.jsx";
import CultureHeritageItems from "./pages/CultureHeritageItems.jsx";
import Transportation from "./pages/Transportation.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface antialiased">
        <Navbar />
        <main className="w-full pt-20 bg-surface flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ExploreManipur" element={<ExploreManipur />} />
            <Route path="/EcoHomestays" element={<EcoHomestays />} />
            <Route path="/CultureHeritageItems" element={<CultureHeritageItems />} />
            <Route path="/Transportation" element={<Transportation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
