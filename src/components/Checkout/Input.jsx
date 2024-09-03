// Import Modules
import React from "react";

// Import Icons
import { IoMdArrowDropdown } from "react-icons/io";

function FirstName({ classes }) {
  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-firstName"]}`}
    >
      <label htmlFor="firstName">
        First name <span>*</span>
      </label>
      <input type="text" id="firstName" placeholder="Your first name" />
    </div>
  );
}

function LastName({ classes }) {
  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-lastName"]}`}
    >
      <label htmlFor="lastName">
        Last name <span>*</span>
      </label>
      <input type="text" id="lastName" placeholder="Your last name" />
    </div>
  );
}

function City({
  classes,
  onShowMenuCityDropdown,
  onSearchValueCity,
  onSelectValueCity,
  valueSelectProvince,
  isShowMenuProvince,
  valueSearchProvince,
  cities,
}) {
  return (
    <div className={`${classes["form-input"]} ${classes["form-input-city"]}`}>
      <label htmlFor="city">
        City <span>*</span>
      </label>
      <div
        className={classes["flex-selects-city"]}
        onClick={() => onShowMenuCityDropdown("province")}
      >
        <input type="text" value={valueSelectProvince} readOnly />
        <IoMdArrowDropdown
          className={
            isShowMenuProvince
              ? `${classes["icon-dropdown-selects"]} ${classes["active"]}`
              : classes["icon-dropdown-selects"]
          }
        />
      </div>
      <div
        className={
          isShowMenuProvince
            ? `${classes["menu-dropdown-cities"]} ${classes["active"]}`
            : classes["menu-dropdown-cities"]
        }
      >
        <div className={classes["form-search"]}>
          <input
            type="text"
            value={valueSearchProvince}
            onChange={(e) => onSearchValueCity(e, "province")}
          />
        </div>
        <div className={classes["list-cities"]}>
          {cities.length > 0 &&
            cities.map((item) => (
              <option
                className={classes["city-name"]}
                key={item.idProvince}
                onClick={() => onSelectValueCity(item, "province")}
              >
                {item.name}
              </option>
            ))}
          {cities.length === 0 && (
            <p className={classes["message-no-found-city"]}>No matches found</p>
          )}
        </div>
      </div>
    </div>
  );
}

function District({
  classes,
  onShowMenuDistrictDropdown,
  onSearchValueDistrict,
  onSelectValueDistrict,
  valueSelectDistrict,
  isShowMenuDistrict,
  valueSearchDistrict,
  districts,
}) {
  return (
    <div
      className={
        districts.clone.length > 0
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
            ? () => onShowMenuDistrictDropdown("district")
            : undefined
        }
      >
        <input
          type="text"
          value={valueSelectDistrict}
          disabled={districts.active.length > 0 ? false : true}
          readOnly
        />
        <IoMdArrowDropdown
          className={
            isShowMenuDistrict
              ? `${classes["icon-dropdown-selects"]} ${classes["active"]}`
              : classes["icon-dropdown-selects"]
          }
        />
      </div>
      <div
        className={
          isShowMenuDistrict
            ? `${classes["menu-dropdown-districts"]} ${classes["active"]}`
            : classes["menu-dropdown-districts"]
        }
      >
        <div className={classes["form-search"]}>
          <input
            type="text"
            value={valueSearchDistrict}
            onChange={(e) => onSearchValueDistrict(e, "district")}
          />
        </div>
        <div className={classes["list-districts"]}>
          {districts.active.length > 0 &&
            districts.active.map((item) => (
              <option
                className={classes["district-name"]}
                key={item.idDistrict}
                onClick={() => onSelectValueDistrict(item, "district")}
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
  );
}

function Commune({
  classes,
  onShowMenuCommuneDropdown,
  onSearchValueCommune,
  onSelectValueCommune,
  valueSelectCommune,
  isShowMenuCommune,
  valueSearchCommune,
  communes,
}) {
  return (
    <div
      className={
        communes.clone.length > 0
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
            ? () => onShowMenuCommuneDropdown("commune")
            : undefined
        }
      >
        <input
          type="text"
          value={valueSelectCommune}
          disabled={communes.active.length > 0 ? false : true}
          readOnly
        />
        <IoMdArrowDropdown
          className={
            isShowMenuCommune
              ? `${classes["icon-dropdown-selects"]} ${classes["active"]}`
              : classes["icon-dropdown-selects"]
          }
        />
      </div>
      <div
        className={
          isShowMenuCommune
            ? `${classes["menu-dropdown-wards"]} ${classes["active"]}`
            : classes["menu-dropdown-wards"]
        }
      >
        <div className={classes["form-search"]}>
          <input
            type="text"
            value={valueSearchCommune}
            onChange={(e) => onSearchValueCommune(e, "commune")}
          />
        </div>
        <div className={classes["list-wards"]}>
          {communes.active.length > 0 &&
            communes.active.map((item) => (
              <option
                className={classes["ward-name"]}
                key={item.idCommune}
                onClick={() => onSelectValueCommune(item, "commune")}
              >
                {item.name}
              </option>
            ))}
          {communes.active.length === 0 && (
            <p className={classes["message-no-found-ward"]}>No matches found</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Address({ classes }) {
  return (
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
  );
}

function Phone({ classes }) {
  return (
    <div className={`${classes["form-input"]} ${classes["form-input-phone"]}`}>
      <label htmlFor="phone">
        Phone <span>*</span>
      </label>
      <input type="text" id="phone" placeholder="Your Phone" />
    </div>
  );
}

function Email({ classes }) {
  return (
    <div className={`${classes["form-input"]} ${classes["form-input-email"]}`}>
      <label htmlFor="phone">
        Email <span>*</span>
      </label>
      <input type="email" id="email" placeholder="Your Email" />
    </div>
  );
}

function OrderNote({ classes }) {
  return (
    <div className={`${classes["form-input"]} ${classes["form-input-order"]}`}>
      <textarea
        type="text"
        id="order"
        placeholder="Order Notes (Optional)"
      ></textarea>
    </div>
  );
}

const Input = {
  FirstName,
  LastName,
  City,
  District,
  Commune,
  Address,
  Phone,
  Email,
  OrderNote,
};

export default Input;
