import SignUp from "./components/SignUp";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
function App() {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: 400 }}>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update-profile" element={<UpdateProfile />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Container>
    </>
  );
}

export default App;
