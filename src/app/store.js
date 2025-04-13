import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cvSlice from "../features/cv/cvSlice";

const persistConfig = {
   key: "cv",
   storage
};

const persistedReducer = persistReducer(persistConfig, cvSlice);

export const store = configureStore({
   reducer: {
      cv: persistedReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
         }
      })
});

export const persistor = persistStore(store);
export default store;
