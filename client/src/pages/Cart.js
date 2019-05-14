import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../component/Payment/CheckoutForm";

class Cart extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_WypliwwmxpFOzZAxUSZc2kwD005UoPutqR">
        <div className="example">
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
