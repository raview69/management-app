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
    itemsOrder: ["item-6", "item-7", "item-8", "item-9"],
  },
}

const ITEMS = {
  "item-1": {
    id: "item-1",
    title: "Item 1",
    description: "This is item 1",
    priority: "high",
  },
  "item-2": {
    id: "item-2",
    title: "Item 2",
    description: "This is item 1",
    priority: "high",
  },
  "item-3": {
    id: "item-3",
    title: "Item 3",
    description: "This is item 1",
    priority: "high",
  },
  "item-4": {
    id: "item-4",
    title: "Item 4",
    description: "This is item 1",
    priority: "high",
  },
  "item-5": {
    id: "item-5",
    title: "Item 5",
    description: "This is item 1",
    priority: "high",
  },
  "item-6": {
    id: "item-6",
    title: "Item 6",
    description: "This is item 1",
    priority: "high",
  },
  "item-7": {
    id: "item-7",
    title: "Item 7",
    description: "This is item 1",
    priority: "high",
  },
  "item-8": {
    id: "item-8",
    title: "Item 8",
    description: "This is item 1",
    priority: "high",
  },
  "item-9": {
    id: "item-9",
    title: "Item 9",
    description: "This is item 1",
    priority: "high",
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
      action: {
        payload: {
          id: string
          title: string
          col: string
          description: string
          priority: string
        }
      }
    ) => {
      const { id, title, col, description, priority } = action.payload
      state.items[id as keyof typeof state.items] = {
        id,
        title,
        description,
        priority,
      }
      state.columns[col].itemsOrder.push(id)
    },
    setRemoveItems: (
      state,
      action: { payload: { id: string; col: string } }
    ) => {
      const { id, col } = action.payload
      delete state.items[id as keyof typeof state.items]
      state.columns[col].itemsOrder = state.columns[col].itemsOrder.filter(
        (itemId) => itemId !== id
      )
    },
  },
})

export const { setAddItems, setRemoveItems } = itemsDataSlice.actions
export default itemsDataSlice.reducer
