'use client';
import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { productsQuery } from "../_hooks/use-products";
import { deleteProductMutation } from "../_hooks/use-delete-product";
import { editProductMutation } from "../_hooks/use-edit-product";
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
  const { data, isLoading, isError } = productsQuery();
  const { mutate: deleteProduct } = deleteProductMutation();
  const { mutate: editProduct } = editProductMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);  // Set the product to be edited
    setOpenModal(true);  // Open the modal
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
