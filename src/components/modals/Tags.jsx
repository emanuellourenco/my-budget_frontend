import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Input from "../form/Input";
import Select from "../form/Select";
import { Modal, Row } from "antd";

function Tags(props) {
  const { id, isOpen, setIsOpen, setData } = props;
  const initialData = {
    id: "",
    name: "",
    color: "",
    rule: "",
  };
  const [tags, setTags] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialData
  );

  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      axios
        .get(`${url}/tags/${id}`, { params: { token } })
        .then(({ data }) => {
          setTags(data.tag);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTags({ [name]: value });
  };

  const handleChangeSelect = (option) => {
    setTags({ color: option });
  };

  const handleOk = () => {
    if (!!tags.id) {
      axios
        .put(`${url}/tags/${id}`, {
          name: tags.name,
          color: tags.color,
          rule: tags.rule,
          token,
        })
        .then(({ data }) => {
          console.log("🚀 ~ .then ~ data", data);
          setData(data.tags);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      axios
        .post(`${url}/tags`, {
          name: tags.name,
          color: tags.color,
          rule: tags.rule,
          token,
        })
        .then(({ data }) => {
          console.log("🚀 ~ .then ~ data", data);
          setData(data.tags);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }

    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTags(initialData);
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
        <Input
          cols="12"
          name="name"
          label="Tag Name"
          value={tags.name}
          onChange={handleChange}
        />
        <Select
          cols="12"
          label="Tag Color"
          name="color"
          options={colors}
          value={tags.color}
          onChange={handleChangeSelect}
        />
        <Input
          cols="24"
          name="rule"
          label="Rule"
          value={tags.rule}
          onChange={handleChange}
        />
      </Row>
    </Modal>
  );
}

export default Tags;
