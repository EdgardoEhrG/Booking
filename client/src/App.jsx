import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Seller from "./pages/Seller";
import Hotels from "./pages/Hotels/Hotels";
import NewHotel from "./pages/Hotels/NewHotel";
import EditHotel from "./pages/Hotels/EditHotel";
import ViewHotel from "./pages/Hotels/ViewHotel";

import StripeCallback from "./components/stripe/stripe-callback";

import NavMenu from "./components/NavMenu/NavMenu";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { injectStyle } from "react-toastify/dist/inject-style";
import "antd/dist/antd.css";
import "./App.css";

const App = () => {
  injectStyle();

  return (
    <Router>
      <NavMenu />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/seller" component={Seller} />
        <PrivateRoute exact path="/hotels" component={Hotels} />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
      </Switch>
    </Router>
  );
};

export default App;
