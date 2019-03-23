import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import {composeWithDevTools} from "redux-devtools-extension";
import logger from "redux-logger";
import reducer from "./reducers";
import thunkMiddleware from "redux-thunk";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const configureStore = () => {
  const store = createStore(persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
  );
  const persistor = persistStore(store);
  return {store, persistor};
};
