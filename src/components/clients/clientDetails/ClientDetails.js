import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClient } from "../../../actions/ClientActions";

const ClientDetails = ({
  currentClient: { clientName, companyName, companyID, country, notes, id },
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailsClick = () => {
    dispatch(setClient(id));
    setTimeout(() => {
      navigate(`/clients/${companyName}`);
    }, 300);
  };

  const editClick = () => {
    dispatch(setClient(id));

    setTimeout(() => {
      navigate(`/editClient/${companyName}`);
    }, 300);
  };

  return (
    <div className="clientDetailsCard">
      <h3>Client Details</h3>
      <h5 className="lead">Client details</h5>
      <h5>{clientName}</h5>
      <h5>{companyName}</h5>
      <h5>{companyID}</h5>
      <span className="leadhr"></span>
      <h5 className="lead">Additional details</h5>

      <div>
        <h5>{country}</h5>
        <h5>{notes}</h5>
      </div>
      <div className="clDetailsBtns">
        <button onClick={editClick}>EDIT</button>
        <button onClick={detailsClick}>MORE DETAILS</button>
      </div>
    </div>
  );
};

ClientDetails.propTypes = {
  currentClient: PropTypes.object.isRequired,
};

export default ClientDetails;
