import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

function MainLayout(props) {
  const { collapsed, className } = props;
  const { Sider } = Layout;
  const { location } = useHistory();
  const menuItems = [
    { key: "1", icon: <UserOutlined />, label: "Dashboard", url: "/" },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Transactions",
      url: "/transactions",
    },
  ];
  const selectedMenu =
    menuItems.find((item) => item.url === location.pathname).key || 1;

  return (
    <Sider
      className={className}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu theme="dark" mode="inline" selectedKeys={[selectedMenu]}>
        {menuItems.map((item, index) => {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.url}>{item.label}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
}

export default MainLayout;
