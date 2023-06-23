import "./App.css";
import Login from "./authentication/login";
import { Routes, Route } from "react-router-dom";
import Register from "./authentication/register";
import Invoices from "./components/invoices/Invoices";
import SideBar from "./components/sidebar/SideBar";
import Clients from "./components/clients/Clients";
import AddClient from "./components/clients/addClient/AddClient";
import { Provider } from "react-redux";
import store from "./reducers/rootReducer";
import AddInvoice from "./components/invoices/addInvoice/AddInvoice";
import ClientDetailsPage from "./components/clients/clientDetails/ClientDetailsPage";
import EditClient from "./components/clients/editClient/EditClient";
import Profile from "./components/profile/Profile";
import Todo from "./components/todos/Todo";
import Calendar from "./components/calendar/Calendar";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <div className="content">
                <SideBar />
                <Invoices />
              </div>
            }
          />
          <Route
            path="/clients"
            element={
              <div className="content">
                <SideBar />
                <Clients />
              </div>
            }
          />
          <Route
            path="/clients/:companyName"
            element={
              <div className="content">
                <SideBar />
                <ClientDetailsPage />
              </div>
            }
          />
          <Route
            path="/editClient/:companyName"
            element={
              <div className="content">
                <SideBar />
                <EditClient />
              </div>
            }
          />
          <Route
            path="/addClient"
            element={
              <div className="content">
                <SideBar />
                <AddClient />
              </div>
            }
          />
          <Route
            path="/addInvoice"
            element={
              <div className="content">
                <SideBar />
                <AddInvoice />
              </div>
            }
          />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/todo"
            element={
              <div className="content">
                <SideBar />
                <Todo />
              </div>
            }
          />

          <Route
            path="/calendar"
            element={
              <div className="content">
                <SideBar />
                <Calendar />
              </div>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
