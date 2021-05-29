import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

const NavMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state) => ({ ...state }));

  const logOut = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>

      {auth !== null && (
        <>
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </>
      )}

      {auth !== null && (
        <span
          className="nav-link"
          onClick={logOut}
          style={{ cursor: "pointer" }}
        >
          Logout
        </span>
      )}

      {auth === null && (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default NavMenu;
