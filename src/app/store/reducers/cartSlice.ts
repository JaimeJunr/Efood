import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MenuItem } from '../../models/Restaurant'

type CartState = {
  items: MenuItem[]
  isOpen: boolean
  delivery: boolean
  payment: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  delivery: false,
  payment: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload)
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.id === action.payload)
      if (index !== -1) {
        state.items.splice(index, 1)
      }
    },
    cleanCart: state => {
      state.items = []
    },
    handleOpen: state => {
      state.isOpen = !state.isOpen
    },
    setDelivery: (state, action: PayloadAction<boolean>) => {
      state.delivery = action.payload
    },
    setPayment: (state, action: PayloadAction<boolean>) => {
      state.payment = action.payload
    },
  },
})

export const { add, handleOpen, remove, setDelivery, setPayment, cleanCart } =
  cartSlice.actions
export default cartSlice.reducer
