import React from "react";
import { Card, Col, Row, Skeleton } from "antd";

const DashboardSkeleton = () => {
    return (
        <div
            style={{
                padding: 24,
            }}
        >
            <Skeleton
                active
                paragraph={{ rows: 2 }}
            />

            <Row gutter={[16, 16]}>
                {[1, 2, 3, 4].map((item) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        key={item}
                    >
                        <Card bordered={false}>
                            <Skeleton
                                active
                                paragraph={{
                                    rows: 2,
                                }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default DashboardSkeleton;
