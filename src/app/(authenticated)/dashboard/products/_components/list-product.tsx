'use client';
import { Button, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useProductsQuery } from "../_hooks/use-products";
import { useDeleteProductMutation } from "../_hooks/use-delete-product";
import { useEditProductMutation } from "../_hooks/use-edit-product";
import { useState } from "react";
import { EditProductModal } from "./modal-edit-product";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}

export const ListProduct = () => {
  const { data, isLoading, isError } = useProductsQuery();
  const { mutate: deleteProduct } = useDeleteProductMutation();
  const { mutate: editProduct } = useEditProductMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "expand",
      key: "category",
      render: (expand) => `${expand.category.name}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button style={{ color: "red", marginRight: "8px" }} type="dashed" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </>
      ),
    },
  ];

  if (isLoading) return <Spin />;
  if (isError) return <p>Failed to fetch products.</p>;

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }} // Pagination
      />
      {selectedProduct && (
        <EditProductModal
          onClose={() => setOpenModal(false)}
          product={selectedProduct}
          openModal={openModal}
          onSave={(values) => {
            editProduct(values);
            setOpenModal(false); // Close the modal after saving
          }}
        />
      )}
    </>
  );
};
