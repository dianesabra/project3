import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Redirect } from "react-router-dom";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  state = {
    toFoodFeed: false
  };

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) {
      this.props.onClickPurchCart();
      this.setState({ toFoodFeed: true });
    }
  }

  render() {
    if (this.state.toFoodFeed === true) {
      return <Redirect to="/main/" />;
    }
    return (
      <div className="checkout">
        <p>
          Would you like to complete the purchase for a total of $
          {this.props.totalPrice}?
        </p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
