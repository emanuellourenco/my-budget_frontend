import React from "react";
import { Row, Col, DatePicker } from "antd";
import PropTypes from "prop-types";

function DatePickerCol(props) {
  const { cols, label, name, onChange } = props;

  return (
    <Col className="date-picker__col" span={cols}>
      <Row>
        <Col span="24">
          <span>{label}</span>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <DatePicker
            id={name}
            name={name}
            onChange={onChange}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </Col>
  );
}

DatePickerCol.defaultProps = {
  cols: "24",
  label: "",
  name: "name",
  onChange: () => {},
};

DatePickerCol.propTypes = {
  cols: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default DatePickerCol;
