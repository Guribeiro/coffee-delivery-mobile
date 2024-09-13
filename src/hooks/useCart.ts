import { useContext } from "react";

import { CartContext } from "../contexts/cart";

export function useCart(){
  const context = useContext(CartContext)

  if(!context) throw new Error('useCart should be used within an CartProvider')
  
    return context
}