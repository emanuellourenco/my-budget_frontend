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

  /**
   * Get tag data to update
   */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * Change input data
   * @param {Object} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTags({ [name]: value });
  };

  /**
   * Change select data
   * @param {String} option
   */
  const handleChangeSelect = (option) => {
    setTags({ color: option });
  };

  /**
   * Submit form, clear data and close modal
   */
  const submitForm = () => {
    const method = !!tags.id ? "put" : "post";
    const formUrl = !!tags.id ? `${url}/tags/${id}` : `${url}/tags`;

    axios[method](formUrl, {
      name: tags.name,
      color: tags.color,
      rule: tags.rule,
      token,
    })
      .then(({ data }) => {
        setData({ tags: data.tags, total: data.total_count });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    setTags(initialData);
    setIsOpen(false);
  };

  /**
   * Cancel form and clear data
   */
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
      onOk={submitForm}
      okText="Save"
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
