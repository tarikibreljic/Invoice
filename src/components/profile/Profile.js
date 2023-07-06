import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserInfo, getUserInfo } from "../../actions/UserActions";
// import { message } from "antd";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import Location from "./Location";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
    dispatch(getUserInfo());
    // eslint-disable-next-line
  }, []);

  const userInfo = useSelector((state) => state.user);

  const [editState, setEditState] = useState(false);
  const [changePassState, setChangePassState] = useState(false);
  // const [locationState, setLocationState] = useState(false);
  // const [notFound, setNotFound] = useState(false);

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let today = `${day} ${month} ${year}`;
  let yesterday = `${day - 1} ${month} ${year}`;

  // const [messageApi, contextHolder] = message.useMessage();

  const navigateBack = () => {
    dispatch(deleteUserInfo());
    navigate(-1);
  };

  return (
    <div className="profileContainer">
      <button onClick={navigateBack} className="goBack">
        <BiArrowBack fontSize={40} />
      </button>
      {user && (
        <div className="profileCard">
          <h2 className="userInfoTitle">{user.email}</h2>

          <h5 className="lead">Created: {user.createdAt}</h5>
          {user.updateInfo && (
            <h5 className="lead">
              Updated:{" "}
              {user.updateInfo.editedAt === today
                ? "Today"
                : user.updateInfo.editedAt === yesterday
                ? "Yesterday"
                : user.updateInfo.editedAt}
            </h5>
          )}

          {user.updateInfo && (
            <div className="location">
              <h5 className="lead">
                {user.updateInfo.country}, {user.updateInfo.city},
                {user.updateInfo.address}, {user.updateInfo.phone}
              </h5>
              {/* <button
                className={`${
                  editState || changePassState ? "disabled" : "enabled"
                }`}
                disabled={editState || changePassState}
                onClick={() => setLocationState((prev) => !prev)}
              >
                {!locationState ? "Your Location" : "Exit Location"}
              </button> */}
            </div>
          )}

          <span className="userInfoHr"></span>

          <p>Clients : {!userInfo.clientsNum ? "0" : userInfo.clientsNum}</p>
          <p>Invoices : {!userInfo.invoicesNum ? "0" : userInfo.invoicesNum}</p>
          <p>
            Total spent : {!userInfo.amountNum ? "0" : userInfo.amountNum}{" "}
            {!userInfo.paidPercentageNum
              ? ""
              : `(${userInfo.paidPercentageNum}% paid)`}
          </p>
          <div className="userInfoBtns">
            <button
              className={`${changePassState ? "disabled" : "enabled"}`}
              disabled={changePassState}
              onClick={() => setEditState(true)}
            >
              Edit Profile
            </button>
            <button
              className={`${editState ? "disabled" : "enabled"}`}
              disabled={editState}
              onClick={() => setChangePassState(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      )}

      {editState && <EditProfile setEditState={setEditState} />}
      {changePassState && (
        <ChangePassword setChangePassState={setChangePassState} />
      )}
      {/* {locationState && (
        <Location notFound={notFound} setNotFound={setNotFound} />
      )}
      {notFound && locationState && (
        <div style={{ marginTop: "160px" }}>
          <h3> Not found</h3>
          <h3>Check if your city is correct</h3>
        </div>
      )} */}

      {/* {contextHolder} */}
    </div>
  );
};

export default Profile;
