import React from "react";
import { Layout, Card, Button, Row, Col } from "antd";
import Input from "../components/form/Input";
import InputPassword from "../components/form/InputPassword";

function Login() {
  const { Header, Content } = Layout;

  const submitForm = () => {
    alert("login fail!");
  };

  return (
    <Layout>
      <Layout className="site-layout">
        <Header className="login__header"></Header>
        <Content className="login__content">
          <Row justify="center">
            <Col>
              <Card title="Login" className="login__card" bordered={false}>
                <Input label="Username" name="username" />

                <InputPassword label="Password" name="password" />
                <Row justify="center">
                  <Col>
                    <Button
                      type="primary"
                      shape="round"
                      onClick={() => submitForm()}
                    >
                      Login
                    </Button>
                  </Col>
                </Row>
                {/* <Row justify="center">
                <a>Recover Password</a>
            </Row> */}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Login;
