import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login_Client } from "../../JS/Actions/client";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import Errors from "../Error/Errors";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.clientReducer.errors);

  return (
    <div id="Login">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            {errors.length > 0 ? (
              <Errors error={errors[0]} />
            ) : (
              " We'll never share your email with anyone else."
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="danger"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch(login_Client({ email, password }, history));
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
