import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import RequestReducer from "./reducers/RequestReducer";
import UIReducer from "./reducers/UIReducer";
import MotoqueiroReducer from "./reducers/MotoqueiroReducer";
import AuthReducer from "./reducers/AuthReducer";
import FormReducer from "./reducers/FormReducer";

const rootReducer = combineReducers({
  corrida: RequestReducer,
  ui: UIReducer,
  motoqueiro: MotoqueiroReducer,
  auth: AuthReducer,
  form: FormReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
