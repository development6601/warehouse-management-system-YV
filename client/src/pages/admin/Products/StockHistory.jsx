import { Table, Card, Typography, Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStockHistory } from "../../../store/thunks/adminThunk/adminProductThunk";

const { Title } = Typography;

const StockHistory = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const {
        stockHistory,
        loading
    }
        =
        useSelector(
            state => state.product
        );

    useEffect(() => {
        dispatch(
            getStockHistory(id)
        );
    }, [id]);

    const columns = [
        {
            title: "Date",
            dataIndex: "createdAt",

            render: (date) =>
                new Date(date)
                    .toLocaleString()
        },

        {
            title: "Previous Stock",
            dataIndex: "previousQuantity"
        },

        {
            title: "New Stock",
            dataIndex: "newQuantity"
        },
        {
            title: "Change",
            dataIndex: "change",

            render: (value) => (
                <Tag
                    color={
                        value > 0
                            ?
                            "green"
                            :
                            "red"
                    }
                >
                    {
                        value > 0
                            ?
                            `+${value}`
                            :
                            value
                    }
                </Tag>
            )
        },
        {
            title: "Type",
            dataIndex: "type",
            render: (type) => (
                <Tag>
                    {type}
                </Tag>
            )
        },
        {
            title: "Updated By",

            render: (record) =>
                record.updatedBy
                    ?
                    `${record.updatedBy.firstName}
                        ${record.updatedBy.lastName}`
                    :
                    "Admin"
        }
    ];

    return (
        <Card>
            <Title level={2}>
                Stock History
            </Title>

            <Table
                rowKey="_id"
                columns={columns}
                dataSource={stockHistory}
                loading={loading}
            />
        </Card>
    );
};

export default StockHistory;