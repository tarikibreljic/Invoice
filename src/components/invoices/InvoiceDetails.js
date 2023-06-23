import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  updateClientDueToUpdateInvoice,
  updateInvoice,
} from "../../actions/InvoiceActions";
import { message } from "antd";

const InvoiceDetails = ({ currentInvoice, setEditState, editState }) => {
  const { clientDetails, amount, currency, dueToPayBy, paid, id } =
    currentInvoice;
  // console.log(currentInvoice);

  const dispatch = useDispatch();

  const [newAmount, setNewAmount] = useState(amount);
  const [newCurrency, setNewCurrency] = useState(currency);
  const [newDate, setNewDate] = useState(dueToPayBy);
  const [newStatus, setNewStatus] = useState(paid);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setNewAmount(amount);
    setNewCurrency(currency);
    setNewDate(dueToPayBy);
    setNewStatus(paid);
  }, [currentInvoice]);

  const alertMsg = () => {
    messageApi.open({
      type: "success",
      content: "Invoice updated",
      className: "alert",
      style: {
        marginTop: "85vh",
        marginLeft: "1080px",
      },
    });
  };

  const confirm = () => {
    const updated = {
      id,
      dueToPayBy: newDate,
      amount: newAmount,
      currency: newCurrency,
      paid: newStatus,
    };
    dispatch(updateClientDueToUpdateInvoice(currentInvoice, updated));
    setTimeout(() => {
      dispatch(updateInvoice(currentInvoice, updated));
    }, 300);
    setEditState(false);
    alertMsg();
  };

  // if (clientDetails == undefined) {
  //   return;
  // }

  return (
    <div
      style={
        editState
          ? { boxShadow: "0 5px 12px 6px rgba(0, 50, 0, 0.32)" }
          : { boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.14)" }
      }
      className="clientDetailsCard"
    >
      {contextHolder}
      <h3>{!editState ? "Invoice Details" : "Change Invoice Details"}</h3>
      <h5 className="lead">Client details</h5>
      <h5>{clientDetails.clientName}</h5>
      <h5>{clientDetails.companyName}</h5>
      <h5>{clientDetails.companyID}</h5>
      <span></span>
      <h5 className="lead">Paiment details</h5>

      <div className="paimentDetails">
        <div>
          <h5>Amount</h5>
          <h5>Due date</h5>
          <h5>Status</h5>
        </div>
        <div className="flexEnd">
          {!editState ? (
            <h5>
              {amount} {currency}
            </h5>
          ) : (
            <>
              <select
                style={{
                  width: "55px",
                  height: "21px",
                  borderRadius: "4px",
                  outline: "none",
                }}
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value)}
              >
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="KM">KM</option>
              </select>
              <input
                type="number"
                className="amountInput"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </>
          )}

          {!editState ? (
            <h5>{dueToPayBy}</h5>
          ) : (
            <input
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              style={{ width: "125px", height: "14px" }}
              type="date"
            />
          )}

          <div style={{ display: "flex" }}>
            {editState && !paid ? (
              <>
                {!newStatus && (
                  <button
                    onClick={() => setNewStatus(true)}
                    className="paimentDetailsButton"
                  >
                    Mark as paid
                  </button>
                )}

                <h5 style={{ color: newStatus ? "green" : "red", flex: "1" }}>
                  {!newStatus ? "Unpaid" : "Paid"}
                </h5>
              </>
            ) : (
              <h5 style={{ color: paid ? "green" : "red", flex: "1" }}>
                {paid ? "Paid" : "Unpaid"}
              </h5>
            )}
          </div>
        </div>
      </div>
      {!editState ? (
        <button
          type="button"
          onClick={() => setEditState(true)}
          className="editInvoice"
        >
          EDIT
        </button>
      ) : (
        <button type="button" onClick={confirm} className="editInvoice">
          CONFIRM
        </button>
      )}
    </div>
  );
};

InvoiceDetails.propTypes = {
  currentInvoice: PropTypes.object.isRequired,
  setEditState: PropTypes.func.isRequired,
  editState: PropTypes.bool.isRequired,
};

export default InvoiceDetails;
