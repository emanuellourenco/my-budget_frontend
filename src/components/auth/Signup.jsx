import React, { useReducer } from "react";
import { Button, Row, Col } from "antd";
import Input from "../form/Input";
import InputPassword from "../form/InputPassword";
import axios from "axios";

function Login() {
  const url = process.env.REACT_APP_URL;
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
        console.log("🚀 ~ .then ~ data", data);
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
          <h1>Signup</h1>
          <Input
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <InputPassword
            label="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <InputPassword
            label="Password"
            name="password2"
            value={user.password2}
            onChange={handleChange}
          />
          <Col>
            <Button
              className="signup__button"
              shape="round"
              onClick={() => submitForm()}
            >
              Signup
            </Button>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
