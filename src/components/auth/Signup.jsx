import React, { useReducer, useState } from "react";
import { Button, Row, Col } from "antd";
import Input from "../form/Input";
import InputPassword from "../form/InputPassword";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const url = process.env.REACT_APP_URL;
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      password: "",
      password2: "",
    }
  );

  const submitForm = () => {
    axios
      .post(`${url}/signup`, user)
      .then(({ data }) => {
        if (data.status === "success") {
          // Login user after sign up
          axios
            .post(`${url}/login`, {
              email: user.email,
              password: user.password,
            })
            .then(({ data }) => {
              const { token } = data;

              if (!!token) {
                localStorage.setItem("token", token);
                history.push("/");
              }
            });
        } else {
          // If sign up fails, show the errors
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  /**
   * Change input data
   * @param {Object} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ [name]: value });
  };

  return (
    <div className="signup__block">
      <Row justify="center">
        <Col span="12">
          <h1>{t("Sign Up")}</h1>
          <Input
            label={t("Name")}
            name="name"
            value={user.name}
            onChange={handleChange}
            errors={errors}
          />
          <Input
            label={t("Email")}
            name="email"
            value={user.email}
            onChange={handleChange}
            errors={errors}
          />

          <InputPassword
            label={t("Password")}
            name="password"
            value={user.password}
            onChange={handleChange}
            errors={errors}
          />
          <InputPassword
            label={t("Password")}
            name="password2"
            value={user.password2}
            onChange={handleChange}
            errors={errors}
          />
          <Col>
            <Button
              className="signup__button"
              shape="round"
              onClick={() => submitForm()}
            >
              {t("Sign Up")}
            </Button>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
