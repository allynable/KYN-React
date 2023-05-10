import { useState } from "react";
import { Modal, Container, Form, Button, Row, Col } from "react-bootstrap";

const StoreForm = (props) => {
  const [storeData, setStoreData] = useState({
    storeId: props.storeData ? props.storeData.storeId : null,
    storeName: props.storeData ? props.storeData.storeName : null,
    storeLocation: props.storeData ? props.storeData.storeLocation : null,
    storeAddress: props.storeData ? props.storeData.storeAddress : null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStoreData({ ...storeData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
      props.onSubmit(storeData);
      props.setShow(false);
  };

  const validateForm = () => {
    let errors = {};
    if (!storeData.storeName) {
      errors.storeName = "Please provide a store name.";
    }
    if (!storeData.storeLocation) {
      errors.storeLocation = "Please provide a store location.";
    }
    if (!storeData.storeAddress) {
      errors.storeAddress = "Please provide a store address.";
    }
    return errors;
  };

  const handleClose = () => {
    props.setShow(false);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Store
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Store Name:</Form.Label>
              <Form.Control
                type="text"
                name="storeName"
                value={storeData.storeName}
                onChange={handleInputChange}
                required
                isInvalid={errors.storeName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.storeName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Store Location:</Form.Label>
              <Form.Control
                type="text"
                name="storeLocation"
                value={storeData.storeLocation}
                onChange={handleInputChange}
                required
                isInvalid={errors.storeLocation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.storeLocation}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Store Address:</Form.Label>
              <Form.Control
                type="text"
                name="storeAddress"
                value={storeData.storeAddress}
                onChange={handleInputChange}
                required
                isInvalid={errors.storeAddress}
              />
              <Form.Control.Feedback type="invalid">
                {errors.storeAddress}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="text-center">
              <Row className="text-center">
                <Col className="mt-3">
                  <Button
                    type="submit"
                    className={`btn mx-2 ${
                      storeData.storeId ? "btn-warning" : "btn-success"
                    }`}
                  >
                    {storeData.storeId ? "Update" : "Submit"}
                  </Button>
                  <Button onClick={handleClose} className="btn btn-danger mx-2">
                    Cancel
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default StoreForm;
