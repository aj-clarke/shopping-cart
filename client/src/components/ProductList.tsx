import React from "react";
import type { NewProduct, Product as ProductType } from "../types/types";
import Product from "./Product";
import ProductEdit from "./ProductEdit";
import ProductForm from "./ProductForm";
import { ThemeContext } from "../providers/ThemeProvider";

interface ProductListProps {
  products: ProductType[];
  onAddProduct: (newProduct: NewProduct) => void;
  onEditProduct: (product: ProductType) => void;
  onFetchProducts: () => void;
  onAddToCart: (product: ProductType) => void;
  onDelete: (product: ProductType) => void;
}

const ProductList = ({
  products,
  onAddProduct,
  onEditProduct,
  onFetchProducts,
  onAddToCart,
  onDelete,
}: ProductListProps) => {
  const [isAddProductVisible, setIsAddProductVisible] =
    React.useState<boolean>(false);
  const [editId, setEditId] = React.useState<string | undefined>(undefined);

  // React.useEffect(() => {
  // pass setter function for product, set to `product`
  // }, [product.quantity])
  const handleClick = () => {
    setIsAddProductVisible((prev) => !prev);
  };

  const themeContext = React.useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  const productList = products.map((product) => {
    if (product._id === editId) {
      return (
        <li className="product" key={product._id}>
          <ProductEdit
            product={product}
            setEditId={setEditId}
            onEditProduct={onEditProduct}
            onFetchProducts={onFetchProducts}
            onAddToCart={onAddToCart}
            onAddProduct={onAddProduct}
            setIsAddProductVisible={setIsAddProductVisible}
            onDelete={onDelete}
          />
        </li>
      );
    }
    return (
      <li
        style={{ backgroundColor: theme === "light" ? "" : "lightgrey" }}
        className="product"
        key={product._id}
      >
        <Product
          product={product}
          setEditId={setEditId}
          onFetchProducts={onFetchProducts}
          onAddToCart={onAddToCart}
          onDelete={onDelete}
        />
      </li>
    );
  });

  return (
    <main style={{ backgroundColor: theme === "light" ? "" : "darkgrey" }}>
      <div className="product-listing">
        <h2>Products</h2>
        <ul
          style={{ backgroundColor: theme === "light" ? "" : "darkgrey" }}
          className="product-list"
        >
          {productList}
        </ul>
      </div>

      {isAddProductVisible ? (
        <ProductForm
          product={{ _id: "", title: "", price: 0, quantity: 0 }}
          setIsAddProductVisible={setIsAddProductVisible}
          onAddProduct={onAddProduct}
          onEditProduct={onEditProduct}
          setEditId={setEditId}
          isNewProduct={true}
        />
      ) : (
        <p>
          <button onClick={handleClick} className="add-product-button">
            Add A Product
          </button>
        </p>
      )}
    </main>
  );
};

export default ProductList;
