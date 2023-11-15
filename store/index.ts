import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import cartSlice from './cartSlice';
import expandSlice from './expandSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // if you do not want to persist this part of the state
  // blacklist: ['wishlist'],
};

const reducer = combineReducers({
  cart: cartSlice,
  expand: expandSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type RootState = ReturnType<typeof reducer>;
export default store;
