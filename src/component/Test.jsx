import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { baseURL } from "../constant";

// import { redirect } from "react-router-dom";
function Test() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <Container className="w-75" style={{ paddingTop: "5px" }}>
      <Row>
        <Col xs="12" md="12">
          <input
            type="name"
            label="Name"
            placeholder="Name"
            className="form-control my-3"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            id="name"
          />
        </Col>
        <Col xs="12" md="12">
          <input
            required
            placeholder="surname"
            className="form-control my-3"
            type="surname"
            label="surname"
            name="surname"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            id="surname"
          />
        </Col>
        <Col xs="12" md="12">
          <input
            placeholder="email"
            className="form-control my-3"
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email"
            name="email"
            id="email"
          />
        </Col>
        <Col xs="12" md="12">
          <input
            required
            type="password"
            label="Password"
            placeholder="password"
            className="form-control my-3"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
          />
        </Col>
        <Col xs="12" md="12">
          <input
            required
            placeholder="Confirm Password"
            className="form-control my-3"
            type="password"
            label="Confirm Password"
            name="confirmedPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Col>

        <Col xs="12 my-2" className="">
          <button
            className=" badge bg-success w-25 p-2 fs-6 rounded-1 "
            onClick={async () => {
              await axios
                .post(baseURL + "/create_user", {
                  name: name,
                  surname: surname,
                  email: email,
                  password: password,
                  confirmPassword: confirmPassword,
                })
                .then((response) => {
                  if (response.status === 200) {
                    window.location.href = "/admin";
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            type="submit"
          >
            Register
          </button>
        </Col>
        <Col xs="12 my-2" className="">
          <Link to="/login">
            <button
              className="badge bg-success w-25 p-2 fs-6 rounded-1 "
              type="submit"
            >
              Login
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Test;
