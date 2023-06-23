import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "../index.css";
import Search from "../searchBar/Search";
import { FiMail } from "react-icons/fi";
import { GrNext } from "react-icons/gr";
import InvoicesFilter from "./InvoicesFilter";
import InvoicesTable from "./InvoicesTable";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../actions/InvoiceActions";

const Invoices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      navigate("/login");
    }
    dispatch(getInvoices());
    sessionStorage.setItem("currPageInv", JSON.stringify(1));
    // eslint-disable-next-line
  }, []);

  const invoices = useSelector((state) => state.invoice);
  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage, setInvoicesPerPage] = useState(7);

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const paginate = (pageNum) => {
    sessionStorage.setItem("currPageInv", JSON.stringify(pageNum));
    setCurrentPage(pageNum);
  };

  return (
    <div className="container-main">
      <Search />
      <Header
        title1={"Invoices"}
        icon1={<FiMail />}
        icon2={<GrNext fontSize={14} />}
        title2={"Invoices"}
      />
      <InvoicesFilter
        active={active}
        setActive={setActive}
        paginate={paginate}
      />
      <InvoicesTable
        active={active}
        invoices={currentInvoices}
        firstIdx={indexOfFirstInvoice}
      />
      <Pagination
        currentPage={currentPage}
        dataPerPage={invoicesPerPage}
        totalData={invoices.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Invoices;
