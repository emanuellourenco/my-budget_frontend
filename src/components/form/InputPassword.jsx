import React from "react";
import { Col, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import PropTypes from "prop-types";
import { fetchErrors } from "../../utils/fetchErrors";

function PasswordCol(props) {
  const { cols, name, label, placeholder, errors, ...other } = props;

  return (
    <Col className="input__col" span={cols}>
      <span>{label}</span>
      <Input.Password
        id={name}
        name={name}
        placeholder={placeholder}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        {...other}
      />
      {fetchErrors({ errors, name })}
    </Col>
  );
}

PasswordCol.defaultProps = {
  cols: "24",
  name: "name",
  label: "",
  placeholder: "",
  errors: [],
};

PasswordCol.propTypes = {
  cols: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.array,
};

export default PasswordCol;
