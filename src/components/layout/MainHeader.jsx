import React from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

function MainHeader(props) {
  const { collapsed, setCollapsed, className } = props;
  const { Header } = Layout;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Header className={className}>
      <Button
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggle()}
      />
    </Header>
  );
}

export default MainHeader;
