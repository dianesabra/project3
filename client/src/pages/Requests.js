import React, { Component } from "react";
import API from "../utils/API";
import SpanningTable from "../component/Table/requestTable";

class Customer extends Component {
  state = {
    search: "",
    orders: [],
    open: false
  };

  componentDidMount() {
    const username = localStorage.getItem("userid");
    this.setState({ userid: username });
    this.loadData();
  }

  loadData = () => {
    API.getRequests(localStorage.getItem("userid"))
      .then(res => {
        debugger;
        this.setState({
          orders: res.data
        });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSearch = e => {
    e.preventDefault();
  };

  deleteOrder = id => {
    API.deleteOrder(id)
      .then(res => {
        this.loadData();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Your Requests</h1>
        <SpanningTable
          orders={this.state.orders}
          onClickDelete={req => this.deleteOrder(req)}
        />
      </div>
    );
  }
}

export default Customer;
