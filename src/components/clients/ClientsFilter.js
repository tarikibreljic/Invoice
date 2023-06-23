import React from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { getDomesticClients } from "../../actions/ClientActions";
import { getClients } from "../../actions/ClientActions";
import { getForeignClients } from "../../actions/ClientActions";
import { getClientsByDate } from "../../actions/ClientActions";

const ClientsFilter = ({ active, setActive, paginate }) => {
  const dispatch = useDispatch();

  const filterAll = () => {
    paginate(1);
    dispatch(getClients());
    setActive("All");
  };
  const filterDomestic = () => {
    paginate(1);
    dispatch(getDomesticClients());
    setActive("Domestic");
  };
  const filterForeign = () => {
    paginate(1);
    dispatch(getForeignClients());
    setActive("Foreign");
  };
  const filterDate = () => {
    paginate(1);
    dispatch(getClientsByDate());
    setActive("Date");
  };

  return (
    <div className="invoices-filter">
      <button
        onClick={filterAll}
        className={active === "All" ? "active-btn" : "inactive-btn"}
      >
        ALL
      </button>
      <button
        onClick={filterDomestic}
        className={active === "Domestic" ? "active-btn" : "inactive-btn"}
      >
        DOMESTIC
      </button>
      <button
        onClick={filterForeign}
        className={active === "Foreign" ? "active-btn" : "inactive-btn"}
      >
        FOREIGN
      </button>
      <button
        onClick={filterDate}
        className={active === "Date" ? "active-btn-duzi" : "inactive-btn-duzi"}
      >
        SORT BY DUE DATE
      </button>
    </div>
  );
};

ClientsFilter.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func,
  paginate: PropTypes.func,
};

export default ClientsFilter;
