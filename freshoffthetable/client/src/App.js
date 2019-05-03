import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import LeftPanel from "./component/leftpanel";

import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <LeftPanel />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route component={NoMatch} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
