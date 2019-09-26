import * as Types from "../actions/types";

const init = {
  transactions: [],
  errors: []
};

const transactionReducer = (state = init, action) => {
  switch (action.type) {
    case Types.LOAD_TRANSACTION: {
      return {
        ...state,
        transactions: action.payload.transactions
      };
    }
    case Types.CREATE_TRANSACTION: {
      return {
        transactions: [action.payload.transaction, ...state.transactions]
      };
    }
    case Types.REMOVE_TRANSACTION: {
      let tr = [...state.transactions];
      return {
        transactions: tr.filter(t => {
          return t._id !== action.payload.id;
        })
      };
    }
    case Types.UPDATE_TRANSACTION: {
      let tr = [...state.transactions];
      return {
        transactions: tr.map(t => {
          if (t._id === action.payload.transaction._id) {
            return action.payload.transaction;
          }
          return t;
        })
      };
    }
    case Types.TRANS_ERROR: {
      return {
        ...state,
        errors: action.payload.errors
      };
    }
    default:
      return state;
  }
};
export default transactionReducer;
