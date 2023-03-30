import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './ducks/cartDuck';
import authSlice from './ducks/authDuck';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        login: authSlice.reducer,
    }
});

export default store;