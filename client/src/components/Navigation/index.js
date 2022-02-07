/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import {
  Space, Switch, Button, Tabs,
} from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useThemeContext } from '../../context/themeContext';
import { logoutUserStart } from '../../store/actions/user';
import * as actionsIndex from '../../store/actions';
import store from '../../store';
import './Navigation.css';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);
  console.log(data);
  const [isAuth, setIsAuth] = useState(data.auth);
  const { switchTheme } = useThemeContext();

  function onChange(checked) {
    switchTheme();
  }

  function logout() {
    try {
      dispatch(logoutUserStart());
      store.subscribe(() => setIsAuth(store.getState().user.data.auth));
      navigate('/');
    } catch (error) {
      navigate('/error');
    }
  }
  useEffect(() => {
    if (data.auth?.email) {
      console.log(data.auth);
      setIsAuth(data.auth);
    }
  }, [data.auth]);

  return (
    <Space direction="horizontal" align="center" size="large">
      <NavLink to="/" className="title-fint-adler">Главная</NavLink>
      <NavLink to="/map" className="title-fint-adler">Карта низких цен</NavLink>
      <NavLink to="/excursions" className="title-fint-adler">Экскурсии</NavLink>
      {isAuth && <NavLink to="/personalarea" className="title-fint-adler" onClick={() => dispatch(actionsIndex.getSliderResSuccess([]))}>Личный кабинет</NavLink>}
      {isAuth ? (
        <Button className="title-fint-adler" type="link" onClick={() => logout()}>
          Выход
        </Button>
      ) : <NavLink to="/login" className="title-fint-adler">Вход</NavLink>}
      <Switch defaultChecked onChange={onChange} />
    </Space>

  );
}
