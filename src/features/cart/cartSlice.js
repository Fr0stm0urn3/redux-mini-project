import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (name, thunkAPI) => {
    try {
      //   console.log(name)
      //   console.log(thunkAPI)
      //   console.log(thunkAPI.getState())
      //   console.log(thunkAPI.getState().modal)

      const res = await axios("https://www.course-api.com/react-useReducer-cart-project")

      return res.data
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong")
    }
  }
)

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
  extraReducers(builder) {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        // console.log(action)
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
      })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions
export default cartSlice.reducer
