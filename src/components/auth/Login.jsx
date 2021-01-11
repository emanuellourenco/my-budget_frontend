import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "antd";
import Input from "../form/Input";
import InputPassword from "../form/InputPassword";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { className } = props;
  const url = process.env.REACT_APP_URL;
  const history = useHistory();

  const submitForm = () => {
    axios
      .post(`${url}/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        const { token } = data;

        if (!!token) {
          localStorage.setItem("token", token);
          history.push("/");
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <div className={className}>
      <div className="login__block">
        <Row justify="center">
          <Col span="12">
            <h1>Login</h1>
            <Input
              label="Email"
              name="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputPassword
              label="Password"
              name="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Col span="24">
              <Row justify="center">
                <Button
                  className="login__button"
                  shape="round"
                  onClick={() => submitForm()}
                >
                  Login
                </Button>
              </Row>
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
