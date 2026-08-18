import {
    Form,
    Input,
    Button,
    Card
} from "antd";
import {
    useEffect
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    getCategoryById,
    updateCategory
} from "../../../store/thunks/adminThunk/categoryThunk";
import { useNavigate, useParams } from "react-router-dom";
import { App } from "antd";


const EditCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = App.useApp();

    const { id } = useParams();

    const [form] = Form.useForm();
    const {
        selectedCategory
    } = useSelector(
        state => state.category
    );

    useEffect(() => {
        dispatch(
            getCategoryById(id)
        );
    }, [id]);

    useEffect(() => {

        if (selectedCategory) {
            form.setFieldsValue({
                name: selectedCategory.name,
                description: selectedCategory.description,
                image: selectedCategory.image
            });
        }
    }, [selectedCategory]);

    const submitHandler = (values) => {
        dispatch(
            updateCategory({
                id,
                data: values
            }),
            message.success("Product updated successfully")
        );
        navigate(
            "/admin/categories"
        );
    };

    return (
        <Card title="Edit Category">

            <Form
                form={form}
                layout="vertical"
                onFinish={submitHandler}
            >
                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                >
                    <Input />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Update
                </Button>
            </Form>
        </Card>
    );
};


export default EditCategory;