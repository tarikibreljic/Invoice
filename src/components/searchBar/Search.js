import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { searchClients } from "../../actions/ClientActions";
import { searchInvoices } from "../../actions/InvoiceActions";
import { searchClientDetails } from "../../actions/ClientActions";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteUserInfo, setUserInfo } from "../../actions/UserActions";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curr = useSelector((state) => state.currentClient);
  // console.log(curr);
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    dispatch(deleteUserInfo());
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line
  }, []);

  const handleEdit = () => {
    dispatch(setUserInfo());
    setTimeout(() => {
      navigate("/profile");
    }, 150);
  };

  let userEmail;
  let userAvatar;
  if (sessionStorage.getItem("user") === null) {
    userEmail = "";
    userAvatar = "";
  } else {
    let user = JSON.parse(sessionStorage.getItem("user"));

    userEmail = user.email;
    userAvatar = userEmail[0].concat(userEmail[1]);
  }

  const onChange = (e) => {
    const location = window.location.pathname;
    setText(e.target.value);
    switch (location) {
      case "/":
        return dispatch(searchInvoices(e.target.value));
      case "/clients":
        return dispatch(searchClients(e.target.value));
      default:
        return dispatch(searchClientDetails(e.target.value, curr.id));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={onChange}
        className="search-input"
      />
      <span className="search-icon">
        <FiSearch />
      </span>
      <h6 className="admin-mail">{userEmail}</h6>
      <h6 className="admin">User</h6>
      <div ref={menuRef} onClick={() => setIsOpen(!isOpen)} className="oval">
        {userAvatar.toUpperCase()}
      </div>
      <div className={`hamb ${isOpen ? "activeHamb" : "inactiveHamb"}`}>
        <div onClick={handleEdit} className="editProfile">
          <AiOutlineEdit fontSize={17} />
          <span>Profile</span>
        </div>
        <Link to="/login">
          <div className="logout">
            <HiOutlineLogout fontSize={17} />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Search;
