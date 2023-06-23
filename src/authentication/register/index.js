import React, { useEffect } from "react";
import "../auth.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Schema } from "../Validation";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "../../actions/UserActions";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getUsers } from "../../actions/UserActions";
import usePasswordToggle from "../usePasswordToggle";

const Register = () => {
  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  const users = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [inputType, icon] = usePasswordToggle();

  const alertMsg = (email, type, msg) => {
    messageApi.open({
      type: type,
      content: `${email} ${msg}`,
    });
  };

  const onSubmit = (values, actions) => {
    const exist = users.some((user) => user.email === values.email);
    if (exist) {
      alertMsg(values.email, "warning", "already exist");
    } else {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const date = `${day} ${month} ${year}`;

      values.createdAt = date;

      dispatch(addNewUser(values));
      actions.resetForm();
      alertMsg(values.email, "success", "added");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
        createdAt: "",
      },
      validationSchema: Schema,
      onSubmit,
    });

  // console.log(errors);

  return (
    <div className="container-log">
      <form onSubmit={handleSubmit} className="card">
        <h4 className="title">Register ACCOUNT</h4>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="example@something.com"
            id="email"
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && <h6>{errors.email}</h6>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={inputType}
            placeholder="Example2"
            id="password"
            className={errors.password && touched.password ? "input-error" : ""}
          />
          <span className="passwordToggleIcon">{icon}</span>

          {errors.password && touched.password && <h6>{errors.password}</h6>}
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            type={inputType}
            id="confirmPassword"
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }
          />
          <span className="passwordToggleIcon">{icon}</span>

          {errors.confirmPassword && touched.confirmPassword && (
            <h6>{errors.confirmPassword}</h6>
          )}
        </div>

        <button type="submit" className="login-button">
          Register
        </button>
        <h6>
          <Link to="/login">Already have an account?</Link>
        </h6>
      </form>
      {contextHolder}
    </div>
  );
};

export default Register;
