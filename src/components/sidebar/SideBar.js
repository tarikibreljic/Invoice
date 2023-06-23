import * as React from "react";
import { FiHome } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiUserPin } from "react-icons/bi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const SideBar = () => {
  let location = window.location.pathname;
  const [activeLink, setActiveLink] = React.useState(1);

  React.useEffect(() => {
    switch (location) {
      case "/":
        return setActiveLink(1);
      case "/clients":
        return setActiveLink(2);
      case "/todo":
        return setActiveLink(3);
      case "/calendar":
        return setActiveLink(4);
      default:
        return setActiveLink(0);
    }
  }, [location]);

  return (
    <div className="container-sidebar">
      <h4>Ant Finance App</h4>
      <button className="btn-dashboard">
        <FiHome />
        Dashboard
      </button>
      <Link to="/addInvoice">
        <button className="btn-add">
          <AiOutlinePlusCircle />
          ADD invoice
        </button>
      </Link>

      <Link to="/addClient">
        <button className="btn-add">
          <AiOutlinePlusCircle />
          ADD new client
        </button>
      </Link>
      <div className="sidebar-links">
        <h5>CONTENT</h5>
        <Link to="/">
          <div
            className={`sidebar-single-link ${activeLink === 1 ? "green" : ""}`}
          >
            <FiMail />
            Invoices
          </div>
        </Link>

        <Link to="/clients">
          <div
            className={`sidebar-single-link ${activeLink === 2 ? "green" : ""}`}
          >
            <BiUserPin />
            Clients
          </div>
        </Link>

        <Link to="/todo">
          <div
            className={`sidebar-single-link ${activeLink === 3 ? "green" : ""}`}
          >
            <AiOutlineCheckSquare />
            Todo
          </div>
        </Link>

        <Link to="/calendar">
          <div
            className={`sidebar-single-link ${activeLink === 4 ? "green" : ""}`}
          >
            <AiOutlineCalendar />
            Calendar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
