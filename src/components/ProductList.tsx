import React, { useState } from 'react';
import { Table, Button, Pagination, Spin, Typography, Image } from 'antd';
import { useGetProductsQuery } from '../services/productApi';
import { useNavigate, Link } from 'react-router-dom';

const { Title } = Typography;

//============================== Product interface======================================
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // ===============================Fetch products with limit and skip======================
  const { data, isLoading, error } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  const navigate = useNavigate();

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

  if (error) return <div>Failed to load products.</div>;

  // =========================Columns Table===================================
  const columns = [
    {
      title: 'Products Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => (
        <Image
          src={thumbnail}
          alt="Product Thumbnail"
          width={100}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Products Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Product) => (
        <Link to={`/product/${record.id}`}>
          <Button type="link">{text}</Button>
        </Link>
      ),
    },
    {
      title: 'Products Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: '',
      key: 'action',
      render: (record: Product) => (
        <Button
          type="primary"
          onClick={() => navigate(`/product/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Product List</Title>
      <Table
        columns={columns}
        dataSource={data?.products}
        rowKey="id"
        pagination={false}
        style={{ marginBottom: '20px' }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data?.total || 0}
        onChange={(page) => setCurrentPage(page)}
        style={{ textAlign: 'center' }}
      />
    </div>
  );
};

export default ProductList;
