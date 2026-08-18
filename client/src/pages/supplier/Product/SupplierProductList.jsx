import React, { useEffect, useState } from "react";

import {
    Table,
    Button,
    Card,
    Space,
    Popconfirm,
    Typography,
    Select,
    Input,
    App
} from "antd";
import {
    PlusOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getSupplierProducts,
    deleteSupplierProduct
} from "../../../store/thunks/supplierThunk/supplierProductThunk";
import {
    fetchSupplierCategories
} from "../../../store/thunks/supplierThunk/supplierCategoryThunk";


const { Title } = Typography;
const { Search } = Input;


const SupplierProductList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { message } = App.useApp();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const [searchInput, setSearchInput] =useState("");
    const [search, setSearch] =useState("");
    const [category, setCategory] =useState("");


    const {
        products,
        pagination,
        loading,
        error
    } = useSelector(
        (state) => state.supplierProduct
    );

    const {
        categories,
        loading: categoryLoading
    } = useSelector(
        (state) => state.supplierCategory
    );


    useEffect(() => {
        dispatch(fetchSupplierCategories());
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
            getSupplierProducts({
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

    const categoryOptions =
        categories?.map(
            (category) => ({
                label: category.name,
                value: category._id
            })
        ) || [];

    const handleDelete = async (id) => {

        const result = await dispatch(
            deleteSupplierProduct(id)
        );


        if (
            deleteSupplierProduct.fulfilled.match(
                result
            )
        ) {

            message.success(
                "Product deleted successfully"
            );


            // Refresh current page
            dispatch(
                getSupplierProducts({
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

            render: (price) =>
                `₹ ${price}`
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
                                `/supplier/products/${record._id}`)}
                    >
                        View
                    </Button>


                    <Button
                        onClick={() =>
                            navigate(
                                `/supplier/products/${record._id}/edit`
                            )
                        }
                    >
                        Edit
                    </Button>


                    <Button
                        onClick={() =>
                            navigate(
                                `/supplier/products/${record._id}/stock-history`
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


            {/* CREATE PRODUCT */}

            <Button
                type="primary"
                icon={
                    <PlusOutlined />
                }
                style={{
                    marginBottom: 20
                }}
                onClick={() =>
                    navigate(
                        "/supplier/products/create"
                    )
                }
            >
                Create Product
            </Button>


            {/* SEARCH + FILTER */}

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

                    placeholder="Search by product name or SKU"

                    style={{
                        width: 350
                    }}
                />


                <Select
                    allowClear

                    loading={categoryLoading}

                    value={
                        category ||
                        undefined
                    }

                    placeholder="Filter by Category"

                    options={
                        categoryOptions
                    }

                    onChange={(value) => {

                        setCategory(
                            value || ""
                        );

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

                    current:
                        pagination?.page ||
                        1,

                    pageSize:
                        pagination?.limit ||
                        7,

                    total:
                        pagination?.total ||
                        0,

                    showSizeChanger: true,

                    pageSizeOptions: [
                        "7",
                        "10",
                        "20",
                        "50"
                    ],

                    showTotal: (
                        total,
                        range
                    ) =>
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


export default SupplierProductList;
