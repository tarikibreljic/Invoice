import React, { useEffect } from "react";
import Header from "../../header/Header";
import { FiHome } from "react-icons/fi";
import { GrNext } from "react-icons/gr";
import AddClientCard from "./AddClientCard";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-main">
      {/* <Search /> */}
      <Header
        title1="ADD client"
        icon1={<FiHome />}
        icon2={<GrNext />}
        title2="Add client"
      />
      <AddClientCard />
    </div>
  );
};

export default AddClient;
