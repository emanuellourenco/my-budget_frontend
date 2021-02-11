import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, ProfileOutlined, TagsOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

function MainSidebar(props) {
  const { collapsed, className } = props;
  const { Sider } = Layout;
  const { location } = useHistory();
  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: "Dashboard", url: "/" },
    {
      key: "2",
      icon: <ProfileOutlined />,
      label: "Transactions",
      url: "/transactions",
    },
    {
      key: "3",
      icon: <TagsOutlined />,
      label: "Tags",
      url: "/tags",
    },
  ];
  const findMenu = menuItems.find((item) => item.url === location.pathname);
  const selectedMenu = (findMenu && findMenu.key) || 1;

  return (
    <Sider
      className={className}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="sidebar__logo" />
      <Menu theme="dark" mode="inline" selectedKeys={[selectedMenu]}>
        {menuItems.map((item) => {
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

export default MainSidebar;
