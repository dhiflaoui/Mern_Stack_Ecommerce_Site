import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./Core/Home";
import Navbar from "./Core/Navbar";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/Signin" exact>
          <Signin />
        </Route>
        <Route path="/Signup" exact>
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
