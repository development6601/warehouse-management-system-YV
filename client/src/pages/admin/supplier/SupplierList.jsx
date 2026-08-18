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
    fetchSuppliers,
    disableSupplier
} from "../../../store/thunks/supplierThunk/supplierThunk";
const { Title } = Typography;

const SupplierList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        suppliers,
        loading
    } = useSelector(
        state => state.supplier
    );
    useEffect(() => {
        dispatch(fetchSuppliers());
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
                                `/admin/suppliers/${record._id}/edit`
                            )
                        }
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Disable supplier?"
                        onConfirm={() =>
                            dispatch(
                                disableSupplier(record._id)
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
                Suppliers
            </Title>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={suppliers}
                loading={loading}
            />
        </Card>
    );
};

export default SupplierList;