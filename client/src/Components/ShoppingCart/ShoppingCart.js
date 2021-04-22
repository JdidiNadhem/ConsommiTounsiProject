import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  delete_from_cart,
  clear_shopping_cart,
} from "../../JS/Actions/shoppingcart";
import { purchase_products } from "../../JS/Actions/purchases";

import Errors from "../Error/Errors";
import { Button, Modal, Form, Alert } from "react-bootstrap";

import "./ShoppingCart.css";
const ShoppingCart = () => {
  const [show, setShow] = useState(false);
  const [cartnumber, setCartnumber] = useState("");
  const [shippingadress, setShippingadress] = useState("");
  const [cvv, setCvv] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const products = useSelector((state) => state.shoppingcartReducer.products);
  const total = useSelector((state) => state.shoppingcartReducer.total);
  const error = useSelector((state) => state.purchasesReducer.errors[0]);

  const dispatch = useDispatch();
  useEffect(() => {}, [products]);
  return (
    <div className="shoppingcart">
      <h2>Shopping Cart</h2>
      {products.length > 0 ? (
        products.map((el, i) => (
          <div key={i} className="product-cart">
            <img src={el.image} alt="product" />
            <div className="prod-details">
              <h6>Name:</h6>
              <p>{el.name}</p>
              <h6>Price:</h6>
              <p>{el.price}DT</p>
            </div>
            <Button
              variant="danger"
              onClick={() => dispatch(delete_from_cart(el._id, el))}
            >
              X
            </Button>
          </div>
        ))
      ) : (
        <Alert variant="primary">Empty</Alert>
      )}
      <h6>Totale:{total}</h6>
      <Button variant="primary" onClick={handleShow}>
        Command
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? <Errors error={error} /> : null}
          <Form>
            <Form.Control
              placeholder="Cart Number"
              onChange={(e) => setCartnumber(e.target.value)}
              value={cartnumber}
            />
            <Form.Control
              placeholder="CVV code"
              onChange={(e) => setCvv(e.target.value)}
              value={cvv}
            />
            <Form.Control
              placeholder="Shipping Adress"
              onChange={(e) => setShippingadress(e.target.value)}
              value={shippingadress}
            />
            <Form.Label>Total:</Form.Label>
            <Form.Control placeholder="Totale" disabled value={total} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                purchase_products(
                  products,
                  total,
                  shippingadress,
                  cartnumber,
                  cvv
                )
              );
              setCartnumber("");
              setCvv("");
              setShippingadress("");

              dispatch(clear_shopping_cart());
              handleClose();
            }}
          >
            Payement
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
