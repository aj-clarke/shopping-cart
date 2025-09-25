import type { NewProduct, Product as ProductType } from "../types/types";
import Product from "./Product";
import ProductForm from "./ProductForm";

interface ProductProps {
  product: ProductType;
  setEditId: React.Dispatch<React.SetStateAction<string | undefined>>;
  onEditProduct: (prod: ProductType) => void;
  onFetchProducts: () => void;
  onAddToCart: (product: ProductType) => void;
  onAddProduct: (newProduct: NewProduct) => void;
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductEdit = ({
  product,
  setEditId,
  onEditProduct,
  onFetchProducts,
  onAddToCart,
  onAddProduct,
  setIsAddProductVisible,
}: ProductProps) => {
  return (
    <>
      <Product
        product={product}
        setEditId={setEditId}
        onFetchProducts={onFetchProducts}
        onAddToCart={onAddToCart}
      />
      <div className="edit-form">
        <div>
          <h3>Edit Product</h3>
        </div>
        <ProductForm
          product={product}
          setIsAddProductVisible={setIsAddProductVisible}
          onAddProduct={onAddProduct}
          onEditProduct={onEditProduct}
          setEditId={setEditId}
          isNewProduct={false}
        />
      </div>
    </>
  );
};

export default ProductEdit;
