import React from 'react';
import { Button, Form, Input, InputNumber, Select, message, Spin } from 'antd';
import { createProductMutation } from '../_hooks/use-create-product';
import { getProductCategoriesQuery } from '../_hooks/use-category-product';

const { Option } = Select;

export const FormAddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const addProduct = createProductMutation();
  const { data: categories, isLoading, isError } = getProductCategoriesQuery();

  const handleSubmit = (values: any) => {
    addProduct.mutate(values, {
      onSuccess: () => {
        message.success('Product added successfully!');
        form.resetFields();
      },
      onError: (error: any) => {
        console.error('Error adding product:', error);
        message.error('Failed to add product. Please try again.');
      },
    });
  };

  if (isLoading) return <Spin />;
  if (isError) return <p>Error loading categories</p>;

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Product Name"
        name="title"
        rules={[{ required: true, message: 'Please enter the product name!' }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please enter the product price!' },
          { type: 'number', message: 'Price must be a number!', transform: (value) => Number(value) },
        ]}
      >
        <InputNumber style={{ width: '100%' }} placeholder="Enter product price" />
      </Form.Item>

      <Form.Item
        label="Stock"
        name="stock"
        rules={[
          { required: true, message: 'Please enter the product stock!' },
          { type: 'number', message: 'Stock must be a number!', transform: (value) => Number(value) },
        ]}
      >
        <InputNumber style={{ width: '100%' }} placeholder="Enter product stock" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select placeholder="Select product category" allowClear>
          {categories && Array.isArray(categories) &&
            categories.map((category: any) => (
              <Option key={category.slug} value={category.id}>
                {category.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
