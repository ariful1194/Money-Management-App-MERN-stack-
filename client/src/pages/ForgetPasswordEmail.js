import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { sentEmail } from "../store/actions/authActions";
import { connect } from "react-redux";
export class ForgetPasswordEmail extends Component {
  // email , password ;

  state = {
    email: "",
    errors: {},
    message: ""
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errors) {
      this.setState({ ...this.state, errors: nextProps.auth.errors });
    }
    if (nextProps.auth.message) {
      this.setState({ ...this.state, message: nextProps.auth.message });
    }
  }
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHnadler = event => {
    event.preventDefault();
    this.props.sentEmail(this.state.email, this.props.history);
    this.setState({
      ...this.state,
      email: ""
    });
    // let { email, password } = this.state;
    // this.props.loginUser({ email, password }, this.props.history);
  };
  render() {
    let { errors } = this.state;
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <h1 className="text-center display-4">Password Reset!</h1>

          {this.state.message ? (
            <div className="alert alert-success" role="alert">
              {this.state.message}
            </div>
          ) : null}
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

            <Link to="/register">Don't Have any account? Create Here!</Link>
            <button className=" my-3 btn btn-primary btn-block">
              Sent Link To Your Email
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
  { sentEmail }
)(ForgetPasswordEmail);
