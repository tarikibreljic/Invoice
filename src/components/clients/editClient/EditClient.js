import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import { AiOutlineEdit } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getClients, getCurrClient } from "../../../actions/ClientActions";
import { updateClient } from "../../../actions/ClientActions";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const EditClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      navigate("/login");
    }
    dispatch(getClients());
    dispatch(getCurrClient());
    // eslint-disable-next-line
  }, []);

  let currClient;
  currClient = useSelector((state) => state.currentClient);
  const clients = useSelector((state) => state.client);

  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setClientName(currClient.clientName);
    setCompanyName(currClient.companyName);
    setCountry(currClient.country);
    setNotes(currClient.notes);
  }, [currClient]);

  const otherCompanies = clients.filter(
    (client) => client.companyName !== currClient.companyName
  );

  // console.log(clients);
  // console.log(currClient);

  function alertWarning(type, msg) {
    messageApi.open({
      type: type,
      content: msg,
      style: {
        marginTop: "450px",
        fontSize: "17px",
      },
    });
  }

  const handleClick = () => {
    console.log(clientName, companyName, country, notes);

    if (clientName === "" || companyName === "" || country === "") {
      alertWarning("warning", "Please fill in all the fields");
    } else {
      currClient.clientName = clientName;
      currClient.companyName = companyName;
      currClient.country = country;
      currClient.notes = notes;

      const matchCompany = otherCompanies.some(
        (cl) => cl.companyName === companyName
      );
      if (matchCompany) {
        alertWarning("warning", "That company already exist");
      } else {
        dispatch(updateClient(currClient));

        alertWarning("success", "Client has been updated");

        setTimeout(() => {
          navigate("/clients");
        }, 700);
      }
    }
  };

  return (
    <div className="container-main">
      <Header
        title1="EDIT client"
        icon1={<AiOutlineEdit />}
        icon2={<GrNext />}
        title2="EDIT client"
      />
      <div className="clientCard">
        <h3>Edit CLIENT</h3>
        <h6 className="lead">
          Edit <span>existing</span> client on the list
        </h6>
        <div className="col6">
          <form>
            <div className="input-group">
              <label>Client name</label>
              <input
                value={clientName != undefined && clientName}
                onChange={(e) => setClientName(e.target.value)}
                // placeholder={currClient.clientName}
              />
            </div>
            <div className="input-group">
              <label>Company name</label>
              <input
                value={companyName != undefined && companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                // placeholder={currClient.companyName}
              />
            </div>
            <div className="input-group">
              <label>Country</label>
              <input
                value={country != undefined && country}
                onChange={(e) => setCountry(e.target.value)}
                // placeholder={currClient.country}
              />
            </div>
          </form>
          <div className="notes">
            <label>Notes and remarks</label>
            <textarea
              value={notes && notes}
              onChange={(e) => setNotes(e.target.value)}
              // placeholder={currClient.notes}
              className="notesField"
            />
          </div>
        </div>
        <button onClick={handleClick} className="saveClientBtn">
          EDIT client
        </button>
      </div>
      {contextHolder}
    </div>
  );
};

export default EditClient;
