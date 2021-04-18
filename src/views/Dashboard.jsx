import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Radio } from "antd";
import MainLayout from "../components/layout/MainLayout";
import { Chart } from "react-charts";
import { MONTHS } from "../variables/globalVariables";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const [graphTime, setGraphTime] = useState("2");
  const series = React.useMemo(() => ({ type: "bar" }), []);

  /**
   * Get transaction data every time te graph time.
   */
  useEffect(() => {
    axios
      .post(`${url}/transactions/charts`, { token, graphTime })
      .then(({ data }) => {
        setTransactions(data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphTime]);

  const data = React.useMemo(() => {
    let income = [];
    let expense = [];

    if (!!transactions && transactions.data) {
      income = transactions.data.map((item, index) => {
        const label =
          graphTime === "1" || graphTime === "2" ? MONTHS[index] : index;
        return { x: label, y: item.income };
      });

      expense = transactions.data.map((item, index) => {
        const label =
          graphTime === "1" || graphTime === "2" ? MONTHS[index] : index;
        return { x: label, y: item.expense };
      });
    }

    return [
      { label: t("Income"), datums: income },
      { label: t("Expense"), datums: expense }
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "ordinal" },
      { position: "left", type: "linear" }
    ],
    []
  );

  return (
    <MainLayout>
      <Row>
        <Col sm={24} md={12} lg={8}>
          <Card
            title={t("Income")}
            className="dashboard__card dashboard__card--income"
          >
            {parseFloat(transactions.income).toFixed(2)}€
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <Card
            title={t("Expense")}
            className="dashboard__card dashboard__card--expensive"
          >
            {parseFloat(transactions.expense).toFixed(2)}€
          </Card>
        </Col>
        <Col sm={24} md={12} lg={8}>
          <Card
            title={t("Profit")}
            className="dashboard__card dashboard__card--profit"
          >
            {parseFloat(transactions.income - transactions.expense).toFixed(2)}€
          </Card>
        </Col>
      </Row>
      <Row className="dashboard__chart">
        <Col span="24">
          <Radio.Group
            onChange={e => setGraphTime(e.target.value)}
            defaultValue={graphTime}
            className="dashboard--radio"
          >
            <Radio.Button value="1">{t("Last Year")}</Radio.Button>
            <Radio.Button value="2">{t("This Year")}</Radio.Button>
            <Radio.Button value="3">{t("Last Month")}</Radio.Button>
            <Radio.Button value="4">{t("This Month")}</Radio.Button>
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
