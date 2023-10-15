import {configureStore} from '@reduxjs/toolkit';
import atuh from './auth';
import products from './shop';
import cart from './cart';
const store = configureStore({
    reducer:{
        auth:atuh.reducer,
        products:products.reducer,
        cart:cart.reducer
    },
});

export type dispatchType = typeof store.dispatch;
const state = store.getState();
export type reducerType = typeof state;
export default store;