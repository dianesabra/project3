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
import Snackbar from "@material-ui/core/Snackbar";

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
    openMealConfirmation: false,
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
    submitted: false,
    submittedOrder: false,
    complete: true,
    openMealConfirmation: false,
    openOrderConfirmation: false
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

  handleClickMealConfirmation = () => {
    this.setState({ openMealConfirmation: true });
  };

  handleCloseMealConfirmation = (event, reason) => {
    this.handleCloseMeal();
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openMealConfirmation: false });
  };

  handleClickOrderConfirmation = () => {
    this.setState({ openOrderConfirmation: true });
  };

  handleCloseOrderConfirmation = (event, reason) => {
    this.handleCloseOrder();
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openOrderConfirmation: false });
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
      submitted: false,
      submittedOrder: false,
      complete: true
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
    API.getOrder(localStorage.getItem("userid"))
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
    console.log("tester");
    debugger;
    // this.state.mealName &&
    // this.state.cookName &&
    // this.state.dietRestrictions &&
    // this.state.mealDesc &&
    // this.state.qtyOutstanding &&
    // this.state.price      ?
    API.saveMeal({
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
        this.handleClickMealConfirmation();
        this.loadData();
      })
      .catch(err => console.log(err));
  };

  createOrder = () => {
    API.saveOrder({
      reqQty: this.state.reqQty,
      pickupAddress: this.state.pickupAddress,
      pickupDate: this.state.pickupDate,
      specInstructions: this.state.specInstructions,
      mealName: this.state.meals[this.state.mealIndex.i].mealName,
      _mealID: this.state.meals[this.state.mealIndex.i]._id,
      _userID: this.state.userid,
      orderPaid: false,
      price: this.state.meals[this.state.mealIndex.i].price,
      _cookuserID: this.state.meals[this.state.mealIndex.i]._userID
    })
      .then(res => {
        this.initState();
        this.handleClickOrderConfirmation();
        this.loadData();
        // make sound when post is made
      })
      .catch(err => console.log(err));
    // : alert("please fill out form");
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
    console.log("submitter");
    debugger;
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  };

  handleSubmitOrder = () => {
    this.setState({ submittedOrder: true }, () => {
      setTimeout(() => this.setState({ submittedOrder: false }), 5000);
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
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpenMeal}
          >
            Post a Meal
          </Button>
        </div>
        <Dialog
          open={this.state.openMeal}
          onClose={this.handleCloseMeal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Make a Meal: {this.state.mealName}
            <DialogContentText>{this.state.cookName}</DialogContentText>
          </DialogTitle>
          <DialogContent>
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
              <TextValidator
                margin="dense"
                id="cookName"
                label="Cook Name"
                type="text"
                validators={["required"]}
                errorMessages={["Cook Name is required."]}
                value={this.state.cookName}
                defaultValue={this.state.cookName}
                onChange={this.handleInputChange}
                name="cookName"
                fullWidth
              />
              <TextValidator
                margin="dense"
                id="dietRestrictions"
                label="Dietary Restrictions"
                type="text"
                defaultValue={this.state.dietRestrictions}
                onChange={this.handleInputChange}
                name="dietRestrictions"
                validators={["required"]}
                errorMessages={["Diet Restrictions is required."]}
                value={this.state.dietRestrictions}
                fullWidth
              />
              <TextValidator
                margin="dense"
                id="mealDesc"
                label="Description"
                type="text"
                defaultValue={this.state.mealDesc}
                onChange={this.handleInputChange}
                name="mealDesc"
                validators={["required"]}
                errorMessages={["Description is required."]}
                value={this.state.mealDesc}
                fullWidth
              />
              <TextValidator
                margin="dense"
                id="qtyOutstanding"
                label="Serving Quantity"
                type="number"
                defaultValue={this.state.qtyOutstanding}
                onChange={this.handleInputChange}
                name="qtyOutstanding"
                validators={["required", "minNumber:1"]}
                errorMessages={["Qty. Outstanding is required."]}
                value={this.state.qtyOutstanding}
                fullWidth
              />
              <TextValidator
                margin="dense"
                id="price"
                label="Price ($)"
                type="number"
                defaultValue={this.state.price}
                onChange={this.handleInputChange}
                name="price"
                validators={["required", "minNumber:1"]}
                errorMessages={["Price is required."]}
                value={this.state.price}
                fullWidth
              />
              <p />
              {"Image: "}
              <input
                type="file"
                // src="img_submit.gif"
                alt="Submit"
                onChange={this.handleImage}
              />
              <br />
              <Button
                label="cancel"
                name="cancel"
                type="cancel"
                variant="contained"
                margin="normal"
                color="primary"
                style={{ margin: "15px" }}
                onClick={this.handleCloseMeal}
              >
                Cancel
              </Button>
              <Button
                label="submit"
                name="submit"
                type="submit"
                variant="contained"
                margin="normal"
                color="primary"
                disabled={this.state.submitted}
                onClick={this.createMeal}
              >
                Post Meal | Total Price: ${this.state.totalPrice}
              </Button>
            </ValidatorForm>

            <DialogContent
              style={{ marginLeft: "350px", justifyContent: "space-between" }}
            />
          </DialogContent>
          <DialogActions />
        </Dialog>
        {/* Post Meal */}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={this.state.openMealConfirmation}
          autoHideDuration={2000}
          onClose={this.handleCloseMealConfirmation}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Meal Created!</span>}
        />
        {/* Place Order */}
        <Dialog
          open={this.state.openOrder}
          onClose={this.handleCloseOrder}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Order Information</DialogTitle>
          <DialogContent>
            <ValidatorForm onSubmit={this.handleSubmitOrder}>
              <TextValidator
                autoFocus
                margin="dense"
                id="reqQty"
                label="Requested Quantity"
                type="text"
                defaultValue={this.state.reqQty}
                onChange={this.handleInputChangeReqQty}
                name="reqQty"
                validators={["required"]}
                errorMessages={["Requested Quantity is required."]}
                value={this.state.reqQty}
                fullWidth
              />
              <TextValidator
                autoFocus
                margin="dense"
                id="pickupDate"
                label="Pickup Date"
                type="text"
                defaultValue={this.state.pickupDate}
                onChange={this.handleInputChange}
                name="pickupDate"
                validators={["required"]}
                errorMessages={["Pickup Date is required."]}
                value={this.state.pickupDate}
                fullWidth
              />
              <TextValidator
                autoFocus
                margin="dense"
                id="specInstructions"
                label="Special Instructions"
                type="text"
                defaultValue={this.state.specInstructions}
                onChange={this.handleInputChange}
                name="specInstructions"
                validators={["required"]}
                errorMessages={["Special Instructions is required."]}
                value={this.state.specInstructions}
                fullWidth
              />

              <Button
                label="cancel"
                name="cancel"
                type="cancel"
                variant="contained"
                color="primary"
                style={{ margin: "15px" }}
                onClick={this.handleCloseOrder}
              >
                Cancel
              </Button>
              <Button
                label="submit"
                name="submit"
                type="submit"
                variant="contained"
                margin="normal"
                color="primary"
                disabled={this.state.submittedOrder}
                onClick={this.createOrder}
              >
                Place Order | Total Cost: ${this.state.totalCost}
              </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions />
        </Dialog>
        {/* Post Meal */}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={this.state.openOrderConfirmation}
          autoHideDuration={2000}
          onClose={this.handleCloseOrderConfirmation}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Order Placed!</span>}
        />

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
