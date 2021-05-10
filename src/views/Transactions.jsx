import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Tag, Button, Tooltip } from "antd";
import RangePicker from "../components/form/RangePicker";
import MainLayout from "../components/layout/MainLayout";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ClearOutlined } from "@ant-design/icons";
import Select from "../components/form/Select";
import TransactionsModal from "../components/modals/Transactions";
import ActionButtons from "../components/table/ActionButtons";
import { TABLE_LIMIT } from "../variables/globalVariables";
import { useTranslation } from "react-i18next";

function Transactions() {
  const { t } = useTranslation();
  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem("token");
  const initialFilters = {
    date: [],
    tags: []
  };
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
        sortBy: "desc"
      },
      filters: initialFilters,
      withFilters: false
    }
  );
  const [tagsOptions, setTagsOptions] = useState([]);
  const dateFormat = "YYYY-MM-DD";
  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setdataId] = useState(null);
  const columns = [
    {
      title: t("Date"),
      dataIndex: "date",
      key: "date",
      width: "100px",
      sorter: true,
      render: (text, record) => {
        const className = getTransactionClass(record.type);
        return <span className={className}>{text}</span>;
      }
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
      render: (text, record) => {
        const className = getTransactionClass(record.type);
        return <span className={className}>{text}</span>;
      }
    },
    {
      title: t("Tags"),
      key: "tags",
      dataIndex: "tags",
      width: "200px",
      render: (tags, record) => (
        <>
          {tags.map(tag => {
            const name = tag.tag.name;
            const color = tag.tag.color;

            return (
              <Tag color={color} key={tag.id}>
                {name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: t("Value"),
      dataIndex: "value",
      key: "value",
      width: "150px",
      sorter: true,
      render: (text, record) => {
        const { type } = record;
        const className = getTransactionClass(type);
        return (
          <span className={className}>{`${type === 2 ? "-" : " "} ${parseFloat(
            text
          ).toFixed(2)}`}</span>
        );
      }
    },
    {
      title: t("Action"),
      key: "action",
      width: "100px",
      render: (text, record) => (
        <ActionButtons
          record={record}
          handleChangeModal={handleChangeModal}
          removeData={removeData}
        />
      )
    }
  ];

  const getTransactionClass = type => {
    switch (type) {
      case "2":
        // 2 - Expense
        return "expense-transaction";
      case "3":
        // 3 - Refund
        return "refund-transaction";
      default:
        // 1 - Income
        return "income-transaction";
    }
  };

  /**
   * Update transactions list in component didmount
   */
  useEffect(() => {
    getData();

    axios
      .post(`${url}/tags/options`, { token })
      .then(({ data }) => {
        setTagsOptions(data.tags);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeData = id => {
    axios
      .delete(`${url}/transactions/${id}`, { params: data.variables })
      .then(({ data }) => {
        setData({ transactions: data.transactions, total: data.total_count });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  const handleChangeModal = id => {
    setModalOpen(true);
    setdataId(id);
  };

  /**
   * Update tags list
   */
  const getData = () => {
    const { withFilters, variables, filters } = data;
    const params = !!withFilters ? { ...variables, ...filters } : variables;
    console.log("🚀 ~ getData ~ params", params);

    axios
      .get(`${url}/transactions`, { params })
      .then(({ data }) => {
        setData({ transactions: data.transactions, total: data.total_count });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  const apllyFilters = () => {
    setData({ withFilters: true });
    getData();
  };

  const removeFilters = () => {
    setData({ withFilters: false, filters: initialFilters });
    getData();
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

  const handleSelect = option => {
    let filters = data.filters;
    filters.tags = option;
    setData({ filters, withFilters: true });
  };

  return (
    <MainLayout>
      <Card>
        <Row>
          <Col span="18">
            <h3>{t("Transactions List")}</h3>
          </Col>
          <Col span="6" style={{ textAlign: "right" }}>
            <Tooltip title={t("Add Transaction")}>
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
            <h4>{t("Filters")}</h4>
          </Col>
          <RangePicker
            cols="8"
            label={t("Date")}
            allowClear={true}
            name="rangeDate"
            onChange={handleChangeDate}
            format={dateFormat}
            value={data.filters.date}
          />
          <Select
            cols="12"
            label="Tags"
            name="tags"
            mode="multiple"
            options={tagsOptions}
            onChange={handleSelect}
            value={data.filters.tags}
          />
          <div style={{ marginTop: "25px" }}>
            <Tooltip title={t("Apply")}>
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => apllyFilters()}
              />
            </Tooltip>
            {/*    <Tooltip title="Clear">
              <Button
                type="danger"
                shape="circle"
                icon={<ClearOutlined />}
                onClick={() => removeFilters()}
              />
      </Tooltip> */}
          </div>
        </Row>
        <Row>
          <Col sm={24}>
            <Table
              columns={columns}
              dataSource={data.transactions}
              pagination={{
                pageSize: TABLE_LIMIT,
                total: data.total
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
