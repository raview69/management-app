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
    itemsOrder: ["item-1", "item-2"],
  },
  "column-2": {
    id: "column-2",
    title: "IN PROGRESS",
    itemsOrder: ["item-3", "item-4"],
  },
  "column-3": {
    id: "column-3",
    title: "DONE",
    itemsOrder: ["item-5", "item-6"],
  },
}

const ITEMS = {
  "item-1": {
    id: "item-1",
    title: "Makan",
    description: "makan di KFC",
    priority: "high",
  },
  "item-2": {
    id: "item-2",
    title: "Mandi",
    description: "Mandi jam 2 malem",
    priority: "medium",
  },
  "item-3": {
    id: "item-3",
    title: "Joging",
    description: "Joging keliling indonesia",
    priority: "low",
  },
  "item-4": {
    id: "item-4",
    title: "Makan",
    description: "Makan daging gajah",
    priority: "high",
  },
  "item-5": {
    id: "item-5",
    title: "Nugas",
    description: "Ngerjain tugas",
    priority: "high",
  },
  "item-6": {
    id: "item-6",
    title: "Nyuci",
    description: "Nyuci piring dan baju",
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
    setUpdateDataItems: (
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
      const { id, title, description, priority } = action.payload
      state.items[id as keyof typeof state.items] = {
        id,
        title,
        description,
        priority,
      }
    },
  },
})

export const { setAddItems, setRemoveItems, setUpdateDataItems } =
  itemsDataSlice.actions
export default itemsDataSlice.reducer
