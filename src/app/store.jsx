import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../redux/movies/movieSlice';
import accountReducer from "../redux/account/accountSlice";

// Global store that contains state for all components
export const store = configureStore({
    reducer: {
        movie: movieReducer,
        account: accountReducer,
    }
});