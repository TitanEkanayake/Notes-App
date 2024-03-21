import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/NoteReducer";
import userReducer from "./reducers/UserReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    user: userReducer,
  },
});

export default store;
