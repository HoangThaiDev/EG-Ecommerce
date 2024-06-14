// Import Modules
import { useDispatch, useSelector } from "react-redux";

// Import Files CSS
import classes from "./css/sideMenu.module.css";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { IoMdClose } from "react-icons/io";

export default function SideMenu() {
  // Create + use Hooks
  const { isShow: isShowSideMenu } = useSelector((state) => state.sideMenu);
  console.log(isShowSideMenu);
  return (
    <div
      className={
        isShowSideMenu
          ? `${classes.sideMenu} ${classes["active"]}`
          : classes.sideMenu
      }
    >
      <div className={classes["sideMenu__container"]}>
        <h1>SideMenu</h1>
      </div>
    </div>
  );
}
