import React from "react";
import { Card, Row, Col } from "antd";
import MainLayout from "../components/layout/MainLayout";
import { Chart } from "react-charts";

function Login() {
  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "ordinal" },
      { position: "left", type: "linear", stacked: false },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        datums: [
          { x: "Jan", y: 60 },
          { x: "Feb", y: 23 },
          { x: "Mar", y: 65 },
          { x: "Apr", y: 84 },
          { x: "May", y: 87 },
          { x: "Jun", y: 84 },
          { x: "Jul", y: 96 },
          { x: "Agu", y: 88 },
          { x: "Sep", y: 63 },
          { x: "Oct", y: 60 },
        ],
      },
      {
        label: "Series 2",
        datums: [
          { x: "Jan", y: 41 },
          { x: "Feb", y: 15 },
          { x: "Mar", y: 95 },
          { x: "Apr", y: 96 },
          { x: "May", y: 33 },
          { x: "Jun", y: 96 },
          { x: "Jul", y: 32 },
          { x: "Agu", y: 49 },
          { x: "Sep", y: 18 },
          { x: "Oct", y: 69 },
        ],
      },
    ],
    []
  );

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
      <Row style={{ height: "500px", padding: "50px 100px" }}>
        <Col span="24">
          <Chart data={data} series={series} axes={axes} tooltip />
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Login;
