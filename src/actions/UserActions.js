import { actions } from "./Types";

export const addNewUser = (user) => async (dispatch) => {
  const res = await fetch("/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await fetch("/users");
    const data = await res.json();

    dispatch({
      type: actions.GET_USERS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.USERS_ERROR,
      payload: err.response.statusText,
    });
  }
};

export const setUserInfo = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(`/clients?userEmail=${currUser.email}`);
    const clientsData = await res.json();

    const clientsArr = clientsData.map((cl) => cl.invDetails.allAmounts);

    let totalAmount;
    if (clientsArr.length > 0) {
      totalAmount = clientsArr.reduce((acc, curr) => acc + curr);
    } else {
      totalAmount = 0;
    }

    const res2 = await fetch(
      `/invoices?clientDetails.userEmail=${currUser.email}`
    );
    const invoicesData = await res2.json();

    const paid_unpaidArr = invoicesData.map((inv) => inv.paid);

    const paidArr = paid_unpaidArr.filter((el) => el === true);

    let percentage;
    if (paid_unpaidArr.length > 0) {
      percentage = Math.floor((paidArr.length * 100) / paid_unpaidArr.length);
    } else {
      percentage = 0;
    }

    // console.log(clientsData.length);
    // console.log(invoicesData.length);
    // console.log(percentage);
    // console.log(totalAmount);

    const userInfo = {
      clientsNum: clientsData.length,
      invoicesNum: invoicesData.length,
      paidPercentageNum: percentage,
      amountNum: totalAmount,
    };

    const res3 = await fetch("/userInfo", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await res3.json();
    console.log(userData);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserInfo = () => async (dispatch) => {
  await fetch("/userInfo", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const res = await fetch("/userInfo");
    const data = await res.json();
    console.log(data);

    dispatch({
      type: actions.USER_INFO,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.USERS_ERROR,
      payload: err.response.statusText,
    });
  }
};

export const setUserInfoToUpdate = (user, editedInfo) => async (dispatch) => {
  console.log(user);
  console.log(editedInfo);

  user.updateInfo = editedInfo;
  console.log(user);

  const res = await fetch(`/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  sessionStorage.setItem("user", JSON.stringify(data));
  // window.location.reload();
};

export const updateUserPassword = (user, updatedUser) => async (dispatch) => {
  user.password = updatedUser.password;
  user.confirmPassword = updatedUser.password;
  user.updateInfo.editedAt = updatedUser.updatedAt;

  console.log(user);
  console.log(updatedUser);

  const res = await fetch(`/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  sessionStorage.setItem("user", JSON.stringify(data));
  // window.location.reload();
};
