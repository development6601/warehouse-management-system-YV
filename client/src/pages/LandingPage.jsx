import React from "react";
import { Button, Card, Col, Layout, Row, Space, Statistic, Tag, Typography, } from "antd";
import { ArrowRightOutlined, BarChartOutlined, CheckCircleFilled, DashboardOutlined, LockOutlined, MenuOutlined, ShoppingCartOutlined, TeamOutlined, TruckOutlined, UserOutlined, AppstoreOutlined, } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, } = Layout;
const { Title, Paragraph, Text, } = Typography;

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <Layout
            style={{
                minHeight: "100vh",
                background: "#ffffff",
            }}
        >
            <Header
                style={{
                    height: 72,
                    padding: "0 6%",
                    background: "#ffffff",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                    }}
                    onClick={() =>
                        navigate("/")
                    }
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            background: "linear-gradient(135deg, #1677ff, #0958d9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: 21,
                        }}
                    >
                        <AppstoreOutlined />
                    </div>
                    <div>
                        <Text
                            strong
                            style={{
                                fontSize: 18,
                                color: "#111827",
                            }}>
                            WAREHOUSE
                        </Text>
                        
                    </div>
                </div>
                <Space
                    size={28}
                    className="landing-nav"
                >
                    <a
                        href="#features"
                        style={{
                            color: "#4b5563",
                            textDecoration: "none",
                        }}>
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        style={{
                            color: "#4b5563",
                            textDecoration: "none",
                        }}>
                        How it works
                    </a>

                    <a
                        href="#about"
                        style={{
                            color: "#4b5563",
                            textDecoration: "none",
                        }}
                    >
                        About
                    </a>
                </Space>
                <Space>
                    <Button
                        type="text"
                        onClick={() =>
                            navigate("/login")
                        }>
                        Login
                    </Button>

                    <Button
                        type="primary"
                        onClick={() =>
                            navigate("/signup")
                        }>
                        Sign Up
                    </Button>
                </Space>
            </Header>

            <Content>
                <section
                    style={{
                        background: "linear-gradient(180deg, #f5f9ff 0%, #ffffff 100%)",
                        padding: "90px 6% 100px",
                        overflow: "hidden",
                    }}
                >
                    <Row
                        gutter={[40, 60,]}
                        align="middle"
                    >
                        <Col xs={24} lg={12}>
                            <Tag
                                color="blue"
                                style={{
                                    borderRadius: 20,
                                    padding: "5px 14px",
                                    marginBottom: 18,
                                }} >
                                SMART WAREHOUSE
                                MANAGEMENT
                            </Tag>

                            <Title
                                style={{
                                    fontSize: "clamp(42px, 5vw, 68px)",
                                    lineHeight: 1.08,
                                    margin: "0 0 24px",
                                    color: "#111827",
                                    fontWeight: 700,
                                    letterSpacing: "-2px",
                                }}
                            >
                                Manage your
                                warehouse
                                <span
                                    style={{
                                        color: "#1677ff",
                                    }}>{" "}
                                    smarter.
                                </span>
                            </Title>

                            <Paragraph
                                style={{
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "#667085",
                                    maxWidth: 600,
                                    marginBottom: 32,
                                }}>
                                Track inventory,
                                manage suppliers,
                                process orders
                                and keep your
                                entire warehouse
                                operation
                                organized from
                                one powerful
                                platform.
                            </Paragraph>

                            <Space size={12} wrap>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<ArrowRightOutlined />}
                                    iconPosition="end"
                                    onClick={() =>
                                        navigate("/signup")
                                    }
                                    style={{
                                        height: 50,
                                        padding: "0 26px",
                                        borderRadius: 8,
                                        fontWeight: 600,
                                    }}>
                                    Get Started
                                </Button>
                                <Button
                                    size="large"
                                    onClick={() =>
                                        navigate("/login")
                                    }
                                    style={{
                                        height: 50,
                                        padding: "0 26px",
                                        borderRadius: 8,
                                    }}>
                                    Login
                                </Button>
                            </Space>

                            <div
                                style={{
                                    marginTop: 28,
                                    display: "flex",
                                    gap: 20,
                                    flexWrap: "wrap",
                                }}
                            >
                                <Text
                                    type="secondary">
                                    <CheckCircleFilled
                                        style={{
                                            color: "#52c41a",
                                            marginRight: 7,
                                        }}
                                    />
                                    Easy to use
                                </Text>

                                <Text
                                    type="secondary">
                                    <CheckCircleFilled
                                        style={{
                                            color: "#52c41a",
                                            marginRight: 7,
                                        }} />
                                    Real-time
                                    inventory
                                </Text>

                                <Text type="secondary">
                                    <CheckCircleFilled
                                        style={{
                                            color: "#52c41a",
                                            marginRight: 7,
                                        }}
                                    />
                                    Secure
                                </Text>
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <div
                                style={{ position: "relative", }}>
                                <div
                                    style={{
                                        position: "absolute",
                                        width: 400,
                                        height: 400,
                                        borderRadius: "50%",
                                        background: "rgba(22,119,255,0.12)",
                                        filter: "blur(70px)",
                                        top: 30,
                                        left: 80,
                                    }}
                                />
                                <Card
                                    bordered={false}
                                    style={{
                                        position: "relative",
                                        borderRadius: 18,
                                        boxShadow: "0 25px 70px rgba(30,64,175,0.14)",
                                        overflow: "hidden",
                                    }}
                                    bodyStyle={{
                                        padding: 0,
                                    }}>
                                    <div
                                        style={{
                                            padding: "14px 18px",
                                            background: "#f8fafc",
                                            borderBottom: "1px solid #e5e7eb",
                                            display: "flex",
                                            gap: 7,
                                        }}>
                                        <span
                                            style={{
                                                width: 9,
                                                height: 9,
                                                borderRadius: "50%",
                                                background: "#ff5f57",
                                            }} />
                                        <span
                                            style={{
                                                width: 9,
                                                height: 9,
                                                borderRadius: "50%",
                                                background: "#ffbd2e",
                                            }} />
                                        <span
                                            style={{
                                                width: 9,
                                                height: 9,
                                                borderRadius: "50%",
                                                background: "#28c840",
                                            }} />
                                    </div>
                                    <div
                                        style={{
                                            padding: 24,
                                            background: "#f5f7fa",
                                        }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: 20,
                                            }}>
                                            <div>
                                                <Text
                                                    strong
                                                    style={{ fontSize: 18, }}>
                                                    Warehouse
                                                    Overview
                                                </Text>
                                                <br />
                                                <Text type="secondary">
                                                    Today's
                                                    performance
                                                </Text>
                                            </div>
                                            <Tag color="success">
                                                Live
                                            </Tag>
                                        </div>
                                        <Row
                                            gutter={[12, 12,]}>
                                            <Col span={12}>
                                                <Card
                                                    size="small"
                                                    bordered={false}>
                                                    <Statistic
                                                        title="Products"
                                                        value={1245}
                                                        prefix={<AppstoreOutlined />}
                                                    />
                                                </Card>
                                            </Col>
                                            <Col span={12}>
                                                <Card
                                                    size="small"
                                                    bordered={false}
                                                >
                                                    <Statistic
                                                        title="Orders"
                                                        value={328}
                                                        prefix={<ShoppingCartOutlined />}
                                                    />
                                                </Card>
                                            </Col>
                                        </Row>

                                        <Card
                                            size="small"
                                            bordered={false}
                                            style={{ marginTop: 12, }}>
                                            <Text>
                                                Inventory
                                                Capacity
                                            </Text>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 14,
                                                    marginTop: 12,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        height: 9,
                                                        background: "#e5e7eb",
                                                        borderRadius: 10,
                                                    }}>
                                                    <div
                                                        style={{
                                                            width: "82%",
                                                            height: "100%",
                                                            background: "#1677ff",
                                                            borderRadius: 10,
                                                        }} />
                                                </div>
                                                <Text strong>
                                                    82%
                                                </Text>
                                            </div>
                                        </Card>
                                        <Card
                                            size="small"
                                            bordered={false}
                                            style={{ marginTop: 12, }}>
                                            <Text strong>
                                                Recent
                                                Activity
                                            </Text>

                                            <div
                                                style={{ marginTop: 12, }}>
                                                {[
                                                    "Order #WH-1024 completed",
                                                    "Product stock updated",
                                                    "New supplier added",
                                                ].map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            padding: "8px 0",
                                                            borderBottom: index < 2 ? "1px solid #f0f0f0" : "none",
                                                            display: "flex",
                                                            gap: 8,
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <CheckCircleFilled
                                                            style={{
                                                                color: "#52c41a",
                                                                fontSize: 12,
                                                            }} />

                                                        <Text type="secondary">
                                                            {item}
                                                        </Text>
                                                    </div>))}
                                            </div>
                                        </Card>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </section>
                <section
                    id="features"
                    style={{
                        padding: "90px 6%",
                        background: "#ffffff",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            maxWidth: 700,
                            margin: "0 auto 55px",
                        }}>
                        <Tag
                            color="blue"
                            style={{
                                borderRadius: 20,
                                marginBottom: 12,
                            }}>
                            POWERFUL FEATURES
                        </Tag>

                        <Title
                            level={2}
                            style={{
                                fontSize: 38,
                                margin: "0 0 14px",
                            }}>
                            Everything your
                            warehouse needs
                        </Title>

                        <Paragraph
                            type="secondary"
                            style={{ fontSize: 16, }}
                        >
                            One centralized
                            platform for
                            managing inventory,
                            suppliers, customers
                            and orders.
                        </Paragraph>
                    </div>
                    <Row
                        gutter={[20, 20,]}>
                        {[
                            {
                                icon: (<AppstoreOutlined />),
                                title: "Inventory Management",
                                description: "Monitor stock levels, products and warehouse inventory in real time.",
                                color: "#1677ff",
                            },
                            {
                                icon: (<TruckOutlined />),
                                title: "Supplier Management",
                                description: "Manage suppliers and keep your procurement operations organized.",
                                color: "#722ed1",
                            },
                            {
                                icon: (<ShoppingCartOutlined />),
                                title: "Order Management",
                                description: "Track orders from creation to completion with complete visibility.",
                                color: "#fa8c16",
                            },
                            {
                                icon: (<TeamOutlined />),
                                title: "Customer Management",
                                description: "Keep customer information and order history in one place.",
                                color: "#13c2c2",
                            },
                            {
                                icon: (<BarChartOutlined />),
                                title: "Reports & Analytics",
                                description: "Understand your warehouse performance through meaningful insights.",
                                color: "#52c41a",
                            },
                            {
                                icon: (<LockOutlined />),
                                title: "Secure Access",
                                description: "Role-based access keeps admin, supplier and customer data protected.",
                                color: "#eb2f96",
                            },
                        ].map((feature) => (
                            <Col
                                xs={24}
                                sm={12}
                                lg={8}
                                key={feature.title}>
                                <Card
                                    bordered={false}
                                    style={{
                                        height: "100%",
                                        borderRadius: 14,
                                        background: "#f8fafc",
                                    }}
                                    hoverable>
                                    <div
                                        style={{
                                            width: 52,
                                            height: 52,
                                            borderRadius: 13,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background:
                                                `${feature.color}15`,
                                            color:
                                                feature.color,
                                            fontSize: 25,
                                            marginBottom:
                                                20,
                                        }}
                                    >
                                        {
                                            feature.icon
                                        }
                                    </div>

                                    <Title
                                        level={
                                            4
                                        }
                                        style={{
                                            marginBottom:
                                                8,
                                        }}
                                    >
                                        {
                                            feature.title
                                        }
                                    </Title>

                                    <Paragraph
                                        type="secondary"
                                        style={{
                                            marginBottom: 0,
                                            lineHeight:
                                                1.7,
                                        }}
                                    >
                                        {
                                            feature.description
                                        }
                                    </Paragraph>
                                </Card>
                            </Col>
                        )
                        )}
                    </Row>
                </section>
                <section
                    id="how-it-works"
                    style={{
                        padding:
                            "90px 6%",
                        background:
                            "#f8fafc",
                    }}
                >
                    <div
                        style={{
                            textAlign:
                                "center",
                            marginBottom:
                                55,
                        }}
                    >
                        <Title
                            level={2}
                            style={{
                                fontSize: 38,
                            }}
                        >
                            Simple from day one
                        </Title>

                        <Paragraph type="secondary">
                            Get your warehouse
                            operations organized
                            in three simple steps.
                        </Paragraph>
                    </div>

                    <Row
                        gutter={[
                            30,
                            30,
                        ]}
                        justify="center"
                    >
                        {[
                            {
                                number: "01",
                                title:
                                    "Create your account",
                                description:
                                    "Sign up and choose the account type that matches your role.",
                            },
                            {
                                number: "02",
                                title:
                                    "Set up your warehouse",
                                description:
                                    "Add your products, suppliers, customers and inventory.",
                            },
                            {
                                number: "03",
                                title:
                                    "Manage everything",
                                description:
                                    "Track orders, inventory and warehouse activity from your dashboard.",
                            },
                        ].map(
                            (
                                step
                            ) => (
                                <Col
                                    xs={
                                        24
                                    }
                                    md={
                                        8
                                    }
                                    key={
                                        step.number
                                    }
                                >
                                    <div
                                        style={{
                                            textAlign:
                                                "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 64,
                                                height: 64,
                                                margin:
                                                    "0 auto 20px",
                                                borderRadius:
                                                    "50%",
                                                background:
                                                    "#e6f4ff",
                                                color:
                                                    "#1677ff",
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                fontSize: 18,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {
                                                step.number
                                            }
                                        </div>

                                        <Title
                                            level={
                                                4
                                            }
                                        >
                                            {
                                                step.title
                                            }
                                        </Title>

                                        <Paragraph
                                            type="secondary"
                                            style={{
                                                maxWidth:
                                                    330,
                                                margin:
                                                    "0 auto",
                                                lineHeight:
                                                    1.7,
                                            }}
                                        >
                                            {
                                                step.description
                                            }
                                        </Paragraph>
                                    </div>
                                </Col>
                            )
                        )}
                    </Row>
                </section>
                <section
                    id="about"
                    style={{
                        padding:
                            "90px 6%",
                    }}
                >
                    <Card
                        bordered={false}
                        style={{
                            maxWidth:
                                1150,
                            margin:
                                "0 auto",
                            borderRadius:
                                22,
                            background:
                                "linear-gradient(135deg, #0958d9, #1677ff)",
                            overflow:
                                "hidden",
                        }}
                        bodyStyle={{
                            padding:
                                "60px 40px",
                        }}
                    >
                        <Row
                            align="middle"
                            gutter={[
                                30,
                                30,
                            ]}
                        >
                            <Col
                                xs={24}
                                lg={16}
                            >
                                <Title
                                    level={2}
                                    style={{
                                        color:
                                            "#ffffff",
                                        fontSize:
                                            38,
                                        margin:
                                            "0 0 12px",
                                    }}
                                >
                                    Ready to simplify
                                    your warehouse?
                                </Title>

                                <Paragraph
                                    style={{
                                        color:
                                            "rgba(255,255,255,0.8)",
                                        fontSize:
                                            16,
                                        marginBottom:
                                            0,
                                        maxWidth:
                                            650,
                                    }}
                                >
                                    Create your account
                                    and start managing
                                    your warehouse
                                    operations with
                                    confidence.
                                </Paragraph>
                            </Col>

                            <Col
                                xs={24}
                                lg={8}
                                style={{
                                    textAlign:
                                        "right",
                                }}
                            >
                                <Button
                                    size="large"
                                    onClick={() =>
                                        navigate(
                                            "/signup"
                                        )
                                    }
                                    style={{
                                        height: 52,
                                        padding:
                                            "0 28px",
                                        borderRadius:
                                            9,
                                        fontWeight:
                                            600,
                                        color:
                                            "#0958d9",
                                    }}
                                >
                                    Create Your
                                    Account
                                    <ArrowRightOutlined />
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </section>
            </Content>
            <Footer
                style={{
                    background:
                        "#111827",
                    color:
                        "rgba(255,255,255,0.7)",
                    padding:
                        "45px 6%",
                }}
            >
                <Row
                    gutter={[
                        30,
                        30,
                    ]}
                    justify="space-between"
                >
                    <Col
                        xs={24}
                        md={10}
                    >
                        <Space
                            align="start"
                            size={12}
                        >
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius:
                                        10,
                                    background:
                                        "#1677ff",
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    color:
                                        "#ffffff",
                                    fontSize:
                                        20,
                                }}
                            >
                                <AppstoreOutlined />
                            </div>

                            <div>
                                <Text
                                    strong
                                    style={{
                                        color:
                                            "#ffffff",
                                        fontSize:
                                            18,
                                    }}
                                >
                                    WareFlow
                                </Text>

                                <br />

                                <Text
                                    style={{
                                        color:
                                            "rgba(255,255,255,0.55)",
                                    }}
                                >
                                    Smart warehouse
                                    management
                                    made simple.
                                </Text>
                            </div>
                        </Space>
                    </Col>

                    <Col
                        xs={24}
                        md={8}
                    >
                        <Space
                            size={24}
                            wrap
                        >
                            <a
                                href="#features"
                                style={{
                                    color:
                                        "rgba(255,255,255,0.65)",
                                }}
                            >
                                Features
                            </a>

                            <a
                                href="#how-it-works"
                                style={{
                                    color:
                                        "rgba(255,255,255,0.65)",
                                }}
                            >
                                How it works
                            </a>

                            <a
                                href="#about"
                                style={{
                                    color:
                                        "rgba(255,255,255,0.65)",
                                }}
                            >
                                About
                            </a>

                            <a
                                href="/login"
                                style={{
                                    color:
                                        "rgba(255,255,255,0.65)",
                                }}
                            >
                                Login
                            </a>
                        </Space>
                    </Col>
                </Row>

                <div
                    style={{
                        borderTop:
                            "1px solid rgba(255,255,255,0.1)",
                        marginTop: 35,
                        paddingTop: 20,
                        textAlign:
                            "center",
                    }}
                >
                    <Text
                        style={{
                            color:
                                "rgba(255,255,255,0.45)",
                        }}
                    >
                        © {new Date().getFullYear()}{" "}
                        WareFlow. All rights
                        reserved.
                    </Text>
                </div>
            </Footer>
        </Layout>
    );
};

export default LandingPage;
