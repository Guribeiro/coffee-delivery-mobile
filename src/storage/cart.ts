import AsyncStorage from '@react-native-async-storage/async-storage'
import { CartState } from "../contexts/cart"

const CART_STORAGE_KEY = '@coffee-delivery:cart'

export const setCartStorage = async (cart: CartState ) => {
  await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export const getCartStorage = async () => {
  const storaged = await AsyncStorage.getItem(CART_STORAGE_KEY)

  const cart: CartState =  storaged ? JSON.parse(storaged) : []

  return cart
}

export const removeCartStorage = async () => {
  await AsyncStorage.removeItem(CART_STORAGE_KEY)
}
