import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "antd";
import Input from "../form/Input";
import InputPassword from "../form/InputPassword";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_URL;
  const history = useHistory();

  const submitForm = () => {
    axios
      .post(`${url}/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        const { status, token, message } = data;

        if (status === "error") {
          setError(message);
        }

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
    <div className="login__block">
      <Row justify="center">
        <Col span="12">
          <h1>{t("Login")}</h1>
          <Input
            label={t("Email")}
            name="loginEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputPassword
            label={t("Password")}
            name="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Col span="24">
            {!!error && <span className="login__error">{error}</span>}
            <Row justify="center">
              <Button
                className="login__button"
                shape="round"
                onClick={() => submitForm()}
              >
                {t("Login")}
              </Button>
            </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
