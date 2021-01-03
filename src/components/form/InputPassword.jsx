import React from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function InputPassword(props) {
  const { name, label, placeholder } = props;
  
  return (
    <div style={{ margin: "5px" }}>
      <span>{label}</span>
      <Input.Password
        id={name}
        name={name}
        placeholder={placeholder}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
    </div>
  );
}

export default InputPassword;
