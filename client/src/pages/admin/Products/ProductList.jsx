import { useEffect, useState } from "react";
import {
    Table,
    Button,
    Card,
    Space,
    Popconfirm,
    Typography,
    Input,
    Select,
    App
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
    getProducts,
    deleteProduct
} from "../../../store/thunks/adminThunk/adminProductThunk";
import {
    fetchCategories
} from "../../../store/thunks/adminThunk/categoryThunk";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = App.useApp();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const [searchInput, setSearchInput] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const {
        products,
        pagination,
        loading
    } = useSelector(
        (state) => state.product
    );

    const {
        categories,
        loading: categoryLoading
    } = useSelector(
        (state) => state.category
    );


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchInput]);


    useEffect(() => {
        dispatch(
            getProducts({
                page,
                limit,
                search,
                category
            })
        );
    }, [
        dispatch,
        page,
        limit,
        search,
        category
    ]);


    const categoryOptions = categories?.map(
        (category) => ({
            label: category.name,
            value: category._id
        })
    ) || [];


    const handleDelete = async (id) => {
        try {
            const result = await dispatch(
                deleteProduct(id)
            );

            if (
                deleteProduct.fulfilled.match(result)
            ) {
                message.success(
                    "Product deleted successfully"
                );

                dispatch(
                    getProducts({
                        page,
                        limit,
                        search,
                        category
                    })
                );
            } else {
                message.error(
                    result.payload ||
                    "Failed to delete product"
                );
            }
        } catch (error) {
            message.error(
                "Failed to delete product"
            );
        }
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },

        {
            title: "SKU",
            dataIndex: "sku"
        },

        {
            title: "Category",
            render: (_, record) =>
                record.category?.name || "-"
        },

        {
            title: "Price",
            dataIndex: "price",
            render: (price) => `₹ ${price}`
        },

        {
            title: "Stock",
            dataIndex: "quantity"
        },

        {
            title: "Action",
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() =>
                            navigate(
                                `/admin/products/${record._id}`
                            )
                        }
                    >
                        View
                    </Button>

                    <Button
                        onClick={() =>
                            navigate(
                                `/admin/products/${record._id}/edit`
                            )
                        }
                    >
                        Edit
                    </Button>

                    <Button
                        onClick={() =>
                            navigate(
                                `/admin/products/${record._id}/stock-history`
                            )
                        }
                    >
                        Stock History
                    </Button>

                    <Popconfirm
                        title="Delete product?"
                        description="Are you sure you want to delete this product?"
                        onConfirm={() =>
                            handleDelete(
                                record._id
                            )
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Card
            style={{
                background: "#f5f7fa",
                padding: 10
            }}
        >
            <Title level={2}>
                Products
            </Title>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{
                    marginBottom: 20
                }}
                onClick={() =>
                    navigate(
                        "/admin/products/create"
                    )
                }
            >
                Create Product
            </Button>
            <div
                style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 15
                }}
            >
                <Search
                    allowClear
                    value={searchInput}
                    onChange={(e) =>
                        setSearchInput(
                            e.target.value
                        )
                    }
                    onSearch={(value) => {
                        setSearchInput(value);
                        setSearch(value);
                        setPage(1);
                    }}
                    placeholder="Search by name or SKU"
                    style={{
                        width: 350
                    }}
                />

                <Select
                    allowClear
                    loading={categoryLoading}
                    value={category || undefined}
                    placeholder="Filter by Category"
                    options={categoryOptions}
                    onChange={(value) => {
                        setCategory(value || "");
                        setPage(1);
                    }}
                    style={{
                        width: 220
                    }}
                />
            </div>

            <Table
                rowKey="_id"
                columns={columns}
                dataSource={products}
                loading={loading}
                pagination={{
                    current: pagination?.page || 1,
                    pageSize:
                        pagination?.limit || 7,
                    total:
                        pagination?.total || 0,

                    showSizeChanger: true,

                    pageSizeOptions: [
                        "7",
                        "10",
                        "20",
                        "50"
                    ],

                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} products`
                }}
                onChange={(pagination) => {
                    setPage(
                        pagination.current
                    );

                    setLimit(
                        pagination.pageSize
                    );
                }}
            />
        </Card>
    );
};

export default ProductList;
