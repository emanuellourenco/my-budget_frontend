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
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear", stacked: false },
    ],
    []
  );
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        datums: [
          {
            x: new Date("2020-03-18T11:00:00.000Z"),
            y: 60,
          },
          {
            x: new Date("2020-03-18T11:30:00.000Z"),
            y: 23,
          },
          {
            x: new Date("2020-03-18T12:00:00.000Z"),
            y: 65,
          },
          {
            x: new Date("2020-03-18T12:30:00.000Z"),
            y: 84,
          },
          {
            x: new Date("2020-03-18T13:00:00.000Z"),
            y: 87,
          },
          {
            x: new Date("2020-03-18T13:30:00.000Z"),
            y: 84,
          },
          {
            x: new Date("2020-03-18T14:00:00.000Z"),
            y: 96,
          },
          {
            x: new Date("2020-03-18T14:30:00.000Z"),
            y: 88,
          },
          {
            x: new Date("2020-03-18T15:00:00.000Z"),
            y: 63,
          },
          {
            x: new Date("2020-03-18T15:30:00.000Z"),
            y: 60,
          },
        ],
      },
      {
        label: "Series 2",
        datums: [
          {
            x: new Date("2020-03-18T11:00:00.000Z"),
            y: 41,
          },
          {
            x: new Date("2020-03-18T11:30:00.000Z"),
            y: 15,
          },
          {
            x: new Date("2020-03-18T12:00:00.000Z"),
            y: 95,
          },
          {
            x: new Date("2020-03-18T12:30:00.000Z"),
            y: 96,
          },
          {
            x: new Date("2020-03-18T13:00:00.000Z"),
            y: 33,
          },
          {
            x: new Date("2020-03-18T13:30:00.000Z"),
            y: 96,
          },
          {
            x: new Date("2020-03-18T14:00:00.000Z"),
            y: 32,
          },
          {
            x: new Date("2020-03-18T14:30:00.000Z"),
            y: 49,
          },
          {
            x: new Date("2020-03-18T15:00:00.000Z"),
            y: 18,
          },
          {
            x: new Date("2020-03-18T15:30:00.000Z"),
            y: 69,
          },
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
      <Row style={{ height: "500px" }}>
        <Col span="24">
          <Chart data={data} series={series} axes={axes} tooltip />
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Login;
