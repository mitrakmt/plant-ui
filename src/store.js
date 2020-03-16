import { applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createLogger } from "redux-logger";
import { createStore } from "registry";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const initialState = {};

const initialReducers = {
  router: connectRouter(history)
};

const composedEnhancers = composeWithDevTools(
  applyMiddleware(
    /**
     * Redux Thunk Middleware
     */
    thunk,
    /**
     * Connect React Router Middleware
     */

    routerMiddleware(history),
    /**
     * Redux Logger Middleware
     */
    createLogger({
      collapsed: true
    })
  )
);

export default createStore(initialState, initialReducers, composedEnhancers);
