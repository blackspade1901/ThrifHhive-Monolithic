import { useCartContext } from "../context/CartContext.jsx";

/**
 * Thin re-export so components import `useCart` from hooks/ like every other
 * hook in the app, without needing to know cart state happens to live in
 * context rather than local state.
 */
export function useCart() {
  return useCartContext();
}
