import { combineReducers } from "redux";
import { ClientsReducer } from "./ClientsReducer";
import { InvoicesReducer } from "./InvoicesReducer";
import { lastIdReducer } from "./InvoicesReducer";
import { SingleClient } from "./ClientsReducer";
import UserReducer from "./UserReducer";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import TodoReducer from "./TodoReducer";

const rootReducer = combineReducers({
  client: ClientsReducer,
  invoice: InvoicesReducer,
  currentClient: SingleClient,
  user: UserReducer,
  lastId: lastIdReducer,
  todo: TodoReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
