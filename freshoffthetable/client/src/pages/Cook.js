import React, { Component } from "react";
import { Input, FormBtn } from "../component/Form";
import API from "../utils/API";
import { List, ListItem } from "../component/List";

class Main extends Component {
  state = {
    search: "",
    meals: [],
    orders: [],
    status: false,
    userid: ""
  };

  componentDidMount() {
    const username = localStorage.getItem("userid");
    this.setState({ userid: username });
    this.loadData();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadData = () => {
    API.getOrder()
      .then(res => {
        API.getOrder()
          .then(res =>
            this.setState({
              orders: res.data
            })
          )
          .catch(err => console.log(err));
        this.setState({
          orders: res.data
        });
      })
      .catch(err => console.log(err));
    API.getMeal()
      .then(res =>
        this.setState({
          meals: res.data,
          search: "",
          orders: [],
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
        // make sound when post is made
        this.loadData();
      })
      .catch(err => console.log(err));
  };

  createMeal = e => {
    e.preventDefault();
    this.handleClose();
    API.saveMeal(this.state)
      .then(res => {
        // make sound when post is made
        this.loadData();
      })
      .catch(err => console.log(err));
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
        <p>Main</p>

        <Input
          defaultValue={this.state.Search}
          placeholder="Search a meal"
          onChange={this.handleInputChange}
          name="search"
          type="text"
        />
        <FormBtn onClick={this.handleFormSearch}>Submit</FormBtn>

        {this.state.meals.length ? (
          <List>
            {this.state.meals
              .filter(meal => meal._userID === this.state.userid)
              .map(meal => (
                <ListItem key={meal._id}>
                  <p>{meal.mealName}</p>
                  <p>{meal.cookName}</p>
                  <p>{meal.qtyOutstanding}</p>
                  <p>{meal.price}</p>
                  <p>{meal.mealDesc}</p>
                  <p>{meal.dietRestrictions}</p>
                  <button onClick={() => this.deleteMeal(meal._id)}>
                    Delete Me
                  </button>
                  {this.state.orders.length ? (
                    <List>
                      {this.state.orders
                        .filter(order => order._mealID === meal._id)
                        .map(order => (
                          <ListItem key={order._id}>
                            <p>{order.reqQty}</p>
                            <p>{order.specInstructions}</p>
                            <p>{order.pickupAddress}</p>
                            <p>{order.pickupDate}</p>
                          </ListItem>
                        ))}
                    </List>
                  ) : (
                    <h2>None</h2>
                  )}
                </ListItem>
              ))}
          </List>
        ) : (
          <h3>None</h3>
        )}
      </div>
    );
  }
}

export default Main;
