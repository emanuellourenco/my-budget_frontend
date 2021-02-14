import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, ProfileOutlined, TagsOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MainSidebar(props) {
  const { t } = useTranslation();
  const { collapsed, className } = props;
  const { Sider } = Layout;
  const { location } = useHistory();
  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: t("Dashboard"), url: "/" },
    {
      key: "2",
      icon: <ProfileOutlined />,
      label: t("Transactions"),
      url: "/transactions",
    },
    {
      key: "3",
      icon: <TagsOutlined />,
      label: t("Tags"),
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
