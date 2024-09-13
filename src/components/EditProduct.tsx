import React from 'react';
import { Modal, Button, Form, Input, Select, Rate, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetCategoriesQuery, useGetProductByIdQuery, useUpdateProductMutation } from '../services/productApi';

const { Option } = Select;

interface EditProductProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ isModalVisible, setIsModalVisible }) => {
  const { id } = useParams<{ id: string }>();


  const { data: product } = useGetProductByIdQuery(Number(id));
  const { data: categories } = useGetCategoriesQuery(undefined);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      await updateProduct({ id: Number(id), data: values }).unwrap();
      console.log('Updated product data:', values);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };


  return (
    <>

      <Modal
        title="Edit Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={product}
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the product title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <Input type="number" />
          </Form.Item>

  
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select>
              {categories?.map((category: { slug: string; name: string }) => (
                <Option key={category.slug} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* ================================= Reviews Section ==================================*/}
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Form.Item
                    key={key}
                    {...restField}
                    label={`Review ${name + 1}`}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Form.Item
                        name={[name, 'reviewerName']}
                        fieldKey={fieldKey || key}
                        rules={[{ required: true, message: 'Please input reviewer name!' }]}
                      >
                        <Input placeholder="Reviewer Name" />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'reviewerEmail']}
                        fieldKey={fieldKey || key}
                        rules={[
                          { required: true, message: 'Please input reviewer email!' },
                          { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                      >
                        <Input placeholder="Reviewer Email" />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'comment']}
                        fieldKey={fieldKey || key}
                        rules={[{ required: true, message: 'Please input comment!' }]}
                      >
                        <Input.TextArea placeholder="Comment" />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'rating']}
                        fieldKey={fieldKey || key}
                        rules={[{ required: true, message: 'Please select a rating!' }]}
                      >
                        <Rate />
                      </Form.Item>
                      <Button danger onClick={() => remove(name)}>
                        Remove
                      </Button>
                    </Space>
                  </Form.Item>
                ))}
                <Button type="dashed" onClick={() => add()} block style={{ margin: "20px 0px" }}>
                  Add Review
                </Button>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              {isUpdating ? 'Updating...' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProduct;
