import { actions } from "./Types";

export const addInvoice = (newInvoice) => async (dispatch) => {
  try {
    const res = await fetch("/invoices", {
      method: "POST",
      body: JSON.stringify(newInvoice),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({
      type: actions.ADD_INVOICE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.INVOICES_ERROR,
      payload: err.response,
    });
  }
};

export const getInvoices = () => async (dispatch) => {
  const currUser = JSON.parse(sessionStorage.getItem("user"));

  if (currUser != null) {
    console.log(currUser);
    try {
      const res = await fetch(
        `/invoices?clientDetails.userEmail=${currUser.email}`
      );
      const data = await res.json();
      console.log(data);

      dispatch({
        type: actions.GET_INVOICES,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: actions.INVOICES_ERROR,
        payload: err.response,
      });
    }
  } else {
    console.log("nisam logovannn");
  }
};

export const getPaidInvoices = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(
      `/invoices?clientDetails.userEmail=${currUser.email}`
    );
    const data = await res.json();
    const paidData = data.filter((el) => el.paid);

    dispatch({
      type: actions.GET_PAID_INVOICES,
      payload: paidData,
    });
  } catch (err) {
    dispatch({
      type: actions.INVOICES_ERROR,
      payload: err.response,
    });
  }
};

export const getUnpaidInvoices = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(
      `/invoices?clientDetails.userEmail=${currUser.email}`
    );
    const data = await res.json();
    const unpaidData = data.filter((el) => !el.paid);

    dispatch({
      type: actions.GET_UNPAID_INVOICES,
      payload: unpaidData,
    });
  } catch (err) {
    dispatch({
      type: actions.INVOICES_ERROR,
      payload: err.response,
    });
  }
};

export const getInvoicesDueThisMonth = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(
      `/invoices?clientDetails.userEmail=${currUser.email}`
    );
    const data = await res.json();

    const thisMonth = new Date().getMonth() + 1;

    const dataThisMonth = data.filter(
      (el) =>
        el.dueToPayBy.slice(5, 7).includes(thisMonth) &&
        el.dueToPayBy.slice(2, 4) === "23"
    );

    // dueToPayBy_gte=2023-05-01&dueToPayBy_lte=2023-05-31

    dispatch({
      type: actions.GET_INVOICES_DUE_THIS_MONTH,
      payload: dataThisMonth,
    });
  } catch (err) {
    dispatch({
      type: actions.INVOICES_ERROR,
      payload: err.response,
    });
  }
};

export const searchInvoices = (text) => async (dispatch) => {
  try {
    const currUser = JSON.parse(sessionStorage.getItem("user"));

    const res = await fetch(
      `/invoices?clientDetails.userEmail=${currUser.email}&q=${text}`
    );
    const data = await res.json();

    dispatch({
      type: actions.SEARCH_INVOICES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.INVOICES_ERROR,
      payload: err.response,
    });
  }
};

export const markInvoiceAsPaid = (invoice) => async (dispatch) => {
  try {
    const updated = { paid: true };
    const res = await fetch(`/invoices/${invoice.id}`, {
      method: "PATCH",
      body: JSON.stringify(updated),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data) {
      dispatch(getInvoices());
    }
  } catch (err) {
    dispatch({
      type: actions.INVOICES_ERROR,
      payload: err.response,
    });
  }
};

export const updateClientDueToDelete = (invoice) => async (dispatch) => {
  const res = await fetch(`/clients/${invoice.clientDetails.ID}`);
  const clientToUpdate = await res.json();

  const updatedAmount =
    clientToUpdate.invDetails.allAmounts - parseInt(invoice.amount);

  const dateArr = clientToUpdate.invDetails.allDates;
  const dateToDelete = dateArr.find((date) => date == invoice.dueToPayBy);

  const indexToDelete = dateArr.indexOf(dateToDelete);
  let newDateArray = [];
  dateArr.forEach((date, index) => {
    if (index !== indexToDelete) {
      newDateArray.push(date);
    }
  });

  clientToUpdate.invDetails.allAmounts = updatedAmount;
  clientToUpdate.invDetails.allDates = newDateArray;

  const res2 = await fetch(`${clientToUpdate.id}`, {
    method: "PUT",
    body: JSON.stringify(clientToUpdate),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data2 = await res2.json();
  console.log(data2);
};

export const deleteInvoice = (invoice) => async (dispatch) => {
  await fetch(`/invoices/${invoice.id}`, {
    method: "DELETE",
  });
  dispatch(getInvoices());
};

export const updateClientDueToUpdateInvoice =
  (currentInvoice, updated) => async (dispatch) => {
    const razlika = parseInt(currentInvoice.amount) - parseInt(updated.amount);

    const res = await fetch(`/clients/${currentInvoice.clientDetails.ID}`);
    const clientToUpdate = await res.json();
    console.log(clientToUpdate);

    const newAllamounts = clientToUpdate.invDetails.allAmounts - razlika;

    const dateArr = clientToUpdate.invDetails.allDates;

    const indexToDelete = dateArr.indexOf(currentInvoice.dueToPayBy);

    let newDateArray = [];
    dateArr.forEach((date, index) => {
      if (index !== indexToDelete) {
        newDateArray.push(date);
      }
    });
    newDateArray.push(updated.dueToPayBy);

    clientToUpdate.invDetails.allAmounts = newAllamounts;
    clientToUpdate.invDetails.allDates = newDateArray;

    const res2 = await fetch(`/clients/${clientToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify(clientToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data2 = await res2.json();
    console.log(data2);
  };

export const updateInvoice = (currentInvoice, updated) => async (dispatch) => {
  currentInvoice.dueToPayBy = updated.dueToPayBy;
  currentInvoice.amount = updated.amount;
  currentInvoice.currency = updated.currency;
  currentInvoice.paid = updated.paid;

  const res = await fetch(`/invoices/${currentInvoice.id}`, {
    method: "PUT",
    body: JSON.stringify(currentInvoice),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  if (data) {
    dispatch(getInvoices());
  }
};
