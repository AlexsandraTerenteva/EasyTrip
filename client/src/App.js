import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from './components/MainLayout';
import MapCities from './components/Map';
import * as actions from './store/actions/user';
import TicketList from './components/TicketList';
import PersonalArea from './components/PersonalArea';
import StartComponent from './components/StartComponent';
import Auth from './components/Auth';
import Excursions from './components/Excursion';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUserIpSaga());
    dispatch(actions.checkAuthStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<StartComponent />} />
        <Route path="map" element={<MapCities />} />
        <Route path="personalarea" element={<PersonalArea />} />
        <Route path="tickets" element={<TicketList />} />
        <Route path="login" element={<Auth />} />
        <Route path="excursions" element={<Excursions />} />
      </Route>
    </Routes>
  );
}

export default App;
