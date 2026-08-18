import React, { useEffect } from "react";
import {
    Card,
    Typography,
    Descriptions,
    Button,
    Space,
    Tag,
    Row,
    Col,
    Alert,
    Spin,
    Divider,
    Popconfirm,
    App,
} from "antd";
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import {
    getProductById,
    deleteProduct,
} from "../../../store/thunks/adminThunk/adminProductThunk";
import {
    clearSelectedProduct,
} from "../../../store/slices/adminSlice/adminProductSlice";


const { Title, Text } = Typography;


const AdminProductDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = App.useApp();

    const { id } = useParams();


    const {
        selectedProduct,
        detailsLoading,
        detailsError,
    } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(
            getProductById(id)
        );

        return () => {
            dispatch(
                clearSelectedProduct()
            );
        };
    }, [dispatch, id]);
    const handleDelete = async () => {
        const result = await dispatch(
            deleteProduct(id)
        );

        if (deleteProduct.fulfilled.match(result)) {
            message.success(
                "Product deleted successfully"
            );

            navigate(
                "/admin/products"
            );
        } else {
            message.error(
                result.payload ||
                "Failed to delete product"
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
                            "/admin/products"
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
                            "/admin/products"
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
                                    "/admin/products"
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
                gutter={[
                    20,
                    20,
                ]}
            >
                <Col
                    xs={24}
                    md={8}
                >
                    <Card
                        title="Product Image"
                    >

                        {product.image ? (
                            <img
                                src={
                                    product.image
                                }
                                alt={
                                    product.name
                                }
                                style={{
                                    width:
                                        "100%",
                                    maxHeight:
                                        350,
                                    objectFit:
                                        "contain",
                                    borderRadius:
                                        8,
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    height: 300,
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    background:
                                        "#f5f5f5",
                                    borderRadius:
                                        8,
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
                                    product
                                        .category?.name || "-"
                                }
                            </Descriptions.Item>


                            <Descriptions.Item
                                label="Price">
                                <Text strong>
                                    ₹{" "}
                                    {
                                        product.price || 0
                                    }
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
                        icon={<EditOutlined />}
                        onClick={() =>
                            navigate(
                                `/admin/products/${id}/edit`
                            )
                        }>
                        Edit Product
                    </Button>

                    <Button
                        icon={<HistoryOutlined />}
                        onClick={() =>
                            navigate(
                                `/admin/products/${id}/stock-history`
                            )
                        }>
                        Stock History
                    </Button>


                    <Popconfirm
                        title="Delete product?"
                        description="Are you sure you want to delete this product?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={
                            handleDelete
                        }>

                        <Button
                            danger
                            icon={
                                <DeleteOutlined />
                            }>
                            Delete Product
                        </Button>
                    </Popconfirm>
                </Space>
            </Card>
        </div>
    );
};


export default AdminProductDetails;
