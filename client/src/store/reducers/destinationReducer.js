import * as types from '../types';

export default function destinationReducer(state = {}, actions) {
  const { type, payload } = actions;

  switch (type) {
    case types.CHOOSE_DESTINATION: {
      const newState = { ...state };
      newState.destination = payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
