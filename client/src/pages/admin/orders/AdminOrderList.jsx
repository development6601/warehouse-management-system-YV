import React, { useEffect, useState } from "react";
import { Table, Card, Space, Button, Tag, Select, Typography, } from "antd";
import { EyeOutlined, } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAdminOrders, } from "../../../store/thunks/adminThunk/adminOrderThunk";

const { Title } = Typography;


const AdminOrderList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        orders,
        loading,
        error,
    } = useSelector(
        (state) => state.adminOrder
    );


    const [status, setStatus] = useState();

    useEffect(() => {
        dispatch(
            getAdminOrders(status)
        );
    }, [dispatch, status]);


    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "orange";

            case "confirmed":
                return "blue";

            case "processing":
                return "cyan";

            case "shipped":
                return "purple";

            case "delivered":
                return "green";

            case "cancelled":
                return "red";

            default:
                return "default";
        }
    };


    const columns = [

        {
            title: "Order ID",
            render: (_, record) =>
                record._id
                    ? record._id.slice(-8)
                    : "-",
        },
        {
            title: "Customer",
            render: (_, record) =>
                `${record.customer?.firstName || ""} ${record.customer?.lastName || ""
                }`,
        },

        {
            title: "Email",
            render: (_, record) =>
                record.customer?.email || "-",
        },

        {
            title: "Product",
            render: (_, record) =>
                record.product?.name || "-",
        },

        {
            title: "SKU",
            render: (_, record) =>
                record.product?.sku || "-",
        },

        {
            title: "Supplier",
            render: (_, record) =>
                `${record.productCreator?.firstName || ""} ${record.productCreator?.lastName || ""
                }`,
        },

        {
            title: "Quantity",
            dataIndex: "quantity",
        },

        {
            title: "Price",
            render: (_, record) =>
                `₹ ${record.product?.price || 0
                }`,
        },

        {
            title: "Total",
            dataIndex: "itemTotal",
            render: (total) =>
                `₹ ${total || 0}`,
        },

        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <Tag
                    color={getStatusColor(status)}
                >
                    {status?.toUpperCase()}
                </Tag>
            ),
        },

        {
            title: "Date",
            dataIndex: "createdAt",
            render: (date) =>
                date
                    ? new Date(
                        date
                    ).toLocaleDateString()
                    : "-",
        },

        {
            title: "Action",
            render: (_, record) => (

                <Button
                    type="primary"
                    icon={
                        <EyeOutlined />
                    }
                    onClick={() =>
                        navigate(
                            `/admin/orders/${record._id}`
                        )
                    }
                >
                    View
                </Button>
            ),
        },
    ];


    return (
        <Card
            style={{
                background: "#f5f7fa",
                padding: 10
            }}
        >
            <Space
                style={{
                    width: "100%",
                    justifyContent:
                        "space-between",
                    marginBottom: 20,
                }}
            >
                <Title
                    level={2}
                    style={{
                        margin: 0,
                    }}
                >
                    Orders
                </Title>

                <Select
                    allowClear
                    placeholder="Filter by status"
                    style={{
                        width: 200,
                    }}
                    value={status}
                    onChange={(value) =>
                        setStatus(value)
                    }
                    options={[
                        {
                            label: "Pending",
                            value: "pending",
                        },
                        {
                            label: "Confirmed",
                            value: "confirmed",
                        },
                        {
                            label: "Processing",
                            value: "processing",
                        },
                        {
                            label: "Shipped",
                            value: "shipped",
                        },
                        {
                            label: "Delivered",
                            value: "delivered",
                        },
                        {
                            label: "Cancelled",
                            value: "cancelled",
                        },
                    ]}
                />
            </Space>

            {error && (
                <Typography.Text
                    type="danger"
                >
                    {error}
                </Typography.Text>
            )}

            <Table
                rowKey={(record) =>
                    `${record._id}-${record.product?._id}`
                }
                columns={columns}
                dataSource={orders}
                loading={loading}
                scroll={{
                    x: 1400,
                }}
            />
        </Card>
    );
};


export default AdminOrderList;