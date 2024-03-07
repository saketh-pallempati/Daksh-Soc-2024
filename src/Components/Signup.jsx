import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export const SignUp = () => {
  const formInitialDetails = {
    username: "",
    email: "",
    password: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      "https://daksh-soc-backend.vercel.app/signup",
      formDetails
    );
    console.log(response);
    if (response.data.status === true) {
      setStatus({ success: true, message: "Submitted Successfully" });
      window.location.hash = "connect";
    } else {
      setStatus({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <section className="contact1" id="connect1">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col size={12} sm={15} className="px-1">
                  <input
                    type="text"
                    value={formDetails.username}
                    placeholder="Username"
                    onChange={(e) => onFormUpdate("username", e.target.value)}
                  />
                </Col>
                <Col size={12} sm={15} className="px-1">
                  <input
                    type="email"
                    value={formDetails.email}
                    placeholder="Email"
                    onChange={(e) => onFormUpdate("email", e.target.value)}
                  />
                </Col>
                <Col size={12} sm={15} className="px-1">
                  <input
                    type="password"
                    value={formDetails.password}
                    placeholder="Password"
                    onChange={(e) => onFormUpdate("password", e.target.value)}
                  />
                </Col>
                <Col size={12} className="px-1">
                  <button type="submit">
                    <span>Sign Up</span>
                  </button>
                </Col>
                {status.message && (
                  <Col>
                    <p
                      className={
                        status.success === false ? "danger" : "success"
                      }
                    >
                      {status.message}
                    </p>
                  </Col>
                )}
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
