import { configureStore } from '@reduxjs/toolkit';
import toolkitReducer from '../toolkit/slice';

const store = configureStore({
     reducer: {
          data: toolkitReducer,
     },
});

export default store;