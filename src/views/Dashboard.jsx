import React from "react";
import { Card, Row, Col } from "antd";
import MainLayout from "../components/layout/MainLayout";

function Login() {
  return (
    <MainLayout>
      <Row>
        <Col sm={24} md={12} lg={8}>
          <Card
            title="Income"
            className="dashboard__card dashboard__card--income"
          >
            100,00€
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <Card
            title="Expense"
            className="dashboard__card dashboard__card--expensive"
          >
            20,00€
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <Card
            title="Profit"
            className="dashboard__card dashboard__card--profit"
          >
            80,00€
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Login;
