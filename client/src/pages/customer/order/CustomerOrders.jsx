import React, { useEffect } from "react";
import { Card, Table, Tag, Button, Typography, Space } from "antd";
import { EyeOutlined, CarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCustomerOrders, } from "../../../store/thunks/customerThunk/customerOrderThunks";

const { Title } = Typography;

const statusColors = {
    pending: "orange",
    confirmed: "blue",
    processing: "cyan",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
};

const CustomerOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { customerOrders, loading, } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        dispatch(getCustomerOrders());
    }, [dispatch]);

    const columns = [
        {
            title: "Order ID",
            dataIndex: "_id",
            render: (id) =>
                id?.slice(-8),
        },

        {
            title: "Items",
            render: (_, record) =>
                record.items?.length || 0,
        },

        {
            title: "Total",
            dataIndex: "totalAmount",
            render: (amount) =>
                `₹ ${amount}`,
        },

        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <Tag
                    color={statusColors[status] || "default"}
                >
                    {status?.toUpperCase()}
                </Tag>
            ),
        },

        {
            title: "Date",
            dataIndex: "createdAt",
            render: (date) =>
                new Date(
                    date
                ).toLocaleDateString(),
        },

        {
            title: "Action",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={
                            <EyeOutlined />
                        }
                        onClick={() =>
                            navigate(
                                `/customer/orders/${record._id}`
                            )
                        }
                    >
                        Details
                    </Button>

                    <Button
                        type="primary"
                        icon={
                            <CarOutlined />
                        }
                        onClick={() =>
                            navigate(
                                `/customer/orders/${record._id}`
                            )
                        }
                    >
                        Track
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Card
            style={{
                padding: 10,
                background: "#f5f7fa",
            }}
        >
            <Title level={2}>
                My Orders
            </Title>
            

            <Table
                rowKey="_id"
                columns={columns}
                dataSource={customerOrders}
                loading={loading}
            />
        </Card>
    );
};

export default CustomerOrders;