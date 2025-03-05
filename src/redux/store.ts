import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import itemsDataSlice from "./features/itemsDataSlice"

export const store = configureStore({
  reducer: {
    itemsData: itemsDataSlice,
  },
})

setupListeners(store.dispatch)
