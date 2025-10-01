import React from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import type { NewProduct, Product } from "./types/types";
import { productReducer } from "./reducers/product";
import {
  getProducts,
  addProduct,
  editProduct,
  getCartItems,
  addItemToCart,
  checkout,
  deleteProduct,
} from "./services/products";
import { cartReducer } from "./reducers/cart";
import { ThemeContext } from "./providers/ThemeProvider";

// interface ProductState {
//   products: Product[];
// }

// export type ProductAction =
//   | { type: "FETCH_PRODUCTS"; payload: Product[] }
//   | { type: "ADD_PRODUCT"; payload: Product }
//   | { type: "EDIT_PRODUCT"; payload: Product }
//   | { type: "DELETE_PRODUCT"; payload: string }; // maybe just returning string saying it was deleted?

// const initialState: ProductState = {
//   products: [],
// };

// function productReducer(state: ProductState = initialState, action: ProductAction): ProductState {
//   switch (action.type) {
//     case "FETCH_PRODUCTS":
//       return {...state, products: action.payload};
//     case "ADD_PRODUCT":
//       return {...state, products: [...state.products, action.payload]};
//     case "EDIT_PRODUCT": {
//       const editedProducts = state.products.map((product) => {
//         return product._id === action.payload._id ? action.payload : product;
//       });
//       return { products: editedProducts}
//     }
//     case "DELETE_PRODUCT":
//       return {products: state.products.filter((product) => product._id !== action.payload)};
//     default:
//       return state;
//   }
// }

const App = () => {
  // reducer func        initial state
  // state     // dispatch func to update state   // gives new state
  const [productState, dispatchProducts] = React.useReducer(productReducer, {
    products: [],
  });
  // const [products, setProducts] = React.useState<Product[]>([]);

  // const [cart, setCart] = React.useState<Product[]>([]);
  const [cartState, dispatchCart] = React.useReducer(cartReducer, []);

  const themeContext = React.useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  React.useEffect(() => {
    if (theme === 'light') {
      document.body.style.backgroundColor = 'white';
    } else {
      document.body.style.backgroundColor = 'black';
    }
  }, [theme]);

  const handleFetchProducts = async () => {
    await fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      dispatchProducts({ type: "FETCH_PRODUCTS", payload: data });
      console.log(data);
      // setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCart = async () => {
    try {
      const data = await getCartItems();
      dispatchCart({ type: "FETCH_CART", payload: data });
      // setCart(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddProduct = async (newProduct: NewProduct) => {
    try {
      const addedProduct = await addProduct(newProduct);
      console.log(addedProduct);
      if (addedProduct) {
        dispatchProducts({ type: "ADD_PRODUCT", payload: addedProduct });
      }
      // await fetchProducts();
    } catch (e) {
      console.log(e);
    }
  };
  const handleEditProduct = async (product: Product) => {
    try {
      const editedProduct = await editProduct(product);
      console.log(editedProduct);
      if (editedProduct) {
        dispatchProducts({ type: "EDIT_PRODUCT", payload: editedProduct });
      }
      // await fetchProducts();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteProduct(product);
      dispatchProducts({ type: "DELETE_PRODUCT", payload: product._id });
      // fetchProducts();
      // fetchCart();
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = async (productToAdd: Product) => {
    const { item, product } = await addItemToCart(productToAdd);
    console.log('cart Item:', item)
    console.log('product:', product)
    dispatchCart({ type: "ADD_TO_CART", payload: item });
    fetchProducts();
    fetchCart();
  };

  //   const handleAddToCart = async (product: Product) => {
  //   try {
  //     const { data } = await addItemToCart(product);
  //     if (data && data._id) {
  //       dispatchCart({ type: "ADD_TO_CART", payload: data });
  //       console.log("added to cart", data);
  //     } else {
  //       console.warn("addItemToCart returned invalid data:", data);
  //     }
  //   } catch (e) {
  //     console.error("Error adding to cart:", e);
  //   }
  // };

  const handleCheckout = async () => {
    dispatchCart({ type: "CHECKOUT" });
    await checkout();
    // await fetchProducts();
    // await fetchCart();
  };

  return (
    <div id="app">
      <Header cart={cartState} onCheckout={handleCheckout} />
      <ProductList
        products={productState.products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onFetchProducts={handleFetchProducts}
        onAddToCart={handleAddToCart}
        onDelete={handleDelete}
        // setProducts={setProducts}  // this will be to support useEffect in ProductList.tsx to fix quantity bug
      />
    </div>
  );
};

export default App;
