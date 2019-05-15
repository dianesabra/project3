import React, { Component, Fragment } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../component/Payment/CheckoutForm";
import API from "../utils/API";
import RecipeReviewCard from "../component/FoodCard/recipeCard";

class Cart extends Component {
  state = {
    userid: "",
    orders: [],
    totalPrice: 0
  };

  componentDidMount() {
    this.setState({ userid: localStorage.getItem("userid") });
    this.loadData();
  }
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

  render() {
    return (
      <StripeProvider apiKey="pk_test_WypliwwmxpFOzZAxUSZc2kwD005UoPutqR">
        <div className="example">
          {this.state.orders.length ? (
            <Fragment>
              {this.state.orders.map(order => (
                <Fragment key={order._id}>
                  <RecipeReviewCard
                    key={order._id}
                    mealName={order.mealName}
                    cookName={order.reqQty}
                    qtyOutstanding={order.specInstructions}
                    price={order.price}
                  />
                </Fragment>
              ))}
            </Fragment>
          ) : (
            <h3>None</h3>
          )}
          <h2>${this.state.totalPrice}</h2>
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Cart;
