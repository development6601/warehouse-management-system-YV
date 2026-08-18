import React, { useEffect } from "react";

import { Avatar, Card, Col, Empty, Row, Space, Statistic, Table, Tag, Typography, message } from "antd";
import { ShoppingCartOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, DollarOutlined, } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerDashboard } from "../../store/thunks/customerThunk/customerDashboardthunk";
import { clearCustomerDashboardError, } from "../../store/slices/customerSlice/customerDashboardSlice";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

const { Text } = Typography;

const CustomerDashboard = () => {
  const dispatch = useDispatch();

  const {
    dashboard,
    loading,
    error,
  } = useSelector(
    (state) => state.customerDashboard
  );

  useEffect(() => {
    dispatch(getCustomerDashboard());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);

      dispatch(
        clearCustomerDashboardError()
      );
    }
  }, [error, dispatch]);

  if (loading && !dashboard) {
    return <DashboardSkeleton />;
  }

  const stats = dashboard?.stats || {};

  const recentOrders =
    dashboard?.recentOrders || [];

  const getStatusColor = (status) => {
    switch (
    status?.toLowerCase()
    ) {
      case "completed":
        return "success";

      case "pending":
        return "warning";

      case "processing":
        return "processing";

      case "cancelled":
        return "error";

      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Order",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Text strong>
          #{id?.slice(-8)?.toUpperCase()}
        </Text>
      ),
    },

    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) =>
        Array.isArray(items)
          ? `${items.length} item${items.length !==1 ? "s": ""}`: "-",
    },

    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => (
        <Text strong>
          ₹{Number(amount || 0).toLocaleString("en-IN")}
        </Text>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
        >
          {status?.toUpperCase() ||"UNKNOWN"}
        </Tag>
      ),
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        date? new Date(date).toLocaleDateString("en-IN"): "-",
    },
  ];

  return (
    <div
      style={{
        padding: 24,
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <DashboardHeader
        title="Customer Dashboard"
        description="Track your orders, purchases and account activity."
      />
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 24,
        }}
      >
        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <DashboardStatCard
            title="Total Orders"
            value={
              stats.totalOrders ||
              0
            }
            icon={
              <ShoppingCartOutlined />
            }
            color="#1677ff"
          />
        </Col>

        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <DashboardStatCard
            title="Pending Orders"
            value={
              stats.pendingOrders ||
              0
            }
            icon={
              <ClockCircleOutlined />
            }
            color="#faad14"
          />
        </Col>

        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <DashboardStatCard
            title="Completed Orders"
            value={
              stats.completedOrders ||
              0
            }
            icon={
              <CheckCircleOutlined />
            }
            color="#52c41a"
          />
        </Col>

        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <DashboardStatCard
            title="Cancelled Orders"
            value={
              stats.cancelledOrders ||
              0
            }
            icon={
              <CloseCircleOutlined />
            }
            color="#ff4d4f"
          />
        </Col>
      </Row>
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 24,
        }}
      >
        <Col
          xs={24}
          md={12}
        >
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
            }}
          >
            <Statistic
              title="Total Orders"
              value={
                stats.totalOrders ||
                0
              }
              prefix={
                <ShoppingCartOutlined
                  style={{
                    color:
                      "#1677ff",
                  }}
                />
              }
            />
          </Card>
        </Col>

        <Col
          xs={24}
          md={12}
        >
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
            }}
          >
            <Statistic
              title="Completed Orders"
              value={
                stats.completedOrders ||
                0
              }
              prefix={
                <CheckCircleOutlined
                  style={{
                    color:
                      "#52c41a",
                  }}
                />
              }
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="My Recent Orders"
        bordered={false}
        style={{
          borderRadius: 12,
        }}
      >
        {recentOrders.length > 0 ? (
          <Table
            rowKey={(record) =>
              record._id
            }
            columns={columns}
            dataSource={
              recentOrders
            }
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
            }}
            scroll={{
              x: 650,
            }}
          />
        ) : (
          <Empty
            description="You don't have any orders yet"
          />
        )}
      </Card>
    </div>
  );
};

export default CustomerDashboard;
