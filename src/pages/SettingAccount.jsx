// Import Component
import { Outlet } from "react-router-dom";
import Header from "../UI/Header";
import MainDashboard from "../components/SettingAccount/MainDashboard";

function SettingAccount() {
  return (
    <>
      <Header title="My Account" linkBack="Home" linkCurrent="My Account" />
      <MainDashboard />
      <Outlet />
    </>
  );
}

export default SettingAccount;
