// Import Modules
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APIServer from "../../API/customAPI";
import reduxActions from "../../redux/redux-actions";
import Swal from "sweetalert2";

// Import Data JSON
import dbVietNameProvincesCities from "../../../src/data/vietnam-provinces-cities.json";

// Import File CSS
import classes from "./css/form.module.css";

// Import Components
import Input from "./Input";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "../../UI/ToastCustom";

export default function Form() {
  // Create + use Schema validate Yup
  const formInfoSchema = Yup.object().shape({
    firstname: Yup.string().required("FirstName is required!"),
    lastname: Yup.string().required("LastName is required!"),
    address: Yup.string().required("Address is required!"),
    phone: Yup.string()
      .required("Phone is required!")
      .max(10, "Phone must have 10 numbers")
      .matches(/[0-9]/, "Phone must be a number"),
    email: Yup.string()
      .required("Email is required!")
      .matches(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email!"),
  });

  // Create + use formik
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      phone: "",
      email: "",
      note: "",
    },
    validationSchema: formInfoSchema,
    onSubmit: async (values) => {
      const result = checkValidateCity(valueSelectOptions);
      if (result) {
        const valuesForm = {
          ...values,
          ...valueSelectOptions,
          ...{ method: methodPayment },
        };

        try {
          const res = await APIServer.checkout.update(valuesForm);
          if (res.status === 200) {
            Swal.fire({
              customClass: {
                container: "popup-message-contact",
              },
              title: "🎉 Order Successful! 🎉",
              html: `
              <p class='title'>Your order has been confirmed. Thank you for shopping with <b>EG SHOP</b>. We will update you on the order status as soon as possible!"</p>       
              `,
              icon: "success",
              confirmButtonText: "Close",
            }).then(() => {
              const { newCart } = res.data;
              dispatch(reduxActions.user.updateCart(newCart));
              navigate("..");
            });
          }
        } catch (error) {
          const { data, status } = error.response;
          if (status !== 200) {
            toast.error(data.message, "message-create-checkout-error");
          }
        }
      }
    },
  });

  // Create + use Hooks
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use States
  const [methodPayment, setMethodPayment] = useState("Direct bank tranfer");

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

  const [isShowErrorOptionSelect, setIsShowErrorOptionSelect] = useState({
    province: false,
    district: false,
    commune: false,
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

  // Create + use handles
  const checkValidateCity = (values) => {
    let result = true;

    if (values.province.length === 0) {
      setIsShowErrorOptionSelect((prevState) => ({
        ...prevState,
        province: true,
      }));
    }

    if (values.district.length === 0) {
      setIsShowErrorOptionSelect((prevState) => ({
        ...prevState,
        district: true,
      }));
    }

    if (values.commune.length === 0) {
      setIsShowErrorOptionSelect((prevState) => ({
        ...prevState,
        commune: true,
      }));
    }

    return result;
  };

  const searchValueOptionHandle = (e, fieldName) => {
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

    // Update value states
    setValueSearchForm((prevState) => ({
      ...prevState,
      [fieldName]: valueSearch,
    }));
  };

  const selectValueOptionHandle = (item, option) => {
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
          setIsShowErrorOptionSelect((prevState) => ({
            ...prevState,
            [option]: false,
          }));
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

  const showMenuCityDropdownHandle = (name) => {
    setIsShowMenuOptions((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div className={classes["form-checkout"]}>
      <form
        className={classes["form-checkout-container"]}
        onSubmit={formik.handleSubmit}
      >
        <div className={classes["form-section"]}>
          <h3>Billing Details</h3>
          <Input.FirstName classes={classes} formik={formik} />
          <Input.LastName classes={classes} formik={formik} />
          <Input.City
            classes={classes}
            isShowErrorProvince={isShowErrorOptionSelect.province}
            onShowMenuCityDropdown={showMenuCityDropdownHandle}
            onSearchValueCity={searchValueOptionHandle}
            onSelectValueCity={selectValueOptionHandle}
            valueSelectProvince={valueSelectOptions.province.name}
            valueSearchProvince={valueSearchForm.province}
            isShowMenuProvince={isShowMenuOptions.province}
            cities={cities}
          />
          <Input.District
            classes={classes}
            isShowErrorDistrict={isShowErrorOptionSelect.district}
            onShowMenuDistrictDropdown={showMenuCityDropdownHandle}
            onSearchValueDistrict={searchValueOptionHandle}
            onSelectValueDistrict={selectValueOptionHandle}
            valueSelectDistrict={valueSelectOptions.district.name}
            valueSearchDistrict={valueSearchForm.district}
            isShowMenuDistrict={isShowMenuOptions.district}
            districts={districts}
          />
          <Input.Commune
            classes={classes}
            isShowErrorCommune={isShowErrorOptionSelect.commune}
            onShowMenuCommuneDropdown={showMenuCityDropdownHandle}
            onSearchValueCommune={searchValueOptionHandle}
            onSelectValueCommune={selectValueOptionHandle}
            valueSelectCommune={valueSelectOptions.commune.name}
            valueSearchCommune={valueSearchForm.commune}
            isShowMenuCommune={isShowMenuOptions.commune}
            communes={communes}
          />
          <Input.Address classes={classes} formik={formik} />
          <Input.Phone classes={classes} formik={formik} />
          <Input.Email classes={classes} formik={formik} />
          <Input.OrderNote classes={classes} formik={formik} />
        </div>
        <Payment setMethodPayment={setMethodPayment} />
      </form>
    </div>
  );
}
