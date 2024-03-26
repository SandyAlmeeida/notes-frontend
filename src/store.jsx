import { configureStore } from "@reduxjs/toolkit";
import noteReducer from './NoteSlice'

configureStore({
  reducer: {
    note: noteReducer
  }
})

export default configureStore