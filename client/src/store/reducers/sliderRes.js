import * as types from '../types';

export default function sliderResReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_SLIDER_RES: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.GET_SLIDER_RES_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = payload.data;
      return newState;
    }

    case types.GET_SLIDER_RES_ERROR: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
