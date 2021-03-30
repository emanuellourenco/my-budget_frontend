import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Row, Col, Card } from "antd";
import MainLayout from "../components/layout/MainLayout";
import { useTranslation } from "react-i18next";

function Settings() {
  const { t } = useTranslation();
  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      user: {}
    }
  );

  const getUser = () => {
    axios
      .get(`${url}/user`, { token })
      .then(({ data }) => {
        const newDate = new Date(data.created_at);
        data.date = `${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDate()}`;
        setData({ user: data });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <MainLayout>
      <Card>
        <Row>
          <Col span="18">
            <h1>{t("Settings")}</h1>
          </Col>
        </Row>
        <Row>
          <Col span="24">Name: {data.user.name}</Col>
          <Col span="24">Email: {data.user.email}</Col>
          <Col span="24">Created: {!!data.user && data.user.date}</Col>
        </Row>
      </Card>
    </MainLayout>
  );
}

export default Settings;
