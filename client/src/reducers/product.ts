import type { Product } from "../types/types";

interface ProductState {
  products: Product[];
}

export type ProductAction =
  | { type: "FETCH_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "EDIT_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }; // maybe just returning string saying it was deleted?

const initialState: ProductState = {
  products: [],
};

export function productReducer(state: ProductState = initialState, action: ProductAction): ProductState {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {...state, products: action.payload};
    case "ADD_PRODUCT":
      return {...state, products: [...state.products, action.payload]};
    case "EDIT_PRODUCT": {
      const editedProducts = state.products.map((product) => {
        return product._id === action.payload._id ? action.payload : product;
      });
      return { products: editedProducts}
    }
    case "DELETE_PRODUCT":
      return {products: state.products.filter((product) => product._id !== action.payload)};
    default:
      return state;
  }
}