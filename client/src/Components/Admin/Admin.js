import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_clients,
  get_suppliers,
  get_admin_products,
  delete_client,
  initialize_suppliers,
} from "../../JS/Actions/admin";

import { Table, Button } from "react-bootstrap";

import "./Admin.css";

const Admin = () => {
  const Clients = useSelector((state) => state.adminReducer.Clients);
  const Suppliers = useSelector((state) => state.adminReducer.Suppliers);
  const Products = useSelector((state) => state.adminReducer.Products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_clients());
    dispatch(get_suppliers());
    dispatch(get_admin_products());
  }, [dispatch]);
  return (
    <div className="Admin">
      <h3 style={{ marginBottom: "5%" }}>
        <i className="fas fa-user-shield">Admin</i>
      </h3>
      <div className="list Clients">
        <h4>Clients</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>CIN</th>
              <th>Fullname</th>
              <th>Adress</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {Clients
              ? Clients.map((el, i) => (
                  <tr key={i}>
                    <td>{el._id}</td>
                    <td>{el.cin}</td>
                    <td>{el.fullname}</td>
                    <td>{el.adress}</td>
                    <td>{el.email}</td>
                    <td>
                      <Button variant="primary">
                        <i className="far fa-edit"></i>
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          dispatch(delete_client(el._id));
                          dispatch(get_suppliers());
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
      <div className="list Suppliers">
        <h4>Societies</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Society Name</th>
              <th>Type</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {Suppliers
              ? Suppliers.map((el, i) => (
                  <tr key={i}>
                    <td>{el._id}</td>
                    <td>{el.societyname}</td>
                    <td>{el.type}</td>
                    <td>{el.phone}</td>
                    <td>
                      <Button variant="primary">
                        <i className="far fa-edit"></i>
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => dispatch(initialize_suppliers(el._id))}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
      <div className="list Products">
        <h4>Products</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Products ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {Products
              ? Products.map((el, i) => (
                  <tr key={i}>
                    <td>{el._id}</td>
                    <td>
                      <img className="prod-img" src={el.image} alt="product" />
                    </td>
                    <td>{el.name}</td>
                    <td>{el.categorie}</td>
                    <td>{el.description}</td>
                    <td>{el.price}</td>
                    <td>{el.rating}</td>
                    <td>
                      <Button variant="primary">
                        <i className="far fa-edit"></i>
                      </Button>
                    </td>
                    <td>
                      <Button variant="danger">
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
