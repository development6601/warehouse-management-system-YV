import React, { useEffect } from "react";
import { Avatar, Card, Col, Empty, Row, Space, Statistic, Table, Tag, Typography, message,} from "antd";
import { AppstoreOutlined, ShoppingCartOutlined, CheckCircleOutlined, ClockCircleOutlined,DollarOutlined, ArrowUpOutlined,} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierDashboard,} from "../../store/thunks/supplierThunk/supplierDashboardThunk";
import {clearSupplierDashboardError,} from "../../store/slices/supplierSlice/supplierDashboardSlice";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

const { Text } = Typography;

const SupplierDashboard = () => {
    const dispatch = useDispatch();

    const {
        dashboard,
        loading,
        error,
    } = useSelector(
        (state) => state.supplierDashboard
    );

    useEffect(() => {
        dispatch(getSupplierDashboard());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            message.error(error);

            dispatch(
                clearSupplierDashboardError()
            );
        }
    }, [error, dispatch]);

    if (loading && !dashboard) {
        return <DashboardSkeleton />;
    }

    const stats = dashboard?.stats || {};

    const recentOrders =
        dashboard?.recentOrders || [];

    const orderColumns = [
        {
            title: "Order",
            dataIndex: "_id",
            key: "_id",
            render: (id) => (
                <Text strong>
                    #{id?.slice(-8)?.toUpperCase()}
                </Text>
            ),
        },

        {
            title: "Customer",
            key: "customer",
            render: (_, record) => {
                const customer =
                    record.customer;

                if (!customer) {
                    return "-";
                }

                const name = [
                    customer.firstName,
                    customer.lastName,
                ]
                    .filter(Boolean)
                    .join(" ");

                return (
                    <Space>
                        <Avatar
                            size={30}
                            style={{   background:  "#722ed1", }}>
                            {name  ?.charAt(0) ?.toUpperCase()}
                        </Avatar>
                        {name || customer.email || "Customer"}
                    </Space>
                );
            },
        },

        {
            title: "Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (amount) => (
                <Text strong>
                    ₹ {Number( amount || 0 ).toLocaleString("en-IN")}
                </Text>
            ),
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "default";
                if (  status === "completed" ) {
                    color = "success";
                } else if (
                    status === "pending"
                ) {
                    color = "warning";
                } else if (
                    status === "processing"
                ) {
                    color = "processing";
                } else if (
                    status === "cancelled"
                ) {
                    color = "error";
                }

                return (
                    <Tag color={color}>
                        {status
                            ?.toUpperCase() ||
                            "UNKNOWN"}
                    </Tag>
                );
            },
        },

        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) =>
                date
                    ? new Date(
                          date
                      ).toLocaleDateString(
                          "en-IN"
                      )
                    : "-",
        },
    ];

    return (
        <div
            style={{
                padding: 24,
                background: "#f5f7fa",
                minHeight: "100vh",
            }}
        >
            <DashboardHeader
                title="Supplier Dashboard"
                description="Manage your products, orders and supplier performance."
            />

            {/* Stats */}

            <Row
                gutter={[16, 16]}
                style={{
                    marginBottom: 24,
                }}
            >
                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <DashboardStatCard
                        title="My Products"
                        value={
                            stats.totalProducts ||
                            0
                        }
                        icon={
                            <AppstoreOutlined />
                        }
                        color="#1677ff"
                    />
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <DashboardStatCard
                        title="Pending Orders"
                        value={
                            stats.pendingOrders ||
                            0
                        }
                        icon={
                            <ClockCircleOutlined />
                        }
                        color="#faad14"
                    />
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <DashboardStatCard
                        title="Completed Orders"
                        value={
                            stats.completedOrders ||
                            0
                        }
                        icon={
                            <CheckCircleOutlined />
                        }
                        color="#52c41a"
                    />
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <DashboardStatCard
                        title="Total Sales"
                        value={
                            stats.totalSales || 0
                        }
                        prefix="₹"
                        icon={
                            <DollarOutlined />
                        }
                        color="#722ed1"
                    />
                </Col>
            </Row>

            {/* Summary */}

            <Row
                gutter={[16, 16]}
                style={{
                    marginBottom: 24,
                }}
            >
                <Col
                    xs={24}
                    lg={12}
                >
                    <Card
                        bordered={false}
                        style={{
                            borderRadius: 12,
                        }}
                    >
                        <Statistic
                            title="Completed Orders"
                            value={
                                stats.completedOrders ||
                                0
                            }
                            prefix={
                                <ArrowUpOutlined
                                    style={{
                                        color:
                                            "#52c41a",
                                    }}
                                />
                            }
                            suffix="orders"
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    lg={12}
                >
                    <Card
                        bordered={false}
                        style={{
                            borderRadius: 12,
                        }}
                    >
                        <Statistic
                            title="Pending Orders"
                            value={
                                stats.pendingOrders ||
                                0
                            }
                            prefix={
                                <ClockCircleOutlined
                                    style={{
                                        color:
                                            "#faad14",
                                    }}
                                />
                            }
                            suffix="orders"
                        />
                    </Card>
                </Col>
            </Row>

            {/* Recent Orders */}

            <Card
                title="Recent Orders"
                bordered={false}
                style={{
                    borderRadius: 12,
                }}
            >
                {recentOrders.length > 0 ? (
                    <Table
                        rowKey={(record) =>
                            record._id
                        }
                        columns={orderColumns}
                        dataSource={
                            recentOrders
                        }
                        pagination={{
                            pageSize: 8,
                            showSizeChanger: false,
                        }}
                        scroll={{
                            x: 700,
                        }}
                    />
                ) : (
                    <Empty
                        description="No recent orders"
                    />
                )}
            </Card>
        </div>
    );
};

export default SupplierDashboard;
