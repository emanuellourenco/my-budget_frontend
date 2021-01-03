import React from "react";
import { Card, Row, Col } from "antd";
import MainLayout from "../components/layout/MainLayout";

function Login() {
  return (
    <MainLayout>
      <Row>
        <Col sm={24} md={12} lg={8}>
          <Card title="Income">100,00€</Card>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <Card title="Expense">20,00€</Card>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <Card title="Profit">80,00€</Card>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Login;
