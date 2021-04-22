import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth_supplier } from "../../JS/Actions/supplier";

import AddProduct from "../AddProduct/AddProduct";
import Errors from "../Error/Errors";
import { Spinner, Card, Form, Button } from "react-bootstrap";

const SocietyCard = ({ Supplier, errors }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSociety, setIsSociety] = useState(
    Supplier ? Supplier.society : false
  );
  const [societyname, setSocietyname] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="society-card">
      {Supplier ? (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://take.expert/wp-content/uploads/2021/01/company-logo-default.svg"
          />
          {Supplier.society ? (
            <Card.Body>
              <Card.Title>Society</Card.Title>
              <Card.Text>
                <h6>Society Name:</h6>
                {Supplier.societyname}
              </Card.Text>
              <Card.Text>
                <h6>Society type:</h6>
                {Supplier.type}
              </Card.Text>
              <Card.Text>
                <h6>Phone:</h6>
                {Supplier.phone}
              </Card.Text>
              <Button variant="primary" onClick={handleShow}>
                Add product
              </Button>
              <AddProduct handleClose={handleClose} show={show} edit={false} />
            </Card.Body>
          ) : isSociety ? (
            <Form>
              {errors.length > 0 ? <Errors error={errors[0]} /> : null}
              <Form.Control
                placeholder="Society Name"
                onChange={(e) => setSocietyname(e.target.value)}
              />
              <Form.Control
                placeholder="Society Type"
                onChange={(e) => setType(e.target.value)}
              />
              <Form.Control
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={() =>
                  dispatch(auth_supplier(societyname, type, phone))
                }
              >
                Add society
              </Button>
              <Button variant="danger" onClick={() => setIsSociety(!isSociety)}>
                Hide
              </Button>
            </Form>
          ) : (
            <Button variant="primary" onClick={() => setIsSociety(!isSociety)}>
              Add society
            </Button>
          )}
        </Card>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default SocietyCard;
