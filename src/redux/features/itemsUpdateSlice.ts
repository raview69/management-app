import { createSlice } from "@reduxjs/toolkit"

const itemsUpdateSlice = createSlice({
  name: "itemsUpdate",
  initialState: {
    id: "",
    title: "",
    col: "",
    description: "",
    priority: "",
  },
  reducers: {
    setUpdateItems: (
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
      state.id = action.payload.id
      state.title = action.payload.title
      state.col = action.payload.col
      state.description = action.payload.description
      state.priority = action.payload.priority
    },
    setResetItems: (state) => {
      state.id = ""
      state.title = ""
      state.col = ""
      state.description = ""
      state.priority = ""
    },
  },
})

export const { setUpdateItems, setResetItems } = itemsUpdateSlice.actions
export default itemsUpdateSlice.reducer
