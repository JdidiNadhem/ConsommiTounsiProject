import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_purchase, get_purchases } from "../../JS/Actions/purchases";

import Errors from "../Error/Errors";
import { Button, Spinner, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  const Client = useSelector((state) => state.clientReducer.Client);
  const Supplier = useSelector((state) => state.supplierReducer.Supplier);
  const purchases = useSelector((state) => state.purchasesReducer.Purchases);
  const error = useSelector((state) => state.purchasesReducer.errors[0]);
  console.log(purchases);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_purchases());
  }, [dispatch]);
  return (
    <section className="profile">
      <div className="our-team">
        <div className="picture">
          <img
            className="img-fluid"
            src="https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png"
            alt="user"
          />
        </div>
        <div className="team-content">
          <h3 className="name"> {Client ? Client.fullname : "Name"}</h3>
          <h4 className="title">{Client ? Client.email : "Email"}</h4>
          <h4 className="title">{Client ? Client.phone : "Phone"}</h4>

          <div className="client-btns">
            <Button variant="primary">Edit</Button>

            <Button variant="danger">Delete</Button>
          </div>
          <Link to="/society">
            <Button variant="primary">
              {Supplier ? (
                Supplier.society ? (
                  "Add product"
                ) : (
                  "Sold products "
                )
              ) : (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </Button>
          </Link>
        </div>
      </div>
      <div className="purchased">
        <h4 style={{ margin: "-5% 0% 10% 0%" }}>Purchased products</h4>
        {error ? <Errors error={error} /> : null}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Products</th>
              <th>Total</th>
              <th>Purchase Date</th>
              <th>Shipping Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          {purchases ? (
            <tbody>
              {purchases.map((el, i) =>
                el.client._id === Client._id ? (
                  <tr key={i}>
                    <td>{el._id}</td>
                    <td>
                      <Form.Control as="select">
                        {el.products.map((el, i) => (
                          <option key={i}>{el.name}</option>
                        ))}
                      </Form.Control>
                    </td>
                    <td>{el.total}DT</td>
                    <td>{el.purchaseDate.split("T")[0]}</td>
                    <td>{el.shippingDate.split("T")[0]}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => dispatch(delete_purchase(el._id))}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          ) : null}
        </Table>
      </div>
    </section>
  );
};

export default Profile;
