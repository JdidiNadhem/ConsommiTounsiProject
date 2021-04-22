import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { delete_product, update_product } from "../../JS/Actions/supplier";
import { Link } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import { Button, Modal, Form } from "react-bootstrap";

import "./Product.css";

const Product = ({ product, edit }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [editShow, setEditshow] = useState(false);
  const [name, setName] = useState(product.name);
  const [categorie, setCat] = useState(product.categorie);
  const [description, setDesc] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [barcode, setBarcode] = useState(product.barcode);
  const handleClose = () => setEditshow(false);
  const handleShow = () => setEditshow(true);

  return (
    <div className="product-card">
      <img src={`${product.image}`} alt="productimg" />
      {show ? (
        <div className="c-body">
          <p>
            <h6>Name:</h6>
            {product.name}
          </p>

          <p>
            <h6>Categorie:</h6>
            {product.categorie}
          </p>

          <p>
            <h6>Description:</h6>
            {product.description}
          </p>

          <ReactStars
            edit={!edit}
            count={5}
            size={24}
            value={product.rating}
            activeColor="#ffd700"
          />

          <p>
            <h6>Price:</h6>
            {product.price}
          </p>

          <p>
            <h6>Barcode:</h6>
            {product.barcode}
          </p>
          {edit ? (
            <div className="btns">
              <Button variant="primary" onClick={handleShow}>
                Edit
              </Button>
              <Modal show={editShow} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Control
                      placeholder="Enter Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <Form.Control
                      as="select"
                      onChange={(e) => setCat(e.target.value)}
                    >
                      <option value="other" selected>
                        Choose categorie
                      </option>
                      <option value="Clothes">Clothes</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Food">Food</option>
                      <option value="Books">Books</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Phones">Phones</option>
                    </Form.Control>
                    <Form.Control
                      placeholder="Enter Description"
                      onChange={(e) => setDesc(e.target.value)}
                      value={description}
                    />
                    <Form.Control
                      placeholder="Enter Price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                    <Form.Control
                      placeholder="Enter Barcode"
                      onChange={(e) => setBarcode(e.target.value)}
                      value={barcode}
                    />
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClose();
                      dispatch(
                        update_product(product._id, {
                          name,
                          categorie,
                          description,
                          price,
                          barcode,
                        })
                      );
                    }}
                  >
                    Edit product
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button
                variant="danger"
                onClick={() => dispatch(delete_product(product._id))}
              >
                Delete
              </Button>
              <Button variant="danger" onClick={() => setShow(false)}>
                Hide
              </Button>
            </div>
          ) : null}
        </div>
      ) : edit ? (
        <Button variant="primary" onClick={() => setShow(true)}>
          Show
        </Button>
      ) : (
        <Link to={{ pathname: "/product_details", state: product._id }}>
          <Button variant="primary">Show</Button>
        </Link>
      )}
    </div>
  );
};

export default Product;
