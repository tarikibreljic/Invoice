import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getPaidInvoices } from "../../actions/InvoiceActions";
import { getUnpaidInvoices } from "../../actions/InvoiceActions";
import { getInvoicesDueThisMonth } from "../../actions/InvoiceActions";
import { getInvoices } from "../../actions/InvoiceActions";

const InvoicesFilter = ({ active, setActive, paginate }) => {
  const dispatch = useDispatch();

  const allInvoices = () => {
    paginate(1);
    dispatch(getInvoices());
    setActive("All");
  };

  const paidInvoices = () => {
    paginate(1);
    dispatch(getPaidInvoices());
    setActive("Paid");
  };

  const unpaidInvoices = () => {
    paginate(1);
    dispatch(getUnpaidInvoices());
    setActive("Unpaid");
  };

  const dueThisMonth = () => {
    paginate(1);
    dispatch(getInvoicesDueThisMonth());
    setActive("ThisMonth");
  };

  return (
    <div className="invoices-filter">
      <button
        onClick={allInvoices}
        className={active === "All" ? "active-btn" : "inactive-btn"}
      >
        ALL
      </button>
      <button
        onClick={paidInvoices}
        className={active === "Paid" ? "active-btn" : "inactive-btn"}
      >
        PAID
      </button>
      <button
        onClick={unpaidInvoices}
        className={active === "Unpaid" ? "active-btn" : "inactive-btn"}
      >
        UNPAID
      </button>
      <button
        onClick={dueThisMonth}
        className={
          active === "ThisMonth" ? "active-btn-duzi" : "inactive-btn-duzi"
        }
      >
        DUE THIS MONTH
      </button>
    </div>
  );
};

InvoicesFilter.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func,
  paginate: PropTypes.func,
};

export default InvoicesFilter;
