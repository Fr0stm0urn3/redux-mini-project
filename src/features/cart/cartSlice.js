import { createSlice } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"

const initialState = {
  cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId)
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload)

      cartItem.amount += 1
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload)

      cartItem.amount -= 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.map((cartItem) => {
        amount += cartItem.amount
        total += cartItem.amount * cartItem.price
      })

      state.amount = amount
      state.total = total
    },
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions
export default cartSlice.reducer
