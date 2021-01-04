import React from "react";
import { Col, Input } from "antd";
import PropTypes from "prop-types";

function InputCol(props) {
  const { cols, name, label, placeholder } = props;

  return (
    <Col className="input__col" span={cols}>
      <span>{label}</span>
      <Input id={name} name={name} placeholder={placeholder} />
    </Col>
  );
}

InputCol.defaultProps = {
  cols: "24",
  name: "name",
  label: "",
  placeholder: "",
};

InputCol.propTypes = {
  cols: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputCol;
