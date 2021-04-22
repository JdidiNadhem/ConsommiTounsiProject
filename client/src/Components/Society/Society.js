import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_supplier } from "../../JS/Actions/supplier";

import SocietyCard from "./SocietyCard";
import { Alert, Spinner, Table } from "react-bootstrap";

import "./Society.css";
import Product from "../Product/Product";
const Society = () => {
  const Supplier = useSelector((state) => state.supplierReducer.Supplier);
  const products = useSelector((state) => state.supplierReducer.products);
  const purchases = useSelector((state) => state.purchasesReducer.Purchases);
  const errors = useSelector((state) => state.supplierReducer.errors);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_supplier());
  }, [dispatch]);
  return (
    <section className="society">
      <SocietyCard Supplier={Supplier} errors={errors} />
      <div className="society-products">
        <div className="products-for-sold">
          <h4>Products for Sold</h4>
          <div className="products">
            {products.length > 0 ? (
              products.map((el, i) => (
                <Product key={i} product={el} edit={true} />
              ))
            ) : (
              <Alert variant="primary" style={{ margin: "0% 0% 0% 30%" }}>
                {Supplier ? (
                  Supplier.society ? (
                    "There is no product ! Add one to sold it"
                  ) : (
                    "Add society to sold products"
                  )
                ) : (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
              </Alert>
            )}
          </div>
        </div>
        <div className="products-solded">
          <h4>Products solded</h4>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Client</th>
                <th>Price</th>
                <th>Purchase Date</th>
                <th>Shipping Date</th>
              </tr>
            </thead>

            {purchases ? (
              <tbody>
                {purchases.map((pur) =>
                  pur.products.map((el, i) =>
                    el.supplier === Supplier._id ? (
                      <tr key={i}>
                        <td>{el._id}</td>
                        <td>{el.name}</td>
                        <td>{pur.client.fullname}</td>
                        <td>{el.price}</td>
                        <td>{pur.purchaseDate.split("T")[0]}</td>
                        <td>{pur.shippingDate.split("T")[0]}</td>
                      </tr>
                    ) : null
                  )
                )}
              </tbody>
            ) : null}
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Society;
