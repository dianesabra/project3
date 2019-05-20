import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Requests from "./pages/Requests";
import Orders from "./pages/Order";
import NoMatch from "./pages/NoMatch";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
// import MiniDrawer from "./component/HomePage";
import MiniDrawer from "./component/HomePage";
import Background from './images/food.jpg'
import './App.css';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import "./App.css";
const styles = theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class App extends Component {
  render() {
    const { classes, theme } = this.props;
    return (
      <Router>
        <Fragment>
          {document.location.pathname !== "/" &&
          document.location.pathname !== "/login" &&
          document.location.pathname !== "/signup" ? (
            <MiniDrawer />
          ) : null}
          <main className={classes.content}>
            {/* <div className={classes.toolbar} /> */}
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/main" component={Main} />
              <Route exact path="/requests" component={Requests} />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/signup" component={Signup} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
