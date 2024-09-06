// Import Modules
import React from "react";

// Import Icons
import { IoMdArrowDropdown } from "react-icons/io";

function FirstName({ classes, formik }) {
  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-firstName"]}`}
    >
      <label htmlFor="firstName">
        First name <span>*</span>
      </label>
      <input
        className={
          formik.touched.firstname && formik.errors.firstname
            ? `${classes["input-firstName"]} ${classes["input-error"]}`
            : classes["input-firstName"]
        }
        type="text"
        name="firstname"
        id="firstName"
        placeholder="Your first name"
        value={formik.values.firstname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.firstname && (
        <p className={classes["message-error"]}>{formik.errors.firstname}</p>
      )}
    </div>
  );
}

function LastName({ classes, formik }) {
  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-lastName"]}`}
    >
      <label htmlFor="lastName">
        Last name <span>*</span>
      </label>
      <input
        className={
          formik.touched.lastname && formik.errors.lastname
            ? `${classes["input-lastName"]} ${classes["input-error"]}`
            : classes["input-lastName"]
        }
        type="text"
        name="lastname"
        id="lastName"
        placeholder="Your last name"
        value={formik.values.lastname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.lastname && (
        <p className={classes["message-error"]}>{formik.errors.lastname}</p>
      )}
    </div>
  );
}

function City({
  classes,
  isShowErrorProvince,
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
        <input
          className={
            isShowErrorProvince
              ? `${classes["input-city"]} ${classes["input-error"]}`
              : classes["input-city"]
          }
          type="text"
          value={valueSelectProvince}
          readOnly
        />
        <IoMdArrowDropdown
          className={
            isShowMenuProvince
              ? `${classes["icon-dropdown-selects"]} ${classes["active"]}`
              : classes["icon-dropdown-selects"]
          }
        />
        {isShowErrorProvince && (
          <p className={classes["message-error"]}>City is required!</p>
        )}
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
  isShowErrorDistrict,
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
          className={
            isShowErrorDistrict
              ? `${classes["input-district"]} ${classes["input-error"]}`
              : classes["input-district"]
          }
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
        {isShowErrorDistrict && (
          <p className={classes["message-error"]}>District is required!</p>
        )}
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
  isShowErrorCommune,
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
          className={
            isShowErrorCommune
              ? `${classes["input-commune"]} ${classes["input-error"]}`
              : classes["input-commune"]
          }
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
        {isShowErrorCommune && (
          <p className={classes["message-error"]}>Commune is required!</p>
        )}
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

function Address({ classes, formik }) {
  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-address"]}`}
    >
      <label htmlFor="address">
        Street address <span>*</span>
      </label>
      <input
        className={
          formik.touched.address && formik.errors.address
            ? `${classes["input-address"]} ${classes["input-error"]}`
            : classes["input-address"]
        }
        type="text"
        name="address"
        id="address"
        placeholder="House number and street name"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.address && (
        <p className={classes["message-error"]}>{formik.errors.address}</p>
      )}
    </div>
  );
}

function Phone({ classes, formik }) {
  return (
    <div className={`${classes["form-input"]} ${classes["form-input-phone"]}`}>
      <label htmlFor="phone">
        Phone <span>*</span>
      </label>
      <input
        className={
          formik.touched.phone && formik.errors.phone
            ? `${classes["input-phone"]} ${classes["input-error"]}`
            : classes["input-phone"]
        }
        type="text"
        id="phone"
        name="phone"
        placeholder="Your Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.phone && (
        <p className={classes["message-error"]}>{formik.errors.phone}</p>
      )}
    </div>
  );
}

function Email({ classes, formik }) {
  return (
    <div className={`${classes["form-input"]} ${classes["form-input-email"]}`}>
      <label htmlFor="phone">
        Email <span>*</span>
      </label>
      <input
        className={
          formik.touched.email && formik.errors.email
            ? `${classes["input-email"]} ${classes["input-error"]}`
            : classes["input-email"]
        }
        type="email"
        id="email"
        name="email"
        placeholder="Your Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && (
        <p className={classes["message-error"]}>{formik.errors.email}</p>
      )}
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
