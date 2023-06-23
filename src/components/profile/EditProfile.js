import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setUserInfoToUpdate } from "../../actions/UserActions";
import { message } from "antd";

const EditProfile = ({ setEditState }) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const countryRef = useRef();

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    countryRef.current.focus();
  }, []);

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

  const confirmEdit = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const date = `${day} ${month} ${year}`;

    if (country === "" || city === "" || address === "" || phone === "") {
      alertMsg("warning", "Please fill in all the fields", -540);
    } else {
      const editedInfo = { editedAt: date, country, city, address, phone };
      console.log(editedInfo);

      dispatch(setUserInfoToUpdate(user, editedInfo));
      alertMsg("success", "User information updated", -540);

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  return (
    <div className="profileCard">
      <div className="input-group">
        <label>Country</label>
        <input
          ref={countryRef}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        ></input>
      </div>
      <div className="input-group">
        <label>City</label>
        <input value={city} onChange={(e) => setCity(e.target.value)}></input>
      </div>
      <div className="input-group">
        <label>Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
      </div>
      <div className="input-group">
        <label>Phone Number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)}></input>
      </div>
      <button
        onClick={() => setEditState(false)}
        className="userInfoCancelUpdate"
      >
        Cancel
      </button>
      <button onClick={confirmEdit} className="userInfoConfirmUpdate">
        Confirm
      </button>
      {contextHolder}
    </div>
  );
};

EditProfile.propTypes = {
  setEditState: PropTypes.func.isRequired,
};

export default EditProfile;
