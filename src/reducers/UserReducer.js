import { actions } from "../actions/Types";

export default (state = [], { type, payload }) => {
  switch (type) {
    case actions.GET_USERS:
      return payload;
    case actions.USER_INFO:
      return payload;
    case actions.USERS_ERROR:
      return payload;
    default:
      return state;
  }
};
