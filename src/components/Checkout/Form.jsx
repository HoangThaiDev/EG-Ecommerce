// Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/form.module.css";

// Import Icons
import { IoMdArrowDropdown } from "react-icons/io";

export default function Form() {
  const vietnamProvincesAndCities = [
    { id: 1, name: "An Giang" },
    { id: 2, name: "Bà Rịa - Vũng Tàu" },
    { id: 3, name: "Bắc Giang" },
    { id: 4, name: "Bắc Kạn" },
    { id: 5, name: "Bạc Liêu" },
    { id: 6, name: "Bắc Ninh" },
    { id: 7, name: "Bến Tre" },
    { id: 8, name: "Bình Định" },
    { id: 9, name: "Bình Dương" },
    { id: 10, name: "Bình Phước" },
    { id: 11, name: "Bình Thuận" },
    { id: 12, name: "Cà Mau" },
    { id: 13, name: "Cao Bằng" },
    { id: 14, name: "Đắk Lắk" },
    { id: 15, name: "Đắk Nông" },
    { id: 16, name: "Điện Biên" },
    { id: 17, name: "Đồng Nai" },
    { id: 18, name: "Đồng Tháp" },
    { id: 19, name: "Gia Lai" },
    { id: 20, name: "Hà Giang" },
    { id: 21, name: "Hà Nam" },
    { id: 22, name: "Hà Tĩnh" },
    { id: 23, name: "Hải Dương" },
    { id: 24, name: "Hậu Giang" },
    { id: 25, name: "Hòa Bình" },
    { id: 26, name: "Hưng Yên" },
    { id: 27, name: "Khánh Hòa" },
    { id: 28, name: "Kiên Giang" },
    { id: 29, name: "Kon Tum" },
    { id: 30, name: "Lai Châu" },
    { id: 31, name: "Lâm Đồng" },
    { id: 32, name: "Lạng Sơn" },
    { id: 33, name: "Lào Cai" },
    { id: 34, name: "Long An" },
    { id: 35, name: "Nam Định" },
    { id: 36, name: "Nghệ An" },
    { id: 37, name: "Ninh Bình" },
    { id: 38, name: "Ninh Thuận" },
    { id: 39, name: "Phú Thọ" },
    { id: 40, name: "Quảng Bình" },
    { id: 41, name: "Quảng Nam" },
    { id: 42, name: "Quảng Ngãi" },
    { id: 43, name: "Quảng Ninh" },
    { id: 44, name: "Quảng Trị" },
    { id: 45, name: "Sóc Trăng" },
    { id: 46, name: "Sơn La" },
    { id: 47, name: "Tây Ninh" },
    { id: 48, name: "Thái Bình" },
    { id: 49, name: "Thái Nguyên" },
    { id: 50, name: "Thanh Hóa" },
    { id: 51, name: "Thừa Thiên Huế" },
    { id: 52, name: "Tiền Giang" },
    { id: 53, name: "Trà Vinh" },
    { id: 54, name: "Tuyên Quang" },
    { id: 55, name: "Vĩnh Long" },
    { id: 56, name: "Vĩnh Phúc" },
    { id: 57, name: "Yên Bái" },
    { id: 58, name: "Phú Yên" },
    { id: 59, name: "Cần Thơ" },
    { id: 60, name: "Đà Nẵng" },
    { id: 61, name: "Hải Phòng" },
    { id: 62, name: "Hà Nội" },
    { id: 63, name: "TP Hồ Chí Minh" },
  ];

  // Create + use Hooks
  const [isShowMenuCities, setIsShowMenuCities] = useState(false);

  // Create + use handlers
  const selectCityHandler = (e) => {
    console.log(e.target.value);
  };

  const showMenuCityDropdownHandler = () => {
    setIsShowMenuCities(!isShowMenuCities);
  };

  return (
    <div className={classes["form-checkout"]}>
      <h3>Billing details</h3>
      <form className={classes["form-checkout-container"]}>
        <div className={classes["form-input"]}>
          <label htmlFor="firstName">
            First name <span>*</span>
          </label>
          <input type="text" id="firstName" />
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="lastName">
            Last name <span>*</span>
          </label>
          <input type="text" id="lastName" />
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="country">
            Country / Region <span>*</span>
          </label>
          <div className={classes["flex-selects-country"]}>
            <input
              type="text"
              id="country"
              value=""
              onClick={showMenuCityDropdownHandler}
            />
            <IoMdArrowDropdown
              className={
                isShowMenuCities
                  ? `${classes["icon-dropdown-selects"]} ${classes["active"]}`
                  : classes["icon-dropdown-selects"]
              }
              onClick={showMenuCityDropdownHandler}
            />

            <div
              className={
                isShowMenuCities
                  ? `${classes["menu-dropdown-cities"]} ${classes["active"]}`
                  : classes["menu-dropdown-cities"]
              }
            >
              <div className={classes["form-search"]}>
                <input type="text" placeholder="Search your city" />
              </div>
              <div className={classes["list-cities"]}>
                {vietnamProvincesAndCities.map((item) => (
                  <p className={classes["city-name"]} key={item.id}>
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="firstName">
            First name <span>*</span>
          </label>
          <input type="text" id="firstName" />
        </div>
      </form>
    </div>
  );
}
