import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Menu, Dropdown, Avatar } from "antd";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import i18n, { langOptions } from "../config/i18n";
import { useTranslation } from "react-i18next";

function Auth() {
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = history.location;
  const formUrl = pathname === "/signup" ? "signup" : "login";
  formUrl.replace("\\", "");
  const [form, setForm] = useState(formUrl);
  const [hideForm, setHideForm] = useState(false);
  let buttonLabel = form === "login" ? t("Sign Up") : t("Login");
  const currentLanguage = i18n.language;

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

  const langMenu = (
    <Menu selectedKeys={currentLanguage}>
      {langOptions.map((option) => (
        <Menu.Item key={option} onClick={() => changeLanguage(option)}>
          {option.toUpperCase()}
        </Menu.Item>
      ))}
    </Menu>
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="auth">
      <div className="auth--lang-selector">
        <Dropdown
          overlay={langMenu}
          placement="bottomRight"
          arrow
          trigger="click"
        >
          <Avatar>{currentLanguage.toUpperCase()}</Avatar>
        </Dropdown>
      </div>

      <div className={`auth auth--form ${form === "login" ? "left" : "right"}`}>
        {!hideForm && renderForm()}
      </div>
      <div className={`auth auth--info ${form === "login" ? "right" : "left"}`}>
        <div className="info__block">
          <Row>
            <Col span="24">
              {form === "login" ? (
                <>
                  <p>{t("Don't have account?")}</p>
                  <p>{t("Register Now!")}</p>
                </>
              ) : (
                <>
                  <p>{t("Already have account?")}</p>
                  <p>{t("Login Now!")}</p>
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
