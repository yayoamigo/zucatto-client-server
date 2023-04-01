import {configureStore} from '@reduxjs/toolkit';
import authSlice from './ducks/authDuck';
import productSlice from './ducks/producSlice';

const store = configureStore({
    reducer: {
        login: authSlice.reducer,
        products: productSlice.reducer,
    }
});

export default store;