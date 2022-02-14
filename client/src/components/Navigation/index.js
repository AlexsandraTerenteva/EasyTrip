/* eslint-disable react/jsx-no-bind */
import {
  Space, Switch, Button,
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
      setIsAuth(data.auth);
    }
  }, [data.auth]);

  return (
    <Space direction="horizontal" align="center" size="large">
      <NavLink to="/" className="title-font-adler">Главная</NavLink>
      <NavLink to="/map" className="title-font-adler">Карта низких цен</NavLink>
      <NavLink to="/excursions" className="title-font-adler">Экскурсии</NavLink>
      {isAuth && <NavLink to="/personalarea" className="title-font-adler" onClick={() => dispatch(actionsIndex.getSliderResSuccess([]))}>Личный кабинет</NavLink>}
      {isAuth ? (
        <Button className="title-font-adler" type="link" onClick={() => logout()}>
          Выход
        </Button>
      ) : <NavLink to="/login" className="title-font-adler">Вход</NavLink>}
      <Switch defaultChecked onChange={onChange} />
    </Space>

  );
}
