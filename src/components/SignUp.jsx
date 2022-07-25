import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Password can not be less than 6 characters");
    }
    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      passwordConfirmRef.current.value === ""
    ) {
      return setError("Please fill all fields");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setLoading(false);
      setError("Failed to create an account");
      console.log(error);
      console.log(process.env.REACT_APP_FIREBASE_API_KEY);
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center">Already have an account? Log In</div>
    </>
  );
};

export default SignUp;
