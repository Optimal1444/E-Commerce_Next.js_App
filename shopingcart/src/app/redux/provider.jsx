'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore.js'
import Store from './Store.js'
export function Providers({children}){
    persistStore(Store);
    //const persistor = persistStore(Store);
    return (
        <Provider store={Store}>
        {/* <PersistGate persistor={persistor}> */}
            {children}
        {/* </PersistGate> */}
        </Provider>
    )
}
