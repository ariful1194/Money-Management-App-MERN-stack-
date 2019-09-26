import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../store/actions/authActions";
import classnames from "classnames";

class Register extends Component {
  //name , email , password , password2 ;

  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errors) {
      this.setState({ ...this.state, errors: nextProps.auth.errors });
    }
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHnadler = event => {
    event.preventDefault();
    let { name, email, password, password2 } = this.state;

    this.props.registerUser(
      { name, email, password, password2 },
      this.props.history
    );
  };
  render() {
    let { errors } = this.state;
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <h1 className="text-center display-4">Register Here!</h1>
          <form onSubmit={this.submitHnadler}>
            <div className="form-group">
              <label htmlFor="name">Name: </label>
              <input
                className={classnames("form-control", {
                  "is-invalid": errors.name
                })}
                type="text"
                placeholder="Enter Your Name"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.changeHandler}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="emial">Email: </label>
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
                type="passowrd"
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
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm Passowrd"
                value={this.state.password2}
                onChange={this.changeHandler}
                className={classnames("form-control", {
                  "is-invalid": errors.password2
                })}
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>
            <Link to="/login">Already have an account? Login Here!</Link>
            <button className=" my-3 btn btn-primary btn-block">
              Register
            </button>
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
  { registerUser }
)(Register);
