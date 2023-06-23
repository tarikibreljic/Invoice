import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ClientDetails from "./clientDetails/ClientDetails";

const ClientsTable = ({ clients, firstIdx, active }) => {
  //
  useEffect(() => {
    setCurrentClient({});
    setClientDetails(false);
  }, [active]);

  const [clientDetails, setClientDetails] = useState(false);
  const [currentClient, setCurrentClient] = useState({});

  // console.log(clients);
  // console.log(currentClient);

  const handleDetails = (client, e) => {
    setClientDetails(true);
    setCurrentClient(client);
  };

  if (clients.length === 0) {
    return <h2>No Clients to show</h2>;
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div className="table">
        <h3>All Clients</h3>
        <div className="tableHeading">
          <div className="rowElement">#</div>
          <div className="rowElement">Client Name</div>
          <div className="rowElement">Company Name</div>
          <div className="rowElement">Company ID</div>
          <div className="rowElement">Due by</div>
          <div className="rowElement">Amount to pay</div>
        </div>
        {clients.map((client) => (
          <div
            key={client.id}
            onClick={(e) => handleDetails(client, e)}
            className={`${
              client.id === currentClient.id ? "tableRow-active" : "tableRow"
            }`}
          >
            <div className="rowElement">{++firstIdx}</div>
            <div className="rowElement">{client.clientName}</div>
            <div className="rowElement">{client.companyName}</div>
            <div className="rowElement">{client.companyID}</div>
            <div className="rowElement">
              {client.invDetails.allDates.length !== 0 ? (
                client.invDetails.allDates[0]
              ) : (
                <hr className="hr"></hr>
              )}
            </div>
            <div className="rowElement">{client.invDetails.allAmounts}</div>
          </div>
        ))}
      </div>
      {clientDetails && <ClientDetails currentClient={currentClient} />}
    </div>
  );
};

ClientDetails.propTypes = {
  clients: PropTypes.array,
  firstIdx: PropTypes.number,
  active: PropTypes.string,
};

export default ClientsTable;
