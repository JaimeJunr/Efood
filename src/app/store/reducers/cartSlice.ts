import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MenuItem } from '../../models/Restaurant'

type CartState = {
  items: MenuItem[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false,
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
    hadleOpen: state => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { add, hadleOpen, remove } = cartSlice.actions
export default cartSlice.reducer
