'use client'

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {createStateSyncMiddleware,initMessageListener,} from "redux-state-sync";
import persistStore from "redux-persist/es/persistStore";
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
    // middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(createStateSyncMiddleware({}))
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(createStateSyncMiddleware({})),
  })
initMessageListener(Store);
persistStore(Store);

export default Store
