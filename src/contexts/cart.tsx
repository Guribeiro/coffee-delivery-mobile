import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import {setCartStorage, getCartStorage} from '@storage/cart'
import uuid from 'react-native-uuid'

export type CartItem = {
  id: number
  title: string
  description: string
  price: number
  size: string
  type: number
  image: string
  type_label: string
  amount: number
} 

interface CartContextData {
  cart: CartState
  total: number
  addToCart(data: CartItem): Promise<void>
  removeFromCart(data: RemoveFromCartDTO): Promise<void>
  decreaseAmount(item: CartItem): void
  increaseAmount(item: CartItem): void
} 

interface RemoveFromCartDTO {
  id: number
}

interface CartProviderProps {
  children: ReactNode
}
 
export type CartState = CartItem[]


export const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartProvider = ({children}:CartProviderProps) => {
  const [cart, setCart] = useState<CartState>([])

  const total = useMemo(() => {
    return cart.reduce((accumulator, current) => accumulator + (current.amount * current.price), 0)
  },[cart])

  const addToCart = async ({amount, ...item}: CartItem) => {
    try {
      const cartItemsList = [...cart]

      const alreadyInCart = cartItemsList.findIndex(cartItem => cartItem.id === item.id && cartItem.size === item.size)
  
      if(alreadyInCart !== -1){
        const newAmount = cartItemsList[alreadyInCart].amount + amount
        cartItemsList[alreadyInCart] = {
          ...item,
          amount: newAmount
        }
  
        setCart(cartItemsList)
  
        await setCartStorage(cartItemsList)
        return
      }
      
      const id = new Date().getDate()

      const cartItem: CartItem = {
        ...item,
        id,
        amount
      }
  
      setCart(prev => [...prev, cartItem])
  
      await setCartStorage([...cart, cartItem])
    } catch (error) {
      throw error
    }
  }

  const removeFromCart = async ({id}: RemoveFromCartDTO) => {
    try {
      const cartItemsList = [...cart]
      const item = cartItemsList.find(cartItem => cartItem.id === id)
      if(item){
        setCart(() => cartItemsList.filter(prevItem => prevItem.id !== item.id))

        await setCartStorage(cartItemsList)
      }
      
    } catch (error) {
      throw error
    }
  }

  const increaseAmount = async (item: CartItem) => {
    try {
      const cartItemsList = [...cart]

      const alreadyInCart = cartItemsList.findIndex(cartItem => cartItem.id === item.id)
  
      if(alreadyInCart !== -1){
        const newAmount = cartItemsList[alreadyInCart].amount + 1
  
        cartItemsList[alreadyInCart] = {
          ...cartItemsList[alreadyInCart],
          amount: newAmount
        }
  
        setCart(cartItemsList)

        await setCartStorage(cartItemsList)
        return
      }
    } catch (error) {
        throw error
    }
  }

  const decreaseAmount = async (item: CartItem) => {
    try {
      const cartItemsList = [...cart]

      const alreadyInCart = cartItemsList.findIndex(cartItem => cartItem.id === item.id)

      if(alreadyInCart !== -1){
        const newAmount = cartItemsList[alreadyInCart].amount - 1

        if(newAmount < 1) return
        cartItemsList[alreadyInCart] = {
          ...cartItemsList[alreadyInCart],
          amount: newAmount
        }

        setCart(cartItemsList)
        await setCartStorage(cartItemsList)
        return
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(function fetchStoragedCart(){
    (async () => {
      try {
        const cartStoraged = await getCartStorage()

        setCart(cartStoraged)
      } catch (error) {
        console.log('error - [fetchStoragedCart]')
      }
    })()
  },[])

  return (
    <CartContext.Provider value={{cart, total, addToCart, removeFromCart, decreaseAmount, increaseAmount}}>
      {children}
    </CartContext.Provider>
  )
}
