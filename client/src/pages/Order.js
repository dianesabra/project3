import React, { Component } from "react";
import API from "../utils/API";
import SpanningTable from "../component/Table/ordersTable";
import MealsSpanningTable from "../component/Table/mealsTable";

class Cook extends Component {
  state = {
    search: "",
    meals: [],
    orders: [],
    status: false,
    userid: ""
  };

  componentDidMount() {
    const username = localStorage.getItem("userid");
    this.setState({ userid: username }, this.loadData());
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadData = () => {
    API.getOrder(localStorage.getItem("userid"))
      .then(res => {
        this.setState({
          orders: res.data
        });
      })
      .catch(err => console.log(err));
    API.getMealByCook(localStorage.getItem("userid"))
      .then(res =>
        this.setState({
          meals: res.data,
          search: "",
          status: false
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

  deleteMeal = id => {
    API.deleteMeal(id)
      .then(res => {
        this.loadData();
      })
      .catch(err => console.log(err));
  };

  createMeal = e => {
    e.preventDefault();
    this.handleClose();
    API.saveMeal(this.state)
      .then(res => {
        this.loadData();
      })
      .catch(err => console.log(err));
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
        {<h1>Your Orders</h1>}
        <SpanningTable
          orders={this.state.orders}
          onClickDelete={req => this.deleteOrder(req)}
        />
        {<br />}
        {<h1>Your Meals</h1>}
        <MealsSpanningTable
          meals={this.state.meals}
          onClickDelete={req => this.deleteOrder(req)}
        />
      </div>
    );
  }
}

export default Cook;
