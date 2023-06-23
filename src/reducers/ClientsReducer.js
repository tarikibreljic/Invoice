import { actions } from "../actions/Types";

const initialState = [];

export const ClientsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_CLIENTS:
      return payload;
    case actions.ADD_CLIENT:
      return [...state, payload];
    case actions.SEARCH_CLIENTS:
      return payload;
    case actions.GET_DOMESTIC_CLIENTS:
      return payload;
    case actions.UPDATED_CLIENTS:
      return state;

    case actions.CLIENTS_ERROR:
      return state;
    default:
      return state;
  }
};

export const SingleClient = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.SET_CLIENT:
      return payload;
    case actions.GET_CURR_CLIENT:
      return payload;
    default:
      return state;
  }
};
