import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import {
    Card,
    Typography,
    Form,
    Input,
    Button,
    Alert,
} from "antd";
import {
    MailOutlined,
} from "@ant-design/icons";
import { forgotPassword } from "../../store/thunks/authThunk";
import {
    clearError,
    clearSuccessMessage,
} from "../../store/slices/authSlice";
const { Title, Text } = Typography;


const ForgotPassword = () => {
    const dispatch = useDispatch();
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
    } = useForm({

        defaultValues: {
            email: ""
        }
    });

    useEffect(() => {
        return () => {
            dispatch(clearError());
            dispatch(clearSuccessMessage());
        }
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(
            forgotPassword(data)
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
                    width: 420,
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
                        Forgot Password
                    </Title>
                    <Text type="secondary">
                        Enter your email and we will send
                        you a password reset link.
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
                                        prefix={
                                            <MailOutlined />
                                        }
                                        placeholder="Enter your email"
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
                                            {
                                                fieldState.error.message
                                            }
                                        </Text>
                                    }
                                </>
                            )}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        loading={loading}
                    >
                        Send Reset Link
                    </Button>
                </Form>

                <div
                    style={{
                        textAlign: "center",
                        marginTop: 25
                    }}
                >
                    <Link to="/login">
                        Back to Login
                    </Link>
                </div>
            </Card>
        </div>
    );
};


export default ForgotPassword;