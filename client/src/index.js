import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import ruRU from 'antd/lib/locale/ru_RU';
import { ThemeContextProvider } from './context/themeContext';
import 'antd/dist/antd.variable.min.css';
import './index.css';
import store from './store';
import App from './App';

ConfigProvider.config({
  theme: {
    primaryColor: '#13c2c2',
  },
});

moment.locale('ru');

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU}>
      <ThemeContextProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ThemeContextProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
