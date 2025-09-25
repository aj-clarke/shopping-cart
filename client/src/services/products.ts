import axios from "axios";
import { z } from "zod";
// import type { Product, NewProduct } from "../types/types";
import { productSchema, type NewProduct, type Product } from "../types/types";

const allProducts = z.array(productSchema);

export const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  console.log(data);
  return allProducts.parse(data);
};

export const addProduct = async (newProduct: NewProduct) => {
  const { data } = await axios.post("/api/products", newProduct);
  return productSchema.parse(data);
};

export const editProduct = async (product: Product) => {
  const { data } = await axios.put(`/api/products/${product._id}`, product);
  return productSchema.parse(data);
};

export const deleteProduct = async (product: Product) => {
  try {
    await axios.delete(`/api/products/${product._id}`);
    console.log(`${product.title} deleted.`);
  } catch (e) {
    console.log("Error deleting product", e);
  }
};

export const getCartItems = async () => {
  const { data } = await axios.get("/api/cart");
  console.log(data);
  return allProducts.parse(data);
};

export const addItemToCart = async (product: Product) => {
  try {
    const { data } = await axios.post("/api/add-to-cart",
      { productId: product._id});
    console.log(data)
    return data
  } catch (e) {
    console.log("Error adding item to cart", e);
  }
};

export const checkout = async () => {
  try {
    await axios.post('/api/checkout')
    console.log('Checked Out')
  } catch (e) {
    console.log("Checkout Error:", e)
  }
}
// export const deleteProduct = async (product: Product) => {
//   try {
//     const { data } = await axios.delete(`/api/products/${product._id}`);
//     console.log(`${product.title} deleted.`);
//     return data;
//   } catch (e) {
//     console.error("Delete failed", e);
//     throw e;
//   }
// };
