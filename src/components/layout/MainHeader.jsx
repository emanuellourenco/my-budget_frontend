import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, Button, Dropdown, Menu, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

function MainHeader(props) {
  const { collapsed, setCollapsed, className } = props;
  const { Header } = Layout;
  const history = useHistory();

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
      <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header className={className}>
      <Button
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggle()}
      />
      <div className="header--buttons">
        <Dropdown overlay={menu} placement="bottomRight" arrow trigger="click">
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}

export default MainHeader;
