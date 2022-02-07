import * as types from '../types/cities';

export default function getCitiesToReducer(state = {}, actions) {
  const { type, payload } = actions;

  switch (type) {
    case types.GET_NEW_CITIES_TO: {
      const newState = { ...state };
      newState.citiesto = payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
