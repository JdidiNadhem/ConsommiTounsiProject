import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { add_product } from "../../JS/Actions/supplier";
import { useDispatch, useSelector } from "react-redux";
import Errors from "../Error/Errors";
const AddProduct = ({ handleClose, show }) => {
  const [name, setName] = useState("");
  const [categorie, setCat] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.supplierReducer.errors);
  const uploadFileHandler = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);

      const config = {
        headers: {
          "Content-Type": "multypart/form-data",
        },
      };

      const result = await axios.post("/api/uploadimg", formData, config);
      setImage(result.data);

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errors.length !== 0 ? <Errors error={errors[0]} /> : null}
        <Form>
          <Form.Control
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Form.Control as="select" onChange={(e) => setCat(e.target.value)}>
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
          <Form.File
            id="image-file"
            label="Choose Photo"
            custom
            onChange={uploadFileHandler}
          ></Form.File>
          {uploading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
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
              add_product(name, categorie, description, price, barcode, image)
            );
            setName("");
            setCat("");
            setDesc("");
            setPrice("");
            setBarcode("");
            setImage("");
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProduct;
