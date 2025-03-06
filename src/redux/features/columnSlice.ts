import { createSlice } from "@reduxjs/toolkit"

const columnSlice = createSlice({
  name: "columns",
  initialState: {
    columnPlace: "column-1",
  },
  reducers: {
    changeColumn: (state, action) => {
      state.columnPlace = action.payload
    },
  },
})

export const { changeColumn } = columnSlice.actions
export default columnSlice.reducer
