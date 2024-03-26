import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import middleware from './middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: [middleware]
});

export default store;
