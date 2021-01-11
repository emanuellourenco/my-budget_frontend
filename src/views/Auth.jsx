import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "antd";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

function Auth() {
  const [form, setForm] = useState("login");
  const history = useHistory();

  const changeForm = () => {
    if (form === "login") {
      setForm("signup");
      history.push("/signup");
    } else {
      setForm("login");
      history.push("/login");
    }
  };

  let loginClass = "auth auth__login";
  let signupClass = "auth auth__signup";
  let blockClass = "auth auth__block";
  let buttonLabel;

  if (form === "login") {
    signupClass += " hide--signup";
    blockClass += " hide--signup";
    buttonLabel = "Signup";
  } else {
    loginClass += " hide--login";
    blockClass += " hide--login";
    buttonLabel = "Login";
  }

  return (
    <div className="auth">
      <Login className={loginClass} />
      <div className={blockClass}>
        <Row>
          <Col span="24">
            {form === "login" ? (
              <>
                <p>Don't have account?</p>
                <p>Register Now!</p>
              </>
            ) : (
              <>
                <p>Already have account?</p>
                <p>Login Now!</p>
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <Button onClick={() => changeForm()}>{buttonLabel}</Button>
          </Col>
        </Row>
      </div>
      <Signup className={signupClass} />
    </div>
  );
}

export default Auth;
