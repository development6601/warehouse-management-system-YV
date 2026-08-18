import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Card,
    Space,
    Typography,
    App,
    Select,
    Input
} from "antd";
import {
    ShoppingCartOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getCustomerProducts
} from "../../../store/thunks/customerThunk/customerProductThunk";
import {
    fetchCustomerCategories
} from "../../../store/thunks/customerThunk/customerCategorythunk";


const { Title } = Typography;
const { Search } = Input;


const CustomerProductList = () => {

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
        loading,
        error
    } = useSelector(
        (state) => state.customerProduct
    )


    const {
        categories,
        loading: categoryLoading
    } = useSelector(
        (state) => state.customerCategory
    );



    useEffect(() => {
        dispatch(fetchCustomerCategories());
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
        dispatch(getCustomerProducts({
            page,
            limit,
            search,
            category}));

    }, [dispatch,
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

    const addToCart = (product) => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];


        const existingItem = cart.find((item) =>
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
                quantity: 1
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

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
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
            dataIndex: "quantity",
            render: (quantity) =>
                quantity > 0 ? (

                    <span
                        style={{
                            color: "green"
                        }}
                    >
                        {quantity} available
                    </span>

                ) : (

                    <span
                        style={{
                            color: "red"
                        }}
                    >
                        Out of Stock
                    </span>

                )
        },


        {
            title: "Action",

            render: (_, record) => (

                <Space>

                    <Button
                        onClick={() =>
                            navigate(
                                `/customer/products/${record._id}`
                            )
                        }
                    >
                        View
                    </Button>


                    <Button
                        type="primary"
                        icon={
                            <ShoppingCartOutlined />
                        }
                        disabled={
                            record.quantity <= 0
                        }
                        onClick={() =>
                            addToCart(record)
                        }
                    >
                        Add to Cart
                    </Button>

                </Space>

            )
        }

    ];


    /* ============================
       RENDER
    ============================ */

    return (

        <Card
            style={{
                padding: 10,
                background: "#f5f7fa"
            }}
        >

            {/* ============================
                HEADER
            ============================ */}

            <Space
                style={{
                    width: "100%",
                    justifyContent:
                        "space-between",
                    marginBottom: 20
                }}
            >

                <Title
                    level={2}
                    style={{
                        margin: 0
                    }}
                >
                    Products
                </Title>


                <Button
                    type="primary"
                    icon={
                        <ShoppingCartOutlined />
                    }
                    onClick={() =>
                        navigate(
                            "/customer/cart"
                        )
                    }
                >
                    Cart
                </Button>

            </Space>


            {/* ============================
                SEARCH + FILTER
            ============================ */}

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


            {/* ============================
                TABLE
            ============================ */}

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


export default CustomerProductList;
