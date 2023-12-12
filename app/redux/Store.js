import {configureStore} from "@reduxjs/toolkit";
import applicationReducer from "@/app/redux/ApplicationReducer";

const store = configureStore({
    reducer: {
        applicationReducer : applicationReducer
    },
})
export default store;
