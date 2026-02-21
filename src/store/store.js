import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    search: searchReducer,
  },
});
