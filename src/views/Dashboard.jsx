import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Radio } from "antd";
import MainLayout from "../components/layout/MainLayout";
import { Chart } from "react-charts";

function Login() {
  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const [graphType, setGraphType] = useState("2");
  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  /**
   * Get transaction data
   */
  useEffect(() => {
    axios
      .post(`${url}/transactions/charts`, { token, graphType })
      .then(({ data }) => {
        setTransactions(data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphType]);

  const getTransactions = () => {};

  const data = React.useMemo(() => {
    let income = [];
    let expense = [];
    let profit = [];

    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (!!transactions && transactions.data) {
      income = transactions.data.map((item, index) => {
        const label =
          graphType === "1" || graphType === "2" ? monthList[index] : index;
        return { x: label, y: item.income };
      });

      expense = transactions.data.map((item, index) => {
        const label =
          graphType === "1" || graphType === "2" ? monthList[index] : index;
        return { x: label, y: item.expense };
      });
    }

    return [
      { label: "Income", datums: income },
      { label: "Expenses", datums: expense },
    ];
  }, [transactions]);

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "ordinal" },
      { position: "left", type: "linear" },
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
            {parseFloat(transactions.income).toFixed(2)}€
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <Card
            title="Expense"
            className="dashboard__card dashboard__card--expensive"
          >
            {parseFloat(transactions.expense).toFixed(2)}€
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <Card
            title="Profit"
            className="dashboard__card dashboard__card--profit"
          >
            {parseFloat(transactions.income - transactions.expense).toFixed(2)}€
          </Card>
        </Col>
      </Row>
      <Row style={{ height: "500px", padding: "50px 100px" }}>
        <Col span="24">
          <Radio.Group
            onChange={(e) => setGraphType(e.target.value)}
            defaultValue={graphType}
          >
            <Radio.Button value="1">Last Year</Radio.Button>
            <Radio.Button value="2">This Year</Radio.Button>
            <Radio.Button value="3">Last Month</Radio.Button>
            <Radio.Button value="4">This Month</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span="24">
          <Chart data={data} series={series} axes={axes} tooltip />
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Login;
