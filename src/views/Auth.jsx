import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "antd";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

function Auth() {
  const history = useHistory();
  const [form, setForm] = useState("login");
  const [hideForm, setHideForm] = useState(false);
  let buttonLabel = form === "login" ? "Signup" : "Login";

  const toggleForm = () => {
    const action = form === "login" ? "signup" : "login";

    setForm(action);
    setHideForm(true);
    history.push(`/${action}`);
  };

  /**
   * Render Login or Signup form
   */
  const renderForm = () => {
    return form === "login" ? <Login /> : <Signup />;
  };

  /**
   * Show selected form after 1s
   */
  useEffect(() => {
    if (hideForm) {
      setTimeout(() => setHideForm(false), 1000);
    }
  }, [hideForm]);

  return (
    <div className="auth">
      <div className={`auth auth--form ${form === "login" ? "left" : "right"}`}>
        {!hideForm && renderForm()}
      </div>
      <div className={`auth auth--info ${form === "login" ? "right" : "left"}`}>
        <div className="info__block">
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
              <Button onClick={() => toggleForm()}>{buttonLabel}</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Auth;
