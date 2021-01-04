import React, { useState } from "react";
import { Row, Col, Card, Table, Tag, Button, Tooltip } from "antd";
import RangePicker from "../components/form/RangePicker";
import MainLayout from "../components/layout/MainLayout";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Select from "../components/form/Select";
import TransactionsModal from "../components/modals/Transactions";

function Transactions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setdataId] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "100px",
      sorter: (a, b) => a.age - b.age,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.age - b.age,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "200px",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            const findTag = tagsOptions.find((item) => item.label === tag);
            const color = !!findTag ? findTag.color : "blue";

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
      width: "150px",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      key: "action",
      width: "100px",
      render: (text, record) => (
        <div className="action-buttons">
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleChangeModal(record.key)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
          </Tooltip>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      date: "1/12/2020",
      description: "John Brown",
      age: 32,
      value: "80,00€",
      tags: ["Salary"],
    },
    {
      key: "2",
      date: "25/12/2020",
      description: "Jim Green",
      age: 42,
      value: "20,00€",
      tags: ["Salary"],
    },
    {
      key: "3",
      date: "12/12/2020",
      description: "Joe Black",
      age: 32,
      value: "-20,00€",
      tags: ["Shop", "Car"],
    },
  ];

  const tagsOptions = [
    {
      value: "1",
      label: "Salary",
      color: "green",
    },
    {
      value: "2",
      label: "Shop",
      color: "blue",
    },
    {
      value: "3",
      label: "Car",
      color: "red",
    },
  ];

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChangeModal = (id) => {
    setModalOpen(true);
    setdataId(id);
  };

  return (
    <MainLayout>
      <Card>
        <Row>
          <Col span="18">
            <h3>Transactions List</h3>
          </Col>
          <Col span="6" style={{ textAlign: "right" }}>
            <Tooltip title="Add Transaction">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => handleChangeModal(null)}
              />
            </Tooltip>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <h4>Filters</h4>
          </Col>
          <RangePicker
            cols="8"
            label="Date"
            name="rangeDate"
            onChange={onChange}
          />
          <Select
            cols="12"
            label="Tags"
            name="tags"
            mode="multiple"
            options={tagsOptions}
          />
        </Row>
        <Row>
          <Col sm={24}>
            <Table columns={columns} dataSource={data} />
            <TransactionsModal
              isOpen={modalOpen}
              setIsOpen={setModalOpen}
              id={dataId}
            />
          </Col>
        </Row>
      </Card>
    </MainLayout>
  );
}

export default Transactions;
