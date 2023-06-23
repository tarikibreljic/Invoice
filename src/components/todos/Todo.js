import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodos } from "../../actions/TodoActions";
import { GrNext } from "react-icons/gr";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { message } from "antd";
import Header from "../header/Header";
import Todos from "./Todos";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  //
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      navigate("/login");
    }
    dispatch(getTodos());
    // eslint-disable-next-line
  }, []);

  function messageAlert(type, msg) {
    messageApi.open({
      type: type,
      content: msg,
      style: {
        marginTop: "150px",
        marginRight: "130px",
      },
    });
  }

  const todos = useSelector((state) => state.todo);
  const currUser = JSON.parse(sessionStorage.getItem("user"));

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchTodo = todos.some((todo) => todo.task === todoValue);

    if (todoValue === "") {
      messageAlert("warning", "Please fill input to add a Task");
    } else if (matchTodo) {
      messageAlert("error", "That Task exist");
    } else {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      const date = `${day}. ${month}. ${year}. ${hours}:${minutes}`;

      const newTask = {
        userEmail: currUser.email,
        task: todoValue,
        createdAt: date,
        updatedAt: "",
        isEditing: false,
      };
      console.log(newTask);
      dispatch(addTodo(newTask));
      messageAlert("success", "Task added");
      setTodoValue("");
    }
  };

  return (
    <div className="container-main">
      <form onSubmit={handleSubmit} className="todoContainer">
        <Header
          title1={"Todos"}
          icon1={<AiOutlineCheckSquare />}
          icon2={<GrNext />}
          title2={"Todos"}
        />
        {/* <h1 className="todoTitle">Todo List</h1> */}
        <div className="todoInputButton">
          <input
            className="addTaskInput"
            value={todoValue}
            type="text"
            onChange={(e) => setTodoValue(e.target.value)}
            placeholder="What is the task today?"
          />
          <button className="submitTask" type="submit">
            ADD TASK
          </button>
        </div>
        <Todos />
      </form>
      {contextHolder}
    </div>
  );
};

export default Todo;
