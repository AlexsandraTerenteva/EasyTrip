import {
  Layout,
} from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import Navigation from '../../Navigation';
import { useThemeContext } from '../../../context/themeContext';
import './MainLayout.css';

const { Header, Footer, Content } = Layout;

export default function MainLayout() {
  const { theme } = useThemeContext();
  return (
    <Layout className={`main-layout ${theme}`}>
      <Header className={`${theme}`}>
        <div>
          <img src="img/logo/mainlogo.png" alt="logo" />
          {' '}
        </div>
        <Navigation />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer className={`${theme}`}>
        <GlobalOutlined />
        {' '}
        {' '}
        2022 EasyTrip — путешествуйте с нами легко!
      </Footer>
    </Layout>
  );
}
