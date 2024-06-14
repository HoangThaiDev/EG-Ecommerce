// Import Modules
import { Outlet } from "react-router-dom";

// Import Components
import Navigation from "./Navigation";
import Promotional from "./Promotional";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="layout">
      <Navigation />
      <Outlet />
      <Promotional />
      <Footer />
    </div>
  );
}
