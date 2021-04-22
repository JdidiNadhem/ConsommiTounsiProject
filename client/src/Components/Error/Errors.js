import React, { useState, useEffect } from "react";

import { Alert } from "react-bootstrap";

const Errors = ({ error }) => {
  const [alert, setAlert] = useState(true);
  useEffect(() => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [error]);
  return alert && <Alert variant="danger">{error.msg}</Alert>;
};

export default Errors;
