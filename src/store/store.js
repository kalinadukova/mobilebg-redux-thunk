import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger, thunk];

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
