import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "./anim.json";

import axios from "axios";
import { input } from "formik";
import { Col, Container, Row } from "reactstrap";
import { baseURL } from "../../constant";

// import { baseUrl } from "../../constant";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Login(props) {
  const [msg, setMsg] = useState("");
  const [no, setNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {}, [msg]);
  return (
    <Container>
      <Lottie options={defaultOptions} height={350} width={350} />
      <Container className="d-flex justify-content-center">
        <Container className="w-75" style={{ paddingTop: "5px" }}>
          <h6 className="text-center text-danger"> {no}</h6>
          <Row>
            <Col xs="12" md="12">
              <input
                required
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                className="form-control my-2"
                placeholder="EMAIL"
              />
            </Col>
            <Col xs="12" md="12">
              <input
                className="form-control my-2"
                placeholder="PASSWORD"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={!showPassword ? "password" : "text"}
                label="Password"
                name="password"
                id="password"
              />
              <p
                role={"button"}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="fs-5"
              >
                {!showPassword ? "Show passowrd 👀" : "Hide password 🫣"}
              </p>
            </Col>

            <Col xs="12" md="12">
              <button
                type="submit"
                onClick={async () => {
                  axios
                    .post(baseURL + "/login", {
                      email: email,
                      password: password,
                    })
                    .then(function async(response) {
                      if (
                        response.status === 200 ||
                        response.statusText === "OK"
                      ) {
                        axios
                          .post(baseURL + "/updateLoginTime", { email })
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                        console.log("redirecting to ...");
                        window.location.href = "/admin";
                      }
                    })
                    .catch(function (error) {
                      console.log(error.message);
                      if (
                        error.message == "Request failed with status code 401"
                      ) {
                        setNo("not authorized");
                      } else {
                        setNo("Invalid password or email address");
                      }
                    });
                }}
                className="badge bg-info  w-25 p-3 fs-5 my-4 rounded-3 "
              >
                Login
              </button>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
}

export default Login;
