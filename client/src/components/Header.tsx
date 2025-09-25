import React from "react";
import CartPanel from "./CartPanel";
// import type { CartItem as CartItemType } from "../types/types";
import type { Product } from "../types/types";

interface HeaderProps {
  cart: Product[];
  onCheckout: () => void;
}

const Header = ({ cart, onCheckout}: HeaderProps) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <CartPanel cart={cart} onCheckout={onCheckout} />
      </div>
    </header>
  );
};

export default Header;
