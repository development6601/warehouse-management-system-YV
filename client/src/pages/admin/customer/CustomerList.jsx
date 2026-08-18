import { useEffect } from "react";
import {
    Card,
    Table,
    Button,
    Space,
    Tag,
    Typography,
    Popconfirm
} from "antd";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchCustomer,
    disableCustomer
} from "../../../store/thunks/customerThunk/customerThunk";
const { Title } = Typography;

const CustomerList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        customer,
        loading
    } = useSelector(
        state => state.customer
    );
    useEffect(() => {
        dispatch(fetchCustomer());
    }, [dispatch]);


    const columns = [
        {
            title: "Name",
            render: (_, record) =>
                `${record.firstName} ${record.lastName}`
        },

        {
            title: "Email",
            dataIndex: "email"
        },

        {
            title: "Status",
            render: (_, record) => (
                <Tag color={record.isActive ? "green" : "red"}>
                    {record.isActive ? "Active" : "Disabled"}
                </Tag>
            )
        },

        {
            title: "Actions",
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() =>
                            navigate(
                                `/admin/customer/${record._id}/edit`
                            )
                        }
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Disable customer?"
                        onConfirm={() =>
                            dispatch(
                                disableCustomer(record._id)
                            )
                        }
                    >
                        <Button danger>
                            Disable
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
                Customer
            </Title>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={customer}
                loading={loading}
            />
        </Card>
    );
};

export default CustomerList;