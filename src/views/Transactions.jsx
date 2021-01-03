import React from "react";
import { DatePicker, Row, Col, Card, Table, Tag, Space } from "antd";
import MainLayout from "../components/layout/MainLayout";

function Transactions() {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.age - b.age,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.age - b.age,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <Space size="middle">Edit | Delete</Space>,
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      value: "80,00€",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      value: "20,00€",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      value: "-20,00€",
      tags: ["cool", "teacher"],
    },
  ];

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <MainLayout>
      <Row>
        <Col span="24">
          <Card>
            <DatePicker onChange={onChange} />
            <DatePicker onChange={onChange} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Transactions;
