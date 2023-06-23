import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { getPaidInv } from "../../../actions/ClientActions";
import { getUnpaidInv } from "../../../actions/ClientActions";
import { getAllInv } from "../../../actions/ClientActions";

const CLientDetailsFilter = ({ paginate, curr }) => {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  const allInvoices = () => {
    paginate(1);
    dispatch(getAllInv(curr.id));
    setActive("All");
  };
  const paidInvoices = () => {
    paginate(1);
    dispatch(getPaidInv(curr.id));
    setActive("Paid");
  };
  const unpaidInvoices = () => {
    paginate(1);
    dispatch(getUnpaidInv(curr.id));
    setActive("Unpaid");
  };

  return (
    <div>
      <button
        onClick={allInvoices}
        className={active === "All" ? "details-active" : "details-inactive"}
      >
        ALL
      </button>
      <button
        onClick={paidInvoices}
        className={active === "Paid" ? "details-active" : "details-inactive"}
      >
        PAID
      </button>
      <button
        onClick={unpaidInvoices}
        className={active === "Unpaid" ? "details-active" : "details-inactive"}
      >
        UNPAID
      </button>
    </div>
  );
};

CLientDetailsFilter.propTypes = {
  paginate: PropTypes.func,
  curr: PropTypes.object,
};

export default CLientDetailsFilter;
