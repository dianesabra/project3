import React, { Component, Fragment } from "react";
import API from "../utils/API";
import { List, ListItem } from "../component/List";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import SpanningTable from "../component/Table";

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
    API.getOrder()
      .then(res =>
        this.setState({
          orders: res.data
        })
      )
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
        // make sound when post is made
        this.loadData();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <SpanningTable orders={this.state.orders} />
      </div>
    );
  }
}

export default Customer;
