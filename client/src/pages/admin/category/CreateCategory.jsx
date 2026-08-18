import {
    Form,
    Input,
    Button,
    Card
} from "antd";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../store/thunks/adminThunk/categoryThunk";
import { useNavigate } from "react-router-dom";
import { App } from "antd";



const CreateCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = App.useApp();

    const [form] = Form.useForm();

    const submitHandler = async (values) => {

        const result = await dispatch(
            createCategory(values)
        );
        if (createCategory.fulfilled.match(result)) {
            message.success("Category created successfully");
        } else {
            message.error(result.payload);
        }
        form.resetFields();
        navigate(
            "/admin/categories"
        );
    };



    return (
        <Card title="Create Category">

            <Form
                form={form}
                layout="vertical"
                onFinish={submitHandler}
            >

                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Enter category name"
                        }
                    ]}
                >
                    <Input
                        placeholder="Category name"
                    />
                </Form.Item>

                <Form.Item
                    label="slug"
                    name="slug"
                    rules={[
                        {
                            required: true,
                            message: "Enter slug name"
                        }
                    ]}
                >
                    <Input
                        placeholder="slug name"
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea
                        rows={4}
                    />
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="image"
                >
                    <Input />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Create
                </Button>
            </Form>
        </Card>
    );
};

export default CreateCategory;