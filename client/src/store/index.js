import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  user: {
    loading: false,
    error: null,
    data: {
      location: {
        coordinates: '37.617634:55.755787',
        country_name: 'Россия',
        iata: 'MOW',
        name: 'Москва',
      },
      auth: null,
      excursions: null,
    },
  },
  sliderResSlice: {
    loading: false,
    error: null,
    data: null,
  },
  map: {
    loading: true,
    error: null,
    data: [],
  },
  cities: [],
  citiesto: [],
  excursions: {
    loading: false,
    error: null,
    data: [],
    booking: [],
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);
export default store;
