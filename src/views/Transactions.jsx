import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Tag, Button, Tooltip } from "antd";
import RangePicker from "../components/form/RangePicker";
import MainLayout from "../components/layout/MainLayout";
import { PlusOutlined, SearchOutlined, ClearOutlined } from "@ant-design/icons";
import Select from "../components/form/Select";
import TransactionsModal from "../components/modals/Transactions";
import ActionButtons from "../components/table/ActionButtons";
import { TABLE_LIMIT } from "../variables/globalVariables";
import moment from "moment";

function Transactions() {
  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      transactions: [],
      total: 0,
      variables: {
        token,
        offset: 0,
        limit: TABLE_LIMIT,
        orderBy: "date",
        sortBy: "desc",
      },
      filters: {
        date: [],
        tags: [],
      },
    }
  );
  const dateFormat = "YYYY-MM-DD";
  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setdataId] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "100px",
      sorter: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: true,
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
            const name = tag.tag.name;
            const color = tag.tag.color;

            return (
              <Tag color={color} key={tag.id}>
                {name.toUpperCase()}
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
      sorter: true,
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

  /**
   * Update transactions list in component didmount
   */
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeData = (key) => {
    const index = data.findIndex((item) => item.key === key);
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleChangeModal = (id) => {
    setModalOpen(true);
    setdataId(id);
  };

  /**
   * Update tags list
   */
  const getData = () => {
    axios
      .get(`${url}/transactions`, { params: data.variables })
      .then(({ data }) => {
        setData({ transactions: data.transactions, total: data.total_count });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  /**
   * Function to update component variables and call "getData" function to update tags list
   * @param {Object} pagination
   * @param {Object} filters
   * @param {Object} sorter
   */
  function onChange(pagination, filters, sorter) {
    let updateVariables = data.variables;
    const page = pagination.current;
    const { field, order } = sorter;
    const newOffset = TABLE_LIMIT * (page - 1);

    updateVariables.offset = newOffset;
    updateVariables.orderBy = field;
    updateVariables.sortBy = order === "descend" ? "desc" : "asc";
    setData({ variables: updateVariables });
    getData();
  }

  const handleChangeDate = (moment, date) => {
    let filters = data.filters;
    filters.date = date;
    setData({ filters });
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
            onChange={handleChangeDate}
            format={dateFormat}
          />
          <Select
            cols="12"
            label="Tags"
            name="tags"
            mode="multiple"
            options={tagsOptions}
          />
          <div style={{ marginTop: "25px" }}>
            <Tooltip title="Apply">
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => handleChangeModal(null)}
              />
            </Tooltip>
            <Tooltip title="Clear">
              <Button
                type="danger"
                shape="circle"
                icon={<ClearOutlined />}
                onClick={() => handleChangeModal(null)}
              />
            </Tooltip>
          </div>
        </Row>
        <Row>
          <Col sm={24}>
            <Table
              columns={columns}
              dataSource={data.transactions}
              pagination={{
                pageSize: TABLE_LIMIT,
                total: data.total,
              }}
              onChange={onChange}
            />
            <TransactionsModal
              isOpen={modalOpen}
              setIsOpen={setModalOpen}
              id={dataId}
              setData={setData}
            />
          </Col>
        </Row>
      </Card>
    </MainLayout>
  );
}

export default Transactions;
