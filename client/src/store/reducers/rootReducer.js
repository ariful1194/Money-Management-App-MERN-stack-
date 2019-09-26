import { combineReducers } from "redux";
import authReducers from "./authReducers";
import transactionReducer from "./transactionReducer";
const rootReducer = combineReducers({
  auth: authReducers,
  transactions: transactionReducer
});
export default rootReducer;
