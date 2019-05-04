import React, { Component, Fragment } from "react";
import { Input, FormBtn } from "../component/Form";
import API from "../utils/API";
import { List, ListItem } from "../component/List";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RecipeReviewCard from "../component/FoodCard/recipeCard";

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
    orders: [],
    open: false,
    status: false,
    userName: "",
    password: ""
  };

  componentDidMount() {
    this.loadData();
  }

  handleClickOpenMeal = () => {
    this.setState({ open: true });
  };

  handleCloseMeal = () => {
    this.setState({ open: false });
  };

  handleClickOpenOrder = () => {
    this.setState({ open: true });
  };

  handleCloseOrder = () => {
    this.setState({ open: false });
  };

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
          orders: [],
          open: false,
          status: false,
          userName: "",
          password: ""
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
    this.handleCloseMeal();
    API.saveMeal({
      mealName: this.state.mealName,
      cookName: this.state.cookName,
      dietRestrictions: this.state.dietRestrictions,
      mealDesc: this.state.mealDesc,
      qtyOutstanding: this.state.qtyOutstanding,
      price: this.state.price
    })
      .then(res => {
        // make sound when post is made
        this.loadData();
      })
      .catch(err => console.log(err));
  };

  createOrder = (id, name) => {
    this.handleCloseOrder();
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

  createUser = e => {
    API.saveUser({
      userName: this.state.userName,
      password: this.state.password
    })
      .then(res => {
        localStorage.setItem("userid", res.data._id);
        // make sound when post is made
        this.loadData();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <p>Main</p>
        {/* Post Meal */}
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpenMeal}
        >
          Post a Meal
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleCloseMeal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.mealName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.cookName}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="mealName"
              label="Meal Name"
              type="text"
              defaultValue={this.state.mealName}
              onChange={this.handleInputChange}
              name="mealName"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="cookName"
              label="Cook Name"
              type="text"
              defaultValue={this.state.cookName}
              onChange={this.handleInputChange}
              name="cookName"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="dietRestrictions"
              label="Dietary Restrictions"
              type="text"
              defaultValue={this.state.dietRestrictions}
              onChange={this.handleInputChange}
              name="dietRestrictions"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="mealDesc"
              label="Description"
              type="text"
              defaultValue={this.state.mealDesc}
              onChange={this.handleInputChange}
              name="mealDesc"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="qtyOutstanding"
              label="Serving Quantity"
              type="number"
              defaultValue={this.state.qtyOutstanding}
              onChange={this.handleInputChange}
              name="qtyOutstanding"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price ($)"
              type="number"
              defaultValue={this.state.price}
              onChange={this.handleInputChange}
              name="price"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseMeal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createMeal} color="primary">
              Post Meal
            </Button>
          </DialogActions>
        </Dialog>

        {/* Search */}
        <Input
          defaultValue={this.state.Search}
          placeholder="Search a meal"
          onChange={this.handleInputChange}
          name="search"
          type="text"
        />
        <FormBtn onClick={this.handleFormSearch}>Submit</FormBtn>
        {/* User */}
        <Input
          defaultValue={this.state.userName}
          placeholder="Username"
          onChange={this.handleInputChange}
          name="userName"
          type="text"
        />
        <Input
          defaultValue={this.state.password}
          placeholder="Password"
          onChange={this.handleInputChange}
          name="password"
          type="password"
        />
        <FormBtn onClick={this.createUser}>Create User</FormBtn>

        {this.state.meals.length ? (
          <Fragment>
            {this.state.meals.map(meal => (
              <Fragment>
                <RecipeReviewCard
                  key={meal._id}
                  mealName={meal.mealName}
                  cookName={meal.cookName}
                  qtyOutstanding={meal.qtyOutstanding}
                  price={meal.price}
                  mealDesc={meal.mealDesc}
                  dietRestrictions={meal.dietRestrictions}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.deleteMeal(meal._id)}
                >
                  Delete Me
                </Button>
                {/* Post Order */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleClickOpenOrder}
                >
                  Place Order
                </Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleCloseOrder}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    {this.state.mealName}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>{this.state.cookName}</DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="reqQty"
                      label="Requested Quantity"
                      type="text"
                      defaultValue={this.state.reqQty}
                      onChange={this.handleInputChange}
                      name="reqQty"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="pickupAddress"
                      label="Pickup Address"
                      type="text"
                      defaultValue={this.state.pickupAddress}
                      onChange={this.handleInputChange}
                      name="pickupAddress"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="pickupDate"
                      label="Pickup Date"
                      type="text"
                      defaultValue={this.state.pickupDate}
                      onChange={this.handleInputChange}
                      name="pickupDate"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="specInstructions"
                      label="Special Instructions"
                      type="text"
                      defaultValue={this.state.specInstructions}
                      onChange={this.handleInputChange}
                      name="specInstructions"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseOrder} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => this.createOrder(meal._id, meal.mealName)}
                      color="primary"
                    >
                      Place Order
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            ))}
          </Fragment>
        ) : (
          <h3>None</h3>
        )}
      </div>
    );
  }
}

export default Main;
