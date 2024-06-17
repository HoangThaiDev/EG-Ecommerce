
// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Files CSS
import "./App.css";

// Import Components
// ------------------- Layout --------------------
import RootLayout from "./layout/RootLayout";
import SideMenu from "./layout/SideMenu";
import SideUserMenu from "./layout/SideUserMenu";

// ------------------- Pages --------------------
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideMenu />
        <SideUserMenu />

        {/* -----------------------------------------ROUTER------------------------------------ */}
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

