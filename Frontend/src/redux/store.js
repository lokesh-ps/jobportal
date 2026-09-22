import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import {
  persistReducer,
  persistStore,
  createMigrate,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import companyReducer from "./companyslice";

const migrations = {
  2: (state) => {
    const jobState = state.job || {};
    return {
      ...state,
      job: {
        allJobs: jobState.allJobs ?? [],
        selectedJob: jobState.selectedJob ?? null,
        allAdminJobs: jobState.allAdminJobs ?? [],
      },
    };
  },
};

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
  key: "root",
  version: 2,
  storage,
  whitelist: ["auth", "job", "company"],
  migrate: createMigrate(migrations),
};

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  company: companyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
