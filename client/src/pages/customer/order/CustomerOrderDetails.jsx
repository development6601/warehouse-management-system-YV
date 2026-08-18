import React, { useEffect } from "react";
import { Card, Typography,Tag, Descriptions, Table, Button, Popconfirm, Space, App, Steps,} from "antd";
import {useDispatch,useSelector,} from "react-redux";
import { useNavigate,useParams,} from "react-router-dom";
import { getCustomerOrderTracking, cancelCustomerOrder,} from "../../../store/thunks/customerThunk/customerOrderThunks";

const { Title } = Typography;

const statusColors = {
    pending: "orange",
    confirmed: "blue",
    processing: "cyan",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
};

const steps = [
    {
        title: "Pending",
    },
    {
        title: "Confirmed",
    },
    {
        title: "Processing",
    },
    {
        title: "Shipped",
    },
    {
        title: "Delivered",
    },
];

const CustomerOrderDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message } = App.useApp();

    const {
        customerOrderTracking,
        loading,
    } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        dispatch(
            getCustomerOrderTracking(id)
        );
    }, [dispatch, id]);

    const cancelOrder = async () => {
        try {
            await dispatch(
                cancelCustomerOrder(id)
            ).unwrap();

            message.success(
                "Order cancelled successfully"
            );

            dispatch(
                getCustomerOrderTracking(id)
            );
        } catch (error) {
            message.error(error);
        }
    };

    if (!customerOrderTracking) {
        return (
            <Card loading={loading} />
        );
    }

    const order =
        customerOrderTracking;

    const statusIndex =
        steps.findIndex(
            (step) =>
                step.title.toLowerCase() ===
                order.status
        );

    const columns = [
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
            title: "Quantity",
            dataIndex: "quantity",
        },

        {
            title: "Price",
            dataIndex: "price",
            render: (price) =>
                `₹ ${price}`,
        },

        {
            title: "Total",
            render: (_, record) =>
                `₹ ${
                    record.price *
                    record.quantity
                }`,
        },
    ];

    return (
        <Card loading={loading}>
            <Space
                style={{
                    width: "100%",
                    justifyContent:
                        "space-between",
                    marginBottom: 24,
                }}
            >
                <Title
                    level={2}
                    style={{ margin: 0 }}
                >
                    Order Details
                </Title>

                <Tag
                    color={
                        statusColors[
                            order.status
                        ]
                    }
                >
                    {order.status?.toUpperCase()}
                </Tag>
            </Space>

            <Descriptions
                bordered
                column={2}
                style={{
                    marginBottom: 30,
                }}
            >
                <Descriptions.Item label="Order ID">
                    {order.orderId}
                </Descriptions.Item>

                <Descriptions.Item label="Total Amount">
                    ₹ {order.totalAmount}
                </Descriptions.Item>

                <Descriptions.Item label="Order Date">
                    {new Date(
                        order.createdAt
                    ).toLocaleString()}
                </Descriptions.Item>

                <Descriptions.Item label="Customer">
                    {order.customer?.firstName}{" "}
                    {order.customer?.lastName}
                </Descriptions.Item>

                <Descriptions.Item label="Email">
                    {order.customer?.email}
                </Descriptions.Item>
            </Descriptions>

            {order.status !== "cancelled" && (
                <Card
                    title="Order Tracking"
                    style={{
                        marginBottom: 30,
                    }}
                >
                    <Steps
                        current={
                            statusIndex >= 0
                                ? statusIndex
                                : 0
                        }
                        items={steps}
                    />
                </Card>
            )}

            <Title level={4}>
                Products
            </Title>

            <Table
                rowKey={(record) =>
                    record.product?._id
                }
                columns={columns}
                dataSource={order.items}
                pagination={false}
            />

            {(order.status === "pending" ||
                order.status === "confirmed" ||
                order.status ===
                    "processing") && (
                <div
                    style={{
                        marginTop: 24,
                    }}
                >
                    <Popconfirm
                        title="Cancel this order?"
                        description="The product quantities will be returned to stock."
                        onConfirm={
                            cancelOrder
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>
                            Cancel Order
                        </Button>
                    </Popconfirm>
                </div>
            )}

            <Button
                style={{
                    marginTop: 16,
                }}
                onClick={() =>
                    navigate(
                        "/customer/order"
                    )
                }
            >
                Back to Orders
            </Button>
        </Card>
    );
};

export default CustomerOrderDetails;