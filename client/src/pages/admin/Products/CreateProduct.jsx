import { Card, Form, Input, InputNumber, Button, Typography, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../store/thunks/adminThunk/adminProductThunk";
import {
    fetchCategories
} from "../../../store/thunks/adminThunk/categoryThunk";
import { useEffect } from "react";
import { App } from "antd";

const { Title } = Typography;

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = App.useApp();
    const onFinish = async (values) => {
        const result = await dispatch(
            createProduct(values)
        );
        if (createProduct.fulfilled.match(result)) {
            message.success("Product created successfully");
            navigate("/admin/products");
        } else {
            message.error(
                result.payload || "Failed to create product"
            );
        }
    };

    const { categories, loading: categoryLoading } = useSelector(
        state => state.category
    );


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <Card>
            <Title level={2}>Create Product</Title>

            <Form
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Enter product name"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="SKU"
                    name="sku"
                    rules={[
                        {
                            required: true,
                            message: "Enter SKU"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Please select category"
                        }
                    ]}
                >
                    <Select
                        placeholder="Select Category"
                        loading={categoryLoading}
                        options={
                            categories.map((category) => ({
                                value: category._id,
                                label: category.name
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                    />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Create Product
                </Button>

            </Form>
        </Card>
    );
};

export default CreateProduct;