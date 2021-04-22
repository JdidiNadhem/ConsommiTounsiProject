import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register_Client } from "../../JS/Actions/client";

import Errors from "../Error/Errors";
import "./Register.css";

const Register = ({ history }) => {
  const errors = useSelector((state) => state.clientReducer.errors);
  const dispatch = useDispatch();
  const [cin, setCin] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      {errors.length > 0 ? <Errors error={errors[0]} /> : null}
      <form id="signup">
        <div className="header">
          <h3>Register</h3>
        </div>
        <div className="sep" />
        <div className="inputs">
          <input
            type="text"
            placeholder="CIN"
            autoFocus
            onChange={(e) => setCin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Adress"
            onChange={(e) => setAdress(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            id="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                register_Client(
                  { cin, fullname, phone, adress, email, password },
                  history
                )
              );
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
