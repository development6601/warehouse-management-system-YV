import React from "react";
import { Card, Statistic } from "antd";

const DashboardStatCard = ({ title, value = 0, prefix, suffix, icon, color = "#1677ff", loading = false, }) => {
    return (
        <Card
            bordered={false}
            loading={loading}
            style={{
                borderRadius: 12,
                height: "100%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}>
                <Statistic
                    title={title}
                    value={value}
                    prefix={prefix}
                    suffix={suffix}
                />

                <div
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `${color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color,
                        fontSize: 24,
                    }}
                >
                    {icon}
                </div>
            </div>
        </Card>
    );
};

export default DashboardStatCard;
