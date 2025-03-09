import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import { configureStore } from "@reduxjs/toolkit";

import { projectApi } from "./slices/projectSlice";
import { educationApi } from "./slices/educationSlice";
import { skillApi } from "./slices/skillSlice";
import { heroApi } from "./slices/heroSlice";

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_ENCRYPT_KEY,
  onError: (error) => {
    console.error("Error while encrypting", error);
  },
});

const rootReducer = combineReducers({
  [projectApi.reducerPath]: projectApi.reducer,
  [educationApi.reducerPath]: educationApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
  [heroApi.reducerPath]: heroApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      projectApi.middleware,
      educationApi.middleware,
      skillApi.middleware,
      heroApi.middleware
    ),
});

const persistor = persistStore(store);

export { store, persistor };
