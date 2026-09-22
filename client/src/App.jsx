import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import ExploreManipur from "./pages/ExploreManipur.jsx";
import EcoHomestays from "./pages/EcoHomestays.jsx";
import CultureHeritageItems from "./pages/CultureHeritageItems.jsx";
import Transportation from "./pages/Transportation.jsx";
import EILP from "./pages/EILP.jsx";
import VerifyEILP from "./pages/VerifyEILP.jsx";
import RentItem from "./pages/RentItem.jsx";
import Admin from "./pages/Admin.jsx";


function AppLayout() {
  const location = useLocation();

  // Admin dashboard is a completely standalone layout.
  const isAdminPage = location.pathname === "/admin";

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    );
  }

  // Public website layout
  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface antialiased">
      <Navbar />

      <main className="w-full pt-20 bg-surface flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/ExploreManipur"
            element={<ExploreManipur />}
          />

          <Route
            path="/EcoHomestays"
            element={<EcoHomestays />}
          />

          <Route
            path="/CultureHeritageItems"
            element={<CultureHeritageItems />}
          />

          <Route
            path="/Transportation"
            element={<Transportation />}
          />

          <Route
            path="/EILP"
            element={<EILP />}
          />

          <Route
            path="/VerifyEILP"
            element={<VerifyEILP />}
          />

          <Route
            path="/RentItem"
            element={<RentItem />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}