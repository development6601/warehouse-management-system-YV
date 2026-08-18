import {
    Card,
    Form,
    Input,
    InputNumber,
    Button,
    Typography
} from "antd";
import {
    useDispatch
} from "react-redux";
import {
    useEffect
} from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";
import {
    getProductById,
    updateProduct
} from "../../../store/thunks/adminThunk/adminProductThunk";
const { Title } = Typography;
import { App } from "antd";



const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = App.useApp();
    const { id } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        const loadProduct = async () => {
            const result = await dispatch(getProduct(id));
            if (getProduct.fulfilled.match(result)) {
                form.setFieldsValue(
                    result.payload.data
                );
            }
        };
        loadProduct();
    }, [id]);

    const onFinish = async (values) => {
        const result =
            await dispatch(
                updateProduct({
                    id,
                    data: values
                })
            );

        if (updateProduct.fulfilled.match(result)) {
            message.success("Product edited successfully");
            navigate("/admin/products");
        }else {
            message.error(
                result.payload || "Failed to Edit product"
            );
        }
    };

    return (
        <Card>
            <Title level={2}>
                Edit Product
            </Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    label="Product Name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="sku"
                    label="SKU"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Category"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price"
                >
                    <InputNumber
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    name="quantity"
                    label="Quantity"
                >
                    <InputNumber
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Update Product
                </Button>
            </Form>
        </Card>
    );
};

export default EditProduct;