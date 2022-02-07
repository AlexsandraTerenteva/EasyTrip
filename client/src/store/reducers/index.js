import { combineReducers } from 'redux';
import userReducer from './user';
import sliderResReducer from './sliderRes';
import mapReducer from './mapReducer';
import getCitiesReducer from './cities';
import getCitiesToReducer from './citiesto';
import excursionsReducer from './excursions';

const reducerUsers = {
  user: userReducer,
  sliderResSlice: sliderResReducer,
  map: mapReducer,
  cities: getCitiesReducer,
  citiesto: getCitiesToReducer,
  excursions: excursionsReducer,
};

const rootReducer = combineReducers(reducerUsers);

export default rootReducer;
