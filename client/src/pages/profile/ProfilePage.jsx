import React, { useEffect, useState } from "react";
import { Avatar, Breadcrumb, Button, Card, Col, Descriptions, Divider, Form, Input, Row, Skeleton, Space, Tag, Upload, message, } from "antd";
import { EditOutlined, CameraOutlined, MailOutlined, PhoneOutlined, UserOutlined, EnvironmentOutlined, SaveOutlined, CloseOutlined, } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const ProfilePage = ({ title, role, profile, loading, updateLoading, avatarLoading, error, fetchProfile, updateProfile, updateAvatar, clearError, }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [editing, setEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch, fetchProfile]);

    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phone: profile.phone,
                address: profile.address,
                city: profile.city,
                state: profile.state,
                country: profile.country,
                postalCode: profile.postalCode,
                companyName: profile.companyName,
            });
        }
    }, [profile, form]);

    useEffect(() => {
        if (error) {
            message.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch, clearError]);

    const handleUpdateProfile = async (values) => {
        try {
            await dispatch(
                updateProfile({ data: values })
            ).unwrap();

            message.success("Profile updated successfully");

            setEditing(false);
        } catch (error) {
            message.error(error || "Unable to update profile");
        }
    };

    const handleAvatarChange = async () => {
        if (!avatarFile) {
            message.warning("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", avatarFile);

        try {
            await dispatch(
                updateAvatar({
                    data: formData,
                })
            ).unwrap();

            message.success("Profile picture updated successfully");

            setAvatarFile(null);
        } catch (error) {
            message.error(error || "Unable to update avatar");
        }
    };

    const handleCancelEdit = () => {
        form.resetFields();
        setEditing(false);
    };

    if (loading && !profile) {
        return (
            <div style={{ padding: 24 }}>
                <Card>
                    <Skeleton active avatar paragraph={{ rows: 8 }} />
                </Card>
            </div>
        );
    }

    if (!profile) {
        return (
            <div style={{ padding: 24 }}>
                <Card>
                    Unable to load profile.
                </Card>
            </div>
        );
    }

    const fullName = [profile.firstName, profile.lastName,]
        .filter(Boolean)
        .join(" ");

    const avatarUrl = profile.avatar || profile.avatarUrl || profile.profileImage;

    return (
        <div
            style={{
                padding: 24,
                background: "#f5f7fa",
                minHeight: "100vh",
            }}
        >
            <Breadcrumb
                style={{
                    marginBottom: 20,
                }}
                items={[
                    {
                        title: "Dashboard",
                    },
                    {
                        title: "Profile",
                    },
                ]}
            />
            <Card
                bordered={false}
                style={{
                    marginBottom: 24,
                    borderRadius: 12,
                }}>
                <Row
                    justify="space-between"
                    align="middle"
                    gutter={[24, 24]}>
                    <Col>
                        <Space align="center">
                            <Avatar
                                size={64}
                                src={avatarUrl}
                                icon={<UserOutlined />}
                                style={{
                                    backgroundColor: "#1677ff",
                                }}
                            />
                            <div>
                                <h1
                                    style={{
                                        margin: 0,
                                        fontSize: 24,
                                        fontWeight: 600,
                                    }}>
                                    {title}
                                </h1>
                                <Space style={{ marginTop: 6, }}>
                                    <Tag color="blue">
                                        {role}
                                    </Tag>

                                    {profile.status && (
                                        <Tag color={profile.status === "active" ? "success" : "default"}>
                                            {profile.status}
                                        </Tag>
                                    )}
                                </Space>
                            </div>
                        </Space>
                    </Col>

                    <Col>
                        {!editing ? (
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => setEditing(true)}
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <Space>
                                <Button
                                    icon={<CloseOutlined />}
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="primary"
                                    icon={<SaveOutlined />}
                                    loading={updateLoading}
                                    onClick={() =>
                                        form.submit()
                                    }
                                >
                                    Save Changes
                                </Button>
                            </Space>
                        )}
                    </Col>
                </Row>
            </Card>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={8}>
                    <Card
                        bordered={false}
                        title="Profile Picture"
                        style={{
                            borderRadius: 12,
                            height: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <Avatar
                                size={150}
                                src={avatarUrl}
                                icon={<UserOutlined />}
                                style={{
                                    backgroundColor: "#1677ff",
                                    marginBottom: 20,
                                }}
                            />

                            <h3
                                style={{
                                    marginBottom: 4,
                                }}
                            >
                                {fullName || "User"}
                            </h3>

                            <p
                                style={{
                                    color: "#8c8c8c",
                                    marginBottom: 24,
                                }}
                            >
                                {profile.email}
                            </p>
                        </div>

                        <Divider />

                        <Descriptions
                            column={1}
                            size="small"
                        >
                            <Descriptions.Item
                                label="Email"
                            >
                                <Space>
                                    <MailOutlined />
                                    {profile.email || "-"}
                                </Space>
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="Phone"
                            >
                                <Space>
                                    <PhoneOutlined />
                                    {profile.phone || "-"}
                                </Space>
                            </Descriptions.Item>

                            <Descriptions.Item
                                label="Role"
                            >
                                <Tag color="blue">
                                    {role}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={16}>
                    <Card
                        bordered={false}
                        title="Personal Information"
                        style={{
                            borderRadius: 12,
                        }}
                    >
                        {editing ? (
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleUpdateProfile}
                            >
                                <Row gutter={16}>
                                    <Col
                                        xs={24}
                                        md={12}
                                    >
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter first name",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="First name"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        xs={24}
                                        md={12}
                                    >
                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                        >
                                            <Input
                                                placeholder="Last name"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        xs={24}
                                        md={12}
                                    >
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message:
                                                        "Enter a valid email",
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <MailOutlined />
                                                }
                                                placeholder="Email"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        xs={24}
                                        md={12}
                                    >
                                        <Form.Item
                                            label="Phone"
                                            name="phone"
                                        >
                                            <Input
                                                prefix={
                                                    <PhoneOutlined />
                                                }
                                                placeholder="Phone number"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>

                                    {profile.companyName !== undefined && (
                                        <Col span={24}>
                                            <Form.Item
                                                label="Company Name"
                                                name="companyName"
                                            >
                                                <Input placeholder="Company name" size="large" />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    <Col span={24}>
                                        <Form.Item
                                            label="Address"
                                            name="address"
                                        >
                                            <Input.TextArea
                                                rows={3}
                                                placeholder="Address"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Form.Item
                                            label="City"
                                            name="city"
                                        >
                                            <Input
                                                placeholder="City"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={8}>
                                        <Form.Item label="State" name="state">
                                            <Input
                                                placeholder="State"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            label="Postal Code"
                                            name="postalCode"
                                        >
                                            <Input
                                                placeholder="Postal code"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                        <Form.Item
                                            label="Country"
                                            name="country"
                                        >
                                            <Input
                                                placeholder="Country"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        ) : (
                            <Descriptions bordered
                                column={{
                                    xs: 1,
                                    sm: 1,
                                    md: 2,
                                }}
                                size="middle"
                            >
                                <Descriptions.Item label="First Name">
                                    {profile.firstName || "-"}
                                </Descriptions.Item>

                                <Descriptions.Item label="Last Name">
                                    {profile.lastName || "-"}
                                </Descriptions.Item>

                                <Descriptions.Item label="Email">
                                    {profile.email || "-"}
                                </Descriptions.Item>

                                <Descriptions.Item label="Phone">
                                    {profile.phone || "-"}
                                </Descriptions.Item>

                                {profile.companyName && (
                                    <Descriptions.Item label="Company">
                                        {profile.companyName}
                                    </Descriptions.Item>
                                )}

                                <Descriptions.Item label="City">
                                    <Space>
                                        <EnvironmentOutlined />
                                        {profile.city || "-"}
                                    </Space>
                                </Descriptions.Item>

                                <Descriptions.Item label="State">
                                    {profile.state || "-"}
                                </Descriptions.Item>

                                <Descriptions.Item label="Country">
                                    {profile.country || "-"}
                                </Descriptions.Item>

                                <Descriptions.Item label="Postal Code">
                                    {profile.postalCode || "-"}
                                </Descriptions.Item>

                                <Descriptions.Item
                                    label="Address"
                                    span={2}
                                >
                                    {profile.address || "-"}
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                    </Card>
                </Col>
            </Row>

            <Card
                bordered={false}
                title="Account Information"
                style={{
                    marginTop: 24,
                    borderRadius: 12,
                }}
            >
                <Descriptions column={{ xs: 1, sm: 2, md: 3, }}>
                    <Descriptions.Item label="User ID">
                        {profile.id || profile._id || "-"}
                    </Descriptions.Item>

                    <Descriptions.Item label="Account Status">
                        <Tag color="success">
                            {profile.status || "Active"}
                        </Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "-"}
                    </Descriptions.Item>

                    <Descriptions.Item label="Last Updated">
                        {profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : "-"}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default ProfilePage;
