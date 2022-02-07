import * as types from '../types/excursions';

export default function excursionsReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_EXCURSIONS_CITY_START,
    types.POST_EXCURSION_BOOKING_START: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.GET_EXCURSIONS_CITY_ERROR,
    types.POST_EXCURSION_BOOKING_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }
    case types.GET_EXCURSIONS_CITY_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload;
      return newState;
    }

    case types.POST_EXCURSION_BOOKING_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.booking = [...newState.data.boocking, payload];
      return newState;
    }

    default: {
      return state;
    }
  }
}
