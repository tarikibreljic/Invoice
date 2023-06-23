import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { markInvoiceAsPaid } from "../../../actions/InvoiceActions";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteInvoice } from "../../../actions/InvoiceActions";
import { updateClientDueToDelete } from "../../../actions/InvoiceActions";
import { Link } from "react-router-dom";
import { message } from "antd";

const ClientDetailsTable = ({ curr, invoices, paginate, firstIdx }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const markAsPaid = (invoice) => {
    dispatch(markInvoiceAsPaid(invoice));
  };
  const deleteInv = (invoice) => {
    dispatch(updateClientDueToDelete(invoice));
    setTimeout(() => {
      dispatch(deleteInvoice(invoice));
    }, 200);
    alertMsg();
  };
  console.log(invoices);

  const alertMsg = () => {
    messageApi.open({
      type: "success",
      content: "Invoice deleted",
      className: "alert",
      style: {
        marginTop: "25vh",
        // marginLeft: "560px",
      },
    });
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div className="tableDetails">
        {contextHolder}
        <h3>Client Invoices</h3>
        {invoices.length > 0 ? (
          <>
            <div className="tableHeading">
              <div className="rowElementDetailsNum">#</div>
              <div className="rowElement">Amount to pay</div>
              <div className="rowElement">Due by</div>
              <div className="rowElement">Status</div>
              <div className="rowElementBtn">Change status</div>
              <div className="rowElementAction">Action</div>
            </div>
            {invoices.map((invoice, index) => (
              <div key={invoice.id} className="tableRow">
                <div className="rowElementDetailsNum">{++firstIdx}</div>
                <div className="rowElement">
                  {invoice.amount} {invoice.currency}
                </div>
                <div className="rowElement">{invoice.dueToPayBy}</div>
                <div
                  className={`rowElement ${
                    invoice.paid ? "green-text" : "red-text"
                  }`}
                >
                  {invoice.paid ? "Paid" : "Unpaid"}
                </div>
                <div className="rowElementBtn">
                  {!invoice.paid && (
                    <button
                      onClick={() => markAsPaid(invoice)}
                      className="markAsPaid"
                    >
                      Mark as paid
                    </button>
                  )}
                </div>
                <div className="rowElementAction">
                  <RiDeleteBinLine
                    onClick={() => deleteInv(invoice)}
                    fontSize={17}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <span className="leadhr"></span>
            <h4>No Invoices to show</h4>
          </>
        )}
      </div>

      <div className="clientDetailsCard">
        <h3>Client Details</h3>
        <h5 className="lead">Client details</h5>
        <h5>{curr.clientName}</h5>
        <h5>{curr.companyName}</h5>
        <h5>{curr.companyID}</h5>
        <span className="leadhr"></span>
        <h5 className="lead">Additional details</h5>

        <div>
          <h5>{curr.country}</h5>
          <h5>{curr.notes}</h5>
        </div>
        <div>
          <Link to={`/editClient/${curr.companyName}`}>
            <button className="editInvoice">EDIT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

ClientDetailsTable.propTypes = {
  curr: PropTypes.object,
  invoices: PropTypes.array,
  paginate: PropTypes.func.isRequired,
  firstIdx: PropTypes.number.isRequired,
};

export default ClientDetailsTable;
