import React from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import DatePicker from "../form/DatePicker";

import { Modal, Row } from "antd";

function Tags(props) {
  const { id, isOpen, setIsOpen } = props;

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

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

  return (
    <Modal
      title={!!id ? "Edit Transaction" : "New Transaction"}
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row>
        <Input cols="24" name="description" label="Description" />
        <DatePicker
          cols="6"
          label="Date"
          name="date"
          //onChange={onChange}
        />
        <Input cols="6" name="value" label="Value" />
        <Select cols="12" label="Tags" name="tags" options={tagsOptions} />
      </Row>
    </Modal>
  );
}

export default Tags;
