import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodos,
  setEditMode,
  updateTask,
} from "../../actions/TodoActions";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { message } from "antd";

const Todos = () => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const [currentInfo, setCurrentInfo] = useState("");

  useEffect(() => {
    dispatch(getTodos());
    // eslint-disable-next-line
  }, []);

  const todos = useSelector((state) => state.todo);
  // console.log(todos);

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

  const handleDelete = (todo) => {
    dispatch(deleteTodo(todo));
    messageAlert("success", "Task deleted");
  };

  const handleEdit = (todo) => {
    todo.isEditing = true;
    dispatch(setEditMode(todo));
    setIsEditMode(true);
  };

  const handleUpdate = (todo) => {
    dispatch(updateTask(todo, updateValue));
    setIsEditMode(false);
    setUpdateValue("");
    messageAlert("success", "Task updated");
  };

  const [messageApi, contextHolder] = message.useMessage();

  if (todos.length === 0) {
    return (
      <h2 style={{ textAlign: "center", color: "rgb(41, 206, 227)" }}>
        NO TASKS TO SHOW
      </h2>
    );
  } else {
    return (
      <div>
        <h2 style={{ textAlign: "center", color: "rgb(41, 206, 227)" }}>
          TASKS
        </h2>
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.isEditing ? (
              <div className="updateTodo">
                <input
                  value={updateValue}
                  onChange={(e) => setUpdateValue(e.target.value)}
                  placeholder={todo.task}
                />
                <button onClick={() => handleUpdate(todo)} type="button">
                  UPDATE
                </button>
              </div>
            ) : (
              <div
                onMouseEnter={() => setCurrentInfo(todo)}
                onMouseLeave={() => setCurrentInfo("")}
                className={`singleTodo ${
                  todo.id === currentInfo.id && "singleTodoActive"
                }`}
              >
                <p style={{ cursor: "pointer" }}>{todo.task}</p>
                <div className="focusDiv">
                  <span>
                    {currentInfo.id === todo.id &&
                      `Created: ${currentInfo.createdAt}`}
                  </span>
                  <span>
                    {currentInfo.id === todo.id &&
                      currentInfo.updatedAt &&
                      `Updated: ${currentInfo.updatedAt}`}
                  </span>
                </div>
                <div className="todoIcons">
                  <button
                    disabled={isEditMode}
                    onClick={() => handleEdit(todo)}
                    type="button"
                  >
                    <AiOutlineEdit
                      color="coral"
                      cursor="pointer"
                      fontSize={23}
                    />
                  </button>
                  <button
                    disabled={isEditMode}
                    onClick={() => handleDelete(todo)}
                    type="button"
                  >
                    <RiDeleteBinLine
                      color="red"
                      cursor="pointer"
                      fontSize={23}
                    />
                  </button>
                </div>
                {contextHolder}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default Todos;
