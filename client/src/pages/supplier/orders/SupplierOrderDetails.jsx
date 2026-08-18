import React, { useEffect } from "react";
import { Card, Typography, Descriptions, Table, Tag, Button, Space, Divider, Row, Col, Alert, Spin, } from "antd";
import { ArrowLeftOutlined, } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplierOrderById, } from "../../../store/thunks/supplierThunk/supplierOrderThunk";
import { clearSelectedSupplierOrder } from "../../../store/slices/supplierSlice/supplierOrderSlice";
const { Title, Text } = Typography;


const SupplierOrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        selectedOrder,
        detailsLoading,
        detailsError,
    } = useSelector(
        (state) => state.supplierOrder
    );


    useEffect(() => {
        if (id) {
            dispatch(
                getSupplierOrderById(id)
            );
        }
        return () => {
            dispatch(
                clearSelectedSupplierOrder()
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

    if (detailsLoading) {
        return (
            <Card
                style={{
                    textAlign: "center",
                    padding: 50,
                }}
            >
                <Spin size="large" />
                <div style={{ marginTop: 15 }}>
                    Loading order details...
                </div>
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
                    icon={<ArrowLeftOutlined />}
                    style={{ marginTop: 20 }}
                    onClick={() =>
                        navigate(
                            "/supplier/order"
                        )
                    }
                >
                    Back to Orders
                </Button>
            </Card>
        );
    }

    if (!selectedOrder) {

        return (
            <Card>
                <Alert
                    type="warning"
                    message="Order not found"
                    showIcon
                />

                <Button
                    icon={<ArrowLeftOutlined />}
                    style={{ marginTop: 20 }}
                    onClick={() =>
                        navigate(
                            "/supplier/order"
                        )
                    }
                >
                    Back to Orders
                </Button>
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
                                objectFit: "cover",
                                borderRadius: 6,
                            }}
                        />
                    )}

                    <div>
                        <Text strong>
                            {record.product?.name ||
                                "-"}
                        </Text>
                        <br />
                        <Text type="secondary">
                            SKU:{" "}
                            {record.product?.sku ||
                                "-"}
                        </Text>
                    </div>
                </Space>
            ),
        },

        {
            title: "Price",
            dataIndex: ["product", "price"],
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
                                    "/supplier/order"
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

                <Col xs={24} md={12}>
                    <Card title="Customer Information">
                        <Descriptions
                            column={1}
                            bordered
                        >
                            <Descriptions.Item
                                label="Name"
                            >
                                {order.customer
                                    ?.firstName}{" "}
                                {order.customer
                                    ?.lastName}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Email"
                            >
                                {order.customer
                                    ?.email || "-"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col
                    xs={24}
                    md={12}
                >
                    <Card title="Order Information">

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
                                {order.createdAt
                                    ? new Date(
                                        order.createdAt
                                    ).toLocaleString()
                                    : "-"}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Updated"
                            >
                                {order.updatedAt
                                    ? new Date(
                                        order.updatedAt
                                    ).toLocaleString()
                                    : "-"}
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
                />

                <Divider />

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                    }}
                >
                    <Space
                        direction="vertical"
                        size={4}
                    >
                        <Text>
                            Total Items:{" "}
                            <strong>
                                {order.items?.reduce(
                                    (
                                        total,
                                        item
                                    ) =>
                                        total +
                                        item.quantity,
                                    0
                                )}
                            </strong>
                        </Text>
                        <Title
                            level={3}
                            style={{
                                margin: 0,
                            }}
                        >
                            Total: ₹{" "}
                            {order.items?.reduce(
                                (
                                    total,
                                    item
                                ) =>
                                    total +
                                    (item.itemTotal ||
                                        0),
                                0
                            )}
                        </Title>
                    </Space>
                </div>
            </Card>
            <Card
                title="Order Status"
                style={{
                    marginTop: 20,
                }}
            >

                <Tag
                    color={getStatusColor(
                        order.status
                    )}
                    style={{
                        fontSize: 15,
                        padding: "6px 15px",
                    }}
                >
                    {order.status?.toUpperCase()}
                </Tag>

            </Card>
        </div>
    );
};


export default SupplierOrderDetails;