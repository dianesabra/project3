import React, { Component } from "react";
import { Input, FormBtn } from "../component/Form";
import API from "../utils/API";
import { List, ListItem } from "../component/List";

class Main extends Component {
  state = {
    search: "",
    mealName: "",
    cookName: "",
    dietRestrictions: "",
    mealDesc: "",
    qtyOutstanding: "",
    price: "",
    meals: [],
    orders: []
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    API.getMeal()
      .then(res =>
        this.setState({
          meals: res.data,
          mealName: "",
          cookName: "",
          dietRestrictions: "",
          mealDesc: "",
          qtyOutstanding: 0,
          price: 0,
          order: []
        })
      )
      .catch(err => console.log(err));
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

  deleteMeal = id => {
    API.deleteMeal(id)
      .then(res => {
        // make sound when post is made
        this.loadMeals();
      })
      .catch(err => console.log(err));
  };

  createMeal = e => {
    e.preventDefault();
    API.saveMeal(this.state)
      .then(res => {
        // make sound when post is made
        this.loadMeals();
      })
      .catch(err => console.log(err));
  };

  createOrder = (id, name) => {
    API.saveOrder({
      reqQty: this.state.reqQty,
      pickupAddress: this.state.pickupAddress,
      pickupDate: this.state.pickupDate,
      specInstructions: this.state.specInstructions,
      mealName: name,
      _mealID: id
    })
      .then(res => {
        // make sound when post is made
        this.loadMeals();
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
        <Input
          defaultValue={this.state.mealName}
          placeholder="Meal Name"
          onChange={this.handleInputChange}
          name="mealName"
          type="text"
        />
        <Input
          defaultValue={this.state.cookName}
          placeholder="Cook Name"
          onChange={this.handleInputChange}
          name="cookName"
          type="text"
        />
        <Input
          defaultValue={this.state.dietRestrictions}
          placeholder="Dietary Restrictions"
          onChange={this.handleInputChange}
          name="dietRestrictions"
          type="text"
        />
        <Input
          defaultValue={this.state.mealDesc}
          placeholder="Description"
          onChange={this.handleInputChange}
          name="mealDesc"
          type="text"
        />
        <Input
          defaultValue={this.state.qtyOutstanding}
          placeholder="Quantity Outstanding"
          onChange={this.handleInputChange}
          name="qtyOutstanding"
          type="text"
        />
        <Input
          defaultValue={this.state.price}
          placeholder="Price"
          onChange={this.handleInputChange}
          name="price"
          type="text"
        />
        //
        {/* Inputs */}
        <Input
          defaultValue={this.state.reqQty}
          placeholder="Requested Quantity"
          onChange={this.handleInputChange}
          name="reqQty"
          type="text"
        />
        <Input
          defaultValue={this.state.pickupAddress}
          placeholder="Pickup Address"
          onChange={this.handleInputChange}
          name="pickupAddress"
          type="text"
        />
        <Input
          defaultValue={this.state.pickupDate}
          placeholder="Pickup Date"
          onChange={this.handleInputChange}
          name="pickupDate"
          type="text"
        />
        <Input
          defaultValue={this.state.specInstructions}
          placeholder="Special Instructions"
          onChange={this.handleInputChange}
          name="specInstructions"
          type="text"
        />
        <FormBtn onClick={this.createMeal}>Create Meal</FormBtn>
        {this.state.meals.length ? (
          <List>
            {this.state.meals.map(meal => (
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
                <button
                  onClick={() => this.createOrder(meal._id, meal.mealName)}
                >
                  Order Me
                </button>
              </ListItem>
            ))}
          </List>
        ) : (
          <h3>None</h3>
        )}
        <p>Orders</p>
        {this.state.orders.length ? (
          <List>
            {this.state.orders.map(order => (
              <ListItem key={order._id}>
                <p>{order.mealName}</p>
                <p>{order.reqQty}</p>
                <p>{order.pickupAddress}</p>
                <p>{order.pickupDate}</p>
                <p>{order.specInstructions}</p>
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
