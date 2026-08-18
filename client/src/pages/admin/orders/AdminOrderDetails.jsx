import React, { useEffect } from "react";
import {
    Card,
    Typography,
    Descriptions,
    Table,
    Tag,
    Button,
    Space,
    Divider,
    Row,
    Col,
    Alert,
    Spin,
    Select,
    Popconfirm,
    App,
} from "antd";
import {
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import {
    getAdminOrderById,
    updateAdminOrderStatus,
    cancelAdminOrder,
} from "../../../store/thunks/adminThunk/adminOrderThunk";
import {
    clearSelectedAdminOrder,
} from "../../../store/slices/adminSlice/adminOrderSlice";


const { Title, Text } = Typography;


const AdminOrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = App.useApp();
    const { id } = useParams();

    const {
        selectedOrder,
        detailsLoading,
        detailsError,
        actionLoading,
    } = useSelector(
        (state) => state.adminOrder
    );


    useEffect(() => {
        dispatch(
            getAdminOrderById(id)
        );

        return () => {
            dispatch(
                clearSelectedAdminOrder()
            );
        };
    }, [dispatch, id]);


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


    const handleStatusChange = async (value) => {
        const result = await dispatch(
            updateAdminOrderStatus({
                orderId: id,
                status: value,
            })
        );
        if (
            updateAdminOrderStatus.fulfilled.match(
                result
            )
        ) {
            message.success(
                "Order status updated successfully"
            );
        } else {
            message.error(
                result.payload ||
                "Failed to update status"
            );
        }
    };


    const handleCancel = async () => {

        const result = await dispatch(cancelAdminOrder(id));

        if (cancelAdminOrder.fulfilled.match(result)) {
            message.success(
                "Order cancelled successfully"
            );

        } else {
            message.error(
                result.payload ||
                "Failed to cancel order"
            );
        }
    };


    if (detailsLoading) {
        return (
            <Card
                style={{
                    textAlign: "center",
                    padding: 50,
                }}
            >
                <Spin size="large" />
            </Card>
        );
    }


    if (detailsError) {
        return (
            <Card>
                <Alert
                    type="error"
                    message="Failed to load order"
                    description={detailsError}
                    showIcon
                />
                <Button
                    icon={
                        <ArrowLeftOutlined />
                    }
                    style={{
                        marginTop: 20,
                    }}
                    onClick={() =>
                        navigate(
                            "/admin/orders"
                        )
                    }
                >
                    Back
                </Button>
            </Card>
        );
    }


    if (!selectedOrder) {
        return (
            <Card>
                Order not found
            </Card>
        );
    }

    const order = selectedOrder;
    const itemColumns = [

        {
            title: "Product",
            render: (_, record) => (
                <Space>
                    {record.product?.image && (
                        <img
                            src={
                                record.product.image
                            }
                            alt={
                                record.product.name
                            }
                            style={{
                                width: 50,
                                height: 50,
                                objectFit:
                                    "cover",
                                borderRadius: 6,
                            }}
                        />
                    )}

                    <div>
                        <Text strong>
                            {
                                record.product
                                    ?.name
                            }
                        </Text>
                        <br />
                        <Text type="secondary">
                            SKU:{" "}
                            {
                                record.product
                                    ?.sku
                            }
                        </Text>
                    </div>
                </Space>
            ),
        },

        {
            title: "Supplier",
            render: (_, record) =>
                `${record.supplier?.firstName || ""} ${
                    record.supplier?.lastName || ""
                }`,
        },

        {
            title: "Price",
            dataIndex: "price",
            render: (price) =>
                `₹ ${price || 0}`,
        },

        {
            title: "Quantity",
            dataIndex: "quantity",
        },

        {
            title: "Total",
            dataIndex: "itemTotal",
            render: (total) =>
                `₹ ${total || 0}`,
        },
    ];

    const canChangeStatus =
        order.status !== "delivered" &&
        order.status !== "cancelled";


    const canCancel =
        order.status !== "shipped" &&
        order.status !== "delivered" &&
        order.status !== "cancelled";


    return (

        <div>
            <Card
                style={{
                    marginBottom: 20,
                }}
            >
                <Space
                    style={{
                        width: "100%",
                        justifyContent:
                            "space-between",
                    }}
                >
                    <Space>
                        <Button
                            icon={
                                <ArrowLeftOutlined />
                            }
                            onClick={() =>
                                navigate(
                                    "/admin/orders"
                                )
                            }
                        />
                        <Title
                            level={2}
                            style={{
                                margin: 0,
                            }}
                        >
                            Order Details
                        </Title>
                    </Space>
                    <Tag
                        color={getStatusColor(
                            order.status
                        )}
                        style={{
                            fontSize: 14,
                            padding:
                                "5px 12px",
                        }}
                    >
                        {order.status?.toUpperCase()}
                    </Tag>
                </Space>
            </Card>


            <Row gutter={[20, 20]}>

                <Col xs={24} md={12} >

                    <Card title="Customer">
                        <Descriptions
                            column={1}
                            bordered
                        >
                            <Descriptions.Item
                                label="Name"
                            >
                                {
                                    order.customer
                                        ?.firstName
                                }{" "}
                                {
                                    order.customer
                                        ?.lastName
                                }
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Email"
                            >
                                {
                                    order.customer
                                        ?.email
                                }
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} md={12}>

                    <Card title="Order">
                        <Descriptions
                            column={1}
                            bordered
                        >
                            <Descriptions.Item
                                label="Order ID"
                            >
                                {order._id}
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="Status"
                            >
                                <Tag
                                    color={getStatusColor(
                                        order.status
                                    )}
                                >
                                    {order.status?.toUpperCase()}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="Created"
                            >
                                {new Date(
                                    order.createdAt
                                ).toLocaleString()}
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="Updated"
                            >
                                {new Date(
                                    order.updatedAt
                                ).toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>

            <Card
                title="Order Products"
                style={{
                    marginTop: 20,
                }}
            >

                <Table
                    rowKey={(record) =>
                        record.product?._id
                    }
                    columns={itemColumns}
                    dataSource={
                        order.items || []
                    }
                    pagination={false}
                    scroll={{
                        x: 900,
                    }}
                />

                <Divider />

                <div
                    style={{
                        textAlign: "right",
                    }}>
                    <Text>
                        Total Amount
                    </Text>

                    <Title
                        level={3}
                        style={{
                            margin: 0,
                        }}
                    >
                        ₹{" "}
                        {order.totalAmount ||
                            0}
                    </Title>
                </div>
            </Card>

            <Card
                title="Order Actions"
                style={{
                    marginTop: 20,
                }}
            >
                <Space wrap>
                    <Select
                        value={order.status}
                        disabled={
                            !canChangeStatus ||
                            actionLoading
                        }
                        style={{
                            width: 180,
                        }}
                        onChange={
                            handleStatusChange
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
                        ]}
                    />

                    <Popconfirm
                        title="Cancel this order?"
                        description="Stock will be restored."
                        onConfirm={
                            handleCancel
                        }
                        disabled={
                            !canCancel ||
                            actionLoading
                        }
                    >
                        <Button
                            danger
                            disabled={
                                !canCancel
                            }
                            loading={
                                actionLoading
                            }
                        >
                            Cancel Order
                        </Button>
                    </Popconfirm>


                    <Button
                        onClick={() =>
                            navigate(
                                `/admin/orders/${id}/edit`
                            )
                        }
                        disabled={
                            order.status ===
                                "delivered" ||
                            order.status ===
                                "cancelled"
                        }
                    >
                        Edit Order
                    </Button>
                </Space>
            </Card>
        </div>
    );
};


export default AdminOrderDetails;