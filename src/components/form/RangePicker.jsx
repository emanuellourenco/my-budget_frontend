import React from "react";
import { Row, Col, DatePicker } from "antd";
import PropTypes from "prop-types";

function RangePickerCol(props) {
  const { cols, label, name, onChange } = props;
  const { RangePicker } = DatePicker;

  return (
    <Col className="date-picker__col" span={cols}>
      <Row>
        <Col span="24">
          <span>{label}</span>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <RangePicker
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

RangePickerCol.defaultProps = {
  cols: "24",
  label: "",
  name: "name",
  onChange: () => {},
};

RangePickerCol.propTypes = {
  cols: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default RangePickerCol;
