import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import itemsDataSlice from "./features/itemsDataSlice"
import modalSlice from "./features/modalSlice"
import columnSlice from "./features/columnSlice"
import itemsUpdateSlice from "./features/itemsUpdateSlice"

export const store = configureStore({
  reducer: {
    itemsData: itemsDataSlice,
    modal: modalSlice,
    columns: columnSlice,
    itemsUpdate: itemsUpdateSlice,
  },
})

setupListeners(store.dispatch)
