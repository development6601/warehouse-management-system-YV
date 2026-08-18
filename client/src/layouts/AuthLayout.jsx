import { Card, Col, Layout, Row, Typography } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: "100vh" }}
        >
          <Col xs={22} sm={18} md={12} lg={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 12,
                boxShadow: "0 8px 30px rgba(0,0,0,.1)",
              }}
            >
              <Title level={2}>{title}</Title>

              <Text type="secondary">
                {subtitle}
              </Text>

              <div style={{ marginTop: 30 }}>
                {children}
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLayout;