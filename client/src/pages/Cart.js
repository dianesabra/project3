import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../component/Payment/CheckoutForm";
import API from "../utils/API";
import SpanningTable from "../component/Table";
import Snackbar from "@material-ui/core/Snackbar";

class Cart extends Component {
  state = {
    userid: "",
    orders: [],
    totalPrice: 0,
    openCartConfirmation: false
  };

  componentDidMount() {
    this.setState({ userid: localStorage.getItem("userid") });
    this.loadData();
  }
  handleClickCartConfirmation = () => {
    this.setState({ openCartConfirmation: true });
  };

  handleCloseCartConfirmation = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openCartConfirmation: false });
  };

  checkout = () => {
    this.state.orders.forEach(function(item) {
      API.updateMeal({
        mealID: item._mealID,
        qtyOutstanding: item.reqQty,
        orderID: item._id
      }).then(res => {
        console.log("Order Updated");
      });
    });
  };

  loadData = () => {
    API.getOrderForCart({
      userid: localStorage.getItem("userid"),
      qtyFulfilled: false
    })
      .then(res => {
        this.setState(
          {
            orders: res.data
          },
          () => {
            let totalPrice = 0;
            this.state.orders.forEach(function(item) {
              totalPrice += item.price * item.reqQty;
            });
            this.setState({ totalPrice });
          }
        );
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
        <h1>Your Cart</h1>
        <SpanningTable
          orders={this.state.orders}
          orderTotal={this.state.totalPrice}
          onClickDelete={req => this.deleteOrder(req)}
        />
        {/* Post Meal */}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={this.state.handleClickCartConfirmation}
          autoHideDuration={2000}
          onClose={this.handleCloseCartConfirmation}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Purchase Successful!</span>}
        />
        <StripeProvider apiKey="pk_test_WypliwwmxpFOzZAxUSZc2kwD005UoPutqR">
          <div className="example">
            <Elements>
              <CheckoutForm onClickPurchCart={this.checkout} />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

export default Cart;
