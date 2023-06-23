import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../../../actions/ClientActions";
import { getClients } from "../../../actions/ClientActions";
import { message } from "antd";

const AddClientCard = () => {
  useEffect(() => {
    dispatch(getClients());
    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  function alert(type, msg) {
    messageApi.open({
      type: type,
      content: msg,
      style: {
        marginTop: "450px",
        fontSize: "17px",
      },
    });
  }

  const clients = useSelector((state) => state.client);
  const currUser = JSON.parse(sessionStorage.getItem("user"));

  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");

  const companyNames = clients.map((client) => client.companyName);

  const handleClick = () => {
    let id1 = Math.floor(Math.random() * (6798674 - 6539368)) + 6539368;
    let id2 = Math.floor(Math.random() * (489 - 479)) + 479;
    let ID = `${id1} /${id2}`;

    if (clientName === "" || companyName === "" || country === "") {
      alert("warning", "Please fill in all the fields");
    } else if (companyNames.includes(companyName)) {
      alert("error", `${companyName} already exist in the list`);

      setClientName("");
      setCompanyName("");
      setCountry("");
      setNotes("");
    } else {
      const newClient = {
        userEmail: currUser.email,
        companyID: ID,
        clientName,
        companyName,
        country,
        notes,
        invDetails: {
          allDates: [],
          allAmounts: 0,
        },
      };
      dispatch(addClient(newClient));

      alert("success", `${newClient.clientName} has been added`);
      setClientName("");
      setCompanyName("");
      setCountry("");
      setNotes("");
    }
  };

  return (
    <div className="clientCard">
      <h3>Add a new CLIENT</h3>
      <h6 className="lead">
        Add new client to <span>existing</span> list
      </h6>
      <div className="col6">
        <form>
          <div className="input-group">
            <label htmlFor="clientName">Assign to new client</label>
            <input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="companyName">Company name</label>
            <input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
            />
          </div>
        </form>
        <div className="notes">
          <label htmlFor="notes">Add notes and remarks</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="notesField"
          />
        </div>
      </div>
      <button onClick={handleClick} className="saveClientBtn">
        SAVE client
      </button>
      {contextHolder}
    </div>
  );
};

export default AddClientCard;
