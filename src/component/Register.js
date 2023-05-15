import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { register } from "../service/OnlineService";
import { useNavigate as navigate, Link} from "react-router-dom";
import { toast } from "react-toastify";

export const API_BASE_URL = "http://localhost:8080";
export const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";
export const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;

const Register = (props) => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    if (props.authenticated) {
      navigate("/");
    }
  }, [props.authenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { confirmpassword, ...requestWithoutConfirmPassword } = registrationData;
    const registrationRequest = Object.assign({}, registrationData);
    register(registrationData)
    .then(response => {
      toast.success("You're successfully registered. Please login to continue!");
      navigate("/login");
  }).catch(error => {
      toast.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
  });
  };

  const handleChange = (event) => {

    const { name, value } = event.target;
    const error = validateForm(name, value);
    setRegistrationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const validateForm = (fieldName, value) => {
    let error = "";
    if (fieldName === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email address";
      }
    } else if (fieldName === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      }
    } else if (fieldName === "passwordConfirmation") {
      if (!value) {
        error = "Confirm password is required";
      } else if (value !== registrationData.password) {
        error = "Passwords do not match";
      }
    } else if (fieldName === "userName") {
      if (!value) {
        error = "Full Name is required!";
      }
    }
    return error;
  };

  return (
    <section>
      <Container className="login-form">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow login-card">
              <Card.Body>
                <h4 className="fw-bold text-secondary my-1">
                  Register with <br/>Know-Your-Neighborhood
                </h4>
                <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      className="my-3 py-2"
                      name="userName"
                      onChange={handleChange}
                      isInvalid={errors.userName}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.userName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="my-3 py-2"
                      name="email"
                      onChange={handleChange}
                      isInvalid={errors.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="my-3 py-2"
                      name="password"
                      onChange={handleChange}
                      isInvalid={errors.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      className="my-3 py-2"
                      name="passwordConfirmation"
                      onChange={handleChange}
                      isInvalid={errors.passwordConfirmation}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.passwordConfirmation}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-center mt-3">
                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 rounded-pill my-2 py-2 fw-semibold"
                    >
                      Register
                    </Button>
                    <span>Already have an account? <Link to="/login"  className="login-link">Login here</Link>.</span>
                  </div>
                </Form>
                <span className="d-flex justify-content-center my-2 text-secondary">
                  or register with
                </span>
                <Row className="my-3">
                  <Col sm={6}>
                    <Button
                      variant="primary"
                      href={FACEBOOK_AUTH_URL}
                      className="w-100 my-1"
                    >
                      <FaFacebook /> Facebook
                    </Button>
                  </Col>
                  <Col sm={6}>
                    <Button
                      variant="danger"
                      href={GOOGLE_AUTH_URL}
                      className="w-100 my-1"
                    >
                      <FaGoogle /> Google
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="px-4">
                    <span className="text-secondary fs-6">
                      By registering, you agree to our{" "}
                      <span className="text-success fw-semibold">
                        Terms and Conditions
                      </span>{" "}
                      and{" "}
                      <span className="text-success fw-semibold">
                        Privacy Policy
                      </span>
                      .
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="jusify-content-md-center">
          <Col xs={12} md={6} lg={4}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
