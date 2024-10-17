import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth-slice';
import roleSlice from './reducers/role-slice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        roles: roleSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export default store;
