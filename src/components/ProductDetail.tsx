import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Card, Row, Col, Image, Button, Table } from 'antd';
import { useGetProductByIdQuery } from '../services/productApi';
import EditProduct from './EditProduct';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetProductByIdQuery(id!);
    const [isModalVisible, setIsModalVisible] = useState(false);

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100vh',
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    const columns = [
        {
            title: 'Attribute',
            dataIndex: 'attribute',
            key: 'attribute',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const tableData = [
        { key: 'title', attribute: 'Title', value: data?.title },
        { key: 'brand', attribute: 'Brand', value: data?.brand },
        { key: 'category', attribute: 'Category', value: data?.category },
        { key: 'price', attribute: 'Price', value: `$${data?.price}` },
        { key: 'rating', attribute: 'Rating', value: data?.rating },
        { key: 'stock', attribute: 'Stock', value: data?.stock },
        { key: 'description', attribute: 'Description', value: data?.description },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Card bordered style={{ maxWidth: 1200, margin: 'auto', padding: '0px' }}>
                <Row gutter={[16, 16]} justify="center" align="middle">

                    {/*=================== Image ============================ */}
                    <Col xs={24} sm={24} md={12} lg={10} style={{ textAlign: 'center' }}>
                        <Image
                            alt={data?.title}
                            src={data?.thumbnail}
                            preview
                            style={{
                                width: '100%',
                                maxHeight: '400px',
                                objectFit: 'cover',
                            }}
                        />
                    </Col>

                    {/* ===================== Product Details Table ==========================*/}
                    <Col xs={24} sm={24} md={12} lg={14}>
                    <br />
                    <h2>Product Detail</h2>
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            pagination={false}
                            showHeader={false}
                            bordered
                            style={{ marginBottom: '20px' }}
                        />

                        <div style={{ textAlign: 'right', margin: '20px 10px' }}>
                            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                                Edit Product
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>

            <div>
                <EditProduct setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
            </div>
        </div>
    );
};

export default ProductDetail;
