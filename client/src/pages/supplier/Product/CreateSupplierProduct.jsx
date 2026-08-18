import React from 'react'
import { Card, Form, Input, InputNumber, Button, Typography, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSupplierProduct } from '../../../store/thunks/supplierThunk/supplierProductThunk';
import { fetchSupplierCategories } from '../../../store/thunks/supplierThunk/supplierCategoryThunk';
import { useEffect } from "react";
import { App } from "antd";

const { Title } = Typography;

const CreateSupplierProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = App.useApp();
    const onFinish = async (values) => {
        const result = await dispatch(
            createSupplierProduct(values)
        );
        if (createSupplierProduct.fulfilled.match(result)) {
            message.success("Product created successfully");
            navigate("/supplier/products");
        } else {
            message.error(
                result.payload || "Failed to create product"
            );
        }
    };

    const {
        categories= [],
        categoryLoading
    } = useSelector(
        state => state.supplierCategory
    );


    useEffect(() => {
        dispatch(fetchSupplierCategories());
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
export default CreateSupplierProduct