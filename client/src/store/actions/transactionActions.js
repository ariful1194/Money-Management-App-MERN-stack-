import * as Types from "./types";
import axios from "axios";

export const loadTransactions = () => dispatch => {
  axios
    .get("/api/transaction")
    .then(trans => {
      dispatch({
        type: Types.LOAD_TRANSACTION,
        payload: {
          transactions: trans.data
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const addNewTransaction = transsaction => dispatch => {
  axios
    .post("/api/transaction", transsaction)
    .then(response => {
      dispatch({
        type: Types.CREATE_TRANSACTION,
        payload: {
          transaction: response.data
        }
      });
    })
    .catch(err => {
      dispatch({
        type: Types.TRANS_ERROR,
        payload: {
          errors: err.response.data
        }
      });
    });
};
export const removeTransaction = transactionId => dispatch => {
  axios
    .delete(`/api/transaction/${transactionId}`)
    .then(response => {
      dispatch({
        type: Types.REMOVE_TRANSACTION,
        payload: {
          id: response.data._id
        }
      });
    })
    .catch(err => console.log(err));
};
export const updateTransaction = (transactionId, transaction) => dispatch => {
  axios
    .put(`/api/transaction/${transactionId}`, transaction)
    .then(response => {
      dispatch({
        type: Types.UPDATE_TRANSACTION,
        payload: {
          transaction: response.data
        }
      });
    })
    .catch(err => console.log(err));
};
