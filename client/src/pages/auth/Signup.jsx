import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {Card, Typography,
    Form,
    Input,
    Button,
    Alert,
    Select,
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
} from "@ant-design/icons";
import { signup } from "../../store/thunks/authThunk";
import {
    clearError,
    clearSuccessMessage,
} from "../../store/slices/authSlice";
const { Title, Text } = Typography;
const { Option } = Select;


const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        loading,
        error,
        successMessage,
    } = useSelector(
        (state) => state.auth
    );



    const {
        control,
        handleSubmit,
        watch,
    } = useForm({

        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "CUSTOMER"
        }
    });

    useEffect(() => {
        return () => {
            dispatch(clearError());
            dispatch(clearSuccessMessage());
        }
    }, [dispatch]);


    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    }, [
        successMessage,
        navigate
    ]);




    const onSubmit = (data) => {
        const signupData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            role: data.role
        };
        dispatch(
            signup(signupData)
        );
    };


    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 20
            }}
        >
            <Card
                style={{
                    width: 450,
                    borderRadius: 12,
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.1)"
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 30
                    }}
                >
                    <Title level={2}>
                        Create Account
                    </Title>
                    <Text type="secondary">
                        Register to get started
                    </Text>
                </div>
                {
                    error &&
                    <Alert
                        style={{
                            marginBottom: 20
                        }}
                        type="error"
                        message={error}
                        showIcon
                    />
                }

                {
                    successMessage &&
                    <Alert
                        style={{
                            marginBottom: 20
                        }}
                        type="success"
                        message={successMessage}
                        showIcon
                    />
                }


                <Form
                    layout="vertical"
                    onFinish={
                        handleSubmit(onSubmit)
                    }
                >
                    <Form.Item label="First Name">
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{
                                required:
                                    "First name is required"
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input
                                        {...field}
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="Enter first name"
                                        status={
                                            fieldState.error
                                                ?
                                                "error"
                                                :
                                                ""
                                        }
                                    />
                                    {
                                        fieldState.error &&
                                        <Text type="danger">
                                            {fieldState.error.message}
                                        </Text>
                                    }
                                </>
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Last Name">
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{
                                required:
                                    "Last name is required"
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input
                                        {...field}
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="Enter last name"
                                        status={
                                            fieldState.error
                                                ?
                                                "error"
                                                :
                                                ""
                                        }
                                    />
                                    {
                                        fieldState.error &&
                                        <Text type="danger">
                                            {fieldState.error.message}
                                        </Text>
                                    }
                                </>
                            )}
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required:
                                    "Email is required"
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input
                                        {...field}
                                        size="large"
                                        prefix={<MailOutlined />}
                                        placeholder="Enter email"
                                        status={
                                            fieldState.error
                                                ?
                                                "error"
                                                :
                                                ""
                                        }
                                    />
                                    {
                                        fieldState.error &&
                                        <Text type="danger">
                                            {fieldState.error.message}
                                        </Text>
                                    }
                                </>
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Password">
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required:
                                    "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Minimum 6 characters"
                                }
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input.Password
                                        {...field}
                                        size="large"
                                        prefix={<LockOutlined />}
                                        placeholder="Password"
                                        status={
                                            fieldState.error
                                                ?
                                                "error"
                                                :
                                                ""
                                        }
                                    />
                                    {
                                        fieldState.error &&
                                        <Text type="danger">
                                            {fieldState.error.message}
                                        </Text>
                                    }
                                </>
                            )}
                        />
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required:
                                    "Confirm password required",
                                validate: (value) =>
                                    value === watch("password")
                                    ||
                                    "Passwords do not match"
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input.Password
                                        {...field}
                                        size="large"
                                        prefix={<LockOutlined />}
                                        placeholder="Confirm password"
                                        status={
                                            fieldState.error
                                                ?
                                                "error"
                                                :
                                                ""
                                        }
                                    />
                                    {
                                        fieldState.error &&
                                        <Text type="danger">
                                            {fieldState.error.message}
                                        </Text>
                                    }
                                </>
                            )}
                        />
                    </Form.Item>
                    <Form.Item label="Role">
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    size="large"
                                    style={{
                                        width: "100%"
                                    }}
                                >
                                    <Option value="CUSTOMER">
                                        Customer
                                    </Option>
                                    <Option value="SUPPLIER">
                                        Supplier
                                    </Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={loading}
                    >
                        Create Account
                    </Button>
                </Form>
                <div
                    style={{
                        textAlign: "center",
                        marginTop: 25
                    }}
                >
                    <Text>
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default Signup;