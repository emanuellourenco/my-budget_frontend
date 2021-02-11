import React, { useState } from "react";
import { Layout } from "antd";
import MainHeader from "./MainHeader";
import MainSidebar from "./MainSidebar";

function MainLayout(props) {
  const { children } = props;
  const currentCollapsedStatus =
    localStorage.getItem("collapsed") === "true" ? true : false;
  const [collapsed, setCollapsed] = useState(currentCollapsedStatus);
  const { Content } = Layout;

  return (
    <Layout>
      <MainSidebar collapsed={collapsed} />
      <Layout>
        <MainHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          className="main-layout__header"
        />
        <Content className="main-layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
