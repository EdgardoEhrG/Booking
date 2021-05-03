import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavMenu from "./components/NavMenu/NavMenu";
import { ToastContainer } from "react-toastify";

import { injectStyle } from "react-toastify/dist/inject-style";
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
      </Switch>
    </Router>
  );
};

export default App;
