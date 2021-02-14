import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Tag, Button, Tooltip } from "antd";
import MainLayout from "../components/layout/MainLayout";
import { PlusOutlined } from "@ant-design/icons";
import TagModal from "../components/modals/Tags";
import ActionButtons from "../components/table/ActionButtons";
import { TABLE_LIMIT } from "../variables/globalVariables";
import { useTranslation } from "react-i18next";

function Tags() {
  const { t } = useTranslation();
  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      tags: [],
      total: 0,
      variables: {
        token,
        offset: 0,
        limit: TABLE_LIMIT,
        orderBy: "name",
        sortBy: "asc",
      },
    }
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setdataId] = useState(null);

  const columns = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      width: "200px",
      sorter: true,
      render: (text, record) => <Tag color={record.color}>{text}</Tag>,
    },
    {
      title: t("Rule"),
      dataIndex: "rule",
      key: "rule",
      sorter: true,
      render: (text) => <span>{text}</span>,
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
      ),
    },
  ];

  /**
   * Set modal open to add or update tag
   * @param {Int} id
   */
  const handleChangeModal = (id) => {
    setModalOpen(true);
    setdataId(id);
  };

  /**
   * Remove tag and update component data
   * @param {Int} id
   */
  const removeData = (id) => {
    axios
      .delete(`${url}/tags/${id}`, { params: data.variables })
      .then(({ data }) => {
        setData({ tags: data.tags, total: data.total_count });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  /**
   * Update tags list in component didmount
   */
  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Update tags list
   */
  const getData = () => {
    axios
      .get(`${url}/tags`, { params: data.variables })
      .then(({ data }) => {
        setData({ tags: data.tags, total: data.total_count });
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

  return (
    <MainLayout>
      <Card>
        <Row>
          <Col span="18">
            <h1>{t("Tag List")}</h1>
          </Col>
          <Col span="6" style={{ textAlign: "right" }}>
            <Tooltip title={t("Add")}>
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
            <Table
              columns={columns}
              dataSource={data.tags}
              pagination={{
                pageSize: TABLE_LIMIT,
                total: data.total,
              }}
              onChange={onChange}
            />
            <TagModal
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

export default Tags;
