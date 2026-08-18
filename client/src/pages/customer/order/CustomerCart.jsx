import React, { useEffect, useState } from "react";
import { Card, Table, Button, InputNumber, Space, Typography, Popconfirm, Empty, App,} from "antd";
import {DeleteOutlined,ShoppingOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder,} from "../../../store/thunks/customerThunk/customerOrderThunks";

const { Title, Text } = Typography;

const CustomerCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = App.useApp();

    const [cart, setCart] = useState([]);

    const {
        loading,
    } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        const savedCart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        setCart(savedCart);
    }, []);

    const updateCart = (newCart) => {
        setCart(newCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );
    };

    const updateQuantity = (
        productId,
        quantity
    ) => {
        const newCart = cart.map((item) =>
            item.product === productId
                ? {
                    ...item,
                    quantity,
                }
                : item
        );

        updateCart(newCart);
    };

    const removeItem = (productId) => {
        const newCart = cart.filter(
            (item) =>
                item.product !== productId
        );

        updateCart(newCart);

        message.success(
            "Product removed from cart"
        );
    };

    const totalAmount = cart.reduce(
        (total, item) =>
            total +
            item.price * item.quantity,
        0
    );

    const placeOrder = async () => {
        const items = cart.map((item) => ({
            product: item.product,
            quantity: item.quantity,
        }));

        try {
            await dispatch(
                createOrder(items)
            ).unwrap();

            localStorage.removeItem("cart");

            setCart([]);

            message.success(
                "Order placed successfully"
            );

            navigate(
                "/customer/order"
            );
        } catch (error) {
            message.error(error);
        }
    };

    const columns = [
        {
            title: "Product",
            dataIndex: "name",
        },

        {
            title: "Price",
            dataIndex: "price",
            render: (price) =>
                `₹ ${price}`,
        },

        {
            title: "Quantity",
            render: (_, record) => (
                <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) =>
                        updateQuantity(
                            record.product,
                            value
                        )
                    }
                />
            ),
        },

        {
            title: "Total",
            render: (_, record) =>
                `₹ ${record.price *
                record.quantity
                }`,
        },

        {
            title: "Action",
            render: (_, record) => (
                <Popconfirm
                    title="Remove this product?"
                    onConfirm={() =>
                        removeItem(
                            record.product
                        )
                    }
                >
                    <Button
                        danger
                        icon={
                            <DeleteOutlined />
                        }
                    />
                </Popconfirm>
            ),
        },
    ];

    if (cart.length === 0) {
        return (
            <Card>
                <Empty
                    description="Your cart is empty"
                >
                    <Button
                        type="primary"
                        icon={
                            <ShoppingOutlined />
                        }
                        onClick={() =>
                            navigate(
                                "/customer/products"
                            )
                        }
                    >
                        Continue Shopping
                    </Button>
                </Empty>
            </Card>
        );
    }

    return (
        <Card
            style={{
                padding: 10,
                background: "#f5f7fa",
            }}
        >
            <Title level={2}>
                My Cart
            </Title>

            <Table
                rowKey="product"
                columns={columns}
                dataSource={cart}
                pagination={false}
            />

            <div
                style={{
                    marginTop: 24,
                    textAlign: "right",
                }}
            >
                <Space direction="vertical">
                    <Title level={3}>
                        Total: ₹ {totalAmount}
                    </Title>

                    <Button
                        type="primary"
                        size="large"
                        loading={loading}
                        onClick={placeOrder}
                    >
                        Place Order
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default CustomerCart;