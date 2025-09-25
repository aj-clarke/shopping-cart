import React from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import type { NewProduct, Product } from "./types/types";
import {
  getProducts,
  addProduct,
  editProduct,
  getCartItems,
  addItemToCart,
  checkout,
} from "./services/products";

const App = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [cart, setCart] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log(data);
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCart = async () => {
    try {
      const data = await getCartItems();
      setCart(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFetchProducts = async () => {
    await fetchProducts();
  };

  const handleAddProduct = async (newProduct: NewProduct) => {
    try {
      const addedProduct = await addProduct(newProduct);
      console.log(addedProduct);
      fetchProducts();
    } catch (e) {
      console.log(e);
    }
  };
  const handleEditProduct = async (product: Product) => {
    try {
      const editedProduct = await editProduct(product);
      console.log(editedProduct);
      fetchProducts();
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddToCart = async (product: Product) => {
    const { data } = await addItemToCart(product);
    console.log(data);
    fetchProducts();
    fetchCart();
  };
  const handleCheckout = async () => {
    await checkout();
    await fetchProducts();
    await fetchCart();
  };

  return (
    <div id="app">
      <Header cart={cart} onCheckout={handleCheckout} />
      <ProductList
        products={products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onFetchProducts={handleFetchProducts}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;
