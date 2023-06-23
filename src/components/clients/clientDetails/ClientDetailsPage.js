import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../header/Header";
import Search from "../../searchBar/Search";
import { BiUserPin } from "react-icons/bi";
import { GrNext } from "react-icons/gr";
import CLientDetailsFilter from "./CLientDetailsFilter";
import ClientDetailsTable from "./ClientDetailsTable";
import { getInvoices } from "../../../actions/InvoiceActions";
import { getCurrClient } from "../../../actions/ClientActions";
import { useNavigate } from "react-router-dom";
import Pagination from "../../pagination/Pagination";

const ClientDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      navigate("/login");
    }
    dispatch(getInvoices());
    dispatch(getCurrClient());
    sessionStorage.setItem("currPageCD", JSON.stringify(1));
    // eslint-disable-next-line
  }, []);

  const curr = useSelector((state) => state.currentClient);
  const allInvoices = useSelector((state) => state.invoice);

  const invoices = allInvoices.filter(
    (inv) => inv.clientDetails.ID == curr.id && inv
  );

  const [invoicesPerPage, setInvoicesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;

  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const paginate = (pageNum) => {
    sessionStorage.setItem("currPageCD", JSON.stringify(pageNum));
    setCurrentPage(pageNum);
  };

  return (
    <div className="container-main">
      <Search />
      <Header
        title1={curr.companyName}
        icon1={<BiUserPin />}
        icon2={<GrNext fontSize={14} />}
        title2={"Client Details"}
      />
      <CLientDetailsFilter curr={curr} paginate={paginate} />
      <ClientDetailsTable
        curr={curr}
        invoices={currentInvoices}
        firstIdx={indexOfFirstInvoice}
        paginate={paginate}
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

export default ClientDetailsPage;
