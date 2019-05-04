import React, { Component } from "react";
import { Input, FormBtn } from "../component/Form";
import API from "../utils/API";
import { List, ListItem } from "../component/List";

class Main extends Component {
  state = {
    search: "",
    meals: [],
    orders: [],
    status: false
  };

  componentDidMount() {
    this.loadData();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadData = () => {
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
