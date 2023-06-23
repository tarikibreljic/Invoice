import { actions } from "../actions/Types";

export default (state = [], { type, payload }) => {
  switch (type) {
    case actions.ADD_TODO:
      return [...state, payload];
    case actions.GET_TODOS:
      return payload;
    default:
      return state;
  }
};
