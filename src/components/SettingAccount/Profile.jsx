// Import Modules
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import File CSS
import classes from "./css/profile.module.css";

// Import Components

// Import Icons
import { MdOutlinePhotoCamera } from "react-icons/md";
import Input from "./Input";

function Profile() {
  const avatarDefault =
    "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-tron.jpg";

  // Create + use validate Formik + Yup
  const FormUpdateSchema = Yup.object().shape({
    firstName: Yup.string().required("FirstName is required!"),
    lastName: Yup.string().required("LastName is required!"),
    phone: Yup.string()
      .required("Phone is required!")
      .max(10, "Phone must have 10 numbers")
      .matches(/[0-9]/, "Phone must be a number"),
    address: Yup.string().required("Address is required!"),
    email: Yup.string()
      .required("Email is required!")
      .matches(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email!"),
    password: Yup.string().required("Password is required!"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required!")
      .oneOf([Yup.ref("password")], "Passwords must match!"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: FormUpdateSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Create + use Hooks
  const [imageAvatar, setImageAvatar] = useState(avatarDefault);
  const [isShowActionAvatar, setIsShowActionAvatar] = useState(false);

  // Create + use event handlers
  const changeAvatarHandler = (e) => {
    const fileImage = e.target.files[0];

    if (fileImage) {
      const imageUrl = URL.createObjectURL(fileImage);
      setImageAvatar(imageUrl);
      setIsShowActionAvatar(true);
    }
  };

  return (
    <div className={classes["profile"]}>
      <div className={classes["profile-container"]}>
        <h4>Profile</h4>

        {/* JSX: Header Avatar */}
        <div className={classes["profile-header"]}>
          <div className={classes["profile-header-avatar"]}>
            <img src={imageAvatar} alt={imageAvatar} />
            <div className={classes["form-input-file"]}>
              <label htmlFor="file-image">
                <MdOutlinePhotoCamera
                  className={classes["icon-upload-image"]}
                />
              </label>
              <input
                type="file"
                id="file-image"
                accept="image/*"
                onChange={changeAvatarHandler}
              />
            </div>
          </div>
          {isShowActionAvatar && (
            <div className={classes["profile-header-actions"]}>
              <button type="button" className={classes["btn-action-upload"]}>
                Upload
              </button>
              <button type="button" className={classes["btn-action-remove"]}>
                Remove
              </button>
            </div>
          )}
        </div>

        {/* JSX: Header Form */}
        <form
          className={classes["profile-form"]}
          onSubmit={formik.handleSubmit}
        >
          <Input.FirstName classes={classes} formik={formik} />
          <Input.LastName classes={classes} formik={formik} />
          <Input.Email classes={classes} formik={formik} />
          <Input.Phone classes={classes} formik={formik} />
          <Input.Address classes={classes} formik={formik} />
          <Input.Password classes={classes} formik={formik} />
          <Input.ConfirmPassword classes={classes} formik={formik} />
          <button type="submit" className={classes["btn-save"]}>
            Save Change
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
