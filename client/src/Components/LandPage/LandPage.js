import React from "react";
import { useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";

import "./LandPage.css";
import Product from "../Product/Product";
const LandPage = () => {
  const Products = useSelector((state) => state.productsReducer.Products);

  return (
    <div className="Landpage">
      <h1>Latest Products</h1>
      <div className="home-products">
        {Products.length > 0 ? (
          Products.map((el) => (
            <Product key={el._id} product={el} edit={false} />
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    </div>
  );
};

export default LandPage;
