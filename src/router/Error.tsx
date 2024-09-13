import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Result
        status="error"
        title="Something Went Wrong"
        subTitle="Sorry, something went wrong. Please try again later."
        extra={<Button type="primary" onClick={handleBack}>Back to Home</Button>}
      />
    </div>
  );
};

export default Error;
