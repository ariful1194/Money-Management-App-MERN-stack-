import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { loginUser } from "../store/actions/authActions";
import { connect } from "react-redux";
export class Login extends Component {
  // email , password ;

  state = {
    email: "",
    password: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errors) {
      this.setState({ ...this.state, errors: nextProps.auth.errors });
    }
  }
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHnadler = event => {
    event.preventDefault();
    let { email, password } = this.state;
    this.props.loginUser({ email, password }, this.props.history);
  };
  render() {
    let { errors } = this.state;
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <h1 className="text-center display-4">Login Here!</h1>
          <form onSubmit={this.submitHnadler}>
            <div className="form-group">
              <label htmlFor="name">Email: </label>
              <input
                className={classnames("form-control", {
                  "is-invalid": errors.email
                })}
                type="email"
                placeholder="Enter Your Email"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.changeHandler}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                className={classnames("form-control", {
                  "is-invalid": errors.password
                })}
                type="password"
                placeholder="Enter Your Password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.changeHandler}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <Link to="/register">Don't Have any account? Create Here!</Link>
            <button className=" my-3 btn btn-primary btn-block">Login</button>
            <Link to="/passwordresetemail">Forget Password ? Click Here!</Link>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
