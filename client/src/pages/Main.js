import React, { Component, Fragment } from "react";
import { Input, FormBtn } from "../component/Form";
import API from "../utils/API";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import RecipeReviewCard from "../component/FoodCard/recipeCard";

class Main extends Component {
  state = {
    search: "",
    mealName: "",
    cookName: "",
    dietRestrictions: "",
    mealDesc: "",
    qtyOutstanding: 0,
    price: 0,
    meals: [],
    orders: [],
    openMeal: false,
    openOrder: false,
    status: false,
    userName: "",
    password: "",
    userid: "",
    selectedFile: null,
    reqQty: 0,
    pickupAddress: null,
    pickupDate: null,
    specInstructions: null,
    totalPrice: 0,
    mealIndex: 0,
    totalCost: 0,
    submitted: false
  };

  componentDidMount() {
    this.loadData();
  }

  getBase64 = file => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ selectedFile: reader.result });
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  };

  handleImage = e => {
    this.getBase64(e.target.files[0]);
  };

  handleClickOpenMeal = () => {
    this.setState({ openMeal: true });
  };

  handleCloseMeal = () => {
    this.initState();
    this.setState({ openMeal: false });
  };

  handleClickOpenOrder = mealIndex => {
    this.setState({ openOrder: true, mealIndex });
  };

  handleCloseOrder = () => {
    this.initState();
    this.setState({ openOrder: false });
  };

  openOrderConfirmation = () => {
    this.setState({ openMeal: true });
  };
  handleCloseOrderConfirmation = () => {
    this.setState({ openMeal: false });
  };

  initState() {
    this.setState({
      search: "",
      mealName: "",
      cookName: "",
      dietRestrictions: "",
      mealDesc: "",
      qtyOutstanding: "",
      price: "",
      orders: [],
      openMeal: false,
      openOrder: false,
      status: false,
      userName: "",
      password: "",
      selectedFile: null,
      reqQty: 0,
      pickupAddress: null,
      pickupDate: null,
      specInstructions: null,
      totalPrice: 0,
      mealIndex: 0,
      totalCost: 0,
      submitted: false
    });
  }
  loadData = () => {
    this.setState({ userid: localStorage.getItem("userid") });
    API.getMeal()
      .then(res => {
        this.initState();
        this.setState({ meals: res.data });
      })
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
    this.setState({ [name]: value }, () => {
      let totalPrice = this.state.qtyOutstanding * this.state.price;
      this.setState({ totalPrice });
    });
  };

  handleInputChangeReqQty = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      debugger;
      let priceprice = this.state.meals[this.state.mealIndex.i].price;
      let totalCost =
        this.state.reqQty * this.state.meals[this.state.mealIndex.i].price;
      this.setState({ totalCost });
    });
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
    this.state.mealName &&
    this.state.cookName &&
    this.state.dietRestrictions &&
    this.state.mealDesc &&
    this.state.qtyOutstanding &&
    this.state.price
      ? API.saveMeal({
          mealName: this.state.mealName,
          cookName: this.state.cookName,
          dietRestrictions: this.state.dietRestrictions,
          mealDesc: this.state.mealDesc,
          qtyOutstanding: this.state.qtyOutstanding,
          price: this.state.price,
          _userID: this.state.userid,
          qtyFulfilled: false,
          image: this.state.selectedFile
        })
          .then(res => {
            this.handleCloseMeal();
            this.openOrderConfirmation();
            // make sound when post is made
            this.loadData();
          })
          .catch(err => console.log(err))
      : console.log("here");
  };

  createOrder = () => {
    this.initState();
    this.state.reqQty &&
    this.state.pickupAddress &&
    this.state.pickupDate &&
    this.state.specInstructions
      ? API.saveOrder({
          reqQty: this.state.reqQty,
          pickupAddress: this.state.pickupAddress,
          pickupDate: this.state.pickupDate,
          specInstructions: this.state.specInstructions,
          mealName: this.state.meals[this.state.mealIndex.i].mealName,
          _mealID: this.state.meals[this.state.mealIndex.i]._id,
          _userID: this.state.userid,
          orderPaid: false,
          price: this.state.meals[this.state.mealIndex.i].price
        })
          .then(res => {
            this.handleCloseOrder();
            // make sound when post is made
            this.loadData();
          })
          .catch(err => console.log(err))
      : alert("please fill out form");
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
  getBase64 = file => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ selectedFile: reader.result });
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  };

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  };

  handleImage = e => {
    this.getBase64(e.target.files[0]);
  };

  render() {
    return (
      <div
        style={{
          paddingLeft: 74,
          display: "flex",
          flexWrap: "column"
        }}
      >
        {/* Post Meal */}
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpenMeal}
        >
          Post a Meal
        </Button>
        <Dialog
          open={this.state.openMeal}
          onClose={this.handleCloseMeal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.mealName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.cookName}</DialogContentText>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                autoFocus
                margin="dense"
                id="mealName"
                label="Meal Name"
                type="text"
                defaultValue={this.state.mealName}
                value={this.state.mealName}
                onChange={this.handleInputChange}
                name="mealName"
                validators={["required"]}
                errorMessages={["Meal Name is required."]}
                fullWidth
              />
              <Button
                label="submit"
                name="submit"
                type="submit"
                variant="contained"
                margin="normal"
                fullWidth
                color="primary"
                disabled={this.state.submitted}
                onClick={this.createMeal}
              >
                Create Account
              </Button>

              <TextField
                margin="dense"
                id="cookName"
                label="Cook Name"
                type="text"
                defaultValue={this.state.cookName}
                onChange={this.handleInputChange}
                name="cookName"
                required
                fullWidth
              />
              <TextField
                margin="dense"
                id="dietRestrictions"
                label="Dietary Restrictions"
                type="text"
                defaultValue={this.state.dietRestrictions}
                onChange={this.handleInputChange}
                name="dietRestrictions"
                required
                fullWidth
              />
              <TextField
                margin="dense"
                id="mealDesc"
                label="Description"
                type="text"
                defaultValue={this.state.mealDesc}
                onChange={this.handleInputChange}
                name="mealDesc"
                required
                fullWidth
              />
              <TextField
                margin="dense"
                id="qtyOutstanding"
                label="Serving Quantity"
                type="number"
                defaultValue={this.state.qtyOutstanding}
                onChange={this.handleInputChange}
                name="qtyOutstanding"
                required
                fullWidth
              />
              <TextField
                margin="dense"
                id="price"
                label="Price ($)"
                type="number"
                defaultValue={this.state.price}
                onChange={this.handleInputChange}
                name="price"
                required
                fullWidth
              />
              {"Image: "}
              <input
                type="file"
                // src="img_submit.gif"
                alt="Submit"
                onChange={this.handleImage}
              />
            </ValidatorForm>
            <DialogContent
              style={{ marginLeft: "350px", justifyContent: "space-between" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseMeal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createMeal} color="primary">
              Post Meal | Total Price: ${this.state.totalPrice}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Place Order */}
        <Dialog
          open={this.state.openOrder}
          onClose={this.handleCloseOrder}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Order Information</DialogTitle>
          <DialogContent>
            <DialogContentText />
            <TextField
              autoFocus
              margin="dense"
              id="reqQty"
              label="Requested Quantity"
              type="text"
              defaultValue={this.state.reqQty}
              onChange={this.handleInputChangeReqQty}
              name="reqQty"
              required
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
              required
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
              required
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
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseOrder} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.createOrder()} color="primary">
              Place Order | Total Price: ${this.state.totalCost}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Place Order Confirmation */}
        <Dialog
          open={this.state.openOrderConfirmation}
          onClose={this.handleCloseOrderConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Order Placed!"}</DialogTitle>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              <Link to={"/orders"}>See Your Orders</Link>
            </Button>
          </DialogActions>
        </Dialog>

        {this.state.meals.length ? (
          <Fragment>
            <div
              style={{
                display: "flex",
                padding: 15,
                justifyContent: "space-between",
                flexWrap: "wrap"
              }}
            >
              {this.state.meals.map((meal, i) => (
                <Fragment key={meal._id}>
                  <RecipeReviewCard
                    key={meal._id}
                    mealName={meal.mealName}
                    cookName={meal.cookName}
                    qtyOutstanding={meal.qtyOutstanding}
                    price={meal.price}
                    mealDesc={meal.mealDesc}
                    image={meal.image}
                    dietRestrictions={meal.dietRestrictions}
                    onClickDelete={() => this.deleteMeal(meal._id)}
                    onClickOpenOrder={() => this.handleClickOpenOrder({ i })}
                  />
                </Fragment>
              ))}
            </div>
          </Fragment>
        ) : (
          <h3 />
        )}
      </div>
    );
  }
}
export default Main;
