import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return setError("Please fill all fields");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Password can not be less than 6 characters");
    }
    try {
      setError("");
      setLoading(true);
      console.log("Success");
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Login failed ");
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>{" "}
            <Button disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
