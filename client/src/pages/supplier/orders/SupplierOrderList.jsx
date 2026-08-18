import React, { useEffect } from "react";
import { Table, Button, Card, Space, Tag, Typography,} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSupplierOrders } from "../../../store/thunks/supplierThunk/supplierOrderThunk";

const { Title } = Typography;


const SupplierOrderList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        orders,
        loading,
        error,
    } = useSelector(
        (state) => state.supplierOrder
    );


    useEffect(() => {
        dispatch(getSupplierOrders());
    }, [dispatch]);


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


    const columns = [

        {
            title: "Order ID",
            dataIndex: "_id",

            render: (id) =>
                id
                    ? id.slice(-8)
                    : "-",
        },

        {
            title: "Customer",

            render: (_, record) =>
                `${record.customer?.firstName || ""} ${
                    record.customer?.lastName || ""
                }`,
        },

        {
            title: "Email",

            render: (_, record) =>
                record.customer?.email || "-",
        },

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

            render: (quantity) =>
                quantity || 0,
        },

        {
            title: "Price",

            render: (_, record) =>
                `₹ ${record.product?.price || 0}`,
        },

        {
            title: "Total",

            dataIndex: "itemTotal",

            render: (total) =>
                `₹ ${total || 0}`,
        },

        {
            title: "Status",
            dataIndex: "status",

            render: (status) => (
                <Tag
                    color={getStatusColor(status)}
                >
                    {status?.toUpperCase()}
                </Tag>
            ),
        },

        {
            title: "Date",

            dataIndex: "createdAt",

            render: (date) =>
                date
                    ? new Date(
                          date
                      ).toLocaleDateString()
                    : "-",
        },

        {
            title: "Action",

            render: (_, record) => (
                <Space>

                    <Button
                        type="primary"
                        icon={
                            <EyeOutlined />
                        }
                        onClick={() =>
                            navigate(
                                `/supplier/order/${record._id}`
                            )
                        }
                    >
                        View
                    </Button>
                </Space>
            ),
        },
    ];


    return (
        <Card
            style={{
                background: "#f5f7fa",
                padding: 10
            }}
        >
            <Title level={2}>
                Orders
            </Title>

            {error && (
                <Typography.Text
                    type="danger"
                >
                    {error}
                </Typography.Text>
            )}

            <Table
                rowKey="_id"
                columns={columns}
                dataSource={orders}
                loading={loading}
                scroll={{
                    x: 1200,
                }}
            />

        </Card>
    );
};


export default SupplierOrderList;