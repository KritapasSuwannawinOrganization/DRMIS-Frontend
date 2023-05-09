import { configureStore } from '@reduxjs/toolkit';

import resourceReducer from './resourceSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: { resource: resourceReducer, user: userReducer },
});

export default store;
