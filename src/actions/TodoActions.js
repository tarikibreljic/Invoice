import { actions } from "./Types";

export const addTodo = (newTodo) => async (dispatch) => {
  try {
    const res = await fetch("/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: actions.ADD_TODO,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actions.TODO_ERROR,
      payload: err.response.statusText,
    });
  }
};

export const getTodos = () => async (dispatch) => {
  const currUser = JSON.parse(sessionStorage.getItem("user"));
  if (currUser != null) {
    try {
      const res = await fetch(`/todos?userEmail=${currUser.email}`);
      const data = await res.json();

      dispatch({
        type: actions.GET_TODOS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: actions.TODO_ERROR,
        payload: err.response.statusText,
      });
    }
  } else {
    return;
  }
};

export const deleteTodo = (todo) => async (dispatch) => {
  const res = await fetch(`/todos/${todo.id}`, {
    method: "DELETE",
  });
  const data = await res.json();

  dispatch(getTodos());
};

export const setEditMode = (todo) => async (dispatch) => {
  const res = await fetch(`/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data) {
    dispatch(getTodos());
  }
};

export const updateTask = (todo, newTask) => async (dispatch) => {
  todo.task = newTask;
  todo.isEditing = false;

  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();

  const date = `${day}. ${month}. ${year}. ${hours}:${minutes}`;
  todo.updatedAt = date;

  const res = await fetch(`/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data) {
    dispatch(getTodos());
  }
};
