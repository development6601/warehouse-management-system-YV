import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Alert,
  Checkbox,
} from "antd";

import {
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { login } from "../../store/thunks/authThunk";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      switch (user?.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "SUPPLIER":
          navigate("/supplier/dashboard");
          break;

        default:
          navigate("/customer/products");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: 430,
          borderRadius: 10,
          boxShadow: "0 10px 30px rgba(0,0,0,.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          <Title level={2}>Login</Title>

          <Text type="secondary">
            Enter your email and password to access your account
          </Text>
        </div>

        {error && (
          <Alert
            style={{ marginBottom: 20 }}
            type="error"
            title={error}
            showIcon
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    size="large"
                    prefix={<MailOutlined />}
                    placeholder="Enter email"
                    autoComplete="email"
                    status={
                      fieldState.error
                        ? "error"
                        : ""
                    }
                  />

                  {fieldState.error && (
                    <Text type="danger">
                      {fieldState.error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Form.Item>

          <Form.Item label="Password">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input.Password
                    {...field}
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="Enter password"
                    autoComplete="current-password" 
                    status={
                      fieldState.error
                        ? "error"
                        : ""
                    }
                  />

                  {fieldState.error && (
                    <Text type="danger">
                      {fieldState.error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) =>
                    field.onChange(
                      e.target.checked
                    )
                  }
                >
                  Remember Me
                </Checkbox>
              )}
            />

            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
          >
            Login
          </Button>
        </Form>

        <div
          style={{
            textAlign: "center",
            marginTop: 25,
          }}
        >
          <Text>
            Don't have an account?{" "}
            <Link to="/signup">
              Sign Up
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;