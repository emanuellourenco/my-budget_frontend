import React from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import { Modal, Row } from "antd";

function Tags(props) {
  const { id, isOpen, setIsOpen } = props;

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const colors = [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Yellow", value: "yellow" },
    { label: "Pink", value: "pink" },
    { label: "Brown", value: "brown" },
    { label: "Grey", value: "grey" },
  ];

  return (
    <Modal
      title={!!id ? "Edit Tag" : "New Tag"}
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row>
        <Input cols="12" name="name" label="Tag Name" />
        <Select cols="12" label="Tag Color" name="color" options={colors} />
      </Row>
    </Modal>
  );
}

export default Tags;
