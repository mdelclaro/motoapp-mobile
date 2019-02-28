import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import RequestReducer from "./reducers/RequestReducer";
import UIReducer from "./reducers/UIReducer";
import MotoqueiroReducer from "./reducers/MotoqueiroReducer";

const rootReducer = combineReducers({
  corrida: RequestReducer,
  ui: UIReducer,
  motoqueiro: MotoqueiroReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
