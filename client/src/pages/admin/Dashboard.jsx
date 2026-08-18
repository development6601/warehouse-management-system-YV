import React, { useEffect } from "react";
import { Avatar, Card, Col, Empty, Progress, Row, Space, Statistic, Table, Tag, Typography, message, } from "antd";
import { AppstoreOutlined, ShoppingCartOutlined, TeamOutlined, ShopOutlined, WarningOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DollarOutlined, } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboard, } from "../../store/thunks/adminThunk/adminDashboardThunk";
import { clearAdminDashboardError, } from "../../store/slices/adminSlice/adminDashboardSlice";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
const { Text } = Typography;

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const {
        dashboard,
        loading,
        error,
    } = useSelector(
        (state) => state.adminDashboard
    );

    useEffect(() => {
        dispatch(getAdminDashboard());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            message.error(error);

            dispatch(clearAdminDashboardError());
        }
    }, [error, dispatch]);

    if (loading && !dashboard) {
        return <DashboardSkeleton />;
    }

    const stats = dashboard?.stats || {};
    const inventory = dashboard?.inventory || {};
    const recentOrders = dashboard?.recentOrders || [];

    const getOrderStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "success";

            case "pending":
                return "warning";

            case "processing":
                return "processing";

            case "cancelled":
                return "error";

            default:
                return "default";
        }
    };

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
                const customer = record.customer;

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
                            size={32}
                            style={{ background: "#1677ff" }}>
                            {name?.charAt(0)?.toUpperCase()}
                        </Avatar>

                        <Text>
                            {name || customer.email || "Customer"}
                        </Text>
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
                    ₹ {Number(amount || 0).toLocaleString("en-IN")}
                </Text>
            ),
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag
                    color={getOrderStatusColor(status)} >
                    {status?.toUpperCase() || "UNKNOWN"}
                </Tag>
            ),
        },

        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) =>
                date ? new Date(date).toLocaleDateString("en-IN") : "-",
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
                title="Admin Dashboard"
                description="Monitor your warehouse, inventory, customers and orders."
            />

            <Row
                gutter={[16, 16]}
                style={{ marginBottom: 24, }} >
                <Col xs={24} sm={12} lg={6}>
                    <DashboardStatCard
                        title="Total Products"
                        value={stats.totalProducts || 0}
                        icon={<AppstoreOutlined />}
                        color="#1677ff"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}  >
                    <DashboardStatCard
                        title="Total Customers"
                        value={stats.totalCustomers || 0}
                        icon={<TeamOutlined />}
                        color="#52c41a"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6} >
                    <DashboardStatCard
                        title="Total Suppliers"
                        value={stats.totalSuppliers || 0}
                        icon={<ShopOutlined />}
                        color="#722ed1"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <DashboardStatCard
                        title="Total Orders"
                        value={stats.totalOrders || 0}
                        icon={<ShoppingCartOutlined />}
                        color="#fa8c16"
                    />
                </Col>
            </Row>

            <Row
                gutter={[16, 16]}
                style={{ marginBottom: 24, }} >
                <Col xs={24} sm={12} lg={8}>
                    <Card
                        bordered={false}
                        style={{ borderRadius: 12, }} >
                        <Statistic
                            title="Pending Orders"
                            value={stats.pendingOrders || 0}
                            prefix={<ClockCircleOutlined style={{ color: "#faad14", }} />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8} >
                    <Card
                        bordered={false}
                        style={{ borderRadius: 12 }}
                    >
                        <Statistic
                            title="Completed Orders"
                            value={stats.completedOrders || 0}
                            prefix={
                                <CheckCircleOutlined
                                    style={{ color: "#52c41a", }}
                                />
                            }
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card bordered={false} style={{ borderRadius: 12 }} >
                        <Statistic
                            title="Low Stock Products"
                            value={inventory.lowStockCount || 0}
                            prefix={<WarningOutlined style={{ color: "#ff4d4f", }} />
                            }
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col
                    xs={24}
                    xl={16}
                >
                    <Card
                        title="Recent Orders"
                        bordered={false}
                        style={{ borderRadius: 12 }}
                    >
                        {recentOrders.length >
                            0 ? (
                            <Table
                                rowKey={(record) => record._id}
                                columns={orderColumns}
                                dataSource={recentOrders}
                                pagination={{
                                    pageSize: 5,
                                    showSizeChanger: false,
                                }}
                                scroll={{ x: 700 }}
                            />
                        ) : (
                            <Empty description="No recent orders" />
                        )}
                    </Card>
                </Col>

                <Col
                    xs={24}
                    xl={8}
                >
                    <Card
                        title={
                            <Space>
                                <WarningOutlined
                                    style={{ color: "#ff4d4f", }}
                                />
                                Low Stock Products
                            </Space>
                        }
                        bordered={false}
                        style={{ borderRadius: 12, }}
                    >
                        {inventory
                            .lowStockProducts
                            ?.length > 0 ? (
                            <Space
                                direction="vertical"
                                style={{ width: "100%", }}
                            >
                                {inventory.lowStockProducts.map((product) => {
                                    const stock = Number(product.stock || 0);

                                    const percent =
                                        Math.min(stock * 10, 100);

                                    return (
                                        <div
                                            key={product._id} >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: 6,
                                                }}
                                            >
                                                <Text strong >
                                                    {product.name}
                                                </Text>

                                                <Text type="danger" >
                                                    {stock}{" "}
                                                    left
                                                </Text>
                                            </div>

                                            <Progress
                                                percent={percent}
                                                showInfo={false}
                                                status="exception"
                                            />
                                        </div>
                                    );
                                }
                                )}
                            </Space>
                        ) : (
                            <Empty
                                description="Inventory is healthy"
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboard;
