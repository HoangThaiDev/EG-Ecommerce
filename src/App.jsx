// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useEffect } from "react";

// Import Files CSS
import "./App.css";

// Import Components
// ------------------- UI --------------------
import ScrollTop from "./UI/ScrollTop";

// ------------------- Layout --------------------
import RootLayout from "./layout/RootLayout";
import SideMenu from "./layout/SideMenu";

// ------------------- Pages --------------------
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
import FAQ from "./pages/FAQ";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SettingAccount from "./pages/SettingAccount";
import Introduce from "./components/SettingAccount/Introduce";
import Profile from "./components/SettingAccount/Profile";

function App() {
  // Create + use Hooks
  const btnScrollRef = useRef(null);

  useEffect(() => {
    const btnScrollHandler = async () => {
      if (window.scrollY > 250) {
        btnScrollRef.current.classList.add("scroll");
      } else {
        btnScrollRef.current.classList.remove("scroll");
      }
    };

    document.addEventListener("scroll", btnScrollHandler);

    // Clean up function
    return () => {
      document.removeEventListener("scroll", btnScrollHandler);
    };
  }, []);

  // Create + use event Handlers
  const goHomeHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <button
        type="button"
        className="btn-home"
        ref={btnScrollRef}
        onClick={() => goHomeHandler()}
      >
        <span>&#171;</span>
      </button>
      <BrowserRouter>
        <ScrollTop />
        <SideMenu />

        {/* -----------------------------------------ROUTER------------------------------------ */}
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="faqs" element={<FAQ />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:productName" element={<ProductDetail />} />

            <Route path="setting-account" element={<SettingAccount />}>
              <Route index element={<Introduce />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
