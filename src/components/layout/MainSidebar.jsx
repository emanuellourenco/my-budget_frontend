import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function MainLayout(props) {
  const { collapsed, className } = props;
  const { Sider } = Layout;

  return (
    <Sider
      className={className}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <Link to="/transactions">Transactions</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default MainLayout;
