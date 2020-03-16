import get from "lodash.get";
import { register } from "registry";
import api from "utils/api";

/*
 * Actions
 */
const reducerName = "plants";
export const GET_PLANTS = `${reducerName}/GET_PLANTS`;
export const ERROR = `${reducerName}/ERROR`;

/*
 * Reducer
 */
const initialState = {
  plants: [],
  requesting: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS:
      return {
        ...state,
        plants: action.plants,
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

export const requestPlants = () => dispatch => {
  api.get(`plants`).then(plants => {
    dispatch({
      type: GET_PLANTS,
      plants: plants.data
    });
  });
};

/*
 * Selectors
 */
export const getPlants = state => get(state[reducerName], "plants");
export const getRequesting = state => get(state[reducerName], "requesting");
export const getError = state => get(state[reducerName], "error");

/*
 * Register
 */
register(reducerName, reducer);
