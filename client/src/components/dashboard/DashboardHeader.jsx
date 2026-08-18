import React from "react";
import { Breadcrumb, Typography } from "antd";
const { Title, Text } = Typography;

const DashboardHeader = ({ title, description, breadcrumb = "Dashboard" }) => {
    return (
        <div style={{ marginBottom: 24 }}>
            <Breadcrumb
                items={[
                    {
                        title: "Dashboard",
                    },
                    {
                        title: breadcrumb,
                    },]} />

            <div style={{ marginTop: 16 }}>
                <Title
                    level={2}
                    style={{
                        margin: 0,
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Title>

                <Text
                    type="secondary"
                    style={{
                        fontSize: 15,
                    }}
                >
                    {description}
                </Text>
            </div>
        </div>
    );
};

export default DashboardHeader;
