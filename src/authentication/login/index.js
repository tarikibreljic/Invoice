import React, { useEffect, useState } from "react";
import "../auth.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { notification, message } from "antd";
import usePasswordToggle from "../usePasswordToggle";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
    sessionStorage.clear();
    // eslint-disable-next-line
  }, []);

  const users = useSelector((state) => state.user);

  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputType, icon] = usePasswordToggle();

  const handleClick = () => {
    if (email === "" || password === "") {
      openNotificationWithIcon("warning", "Please fill in all the fields");
    } else {
      const currUser = { email, password };
      const match = users.find(
        (user) =>
          user.email === currUser.email &&
          user.password === currUser.password &&
          user
      );
      if (match) {
        loading();
        sessionStorage.setItem("user", JSON.stringify(match));
        setTimeout(() => {
          navigate("/");
        }, 1300);
      } else if (match === undefined) {
        openNotificationWithIcon("error", "That user does not exist");
        setPassword("");
      }
    }
  };

  const loading = () => {
    messageApi.open({
      type: "loading",
      content: "Logging in..",
      duration: 0,
    });
    setTimeout(messageApi.destroy, 1000);
  };

  const openNotificationWithIcon = (type, msg) => {
    api[type]({
      message: msg,
    });
  };

  return (
    <div className="container-log">
      <div className="card">
        <h4 className="title">Log in to ACCOUNT</h4>
        <div className="input-group">
          <label htmlFor="emailLog">Email</label>
          <input
            id="emailLog"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@something.com"
          />
        </div>
        <div className="input-group">
          <label htmlFor="passLog">Password</label>
          <input
            id="passLog"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={inputType}
            placeholder="Example2"
          />
          <span className="passwordToggleIcon">{icon}</span>
        </div>

        <div className="check-box-group">
          <input className="check-box" type="checkbox" />
          <p className="weight-300">Keep me logged in</p>
        </div>
        <button onClick={handleClick} className="login-button">
          Login
        </button>

        <button className="google-button">
          <FcGoogle fontSize="20px" /> Use Google account
        </button>
        <h6>
          <Link to="/register">Don't have an account?</Link>
        </h6>

        {contextHolder}
        {contextHolder2}
      </div>
    </div>
  );
};

export default Login;

///
