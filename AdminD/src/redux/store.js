import {configureStore} from '@reduxjs/toolkit';
import authSlice from './ducks/authDuck';

const store = configureStore({
    reducer: {
        login: authSlice.reducer,
    }
});

export default store;