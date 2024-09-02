// Import Modules
import React, { useRef, useState } from "react";
import dbVietNameProvincesCities from "../../../public/data/vietnam-provinces-cities.json";

// Import File CSS
import classes from "./css/form.module.css";

// Import Icons
import { IoMdArrowDropdown } from "react-icons/io";

export default function Form() {
  // Create + use Hooks
  const [isShowMenuOptions, setIsShowMenuOptions] = useState({
    province: false,
    district: false,
    commune: false,
  });
  const [valueSearchForm, setValueSearchForm] = useState({
    province: "",
    district: "",
    commune: "",
  });
  const [valueSelectOptions, setValueSelectOptions] = useState({
    province: { id: "00", name: "" },
    district: { id: "00", name: "" },
    commune: { id: "00", name: "" },
  });
  const [cities, setCities] = useState(dbVietNameProvincesCities.province);
  const [districts, setDistricts] = useState({
    clone: [],
    active: [],
  });
  const [communes, setCommunes] = useState({
    clone: [],
    active: [],
  });

  // Create + use handlers
  const searchValueOptionHandler = (e, fieldName) => {
    const valueSearch = e.target.value;

    if (fieldName === "province") {
      const filterCities = dbVietNameProvincesCities.province.filter((city) =>
        city.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            valueSearch
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      );
      setCities(filterCities);
    }

    if (fieldName === "district") {
      const filterDistricts = districts.clone.filter((district) =>
        district.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            valueSearch
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      );
      setDistricts((prevState) => ({ ...prevState, active: filterDistricts }));
    }

    if (fieldName === "commune") {
      const filterCommunes = communes.clone.filter((commune) =>
        commune.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            valueSearch
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      );
      setCommunes((prevState) => ({ ...prevState, active: filterCommunes }));
    }

    // Update State
    setValueSearchForm((prevState) => ({
      ...prevState,
      [fieldName]: valueSearch,
    }));
  };

  const selectValueOptionHandler = (item, option) => {
    switch (option) {
      case "province":
        if (item.idProvince !== "00" && option === "province") {
          setValueSelectOptions((prevState) => ({
            ...prevState,
            [option]: { id: item.idProvince, name: item.name },
          }));
          setIsShowMenuOptions((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
          }));

          const filterDistrictsByCity =
            dbVietNameProvincesCities.district.filter(
              (district) => district.idProvince === item.idProvince
            );
          setDistricts({
            clone: filterDistrictsByCity,
            active: filterDistrictsByCity,
          });
          return false;
        } else {
          setValueSelectOptions((prevState) => ({
            ...prevState,
            [option]: { id: "00", name: "" },
            district: { id: "00", name: "" },
            commune: { id: "00", name: "" },
          }));
          setIsShowMenuOptions({
            province: false,
            district: false,
            commune: false,
          });
          setDistricts({
            clone: [],
            active: [],
          });
          setCommunes({
            clone: [],
            active: [],
          });
        }
        break;
      case "district":
        setValueSelectOptions((prevState) => ({
          ...prevState,
          [option]: { id: item.idDistrict, name: item.name },
        }));
        setIsShowMenuOptions((prevState) => ({
          ...prevState,
          [option]: !prevState[option],
        }));
        const filterWardsByDistrict = dbVietNameProvincesCities.commune.filter(
          (commune) => commune.idDistrict === item.idDistrict
        );

        setCommunes({
          clone: filterWardsByDistrict,
          active: filterWardsByDistrict,
        });

        break;
      case "commune":
        setValueSelectOptions((prevState) => ({
          ...prevState,
          [option]: { id: item.idDistrict, name: item.name },
        }));
        setIsShowMenuOptions((prevState) => ({
          ...prevState,
          [option]: !prevState[option],
        }));
        break;
      default:
        console.log(">>> No Choice Option");
        break;
    }
  };

  const showMenuCityDropdownHandler = (name) => {
    setIsShowMenuOptions((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div className={classes["form-checkout"]}>
      <h3>Billing Details</h3>
      <form className={classes["form-checkout-container"]}>
        <div
          className={`${classes["form-input"]} ${classes["form-input-firstName"]}`}
        >
          <label htmlFor="firstName">
            First name <span>*</span>
          </label>
          <input type="text" id="firstName" placeholder="Your first name" />
        </div>
        <div
          className={`${classes["form-input"]} ${classes["form-input-lastName"]}`}
        >
          <label htmlFor="lastName">
            Last name <span>*</span>
          </label>
          <input type="text" id="lastName" placeholder="Your last name" />
        </div>
        <div
          className={`${classes["form-input"]} ${classes["form-input-city"]}`}
        >
          <label htmlFor="city">
            City <span>*</span>
          </label>
          <div
            className={classes["flex-selects-city"]}
            onClick={() => showMenuCityDropdownHandler("province")}
          >
            <input
              type="text"
              value={valueSelectOptions.province.name}
              readOnly
            />
            <IoMdArrowDropdown
              className={
                isShowMenuOptions.province
                  ? `${classes["icon-dropdown-selects"]} ${classes["active"]}`
                  : classes["icon-dropdown-selects"]
              }
            />
          </div>
          <div
            className={
              isShowMenuOptions.province
                ? `${classes["menu-dropdown-cities"]} ${classes["active"]}`
                : classes["menu-dropdown-cities"]
            }
          >
            <div className={classes["form-search"]}>
              <input
                type="text"
                value={valueSearchForm.province}
                onChange={(e) => searchValueOptionHandler(e, "province")}
              />
            </div>
            <div className={classes["list-cities"]}>
              {cities.length > 0 &&
                cities.map((item) => (
                  <option
                    className={classes["city-name"]}
                    key={item.idProvince}
                    onClick={() => selectValueOptionHandler(item, "province")}
                  >
                    {item.name}
                  </option>
                ))}
              {cities.length === 0 && (
                <p className={classes["message-no-found-city"]}>
                  No matches found
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={
            districts.active.length > 0
              ? `${classes["form-input"]} ${classes["form-input-district"]} ${classes["active"]}`
              : `${classes["form-input"]} ${classes["form-input-district"]} `
          }
        >
          <label htmlFor="district">
            District <span>*</span>
          </label>
          <div
            className={classes["flex-selects-district"]}
            onClick={
              districts.active.length > 0
                ? () => showMenuCityDropdownHandler("district")
                : undefined
            }
          >
            <input
              type="text"
              value={valueSelectOptions.district.name}
              disabled={districts.active.length > 0 ? false : true}
              readOnly
            />
            <IoMdArrowDropdown
              className={
                isShowMenuOptions.district
                  ? `${classes["icon-dropdown-selects"]} ${classes["active"]}`
                  : classes["icon-dropdown-selects"]
              }
            />
          </div>
          <div
            className={
              isShowMenuOptions.district
                ? `${classes["menu-dropdown-districts"]} ${classes["active"]}`
                : classes["menu-dropdown-districts"]
            }
          >
            <div className={classes["form-search"]}>
              <input
                type="text"
                value={valueSearchForm.district}
                onChange={(e) => searchValueOptionHandler(e, "district")}
              />
            </div>
            <div className={classes["list-districts"]}>
              {districts.active.length > 0 &&
                districts.active.map((item) => (
                  <option
                    className={classes["district-name"]}
                    key={item.idDistrict}
                    onClick={() => selectValueOptionHandler(item, "district")}
                  >
                    {item.name}
                  </option>
                ))}
              {districts.active.length === 0 && (
                <p className={classes["message-no-found-district"]}>
                  No matches found
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={
            communes.active.length > 0
              ? `${classes["form-input"]} ${classes["form-input-ward"]} ${classes["active"]}`
              : `${classes["form-input"]} ${classes["form-input-ward"]} `
          }
        >
          <label htmlFor="ward">
            Ward <span>*</span>
          </label>
          <div
            className={classes["flex-selects-ward"]}
            onClick={
              communes.active.length > 0
                ? () => showMenuCityDropdownHandler("commune")
                : undefined
            }
          >
            <input
              type="text"
              value={valueSelectOptions.commune.name}
              disabled={communes.active.length > 0 ? false : true}
              readOnly
            />
            <IoMdArrowDropdown
              className={
                isShowMenuOptions.commune
                  ? `${classes["icon-dropdown-selects"]} ${classes["active"]}`
                  : classes["icon-dropdown-selects"]
              }
            />
          </div>
          <div
            className={
              isShowMenuOptions.commune
                ? `${classes["menu-dropdown-wards"]} ${classes["active"]}`
                : classes["menu-dropdown-wards"]
            }
          >
            <div className={classes["form-search"]}>
              <input
                type="text"
                value={valueSearchForm.commune}
                onChange={(e) => searchValueOptionHandler(e, "commune")}
              />
            </div>
            <div className={classes["list-wards"]}>
              {communes.active.length > 0 &&
                communes.active.map((item) => (
                  <option
                    className={classes["ward-name"]}
                    key={item.idCommune}
                    onClick={() => selectValueOptionHandler(item, "commune")}
                  >
                    {item.name}
                  </option>
                ))}
              {communes.active.length === 0 && (
                <p className={classes["message-no-found-ward"]}>
                  No matches found
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${classes["form-input"]} ${classes["form-input-address"]}`}
        >
          <label htmlFor="address">
            Street address <span>*</span>
          </label>
          <input
            type="text"
            id="address"
            placeholder="House number and street name"
          />
        </div>
        <div
          className={`${classes["form-input"]} ${classes["form-input-phone"]}`}
        >
          <label htmlFor="phone">
            Phone <span>*</span>
          </label>
          <input type="text" id="phone" placeholder="Your Phone" />
        </div>
        <div
          className={`${classes["form-input"]} ${classes["form-input-email"]}`}
        >
          <label htmlFor="phone">
            Email <span>*</span>
          </label>
          <input type="email" id="email" placeholder="Your Email " />
        </div>
        <div
          className={`${classes["form-input"]} ${classes["form-input-order"]}`}
        >
          <textarea
            type="text"
            id="order"
            placeholder="Order Notes (Optional)"
          ></textarea>
        </div>
      </form>
    </div>
  );
}
