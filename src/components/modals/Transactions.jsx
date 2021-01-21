import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Input from "../form/Input";
import Select from "../form/Select";
import DatePicker from "../form/DatePicker";
import { Modal, Radio, Row } from "antd";
import moment from "moment";

function Tags(props) {
  const { id, isOpen, setIsOpen, setData } = props;
  const initialData = {
    id: "",
    description: "",
    date: new Date(),
    value: "",
    type: 1,
    tags: [],
  };
  const [transaction, setTransaction] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialData
  );
  const [tagsOptions, setTagsOptions] = useState([]);
  const dateFormat = "YYYY-MM-DD";
  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem("token");

  /**
   * Clear modal data on open if it's not send "id"
   */
  useEffect(() => {
    if (isOpen && !id) {
      setTransaction(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /**
   * Get tags options
   */
  useEffect(() => {
    if (!id) {
      setTransaction(initialData);
    }

    axios
      .post(`${url}/tags/options`, { token })
      .then(({ data }) => {
        setTagsOptions(data.tags);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Get transaction data to update
   */
  useEffect(() => {
    if (id) {
      axios
        .get(`${url}/transactions/${id}`, { params: { token } })
        .then(({ data }) => {
          setTransaction(data.transaction);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * Submit form, clear data and close modal
   */
  const submitForm = () => {
    const method = !!transaction.id ? "put" : "post";
    const transactionsUrl = `transactions${!!transaction.id ? `/${id}` : ""}`;

    axios[method](`${url}/${transactionsUrl}`, {
      description: transaction.description,
      value: transaction.value,
      type: transaction.type,
      date: transaction.date,
      tags: transaction.tags,
      token,
    })
      .then(({ data }) => {
        setData({ transactions: data.transactions, total: data.total_count });
        setIsOpen(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  /**
   * Cancel form and clear data
   */
  const handleCancel = () => {
    setIsOpen(false);
  };

  /**
   * Change input data
   * @param {Object} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ [name]: value });
  };

  const handleChangeDate = (moment, date) => {
    setTransaction({ date });
  };

  const handleSelect = (option) => {
    setTransaction({ tags: option });
  };

  return (
    <Modal
      title={!!id ? "Edit Transaction" : "New Transaction"}
      visible={isOpen}
      onOk={submitForm}
      okText="Save"
      onCancel={handleCancel}
    >
      <Row>
        <Radio.Group
          name="type"
          value={transaction.type}
          onChange={handleChange}
        >
          <Radio value={1}>Income</Radio>
          <Radio value={2}>Expense</Radio>
          <Radio value={3}>Refund</Radio>
        </Radio.Group>
        <Input
          cols="24"
          name="description"
          label="Description"
          value={transaction.description}
          onChange={handleChange}
        />
        <DatePicker
          cols="7"
          label="Date"
          name="date"
          value={moment(transaction.date)}
          onChange={handleChangeDate}
          format={dateFormat}
        />
        <Input
          cols="5"
          name="value"
          label="Value"
          value={transaction.value}
          onChange={handleChange}
        />
        <Select
          cols="12"
          label="Tags"
          name="tags"
          mode="multiple"
          options={tagsOptions}
          value={transaction.tags}
          onChange={handleSelect}
        />
      </Row>
    </Modal>
  );
}

export default Tags;
