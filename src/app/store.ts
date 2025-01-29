import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';   
import channelReducer from './features/channelSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        channel: channelReducer,
    },
});

// useSelecter typescript公式ドキュメントの内容
export type AppDispath = typeof store.dispatch;
export type RootState =  ReturnType<typeof store.getState>;

