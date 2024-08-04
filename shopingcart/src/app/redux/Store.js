'use client'

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {createStateSyncMiddleware,initMessageListener,} from "redux-state-sync";
const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({
    login:LoginSlice
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  

 const Store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(createStateSyncMiddleware({}))
})
initMessageListener(Store);
export default Store
