import React from "react";
import { Button } from "react-bootstrap";
import "./Error.css";
const Error = (props) => {
  console.log(props);

  return (
    <div className="Error">
      <img
        src="https://www.emaginance.com/wp-content/uploads/2018/05/404-not-found-error.jpg"
        alt="Error"
      />
      <Button variant="danger" onClick={() => props.history.goBack()}>
        Go Back
      </Button>
    </div>
  );
};

export default Error;
