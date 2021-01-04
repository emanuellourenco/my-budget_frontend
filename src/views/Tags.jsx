import React, { useState } from "react";
import { Row, Col, Card, Table, Tag, Button, Tooltip } from "antd";
import MainLayout from "../components/layout/MainLayout";
import { PlusOutlined } from "@ant-design/icons";
import TagModal from "../components/modals/Tags";
import ActionButtons from "../components/table/ActionButtons";

function Tags() {
  const [data, setData] = useState([
    {
      key: "1",
      name: "Salary",
      rule: "Salary",
      color: "green",
    },
    {
      key: "2",
      name: "Shop",
      rule: "Shop",
      color: "blue",
    },
    {
      key: "3",
      name: "Car",
      rule: "Fuel",
      color: "red",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setdataId] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "200px",
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => <Tag color={record.color}>{text}</Tag>,
    },
    {
      title: "Rule",
      dataIndex: "rule",
      key: "rule",
      sorter: (a, b) => a.age - b.age,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: "100px",
      render: (text, record) => (
        <ActionButtons
          record={record}
          handleChangeModal={handleChangeModal}
          removeData={removeData}
        />
      ),
    },
  ];

  const handleChangeModal = (id) => {
    setModalOpen(true);
    setdataId(id);
  };

  const removeData = (key) => {
    const index = data.findIndex((item) => item.key === key);
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <MainLayout>
      <Card>
        <Row>
          <Col span="18">
            <h1>Tag List</h1>
          </Col>
          <Col span="6" style={{ textAlign: "right" }}>
            <Tooltip title="Add">
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
          <Col span={18}>
            <Table columns={columns} dataSource={data} />
            <TagModal isOpen={modalOpen} setIsOpen={setModalOpen} id={dataId} />
          </Col>
        </Row>
      </Card>
    </MainLayout>
  );
}

export default Tags;
