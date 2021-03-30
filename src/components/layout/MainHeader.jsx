import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, Button, Dropdown, Menu, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import i18n, { langOptions } from "../../config/i18n";
import { useTranslation } from "react-i18next";

function MainHeader(props) {
  const { t } = useTranslation();
  const { collapsed, setCollapsed, className } = props;
  const { Header } = Layout;
  const history = useHistory();
  const currentLanguage = i18n.language;

  const toggle = () => {
    setCollapsed(!collapsed);
    localStorage.setItem("collapsed", !collapsed);
  };

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => history.push("/settings")}>{t("Settings")}</Menu.Item>
      <Menu.Item onClick={() => logout()}>{t("Logout")}</Menu.Item>
    </Menu>
  );

  const langMenu = (
    <Menu selectedKeys={currentLanguage}>
      {langOptions.map((option) => (
        <Menu.Item key={option} onClick={() => changeLanguage(option)}>
          {option.toUpperCase()}
        </Menu.Item>
      ))}
    </Menu>
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Header className={className}>
      <Button
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggle()}
      />
      <div className="header--buttons">
        <Dropdown
          overlay={langMenu}
          placement="bottomRight"
          arrow
          trigger="click"
        >
          <Avatar>{currentLanguage.toUpperCase()}</Avatar>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomRight" arrow trigger="click">
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}

export default MainHeader;
