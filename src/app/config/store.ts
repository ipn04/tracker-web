import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { thunk } from 'redux-thunk';
import reducers, { apiMiddlewares } from '@reducers/main';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  timeout: 0
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat([
    // thunk,
    ...apiMiddlewares
  ])
});
const persistor = persistStore(store);

const rehydration = () => new Promise((resolve) => {
  persistStore(store, {}, () => resolve(store));
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor, rehydration };
