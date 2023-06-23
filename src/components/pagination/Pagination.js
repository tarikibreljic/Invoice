import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
  const [active, setActive] = useState(currentPage);
  // console.log(currentPage);
  // console.log("aktivni pag", active);

  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginationContainer">
      {pageNumbers.length > 1 &&
        pageNumbers.map((number) => (
          <div
            onClick={() => paginate(number)}
            key={number}
            className={`paginationItem ${active === number && "green"} `}
          >
            {number}
          </div>
        ))}
    </div>
  );
};

Pagination.propTypes = {
  dataPerPage: PropTypes.number.isRequired,
  totalData: PropTypes.number.isRequired,
  paginate: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
