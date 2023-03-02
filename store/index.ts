import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import cartReducer from './cartSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // if you do not want to persist this part of the state
  // blacklist: ['wishlist'],
};

const reducer = combineReducers({
  cart: cartReducer,
  // wishlist: wishlistReducer,

  // not persisting this reducer
  // omitedPart: OmitReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
