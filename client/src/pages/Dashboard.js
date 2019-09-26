import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadTransactions,
  removeTransaction
} from "../store/actions/transactionActions";
import CreateTransaction from "../components/transactions/CreateTransaction";
import UpdateTransaction from "../components/transactions/UpdateTransaction";
import Pagination from "react-bootstrap/Pagination";

class Dashboard extends Component {
  state = {
    trans: [],
    active: 1,
    createModelOpen: false,
    currentPage: 1,
    updateModalOpen: false,
    id: ""
  };

  openCreateModal = () => {
    this.setState({ createModelOpen: true });
  };
  closeCreateModal = () => {
    this.setState({ createModelOpen: false });
  };
  openUpdateModal = id => {
    this.setState({ updateModalOpen: true, id });
  };
  closeUpdateModal = () => {
    this.setState({ updateModelOpen: false, id: "" });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions.transactions) {
      this.setState({ trans: nextProps.transactions.transactions });
    }
  }

  componentDidMount() {
    this.props.loadTransactions();
  }
  configShowItem = i => {
    this.setState({
      ...this.state,
      currentPage: i,
      active: i
    });
  };

  render() {
    let { auth, transactions } = this.props;
    let currentIndex = this.state.currentPage - 1;

    const page = Math.ceil(this.state.trans.length / 5);
    let items = [];
    for (let number = 1; number <= page; number++) {
      items.push(
        <Pagination.Item
          onClick={() => {
            this.configShowItem(number);
          }}
          key={number}
          active={number === this.state.active}
        >
          <span>{number}</span>
        </Pagination.Item>
      );
    }

    return (
      <div>
        <div className="text-center">
          <h1 className="mt-n3">{`Hello ${auth.user.name}`}</h1>
          <p>{`Your Email is: ${auth.user.email}`}</p>

          <button
            onClick={this.openCreateModal}
            className="btn btn-large btn-success"
          >
            Create New Transaction
          </button>
          <CreateTransaction
            isOpen={this.state.createModelOpen}
            close={this.closeCreateModal}
          />
          <h1>
            Transactions :{" "}
            {this.state.trans.length < 1 ? "Zero" : this.state.trans.length}
          </h1>
          <Pagination className="d-flex justify-content-center">
            {items}
          </Pagination>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 ">
            <ul className="list-group">
              {this.state.trans.length > 0
                ? this.state.trans
                    .slice(currentIndex * 5, currentIndex * 5 + 5)
                    .map(transaction => (
                      <li
                        key={transaction._id}
                        className="list-group-item"
                        className={
                          transaction.type === "expense"
                            ? "bg-warning list-group-item"
                            : "list-group-item bg-success"
                        }
                      >
                        {this.state.id === transaction._id ? (
                          <UpdateTransaction
                            isOpen={this.state.updateModalOpen}
                            close={this.closeUpdateModal}
                            transaction={transaction}
                          />
                        ) : null}
                        <p className="font-weight-bold">
                          Type: {transaction.type}
                        </p>
                        <p className="font-weight-bold">
                          Amount: {transaction.amount}
                        </p>
                        <p className="font-weight-bold">
                          Note:{transaction.note}
                        </p>
                        <button
                          onClick={() => {
                            let confrm = window.confirm(
                              "Are You Sure To Delete!"
                            );
                            if (confrm) {
                              this.props.removeTransaction(transaction._id);
                            }
                          }}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            this.openUpdateModal(transaction._id);
                          }}
                          className="btn btn-primary"
                        >
                          Update
                        </button>
                      </li>
                    ))
                : null}
            </ul>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  transactions: state.transactions
});
export default connect(
  mapStateToProps,
  { loadTransactions, removeTransaction }
)(Dashboard);
