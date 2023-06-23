import React from "react";
import PropTypes from "prop-types";

const Header = ({ title1, icon1, icon2, title2 }) => {
  return (
    <div className="header">
      <h3 className="header-title">{title1}</h3>
      <div className="header-flex">
        <h3 className="granica"></h3>
        <h3 className="header-icon">{icon1}</h3>
        <h3>{icon2}</h3>
        <h5>{title2}</h5>
      </div>
    </div>
  );
};

Header.propTypes = {
  title1: PropTypes.string,
  icon1: PropTypes.node,
  icon2: PropTypes.node,
  title2: PropTypes.string.isRequired,
};

export default Header;
