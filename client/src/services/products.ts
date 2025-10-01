import axios from "axios";
import { z } from "zod";
import { productSchema, type NewProduct, type Product } from "../types/types";

const allProducts = z.array(productSchema);

export const getProducts = async () => {
  try {
    const { data } = await axios.get("/api/products");
    console.log(data);
    return allProducts.parse(data);
  } catch (e) {
    console.log("Error retrieving product list", e)
    throw Error;
  } 
};

export const addProduct = async (newProduct: NewProduct) => {
  try {
  const { data } = await axios.post("/api/products", newProduct);
  return productSchema.parse(data);
  } catch (e) {
    console.log("Error adding new product", e)
  } 
};

export const editProduct = async (product: Product) => {
  try {
  const { data } = await axios.put(`/api/products/${product._id}`, product);
  return productSchema.parse(data);
  } catch (e) {
    console.log("Error editing product details", e)
  } 
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
try {
  const { data } = await axios.get("/api/cart");
  console.log(data);
  return allProducts.parse(data);
} catch (e) {
    console.log("Error retrieving cart", e)
    throw Error;
  } 
};

export const addItemToCart = async (product: Product) => {
  try {
    const { data } = await axios.post("/api/add-to-cart", {
      productId: product._id,
    });
    console.log('data', data);
    return data;
  } catch (e) {
    console.log("Error adding item to cart", e);
  }
};

export const checkout = async () => {
  try {
    await axios.post("/api/checkout");
    console.log("Checked Out");
  } catch (e) {
    console.log("Checkout Error:", e);
  }
};
