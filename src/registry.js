import { createStore as createReduxStore, combineReducers } from "redux";

const state = {
  store: null,
  reducers: {}
};

export const register = (name, value) => {
  state.reducers[name] = value;

  if (state.store) {
    state.store.replaceReducer(combineReducers(state.reducers));
  }
};

export const createStore = (
  initialState = {},
  initialReducers = {},
  composedEnhancers
) => {
  if (state.store) {
    return null;
  }

  state.reducers = Object.keys(initialState).reduce(
    (next, reducer) => {
      next[reducer] = (state = initialState[reducer]) => state;
      return next;
    },
    {
      ...initialReducers
    }
  );

  state.store = createReduxStore(
    combineReducers(state.reducers),
    initialState,
    composedEnhancers
  );

  return state.store;
};
