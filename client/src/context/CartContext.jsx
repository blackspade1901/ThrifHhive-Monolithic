import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      if (state.items.some((item) => item._id === action.item._id)) {
        return state; // already in cart — no duplicates
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item._id !== action.itemId) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo(
    () => ({
      items: state.items,
      addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
      removeItem: (itemId) => dispatch({ type: "REMOVE_ITEM", itemId }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      total: state.items.reduce((sum, item) => sum + item.price, 0)
    }),
    [state.items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider.");
  }
  return context;
}
