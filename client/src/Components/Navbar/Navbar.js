import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout_Client, clearErrors_client } from "../../JS/Actions/client";
import { logout_supplier } from "../../JS/Actions/supplier";

import { Button } from "react-bootstrap";

import "./Navbar.css";
const Navbar = () => {
  const isAuth_Client = useSelector((state) => state.clientReducer.isAuth);
  const Client = useSelector((state) => state.clientReducer.Client);
  const dispatch = useDispatch();
  return (
    <header>
      <nav>
        <Link to="/">
          <img src="Consommi.png" alt="logo" />
        </Link>

        {!isAuth_Client ? (
          <div className="buttons">
            <Link to="/login">
              <Button
                variant="danger"
                onClick={() => dispatch(clearErrors_client())}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="danger"
                onClick={() => dispatch(clearErrors_client())}
              >
                Register
              </Button>
            </Link>

            <i className="fas fa-shopping-cart">Cart</i>
          </div>
        ) : (
          <div className="buttons">
            <Link to="/login">
              <Button
                variant="danger"
                onClick={() => {
                  dispatch(logout_Client());
                  dispatch(logout_supplier());
                  dispatch(clearErrors_client());
                }}
              >
                Log out
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="danger">Profile</Button>
            </Link>

            <Link to="/shoppingcart">
              <i className="fas fa-shopping-cart">Cart</i>
            </Link>
            {Client && Client.isAdmin ? (
              <Link to="/admin">
                <i className="fas fa-user-shield">Admin</i>
              </Link>
            ) : null}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
