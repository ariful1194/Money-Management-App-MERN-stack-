import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, setUsr } from "../store/actions/authActions";
import Card from "react-bootstrap/Card";
import { loadTransactions } from "../store/actions/transactionActions";
class Home extends Component {
  state = {
    income: 0,
    balance: 0,
    expense: 0,
    trans: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions.transactions) {
      this.setState({ trans: nextProps.transactions.transactions });
    }
    let inc = nextProps.transactions.transactions
      .filter(temp => temp.type === "income")
      .reduce((i, obj) => {
        return obj.amount + i;
      }, 0);
    let exp = nextProps.transactions.transactions
      .filter(temp => temp.type === "expense")
      .reduce((i, obj) => {
        return obj.amount + i;
      }, 0);
    let bal = inc - exp;
    this.setState({
      income: inc,
      balance: bal,
      expense: exp
    });

    // let { balance, income, expense } = nextProps.auth.user;
    // this.setState({
    //   income,
    //   balance,
    //   expense
    // });
  }

  componentDidMount() {
    this.props.setUsr();
    this.props.loadTransactions();

    // console.log(this.props.auth.user);
    // let { balance, income, expense } = this.props.auth.user;
    // this.setState({
    //   income,
    //   balance,
    //   expense
    // });
  }
  render() {
    // let inc = this.state.trans
    //   .filter(temp => temp.type === "income")
    //   .reduce((i, obj) => {
    //     return obj.amount + i;
    //   }, 0);
    // let exp = this.state.trans
    //   .filter(temp => temp.type === "expense")
    //   .reduce((i, obj) => {
    //     return obj.amount + i;
    //   }, 0);
    // let bal = inc - exp;
    // console.log(inc + " " + exp + " " + bal);

    return (
      <div>
        {/* <h1>This Is Home</h1>
        {this.props.auth.isAuthenticated ? (
          <button
            onClick={() => this.props.logoutUser(this.props.history)}
            className="btn btn-warning"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-success">
            Login
          </Link>
        )} */}

        <Card className="text-center">
          <Card.Header className=" display-3 font-weight-bold">
            Featured
          </Card.Header>
          <Card.Body>
            <Card.Title> Balance : {this.state.balance}</Card.Title>
            <Card.Title>Total Expanse :{this.state.expense}</Card.Title>
            <Card.Title>Total Income :{this.state.income}</Card.Title>
            <Card.Text />

            <Link className="btn btn-primary" to="/dashboard">
              View Transaction
            </Link>
          </Card.Body>
          <Card.Footer className="text-muted">
            Total Transactions: {this.state.trans.length}
          </Card.Footer>
        </Card>
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
  { logoutUser, setUsr, loadTransactions }
)(Home);
