import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "../../actions/UserActions";
import { useFormik } from "formik";
import { editSchema } from "../../authentication/Validation";
import { message } from "antd";
import { AiOutlineCheck } from "react-icons/ai";

const ChangePassword = ({ setChangePassState }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const [messageApi, contextHolder] = message.useMessage();
  const [correctPass, setCorrectPass] = useState(false);

  const alertMsg = (type, msg, position) => {
    messageApi.open({
      type: type,
      content: msg,
      className: "alert",
      style: {
        marginTop: "70vh",
        marginRight: position,
      },
    });
  };

  // console.log(user);

  const onSubmit = (values, actions) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const date = `${day} ${month} ${year}`;
    values.updatedAt = date;

    const updatedUser = {
      password: values.passwordEdit,
      updatedAt: values.updatedAt,
    };

    if (updatedUser.password === user.password) {
      alertMsg(
        "error",
        "New password can't be the same as current password",
        -540
      );
    } else {
      dispatch(updateUserPassword(user, updatedUser));

      actions.resetForm();

      alertMsg("success", "Password changed", -540);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  const handleCapture = (e) => {
    if (user.password === e.target.value) {
      setCorrectPass(true);
    } else {
      setCorrectPass(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        passwordEdit: "",
        confirmPasswordEdit: "",
        currentPassword: "",
      },
      validationSchema: editSchema,
      onSubmit,
    });

  return (
    <div className="profileCard">
      <form onSubmit={handleSubmit} className="changePass">
        <div className="formDiv">
          <div className="input-group">
            <label>Enter your new Password</label>
            <input
              value={values.passwordEdit}
              onChange={handleChange}
              onBlur={handleBlur}
              id="passwordEdit"
              className={
                errors.passwordEdit && touched.passwordEdit ? "input-error" : ""
              }
            />
            {errors.passwordEdit && touched.passwordEdit && (
              <h6>{errors.passwordEdit}</h6>
            )}
          </div>
          <div className="input-group">
            <label>Password Confirmation</label>
            <input
              value={values.confirmPasswordEdit}
              onChange={handleChange}
              onBlur={handleBlur}
              id="confirmPasswordEdit"
              className={
                errors.confirmPasswordEdit && touched.confirmPasswordEdit
                  ? "input-error"
                  : ""
              }
            />
            {errors.confirmPasswordEdit && touched.confirmPasswordEdit && (
              <h6>{errors.confirmPasswordEdit}</h6>
            )}
          </div>

          <div className="input-group">
            <label>Confirm changes with current Password</label>
            <input
              value={values.currentPassword}
              onChange={handleChange}
              onChangeCapture={(e) => handleCapture(e)}
              onBlur={handleBlur}
              id="currentPassword"
              className={
                errors.currentPassword && touched.currentPassword
                  ? "input-error"
                  : "correctPassInput"
              }
            />
            <span className="correctPass">
              {correctPass && <AiOutlineCheck color="green" fontSize={20} />}
            </span>

            {errors.currentPassword && touched.currentPassword && (
              <h6>{errors.currentPassword}</h6>
            )}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setChangePassState(false)}
            className="userInfoCancelUpdate"
          >
            Cancel
          </button>
          <button type="submit" className="userInfoChangePass">
            Change password
          </button>
        </div>
      </form>
      {contextHolder}
    </div>
  );
};

ChangePassword.propTypes = {
  setChangePassState: PropTypes.func.isRequired,
};

export default ChangePassword;
