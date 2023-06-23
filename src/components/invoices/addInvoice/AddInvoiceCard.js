import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice } from "../../../actions/InvoiceActions";
import { message } from "antd";
import { getLastClientId, getClients } from "../../../actions/ClientActions";
import { updateClient } from "../../../actions/ClientActions";
import { addClient } from "../../../actions/ClientActions";

const AddInvoiceCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
    dispatch(getLastClientId());
    // eslint-disable-next-line
  }, []);

  const currUser = JSON.parse(sessionStorage.getItem("user"));
  const clients = useSelector((state) => state.client);
  const lastId = useSelector((state) => state.lastId);
  console.log(clients);

  const [clientDetails, setClientDetails] = useState({
    userEmail: "",
    clientName: "",
    companyName: "",
    companyID: "",
    ID: "",
  });
  const [dueToPayBy, setDueToPayBy] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [paid, setPaid] = useState(false);

  let id1 = Math.floor(Math.random() * (6798674 - 6539368)) + 6539368;
  let id2 = Math.floor(Math.random() * (489 - 479)) + 479;
  let ID = `${id1} /${id2}`;

  const [clientDetails2, setClientDetails2] = useState({
    userEmail2: currUser && currUser.email,
    clientName2: "",
    companyName2: "",
    companyID2: ID,
    ID2: "",
  });
  const [dueToPayBy2, setDueToPayBy2] = useState("");
  const [amount2, setAmount2] = useState("");
  const [currency2, setCurrency2] = useState("");

  function alertMessage(type, msg) {
    messageApi.open({
      type: type,
      content: msg,
      style: {
        marginTop: "570px",
      },
    });
  }

  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = () => {
    if (clientDetails.companyName === "" && clientDetails2.clientName2 === "") {
      alertMessage(
        "warning",
        "Please fill in all the fields in existing client form OR new client form "
      );
    } else if (clientDetails.companyName) {
      if (dueToPayBy === "" || amount === "" || currency === "") {
        alertMessage(
          "warning",
          "Please fill in fields in form for existing client"
        );
      } else {
        const newInvoice = {
          clientDetails,
          dueToPayBy,
          amount,
          currency,
          paid,
        };

        const clientToUpdate = clients.find(
          (client) => client.id === newInvoice.clientDetails.ID && client
        );

        clientToUpdate.invDetails.allAmounts += parseInt(newInvoice.amount);
        clientToUpdate.invDetails.allDates.push(newInvoice.dueToPayBy);

        dispatch(updateClient(clientToUpdate));

        dispatch(addInvoice(newInvoice));

        alertMessage("success", "New invoice added");

        setClientDetails({
          userEmail: "",
          clientName: "",
          companyName: "",
          companyID: "",
          ID: "",
        });
        setDueToPayBy("");
        setAmount("");
        setCurrency("");
        setPaid(false);
      }

      //
    } else if (clientDetails2.clientName2) {
      const companyExist = clients.some(
        (cl) => cl.companyName === clientDetails2.companyName2
      );

      if (
        clientDetails2.companyName2 === "" ||
        dueToPayBy2 === "" ||
        amount2 === "" ||
        currency2 === ""
      ) {
        alertMessage("warning", "Please fill in fields in form for new client");
      } else if (companyExist) {
        alertMessage("error", "That company already exist");
      } else {
        const newClient = {
          userEmail: clientDetails2.userEmail2,
          companyID: clientDetails2.companyID2,
          clientName: clientDetails2.clientName2,
          companyName: clientDetails2.companyName2,
          country: "",
          notes: "",
          invDetails: {
            allDates: [dueToPayBy2],
            allAmounts: parseInt(amount2),
          },
        };

        const newInvoice = {
          clientDetails: {
            userEmail: clientDetails2.userEmail2,
            clientName: clientDetails2.clientName2,
            companyName: clientDetails2.companyName2,
            companyID: clientDetails2.companyID2,
            ID: clientDetails2.ID2,
          },
          dueToPayBy: dueToPayBy2,
          amount: amount2,
          currency: currency2,
          paid: paid,
        };

        dispatch(addInvoice(newInvoice));
        dispatch(addClient(newClient));

        alertMessage("success", "New client and invoice added");

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        // setClientDetails2({
        //   userEmail2: currUser.email,
        //   clientName2: "",
        //   companyName2: "",
        //   companyID2: ID,
        //   ID2: "",
        // });

        // setDueToPayBy2("");
        // setAmount2("");
        // setCurrency2("");
      }
    }
  };

  const changeCurrentClient = (companyId) => {
    console.log(companyId);
    const details = clients.find((cl) => cl.id == companyId);
    console.log(details);

    setClientDetails({
      userEmail: currUser.email,
      clientName: details.clientName,
      companyName: details.companyName,
      companyID: details.companyID,
      ID: details.id,
    });
  };

  return (
    <div className="invoiceCard">
      <h3>Add a new INVOICE</h3>
      <div className="row">
        <h6 className="lead">
          Add invoice to <span>existing</span> client
        </h6>
        <h6 className="lead">
          Add invoice for a <span>NEW</span> client
        </h6>
      </div>
      <div className="col6">
        {clients.length === 0 ? (
          <div style={{ margin: " auto 0" }}>
            <h4 className="lead">There is no clients yet</h4>
            <h4>Please assign to new client</h4>
          </div>
        ) : (
          <form>
            <div className="input-group">
              <label>Assigned to existing client</label>

              <select
                value={!clientDetails.companyName ? "" : clientDetails[1]}
                onChange={(e) => changeCurrentClient(e.target.value)}
                disabled={
                  clientDetails2.clientName2 ||
                  clientDetails2.companyName2 ||
                  dueToPayBy2 ||
                  amount2 ||
                  currency2
                }
                className="companySelect"
              >
                <option value="" disabled>
                  Select company
                </option>

                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Due to pay by</label>
              <input
                value={dueToPayBy}
                onChange={(e) => setDueToPayBy(e.target.value)}
                placeholder="Choose due date"
                type="date"
                className="dateInput"
                disabled={
                  clientDetails2.clientName2 ||
                  clientDetails2.companyName2 ||
                  dueToPayBy2 ||
                  amount2 ||
                  currency2
                }
              />
            </div>

            <div className="payment">
              <div className="amount">
                <label>Amount to pay</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder="Enter amount"
                  disabled={
                    clientDetails2.clientName2 ||
                    clientDetails2.companyName2 ||
                    dueToPayBy2 ||
                    amount2 ||
                    currency2
                  }
                />
              </div>

              <div className="currency">
                <label>Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled={
                    clientDetails2.clientName2 ||
                    clientDetails2.companyName2 ||
                    dueToPayBy2 ||
                    amount2 ||
                    currency2
                  }
                >
                  <option value="" disabled>
                    Select currency
                  </option>
                  <option value="$">$</option>
                  <option value="€">€</option>
                  <option value="KM">KM</option>
                </select>
              </div>
            </div>
          </form>
        )}

        <form>
          <div className="input-group">
            <label>Assign to new client</label>
            <input
              value={clientDetails2.clientName2}
              onChange={(e) =>
                setClientDetails2({
                  ...clientDetails2,
                  clientName2: e.target.value,
                  ID2: lastId + 1,
                })
              }
              disabled={
                clientDetails.companyName || dueToPayBy || amount || currency
              }
              className="dateInput"
              placeholder="Enter new client"
            />
          </div>
          <div className="input-group">
            <label>Company name</label>
            <input
              value={clientDetails2.companyName2}
              onChange={(e) =>
                setClientDetails2({
                  ...clientDetails2,
                  companyName2: e.target.value,
                })
              }
              disabled={
                clientDetails.companyName || dueToPayBy || amount || currency
              }
              className="dateInput"
              placeholder="Enter company name"
            />
          </div>
          <div className="input-group">
            <label>Due to pay by</label>
            <input
              value={dueToPayBy2}
              onChange={(e) => setDueToPayBy2(e.target.value)}
              disabled={
                clientDetails.companyName || dueToPayBy || amount || currency
              }
              placeholder="Choose due date"
              type="date"
              className="dateInput"
            />
          </div>
          <div className="payment">
            <div className="amount">
              <label>Amount to pay</label>
              <input
                value={amount2}
                onChange={(e) => setAmount2(e.target.value)}
                disabled={
                  clientDetails.companyName || dueToPayBy || amount || currency
                }
                type="number"
                placeholder="Enter amount"
              />
            </div>
            <div className="currency">
              <label>Currency</label>
              <select
                value={currency2}
                onChange={(e) => setCurrency2(e.target.value)}
                disabled={
                  clientDetails.companyName || dueToPayBy || amount || currency
                }
              >
                <option value="" disabled>
                  Select currency
                </option>
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="KM">KM</option>
              </select>
            </div>
          </div>
          <div className="invoiceFooter">
            <div className="paid">
              <input
                type="checkbox"
                checked={paid}
                value={paid}
                onChange={() => setPaid(!paid)}
              />
              <span>Mark invoice as paid</span>
            </div>
            <button
              type="button"
              onClick={handleClick}
              className="saveInvoiceBtn"
            >
              Save inovice
            </button>
          </div>
        </form>
      </div>
      {contextHolder}
    </div>
  );
};

export default AddInvoiceCard;
