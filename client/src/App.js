import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Seller from "./pages/Seller";
import Hotels from "./pages/Hotels/Hotels";
import NewHotel from "./pages/Hotels/NewHotel";

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
      </Switch>
    </Router>
  );
};

export default App;
