import {
    Table,
    Button,
    Space,
    Tag,
    Typography,
    Card,
    Input
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCategory,
    fetchCategories
} from "../../../store/thunks/adminThunk/categoryThunk";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const CategoryList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    const {
        categories,
        loading
    } = useSelector(
        (state) => state.category
    );

    useEffect(() => {
        dispatch(
            fetchCategories({
                search
            })
        );
    }, [dispatch, search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchInput]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },

        {
            title: "Slug",
            dataIndex: "slug",
        },

        {
            title: "Status",
            render: (_, record) => (
                record.status ? (
                    <Tag color="green">
                        Active
                    </Tag>
                ) : (
                    <Tag color="red">
                        Inactive
                    </Tag>
                )
            )
        },

        {
            title: "Action",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() =>
                            navigate(
                                `/admin/categories/${record._id}/edit`
                            )
                        }
                    />

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            dispatch(
                                deleteCategory(
                                    record._id
                                )
                            );
                        }}
                    />
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
                Categories
            </Title>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() =>
                    navigate(
                        "/admin/categories/create"
                    )
                }
                style={{
                    marginBottom: 20
                }}
            >
                Create Category
            </Button>

            <div
                style={{
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
                    }}
                    placeholder="Search by category name or slug"
                    style={{
                        width: 350
                    }}
                />
            </div>

            <Table
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={categories}
            />
        </Card>
    );
};

export default CategoryList;
