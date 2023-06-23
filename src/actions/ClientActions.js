import { actions } from "./Types";

export const addClient = (newClient) => async (dispatch) => {
  try {
    const res = await fetch("/clients", {
      method: "POST",
      body: JSON.stringify(newClient),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({
      type: actions.ADD_CLIENT,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const getClients = () => async (dispatch) => {
  const currUser = JSON.parse(sessionStorage.getItem("user"));
  if (currUser == null) {
    console.log("nisam logovan");
    return;
  } else {
    try {
      const res = await fetch(`/clients?userEmail=${currUser.email}`);
      const data = await res.json();

      dispatch({
        type: actions.GET_CLIENTS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: actions.CLIENTS_ERROR,
        payload: err.response,
      });
    }
  }
};

export const getDomesticClients = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(
      `/clients?userEmail=${currUser.email}&country=bih&country=BIH&country=BiH&country=Bih`
    );
    const data = await res.json();

    dispatch({
      type: actions.GET_CLIENTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const getForeignClients = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(
      `/clients?userEmail=${currUser.email}&country_ne=bih&country_ne=BIH&country_ne=BiH&country_ne=Bih`
    );
    const data = await res.json();

    dispatch({
      type: actions.GET_CLIENTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const getClientsByDate = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(
      `/clients?userEmail=${currUser.email}&_sort=invDetails.allDates&_order=asc`
    );
    const data = await res.json();

    dispatch({
      type: actions.GET_CLIENTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const searchClients = (text) => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(`/clients?userEmail=${currUser.email}&q=${text}`);
    const data = await res.json();

    dispatch({
      type: actions.SEARCH_CLIENTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const updateClient = (clientToUpdate) => async (dispatch) => {
  try {
    const res = await fetch(`/clients/${clientToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify(clientToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    dispatch({
      type: actions.UPDATED_CLIENTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const setClient = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/clients/${id}`);
    const data = await res.json();

    const res2 = await fetch("/client", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data2 = await res2.json();

    dispatch({
      type: actions.SET_CLIENT,
      payload: data2,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const getCurrClient = () => async (dispatch) => {
  try {
    const res = await fetch("/client");
    const data = await res.json();
    console.log(data);

    dispatch({
      type: actions.GET_CURR_CLIENT,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const searchClientDetails = (text, id) => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(
      `/invoices?clientDetails.userEmail=${currUser.email}&clientDetails.ID=${id}&q=${text}`
    );
    const data = await res.json();

    dispatch({
      type: actions.SEARCH_CLIENT_DETAILS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const getPaidInv = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/invoices?clientDetails.ID=${id}&paid=true`);
    const data = await res.json();

    dispatch({
      type: actions.GET_PAID_INV,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};
export const getUnpaidInv = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/invoices?clientDetails.ID=${id}&paid=false`);
    const data = await res.json();

    dispatch({
      type: actions.GET_UNPAID_INV,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const getAllInv = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/invoices?clientDetails.ID=${id}`);

    const data = await res.json();

    dispatch({
      type: actions.GET_ALL_INVOICES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};

export const getLastClientId = () => async (dispatch) => {
  try {
    const res = await fetch(`/clients`);
    const data = await res.json();
    const lastClientId = data[data.length - 1].id;

    dispatch({
      type: actions.GET_LAST_ID,
      payload: lastClientId,
    });
  } catch (err) {
    dispatch({
      type: actions.CLIENTS_ERROR,
      payload: err.response,
    });
  }
};
