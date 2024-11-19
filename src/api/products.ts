import { instance } from "@/libs/instance";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
};

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await instance.get("/products/records", {
      params: {
        expand: "category",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a product by ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data; // Ensure this matches the API structure
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Fetch products by category
export const getProductCategories = async (): Promise<string[]> => {
  try {
    const response = await instance.get("/categories/records");
    return response.data.items; // Mengembalikan array string
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await instance.post("/products/records", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const editProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await instance.patch(`/products/records/${product.id}`, {
      title: product.title,
      price: product.price,
      stock: product.stock,
      category: product.category,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error editing product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await instance.delete(`/products/records/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};