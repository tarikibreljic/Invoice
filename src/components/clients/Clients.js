import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Search from "../searchBar/Search";
import { BiUserPin } from "react-icons/bi";
import { GrNext } from "react-icons/gr";
import ClientsFilter from "./ClientsFilter";
import ClientsTable from "./ClientsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../actions/ClientActions";
import Pagination from "../pagination/Pagination";

const Clients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      navigate("/login");
    }
    dispatch(getClients());
    sessionStorage.setItem("currPageClients", JSON.stringify(1));
    // eslint-disable-next-line
  }, []);

  const clients = useSelector((state) => state.client);

  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(7);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;

  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const paginate = (pageNum) => {
    sessionStorage.setItem("currPageClients", JSON.stringify(pageNum));
    setCurrentPage(pageNum);
  };

  return (
    <div className="container-main">
      <Search />
      <Header
        title1={"Clients"}
        icon1={<BiUserPin />}
        icon2={<GrNext fontSize={14} />}
        title2={"Clients"}
      />
      <ClientsFilter
        active={active}
        setActive={setActive}
        paginate={paginate}
      />
      <ClientsTable
        active={active}
        clients={currentClients}
        firstIdx={indexOfFirstClient}
      />
      <Pagination
        currentPage={currentPage}
        dataPerPage={clientsPerPage}
        totalData={clients.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Clients;
