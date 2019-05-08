import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Cook from "./pages/Cook";
import NoMatch from "./pages/NoMatch";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
// import MiniDrawer from "./component/HomePage";

import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/orders" component={Customer} />
          <Route exact path="/requests" component={Cook} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/signup" component={Signup} />
          <Route component={NoMatch} />
        </Switch>
        {/* <MiniDrawer /> */}
      </Fragment>
    </Router>
  );
}

export default App;
