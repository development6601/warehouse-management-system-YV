import React from 'react'
import { Button, Flex, Layout, Menu, Typography } from "antd";
import {
    DashboardOutlined,
    AppstoreOutlined,
    UserOutlined,
    ProductOutlined,
    ShoppingCartOutlined,
    ShoppingFilled,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";


const { Title } = Typography;
const { Header, Sider, Content } = Layout;

const CustomerLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider theme="dark">
                <div
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        padding: 20,
                        fontWeight: "bold",
                        fontSize: 18,
                    }}
                >
                    WMS Customer
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    items={[
                        {
                            key: "1",
                            icon: <DashboardOutlined />,
                            label: (
                                <Link to="/customer/dashboard">
                                    dashboard
                                </Link>
                            ),
                        },
                        {
                            key: "2",
                            icon: <ProductOutlined />,
                            label: (
                                <Link to="/customer/products">
                                    Products
                                </Link>
                            ),
                        },
                        {
                            key: "3",
                            icon: <ShoppingFilled />,
                            label: (
                                <Link to="/customer/order">
                                    orders
                                </Link>
                            ),
                        },
                        {
                            key: "4",
                            icon: <ShoppingCartOutlined />,
                            label: (
                                <Link to="/customer/cart">
                                    cart
                                </Link>
                            )
                        },

                        {
                            key: "5",
                            icon: <UserOutlined />,
                            label: (
                                <Link to="/customer/profile">
                                    profile
                                </Link>
                            ),
                        },
                    ]}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        fontWeight: 600,
                        fontSize: 25,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    Warehouse Management System
                    <LogoutButton/>
                </Header>

                <Content
                    style={{
                        margin: 20,
                        background: "#fff",
                        padding: 20,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default CustomerLayout