import { createSlice } from "@reduxjs/toolkit"

const INITIAL_COLUMN_ORDER = ["column-1", "column-2", "column-3"]

interface ColumnData {
  id: string
  title: string
  itemsOrder: string[]
}

const INITIAL_COL_DATA: { [key: string]: ColumnData } = {
  "column-1": {
    id: "column-1",
    title: "TO DO",
    itemsOrder: ["item-1", "item-2", "item-3"],
  },
  "column-2": {
    id: "column-2",
    title: "IN PROGRESS",
    itemsOrder: ["item-4", "item-5"],
  },
  "column-3": {
    id: "column-3",
    title: "DONE",
    itemsOrder: ["item-6", "item-7", "item-8"],
  },
}

console.log(INITIAL_COL_DATA["column-1"].itemsOrder)

const ITEMS = {
  "item-1": {
    id: "item-1",
    title: "Item 1",
  },
  "item-2": {
    id: "item-2",
    title: "Item 2",
  },
  "item-3": {
    id: "item-3",
    title: "Item 3",
  },
  "item-4": {
    id: "item-4",
    title: "Item 4",
  },
  "item-5": {
    id: "item-5",
    title: "Item 5",
  },
  "item-6": {
    id: "item-6",
    title: "Item 6",
  },
  "item-7": {
    id: "item-7",
    title: "Item 7",
  },
  "item-8": {
    id: "item-8",
    title: "Item 8",
  },
  "item-9": {
    id: "item-9",
    title: "Item 9",
  },
}

const itemsDataSlice = createSlice({
  name: "itemsData",
  initialState: {
    columnsOrderState: INITIAL_COLUMN_ORDER,
    columns: INITIAL_COL_DATA,
    items: ITEMS,
  },

  reducers: {
    setAddItems: (
      state,
      action: { payload: { id: string; title: string; col: string } }
    ) => {
      const { id, title, col } = action.payload
      state.items[id as keyof typeof state.items] = {
        id,
        title,
      }
      state.columns[col].itemsOrder.push(id)
    },
  },
})

export const { setAddItems } = itemsDataSlice.actions
export default itemsDataSlice.reducer
