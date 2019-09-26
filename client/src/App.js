import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PasswordReset from "./pages/PasswordReset";
import Navbar from "./layout/Navbar";
import PrivateRoute from "./common/PrivateRoute";
import ForgetPasswordEmail from "./pages/ForgetPasswordEmail";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route
            path="/passwordresetemail"
            exact
            component={ForgetPasswordEmail}
          />
          <Route
            path="/passwordreset/:random"
            exact
            component={PasswordReset}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
