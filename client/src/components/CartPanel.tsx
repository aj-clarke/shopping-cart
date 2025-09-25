import type { Product } from "../types/types";
import CartItem from "./CartItem";

interface CartProps {
  cart: Product[];
  onCheckout: () => void;
}

const CartPanel = ({ cart, onCheckout }: CartProps) => {
  const handleCheckout = () => {
    onCheckout();
  };

  const cartItems = cart.map((cartItem) => {
    return (
      <tr key={cartItem._id}>
        <CartItem cartItem={cartItem} />
      </tr>
    );
  });

  const cartTotal = cart.reduce((total, obj) => total + obj.price, 0);

  return (
    <>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>{cartItems}</tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total">
              Total: ${cartTotal}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button className="checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </>
  );
};

export default CartPanel;
