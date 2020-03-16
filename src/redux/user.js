import get from "lodash.get";
import { register } from "registry";
import { removeTokens, verifyToken, setToken } from "utils/token";
import { history } from "store";
import api from "utils/api";

/*
 * Actions
 */
const reducerName = "user";
export const LOGIN = `${reducerName}/LOGIN`;
export const LOGOUT = `${reducerName}/LOGOUT`;
export const ERROR = `${reducerName}/ERROR`;
export const SET_USER_DATA = `${reducerName}/USER_DATA`;

/*
 * Reducer
 */
const initialState = {
  user: null,
  loggedIn: false,
  requesting: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loggedIn: false,
        requesting: false
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
        requesting: false
      };
    default:
      return state;
  }
}

/*
 * Action Creators
 */

export const autoLogin = (token, redirect) => dispatch => {
  setToken(token);
  const decoded = verifyToken(token);
  if (decoded) {
    dispatch({
      type: SET_USER_DATA,
      user: decoded
    });

    history.push(redirect || "/");
  }
};

export const login = ({ email, password }) => dispatch => {
  api.put(`users`, { email, password }).then(response => {
    setToken(response.data.token);
    const decoded = verifyToken(response.data.token);
    if (decoded) {
      dispatch({
        type: SET_USER_DATA,
        user: decoded
      });

      history.push("/");
    }
  });
};

export const signup = ({ email, password }) => dispatch => {
  api.post(`users`, { email, password }).then(response => {
    setToken(response.data.token);
    const decoded = verifyToken(response.data.token);
    if (decoded) {
      dispatch({
        type: SET_USER_DATA,
        user: decoded
      });

      history.push("/");
    }
  });
};

export const logout = () => dispatch => {
  removeTokens();
  dispatch({
    type: LOGOUT
  });
};

/*
 * Selectors
 */
export const getUser = state => get(state[reducerName], "user");
export const getLoggedIn = state => get(state[reducerName], "loggedIn");
export const getRequesting = state => get(state[reducerName], "requesting");
export const getError = state => get(state[reducerName], "error");

/*
 * Register
 */
register(reducerName, reducer);
