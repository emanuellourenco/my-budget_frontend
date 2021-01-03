import React, { useState } from "react";
import { Layout } from "antd";
import MainHeader from "./MainHeader";
import MainSidebar from "./MainSidebar";

function MainLayout(props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { Content } = Layout;

  return (
    <Layout>
      <MainSidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <MainHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          className="dashboard__header"
        />
        <Content className="dashboard__content">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
