import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home/Home";
import OOPS from "./OOPS/OOPS";

// function to guard the component for private access
const authGuard = (Component) => () => {
  return sessionStorage.getItem("authtoken") ? (
    <Component />
  ) : (
    <Redirect to="/login" />
  );
};

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/home" render={authGuard(Home)}>
      </Route>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="*">
        <OOPS />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
