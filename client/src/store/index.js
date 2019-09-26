import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const middleware = [thunk];
const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default store;

// ,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
