
// Import Modules
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Files CSS
import "./App.css";

// Import Components
// ------------------- Layout --------------------
import RootLayout from "./layout/RootLayout";

// ------------------- Pages --------------------
import Home from "./pages/Home";
import SideMenu from "./layout/SideMenu";

function App() {
  // Create + use hooks
  const { isShow: isShowSideMenu } = useSelector((state) => state.sideMenu);

  return (
    <div className="App">
      {isShowSideMenu && <SideMenu />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

