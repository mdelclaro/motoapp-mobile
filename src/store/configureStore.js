import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import {
  RequestReducer,
  UIReducer,
  MotoqueirosReducer,
  AuthReducer,
  FormReducer,
  InfoReducer,
  ChatReducer
} from "./reducers/";

const rootReducer = combineReducers({
  corrida: RequestReducer,
  ui: UIReducer,
  motoqueiros: MotoqueirosReducer,
  auth: AuthReducer,
  form: FormReducer,
  info: InfoReducer,
  chats: ChatReducer
});

// redux-persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui", "form", "motoqueiros"],
  timeout: 0
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
