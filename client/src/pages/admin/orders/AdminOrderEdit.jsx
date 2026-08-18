import React, { useEffect } from "react";
import {
    Card,
    Typography,
    Form,
    Select,
    InputNumber,
    Button,
    Table,
    Space,
    Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { App } from "antd";
import {
    getAdminOrderById,
    editAdminOrder,
} from "../../../store/thunks/adminThunk/adminOrderThunk";
const { Title, Text } = Typography;


const AdminOrderEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = App.useApp();
    const [form] = Form.useForm();

    const {
        order,
        loading,
        editLoading,
        error,
    } = useSelector(
        (state) => state.adminOrder
    );


    useEffect(() => {
        dispatch(
            getAdminOrderById(id)
        );
    }, [dispatch, id]);


    useEffect(() => {
        if (!order) return;
        form.setFieldsValue({
            status: order.status,
            items: order.items.map((item) => ({
                product:
                    item.product._id,

                name:
                    item.product.name,

                sku:
                    item.product.sku,

                quantity:
                    item.quantity,

                price:
                    item.price,
            })),
        });
    }, [order, form]);


    const handleSubmit = async (values) => {
        const data = {
            status: values.status,
            items: values.items.map(
                (item) => ({
                    product: item.product,
                    quantity: item.quantity,
                })
            ),
        };
        const result = await dispatch(
            editAdminOrder({
                id,
                data,
            })
        );
        if (
            editAdminOrder.fulfilled.match(
                result
            )
        ) {
            message.success(
                "Order updated successfully"
            );
            navigate(
                `/admin/orders/${id}`
            );
        } else {
            message.error(
                result.payload ||
                "Failed to update order"
            );
        }
    };

    if (loading) {
        return (
            <Card>
                <Spin />
            </Card>
        );
    }

    if (!order) {
        return (
            <Card>
                <Text type="danger">
                    {error || "Order not found"}
                </Text>
            </Card>
        );
    }


    const columns = [

        {
            title: "Product",
            render: (_, record) => (
                <div>
                    <div>
                        <strong>
                            {record.name}
                        </strong>
                    </div>

                    <Text type="secondary">
                        SKU: {record.sku}
                    </Text>
                </div>
            ),
        },

        {
            title: "Price",
            dataIndex: "price",
            render: (price) =>
                `₹ ${price}`,
        },

        {
            title: "Quantity",
            dataIndex: "quantity",

            render: (_, record, index) => (
                <Form.Item
                    name={[
                        "items",
                        index,
                        "quantity",
                    ]}
                    rules={[
                        {
                            required: true,
                            message:
                                "Quantity is required",
                        },
                        {
                            type: "number",
                            min: 1,
                            message:
                                "Quantity must be at least 1",
                        },
                    ]}
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <InputNumber
                        min={1}
                        style={{
                            width: 120,
                        }}
                    />
                </Form.Item>
            ),
        },
    ];


    return (
        <Card>
            <Title level={2}>
                Edit Order
            </Title>

            <div
                style={{
                    marginBottom: 20,
                }}
            >
                <Text strong>
                    Order ID:{" "}
                </Text>

                <Text>
                    {order._id}
                </Text>

            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >

                <Form.Item
                    label="Order Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select status",
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: 300,
                        }}
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
                </Form.Item>

                <Title level={4}>
                    Order Items
                </Title>

                <Table
                    rowKey="product"
                    columns={columns}
                    dataSource={
                        order.items.map(
                            (item) => ({
                                product:
                                    item.product._id,

                                name:
                                    item.product.name,

                                sku:
                                    item.product.sku,

                                quantity:
                                    item.quantity,

                                price:
                                    item.price,
                            })
                        )
                    }
                    pagination={false}
                />

                <div
                    style={{
                        textAlign: "right",
                        marginTop: 20,
                    }}
                >
                    <Text strong>
                        Current Total:{" "}
                    </Text>
                    <Text>
                        ₹ {order.totalAmount}
                    </Text>
                </div>

                <Space
                    style={{
                        marginTop: 25,
                    }}
                >
                    <Button
                        onClick={() =>
                            navigate(
                                `/admin/orders/${id}`
                            )
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={editLoading}
                    >
                        Update Order
                    </Button>
                </Space>
            </Form>
        </Card>
    );

};


export default AdminOrderEdit;