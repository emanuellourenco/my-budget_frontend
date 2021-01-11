import React from "react";
import { Button, Row, Col } from "antd";
import Input from "../form/Input";
import InputPassword from "../form/InputPassword";

function Login(props) {
  const { className } = props;

  const submitForm = () => {
    alert("login fail!");
  };

  return (
    <div className={className}>
      <div className="signup__block">
        <Row justify="center">
          <Col span="12">
            <h1>Signup</h1>
            <Input label="Name" name="name" />
            <Input label="Email" name="email" />

            <InputPassword label="Password" name="password" />
            <InputPassword label="Password" name="password2" />
            <Col>
              <Button className="signup__button" shape="round" onClick={() => submitForm()}>
                Signup
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
