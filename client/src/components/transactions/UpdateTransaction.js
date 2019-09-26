import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import {
  addNewTransaction,
  updateTransaction
} from "../../store/actions/transactionActions";

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
class UpdateTransaction extends Component {
  state = {
    amount: 0,
    note: ""
  };
  componentDidMount() {
    this.setState({
      amount: this.props.transaction.amount,
      note: this.props.transaction.note
    });
  }
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();

    this.props.updateTransaction(this.props.transaction._id, this.state);
    this.setState({
      amount: 0,
      note: ""
    });
    this.props.close();
  };
  render() {
    let { amount, note } = this.state;
    return (
      <Modal
        style={customStyles}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        contentLabel="Update  Transaction"
      >
        <h2 className="text-center text-warning">Update Transaction</h2>

        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="amount">Amount: </label>
            <input
              className="form-control"
              type="number"
              placeholder="Enter Amount"
              name="amount"
              id="amount"
              value={amount}
              onChange={this.changeHandler}
            />
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

export default connect(
  null,
  { addNewTransaction, updateTransaction }
)(UpdateTransaction);
//amount
//type
//note
