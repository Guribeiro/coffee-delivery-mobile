import { useState } from "react"

type UseCartAmountControllerProps = {
  amount?: number
}

export const useCartAmountController = (amount = 1) => {
  const [cartAmount, setCartAmount] = useState(amount)

  const increaseAmount = (amount: number) => {
    setCartAmount(amount)
  }

  const decreaseAmount = (amount: number) => {
    if(amount < 1) return
    setCartAmount(amount)
  }

  return {
    amount: cartAmount,
    increaseAmount, 
    decreaseAmount
  }
}