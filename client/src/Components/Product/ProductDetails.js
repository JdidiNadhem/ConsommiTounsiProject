import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_review } from "../../JS/Actions/client";
import { get_product_by_id } from "../../JS/Actions/products";

import { Button, Form, Spinner } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import Errors from "../Error/Errors";

import "./ProductDetails.css";
import { add_to_cart } from "../../JS/Actions/shoppingcart";
const ProductDetails = ({ location, history }) => {
  const dispatch = useDispatch();
  const id = location.state;
  const product = useSelector((state) => state.productsReducer.Product);
  const errors = useSelector((state) => state.clientReducer.errors[0]);
  const token = localStorage.getItem("token");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(get_product_by_id(id));
  }, [dispatch, id]);
  const ratingChanged = (newRating) => {
    if (!token && newRating > 0) {
      return history.push("/login");
    }
    setRating(newRating);
  };
  return !product ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <div className="Product_details">
      <h2>Product details</h2>
      <div className="supplier">
        <span>
          <h6>Society:</h6> {product.supplier.societyname}
        </span>
      </div>
      <div className="prod">
        <img src={product.image} alt="product" />
        <div className="details">
          <table>
            <tbody>
              <tr>
                <td>
                  <h6>Name:</h6>
                </td>
                <td>{product.name}</td>
              </tr>
              <tr>
                <td>
                  <h6>Categorie:</h6>
                </td>
                <td> {product.categorie}</td>
              </tr>
              <tr>
                <td>
                  <h6>Rating:</h6>
                </td>

                <td>
                  <ReactStars
                    edit={false}
                    count={5}
                    size={24}
                    value={product.rating}
                    activeColor="#ffd700"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Price:</h6>
                </td>
                <td lg={3}> {product.price}</td>
              </tr>
            </tbody>
          </table>
          <Button
            variant="primary"
            onClick={() => {
              if (!token) {
                history.push("/login");
              } else {
                dispatch(add_to_cart(product));
              }
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
      <div className="feedback">
        <h6>Feedback:</h6>
        <table>
          <tbody>
            <tr>
              <td>{errors ? <Errors error={errors} /> : null}</td>
            </tr>
            <tr>
              <td>
                <h6>Rating:</h6>
              </td>
              <td>
                <ReactStars
                  edit={true}
                  count={5}
                  size={24}
                  value={rating}
                  onChange={ratingChanged}
                  activeColor="#ffd700"
                />
              </td>
            </tr>
            <tr>
              <td>
                <h6>Comments:</h6>
              </td>
              <td>
                <Form.Control
                  placeholder="Your comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (!token) {
                      history.push("/login");
                    } else {
                      dispatch(add_review(product._id, rating, comment));
                      setRating(0);
                      setComment("");
                    }
                  }}
                >
                  Add Feedback
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h6 style={{ marginRight: "80%" }}>Comments:</h6>
      <div className="comments">
        {product.reviews.length > 0
          ? product.reviews.map((el, i) => (
              <div key={i} className="dialogbox">
                <div className="body">
                  <span className="tip tip-left" />
                  <div className="message">
                    <h6>{el.name}</h6>
                    <span key={el._id}>{el.comment}</span>
                  </div>
                </div>
              </div>
            ))
          : "No Comments"}
      </div>
      <Button variant="primary" onClick={() => history.goBack()}>
        Go back
      </Button>
    </div>
  );
};

export default ProductDetails;
