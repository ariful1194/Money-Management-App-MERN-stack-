import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import * as Types from "./store/actions/types";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

let token = localStorage.getItem("auth_token");
if (token) {
  let user = jwt_decode(token);
  setAuthToken(token);
  store.dispatch({
    type: Types.SET_CURRENT_USER,
    payload: {
      user
    }
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
