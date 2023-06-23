import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InvoiceDetails from "./InvoiceDetails";

const InvoicesTable = ({ invoices, firstIdx, active }) => {
  useEffect(() => {
    setCurrentInvoice({});
    setInvoiceDetails(false);
  }, [active]);

  const [invoiceDetails, setInvoiceDetails] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState({});
  const [editState, setEditState] = useState(false);

  if (invoices.length === 0) {
    return <h2>No Invoices to show</h2>;
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div className="table">
        <h3>All Invoices</h3>
        <div className="tableHeading">
          <div className="rowElement">#</div>
          <div className="rowElement">Client Name</div>
          <div className="rowElement">Company Name</div>
          <div className="rowElement">Company ID</div>
          <div className="rowElement">Due by</div>
          <div className="rowElement">Amount to pay</div>
        </div>
        {invoices.map((inv) => (
          <div
            key={inv.id}
            onClick={() => (
              setCurrentInvoice(inv),
              setInvoiceDetails(true),
              setEditState(false)
            )}
            className={`${
              inv.id === currentInvoice.id ? "tableRow-active" : "tableRow"
            }`}
          >
            <div className="rowElement">{++firstIdx}</div>
            <div className="rowElement">{inv.clientDetails.clientName}</div>
            <div className="rowElement">{inv.clientDetails.companyName}</div>
            <div className="rowElement">{inv.clientDetails.companyID}</div>
            <div className="rowElement">{inv.dueToPayBy}</div>
            <div className="rowElement">
              {inv.amount} {inv.currency}
            </div>
          </div>
        ))}
      </div>
      {invoiceDetails && (
        <InvoiceDetails
          currentInvoice={currentInvoice}
          setEditState={setEditState}
          editState={editState}
        />
      )}
    </div>
  );
};

InvoicesTable.propTypes = {
  invoices: PropTypes.array.isRequired,
  firstIdx: PropTypes.number.isRequired,
  active: PropTypes.string.isRequired,
};

export default InvoicesTable;
