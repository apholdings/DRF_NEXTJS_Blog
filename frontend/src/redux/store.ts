import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers';
import storage from './synch_storage';

const persistConfig = {
  key: 'root',
  storage,
};

const peristedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const store = configureStore({
    reducer: peristedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

  const persistor = persistStore(store);

  (store as any).persistor = persistor;

  return store;
};

const wrapper = createWrapper(makeStore, { debug: false });

export default wrapper;
