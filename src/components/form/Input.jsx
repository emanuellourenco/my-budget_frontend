import React from "react";
import { Input } from "antd";

function InputBlock(props) {
  const { name, label, placeholder } = props;

  return (
    <div style={{ margin: "5px" }}>
      <span>{label}</span>
      <Input id={name} name={name} placeholder={placeholder} />
    </div>
  );
}

export default InputBlock;
