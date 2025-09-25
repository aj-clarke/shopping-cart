import type { Product } from "../types/types";
// import type { CartItem as CartItemType } from "../types/types";

interface CartItemProps {
  cartItem: Product;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  return (
    <>
      <td>{cartItem.title}</td>
      <td>{cartItem.quantity}</td>
      <td>{cartItem.price}</td>
    </>
  );
};

export default CartItem;
