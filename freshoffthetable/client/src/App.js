import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Cook from "./pages/Cook";
import NoMatch from "./pages/NoMatch";
import LeftPanel from "./component/leftpanel";
// import MiniDrawer from "./component/HomePage";

import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <LeftPanel />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/requests" component={Customer} />
          <Route exact path="/cook" component={Cook} />
          <Route component={NoMatch} />
        </Switch>
        {/* <MiniDrawer /> */}
      </Fragment>
    </Router>
  );
}

export default App;
