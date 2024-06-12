import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas/index";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import rootReducer from "./slices/index";
import storage from "redux-persist/lib/storage";

// Redux saga middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// redux persist config
const persistConfig = {
  key: "mb",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding saga middleware alongside RTK default
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Run all sagas combined
sagaMiddleware.run(sagas);
