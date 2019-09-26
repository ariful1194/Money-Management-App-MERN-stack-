import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkPassUrl, resetPass } from "../store/actions/authActions";
import { connect } from "react-redux";
export class PasswordReset extends Component {
  // email , password ;

  state = {
    password: "",
    password2: "",
    errors: {},
    notfound: true,
    message: ""
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.notfound) {
      window.location.assign("/login");
    }
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
  componentDidMount() {
    //console.log(this.props.match.params.random);
    const id = this.props.match.params.random;
    this.props.checkPassUrl(id.toString());
  }
  submitHnadler = event => {
    event.preventDefault();
    let { password, password2 } = this.state;
    ///console.log(this.props.match.params.random);
    this.props.resetPass(this.props.match.params.random, password, password2);
  };
  render() {
    let { errors } = this.state;
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <h1 className="text-center display-4">Reset Your Password!</h1>
          {this.state.message ? (
            <div className="alert alert-success" role="alert">
              {this.state.message}
            </div>
          ) : null}
          <form onSubmit={this.submitHnadler}>
            <div className="form-group">
              <label htmlFor="name">New Password: </label>
              <input
                className={classnames("form-control", {
                  "is-invalid": errors.password
                })}
                type="password"
                placeholder="Enter Your Password"
                name="password"
                id="password"
                value={this.state.new_password}
                onChange={this.changeHandler}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password"> Confirm New Password: </label>
              <input
                className={classnames("form-control", {
                  "is-invalid": errors.password2
                })}
                type="password"
                placeholder="Confirm New Password"
                name="password2"
                id="password2"
                value={this.state.password2}
                onChange={this.changeHandler}
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>

            <button className=" my-3 btn btn-primary btn-block">Reset</button>
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
  { checkPassUrl, resetPass }
)(PasswordReset);
