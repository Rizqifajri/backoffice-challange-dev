import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';

import { FormAddProduct } from './add-form-product';
import { createProductMutation } from '../_hooks/use-create-product';

const AddProductModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { mutate: addProduct } = createProductMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset form ketika modal ditutup
  };

  const handleSubmit = (values: any) => {
    addProduct(values, {
      onSuccess: () => {
        message.success('Product successfully added!');
        form.resetFields(); // Reset form setelah submit berhasil
        setIsModalOpen(false); // Tutup modal
      },
      onError: (error: any) => {
        message.error(`Failed to add product: ${error.message || error}`);
      },
    });
  };

  return (
    <>
      <Button
        style={{ width: 'fit-content', alignSelf: 'flex-end', margin: '24px' }}
        type="primary"
        onClick={showModal}
      >
        Add Product
      </Button>

      <Modal
        title="Add Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FormAddProduct />
      </Modal>
    </>
  );
};

export default AddProductModal;
