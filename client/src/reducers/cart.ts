import type { Product } from "../types/types";

export interface CartState {
  cart: Product[]
}

export type CartAction = 
  | {type: "FETCH_CART", payload: Product[]}
  | {type: "ADD_TO_CART", payload: Product}
  | {type: "CHECKOUT"}


export function cartReducer(state: Product[], action: CartAction): Product[] {
  switch (action.type) {
    case "FETCH_CART":
      return action.payload;
    case "ADD_TO_CART": {
      const existingProduct = state.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        return state.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      }
      return [...state, action.payload];
    }
    case "CHECKOUT":
      return []  
    default:
      return state;
  }
}