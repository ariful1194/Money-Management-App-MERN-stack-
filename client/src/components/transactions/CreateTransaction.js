import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { addNewTransaction } from "../../store/actions/transactionActions";
import classnames from "classnames";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px"
  }
};
class CreateTransaction extends Component {
  state = {
    amount: 0,
    type: "",
    note: "",
    errors: []
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions.errors) {
      this.setState({ ...this.state, errors: nextProps.transactions.errors });
    } else {
      this.setState({ errors: [] });
    }
  }
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();

    this.props.addNewTransaction({
      amount: this.state.amount,
      type: this.state.type,
      note: this.state.note
    });

    this.setState({
      amount: 0,
      type: "",
      note: ""
    });
    if (this.state.errors.length === 0) {
      this.props.close();
    }
  };
  render() {
    let { amount, note } = this.state;
    let { errors } = this.state;
    return (
      <Modal
        style={customStyles}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        contentLabel="Add A New Transaction"
      >
        <h2 className="text-center text-success">Add A New Transaction</h2>

        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="amount">Amount: </label>
            <input
              className={classnames("form-control", {
                "is-invalid": errors.amount
              })}
              type="number"
              placeholder="Enter Amount"
              name="amount"
              id="amount"
              value={amount}
              onChange={this.changeHandler}
            />
            {errors.amount && (
              <div className="invalid-feedback">{errors.amount}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="type">Type: </label>
            <select
              className={classnames("form-control", {
                "is-invalid": errors.type
              })}
              name="type"
              onChange={this.changeHandler}
            >
              <option value="">Select a Type</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {errors.type && (
              <div className="invalid-feedback">{errors.type}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="note">Note: </label>
            <textarea
              className="form-control"
              placeholder="Enter A Note"
              name="note"
              id="note"
              value={note}
              onChange={this.changeHandler}
            />
          </div>
          <button className=" btn btn-primary float-left">submit</button>
          <button
            className=" btn btn-danger float-right"
            onClick={this.props.close}
          >
            close
          </button>
        </form>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  transactions: state.transactions
});
export default connect(
  mapStateToProps,
  { addNewTransaction }
)(CreateTransaction);
//amount
//type
//note
