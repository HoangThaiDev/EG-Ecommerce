// Import Modules
import React, { useState } from "react";
import dbVietNameProvincesCities from "../../../public/data/vietnam-provinces-cities.json";

// Import File CSS
import classes from "./css/form.module.css";

// Import Components
import Input from "./Input";
import Payment from "./Payment";

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

  const submitHandler = () => {
    console.log("submit");
  };

  return (
    <div className={classes["form-checkout"]}>
      <form
        className={classes["form-checkout-container"]}
        onSubmit={submitHandler}
      >
        <div className={classes["form-section"]}>
          <h3>Billing Details</h3>
          <Input.FirstName classes={classes} />
          <Input.LastName classes={classes} />
          <Input.City
            classes={classes}
            onShowMenuCityDropdown={showMenuCityDropdownHandler}
            onSearchValueCity={searchValueOptionHandler}
            onSelectValueCity={selectValueOptionHandler}
            valueSelectProvince={valueSelectOptions.province.name}
            valueSearchProvince={valueSearchForm.province}
            isShowMenuProvince={isShowMenuOptions.province}
            cities={cities}
          />
          <Input.District
            classes={classes}
            onShowMenuDistrictDropdown={showMenuCityDropdownHandler}
            onSearchValueDistrict={searchValueOptionHandler}
            onSelectValueDistrict={selectValueOptionHandler}
            valueSelectDistrict={valueSelectOptions.district.name}
            valueSearchDistrict={valueSearchForm.district}
            isShowMenuDistrict={isShowMenuOptions.district}
            districts={districts}
          />
          <Input.Commune
            classes={classes}
            onShowMenuCommuneDropdown={showMenuCityDropdownHandler}
            onSearchValueCommune={searchValueOptionHandler}
            onSelectValueCommune={selectValueOptionHandler}
            valueSelectCommune={valueSelectOptions.commune.name}
            valueSearchCommune={valueSearchForm.commune}
            isShowMenuCommune={isShowMenuOptions.commune}
            communes={communes}
          />
          <Input.Address classes={classes} />
          <Input.Phone classes={classes} />
          <Input.Email classes={classes} />
          <Input.OrderNote classes={classes} />
        </div>
        <Payment />
      </form>
    </div>
  );
}
