import React from "react";
import { Row, Col, Card, Table, Space, Select, Tag } from "antd";
import MainLayout from "../components/layout/MainLayout";
import Input from "../components/form/Input";

function Tags() {
  const colors = [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Yellow", value: "yellow" },
    { label: "Pink", value: "pink" },
    { label: "Brown", value: "brown" },
    { label: "Grey", value: "grey" },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => <Tag color={record.color}>{text}</Tag>,
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
      name: "Salary",
      color: "green",
    },
    {
      key: "2",
      name: "Shop",
      color: "blue",
    },
    {
      key: "3",
      name: "Car",
      color: "red",
    },
  ];

  function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
      <Tag
        color={value}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  return (
    <MainLayout>
      <Row>
        <Col span="24">
          <Card>
            <Input name="name" />
            <Select
            //  mode="multiple"
              className="tags__select"
              style={{ width: "100%" }}
              optionLabelProp="label"
              tagRender={tagRender}
              options={colors}
            />
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

export default Tags;
