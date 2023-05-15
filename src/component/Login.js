import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../service/OnlineService";

export const API_BASE_URL = "http://localhost:8080";
export const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";
export const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const ACCESS_TOKEN = "accessToken";

const Login = (props) => {
  const [authenticated, setAuthenticated] = useState();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.authenticated) {
      navigate("/");
    }
  }, [props.authenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const loginRequest = Object.assign({}, loginData);
    login(loginRequest)
      .then((response) => {
        const id = toast.loading("Logging in please wait...");
        setTimeout(() => {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          setAuthenticated(true);
          toast.update(id, { render: "Logged in successfully!", type: "success", isLoading: false });
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        let errors = {};
        errors.email = true;
        errors.password = true;
        setErrors(errors);
        toast.error("Incorrect username or Password")
      });
  };

  const validateForm = () => {
    let errors = {};

    if (!loginData.email) {
      errors.email = "Please enter email.";
    }
    if (!loginData.password) {
      errors.password = "Please enter password.";
    }
    return errors;
  };

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  return (
    <section>
      <Container className="login-form">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow login-card">
              <Card.Body>
                <h3 className="fw-bold text-secondary my-1">Welcome!</h3>
                <h6 className="text-secondary mb-4">
                  Log in or register to continue
                </h6>
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="my-3 py-2"
                      name="email"
                      value={loginData.email}
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
                      value={loginData.password}
                      onChange={handleChange}
                      isInvalid={errors.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-center mt-3">
                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 rounded-pill my-2 py-2 fw-semibold"
                    >
                      LOGIN
                    </Button>
                    <Link to={"/register"}>
                      <Button
                        variant="outline-success"
                        className="w-100 rounded-pill my-2 py-2 fw-semibold"
                      >
                        REGISTER
                      </Button>
                    </Link>
                  </div>
                </Form>
                <span className="d-flex justify-content-center my-2 text-secondary">
                  or continue with
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

export default Login;
