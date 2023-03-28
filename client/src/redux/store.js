import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './ducks/cartDuck';

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

export default store;