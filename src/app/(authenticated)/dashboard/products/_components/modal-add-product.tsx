import React, { useState } from 'react';
import { Button, Form, Modal, message } from 'antd';

import { FormAddProduct } from './add-form-product';

const AddProductModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
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
