import React from "react";
import { Col, Input } from "antd";
import PropTypes from "prop-types";
import { fetchErrors } from "../../utils/fetchErrors";

function InputCol(props) {
  const { cols, name, label, placeholder, errors, ...other } = props;

  return (
    <Col className="input__col" span={cols}>
      <span>{label}</span>
      <Input id={name} name={name} placeholder={placeholder} {...other} />
      {fetchErrors({ errors, name })}
    </Col>
  );
}

InputCol.defaultProps = {
  cols: "24",
  name: "name",
  label: "",
  placeholder: "",
  errors: [],
};

InputCol.propTypes = {
  cols: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.array,
};

export default InputCol;
