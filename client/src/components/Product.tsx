import type { SyntheticEvent } from "react";
// import { deleteProduct } from "../services/products";
import type { Product as ProductType } from "../types/types";

interface ProductProps {
  product: ProductType;
  setEditId: React.Dispatch<React.SetStateAction<string | undefined>>;
  onFetchProducts: () => void;
  onAddToCart: (product: ProductType) => void;
  onDelete: (product: ProductType) => void;
}

const Product = ({
  product,
  setEditId,
  onFetchProducts,
  onAddToCart,
  onDelete
}: ProductProps) => {
  const handleClick = () => {
    setEditId(product._id);
  };

  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();
    onDelete(product);
    setEditId(undefined);
    onFetchProducts();
  };

  const handleAddToCart = async (e: SyntheticEvent) => {
    e.preventDefault();
    onAddToCart(product);
  };

  return (
    <div className="product-details">
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <p className="quantity">{product.quantity} left in stock</p>
      <div className="actions product-actions">
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={product.quantity <= 0}
        >
          Add to Cart
        </button>
        <button onClick={handleClick} className="edit">
          Edit
        </button>
      </div>
      <button className="delete-button" onClick={handleDelete}>
        <span>X</span>
      </button>
    </div>
  );
};

export default Product;
