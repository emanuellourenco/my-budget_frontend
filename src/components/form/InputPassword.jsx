import React from "react";
import { Col, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import PropTypes from "prop-types";

function PasswordCol(props) {
  const { cols, name, label, placeholder } = props;

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
      />
    </Col>
  );
}

PasswordCol.defaultProps = {
  cols: "24",
  name: "name",
  label: "",
  placeholder: "",
};

PasswordCol.propTypes = {
  cols: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default PasswordCol;
