import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './adminslice';

export const store = configureStore({
    reducer: {
        loginStore: loginSlice,
    },
});