'use client';
import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { editProduct } from "@/api/products";
import { title } from "process";

interface EditProductModalProps {
  product: any;
  onSave: (values: any) => void;
  openModal: boolean;
  onClose: () => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onSave,
  onClose,
  openModal,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product]);

  const handleFinish = (values: any) => {
    const updatedProduct = {
      ...product,  // Data produk lama
      ...values,   // Data yang diedit dari form
    };

    console.log("Updated Product:", updatedProduct);
    editProduct(updatedProduct);
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Modal
      title="Edit"
      open={openModal}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
