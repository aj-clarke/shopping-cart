import React from "react";
import type { NewProduct, Product as ProductType } from "../types/types";
import Product from "./Product";
// import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductForm from "./ProductForm";

interface ProductListProps {
  products: ProductType[];
  onAddProduct: (newProduct: NewProduct) => void;
  onEditProduct: (product: ProductType) => void;
  onFetchProducts: () => void;
  onAddToCart: (product: ProductType) => void;
}

const ProductList = ({
  products,
  onAddProduct,
  onEditProduct,
  onFetchProducts,
  onAddToCart,
}: ProductListProps) => {
  const [isAddProductVisible, setIsAddProductVisible] =
    React.useState<boolean>(false);
  const [editId, setEditId] = React.useState<string | undefined>(undefined);

  const handleClick = () => {
    setIsAddProductVisible((prev) => !prev);
  };

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
          />
        </li>
      );
    }
    return (
      <li className="product" key={product._id}>
        <Product
          product={product}
          setEditId={setEditId}
          onFetchProducts={onFetchProducts}
          onAddToCart={onAddToCart}
        />
      </li>
    );
  });

  return (
    <main>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">{productList}</ul>
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
