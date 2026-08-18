import React, { useEffect } from "react";
import { Card,  Typography,  Descriptions, Button, Space, Tag, Row,  Col, Alert, Spin, Divider, Popconfirm, App,} from "antd";
import { ArrowLeftOutlined, ShoppingCartOutlined,} from "@ant-design/icons";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate, useParams, } from "react-router-dom";
import { getCustomerProductById } from "../../../store/thunks/customerThunk/customerProductThunk";
import { clearSelectedProduct, } from "../../../store/slices/customerSlice/customerProductSlice";

const { Title, Text } = Typography;

const CustomerProductDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = App.useApp();

    const { id } = useParams();

    const {
        selectedProduct,
        detailsLoading,
        detailsError,
    } = useSelector(
        (state) => state.customerProduct
    );

    useEffect(() => {
        dispatch(
            getCustomerProductById(id)
        );

        return () => {
            dispatch(
                clearSelectedProduct()
            );
        };
    }, [dispatch, id]);

    const addToCart = (product) => {
        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const existingItem = cart.find(
            (item) =>
                item.product === product._id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        message.success(
            `${product.name} added to cart`
        );
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
                    message="Failed to load product"
                    description={
                        detailsError
                    }
                    showIcon />

                <Button
                    icon={
                        <ArrowLeftOutlined />
                    }
                    style={{
                        marginTop: 20,
                    }}
                    onClick={() =>
                        navigate(
                            "/customer/products"
                        )
                    }>
                    Back
                </Button>
            </Card>
        );
    }

    if (!selectedProduct) {
        return (
            <Card>
                <Alert
                    type="warning"
                    message="Product not found"
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
                            "/customer/products"
                        )
                    }
                >
                    Back to Products
                </Button>
            </Card>
        );
    }


    const product = selectedProduct;

    const getStockStatus = () => {
        if (
            product.quantity === 0
        ) {
            return {
                color: "red",
                text: "OUT OF STOCK",
            };
        }

        if (product.quantity <= 5) {
            return {
                color: "orange",
                text: "LOW STOCK",
            };
        }

        return {
            color: "green",
            text: "IN STOCK",
        };
    };

    const stockStatus = getStockStatus();

    return (
        <div>
            <Card
                style={{
                    marginBottom: 20,
                }}>
                <Space
                    style={{
                        width: "100%",
                        justifyContent:
                            "space-between",
                    }}
                    wrap >

                    <Space>
                        <Button
                            icon={
                                <ArrowLeftOutlined />
                            }
                            onClick={() =>
                                navigate(
                                    "/customer/products"
                                )
                            }
                        />
                        <Title
                            level={2}
                            style={{
                                margin: 0,
                            }}
                        >
                            Product Details
                        </Title>
                    </Space>

                    <Space>
                        <Tag
                            color={
                                stockStatus.color
                            }
                            style={{
                                padding:
                                    "5px 12px",
                                fontSize: 14,
                            }}
                        >
                            {
                                stockStatus.text
                            }
                        </Tag>
                    </Space>
                </Space>
            </Card>

            <Row
                gutter={[20, 20,]}
            >
                <Col xs={24} md={8}>
                    <Card title="Product Image">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: "100%",
                                    maxHeight: 350,
                                    objectFit: "contain",
                                    borderRadius: 8,
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    height: 300,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "#f5f5f5",
                                    borderRadius: 8,
                                }}
                            >
                                <Text type="secondary">
                                    No image
                                </Text>
                            </div>
                        )}
                    </Card>
                </Col>

                <Col xs={24}
                    md={16}>
                    <Card
                        title="Product Information">
                        <Descriptions
                            bordered
                            column={1}>
                            <Descriptions.Item
                                label="Product Name">
                                <Text strong>
                                    {
                                        product.name
                                    }
                                </Text>
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="SKU">
                                {
                                    product.sku || "-"
                                }
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="Category">
                                {
                                    product.category?.name || "-"
                                }
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="Price">
                                <Text strong>
                                    ₹{" "}{product.price || 0}
                                </Text>
                            </Descriptions.Item>


                            <Descriptions.Item
                                label="Quantity">
                                {
                                    product.quantity || 0
                                }
                            </Descriptions.Item>


                            <Descriptions.Item
                                label="Stock Status">
                                <Tag
                                    color={
                                        stockStatus.color
                                    }>
                                    {
                                        stockStatus.text
                                    }
                                </Tag>
                            </Descriptions.Item>


                            <Descriptions.Item label="Created">
                                {
                                    product.createdAt
                                        ? new Date(
                                            product.createdAt
                                        ).toLocaleString()
                                        : "-"
                                }
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="Updated">
                                {
                                    product.updatedAt
                                        ? new Date(
                                            product.updatedAt
                                        ).toLocaleString()
                                        : "-"
                                }
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>

            <Card
                title="Description"
                style={{
                    marginTop: 20,
                }}
            >
                {product.description ? (
                    <Text>
                        {product.description}
                    </Text>
                ) : (
                    <Text type="secondary">
                        No description available.
                    </Text>
                )}
            </Card>

            <Card
                title="Product Actions"
                style={{
                    marginTop: 20,
                }}>
                <Space wrap>
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        disabled={product.quantity <= 0}
                        onClick={() =>
                            addToCart(product)
                        }
                    >
                        Add to Cart
                    </Button>


                    <Button
                        type="primary"
                        icon={
                            <ShoppingCartOutlined />
                        }
                        onClick={() =>
                            navigate("/customer/cart")
                        }
                    >
                        Cart
                    </Button>
                </Space>
            </Card>
        </div>
    );
};


export default CustomerProductDetails;
