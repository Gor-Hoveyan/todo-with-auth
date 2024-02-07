import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoReducer";

const store = configureStore({
    reducer: {
        todoReducer: todoReducer,
    },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;