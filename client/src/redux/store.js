import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import adminSlice from './adminSlice'
import productSlice from './productSlice'
import userSlice from './userSlice'
import vendorSlice from './vendorSlice'



const rootReducer = combineReducers({
    admin: adminSlice,
    product: productSlice,
    user: userSlice,
    vendor: vendorSlice,

})
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)