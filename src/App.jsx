// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useEffect } from "react";
import reduxActions from "./redux/redux-actions";
import { useDispatch } from "react-redux";

// Import Files CSS
import "./App.css";

// Import Components
import Order from "./components/SettingAccount/Order";

// ------------------- UI --------------------
import ScrollTop from "./UI/ScrollTop";

// ------------------- Layout --------------------
import RootLayout from "./layout/RootLayout";
import SideMenu from "./layout/SideMenu";
import SideCart from "./layout/SideCart";

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
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  // Create + use Hooks
  const btnScrollRef = useRef(null);
  const dispatch = useDispatch();

  // Create + use Side Effects
  // ------------------- Side Effect: DOM event when client scroll browser ---------------------
  useEffect(() => {
    const btnScrollHandler = () => {
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

  // ------------------- Side Effect: Fetch API get user when reload page ---------------------
  useEffect(() => {
    const fetchUser = () => {
      const userState = JSON.parse(localStorage.getItem("user"));

      if (userState) {
        dispatch(reduxActions.user.save({ isLogin: userState.isLogin }));
      }
    };
    fetchUser();
  }, []);

  // Create + use event handles
  const goHomeHandle = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <button
        type="button"
        className="btn-home"
        ref={btnScrollRef}
        onClick={() => goHomeHandle()}
      >
        <span>&#171;</span>
      </button>
      <BrowserRouter>
        <ScrollTop />
        <SideMenu />
        <SideCart />

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
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />

            <Route path="setting-account" element={<SettingAccount />}>
              <Route index element={<Introduce />} />
              <Route path="profile" element={<Profile />} />
              <Route path="order" element={<Order />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
