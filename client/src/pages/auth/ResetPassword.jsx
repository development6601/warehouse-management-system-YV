import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
    Card,
    Typography,
    Form,
    Input,
    Button,
    Alert
} from "antd";
import {
    LockOutlined
} from "@ant-design/icons";
import {
    resetPassword
} from "../../store/thunks/authThunk";
import {
    clearError,
    clearSuccessMessage
} from "../../store/slices/authSlice";
const { Title, Text } = Typography;


const ResetPassword = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        loading,
        error,
        successMessage
    } = useSelector(
        (state) => state.auth
    );

    const {
        control,
        handleSubmit,
        watch
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
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
            }, 1500);
        }
    }, [
        successMessage,
        navigate
    ]);

    const onSubmit = (data) => {
        dispatch(
            resetPassword({
                token,
                data: {
                    password: data.password
                }
            })
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
                    width: 430,
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
                        Reset Password
                    </Title>

                    <Text type="secondary">
                        Create your new password
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

                    <Form.Item label="New Password">


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
                                        prefix={
                                            <LockOutlined />
                                        }
                                        placeholder="Enter new password"
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
                                        prefix={
                                            <LockOutlined />
                                        }
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

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={loading}
                    >
                        Reset Password
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


export default ResetPassword;