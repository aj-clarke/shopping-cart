import React from "react";
import type { NewProduct, Product } from "../types/types";

interface ProductFormProps {
  product: Product;
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onAddProduct: (newProduct: NewProduct) => void;
  onEditProduct: (product: Product) => void;
  setEditId: React.Dispatch<React.SetStateAction<string | undefined>>;
  // onEditProduct: (editProduct: Product) => void; // when editing existing
  isNewProduct: boolean;
}

const ProductForm = ({
  product,
  setIsAddProductVisible,
  onAddProduct,
  onEditProduct,
  setEditId,
  isNewProduct,
}: ProductFormProps) => {
  const [title, setTitle] = React.useState<string>(
    isNewProduct === true ? "" : product.title
  );
  const [price, setPrice] = React.useState<number>(
    isNewProduct === true ? 0 : product.price
  );
  const [quantity, setQuantity] = React.useState<number>(
    isNewProduct === true ? 0 : product.quantity
  );

  const handleClick = () => {
    if (isNewProduct) {
      setIsAddProductVisible((prev) => !prev);
    } else {
      setEditId(undefined);
    }
  };

  const handleAddProduct = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAddProduct({ title, price, quantity });
    handleClick();
  };
  const handleEditProduct = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onEditProduct({
      _id: product._id,
      title,
      price,
      quantity,
    });
    handleClick();
  };

  // const handleProductTitle = (e: React.SyntheticEvent) => {

  // }
  // const handleProductPrice = (e: React.SyntheticEvent) => {

  // }
  // const handleProductQuantity = (e: React.SyntheticEvent) => {

  // }

  return (
    <>
      <form>
        {/* <form method={formMethod} action={apiRoute}> */}
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div className="actions form-actions">
          <button
            onClick={
              isNewProduct === true ? handleAddProduct : handleEditProduct
            }
            type="submit"
          >
            {isNewProduct === true ? "Add" : "Update"}
          </button>
          <button onClick={handleClick} type="button">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
