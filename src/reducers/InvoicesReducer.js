import { actions } from "../actions/Types";

const initialState = [];
// {
//   existingClient: null,
//   dueToPayBy: null,
//   amount: null,
//   currency: null,
//   paid: false,
// };

export const InvoicesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_INVOICES:
      return payload;
    case actions.ADD_INVOICE:
      return [...state, payload];
    case actions.SEARCH_INVOICES:
      return payload;
    case actions.GET_PAID_INVOICES:
      return payload;
    case actions.GET_UNPAID_INVOICES:
      return payload;
    case actions.GET_INVOICES_DUE_THIS_MONTH:
      return payload;

    case actions.SEARCH_CLIENT_DETAILS:
      return payload;
    case actions.GET_ALL_INVOICES:
      return payload;
    case actions.GET_PAID_INV:
      return payload;
    case actions.GET_UNPAID_INV:
      return payload;
    case actions.INVOICES_ERROR:
      return state;
    default:
      return state;
  }
};

export const lastIdReducer = (state = "", { type, payload }) => {
  switch (type) {
    case actions.GET_LAST_ID:
      return payload;
    default:
      return state;
  }
};
