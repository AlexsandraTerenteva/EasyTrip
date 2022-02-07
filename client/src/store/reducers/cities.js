import * as types from '../types/cities';

export default function getCitiesReducer(state = {}, actions) {
  const { type, payload } = actions;

  switch (type) {
    case types.GET_NEW_CITIES_FROM: {
      const newState = { ...state };
      newState.cities = payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
