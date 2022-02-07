import { useState } from 'react';
import {
  Button, Row, Col, Card,
} from 'antd';
import FormLogin from './FormLogin';
import FormRegistrate from './FormRegister';
import './Auth.css';

export default function Authentication() {
  const [visibleFormLogin, setvisibleFormLogin] = useState(false);
  const showRegForm = () => {
    setvisibleFormLogin((prev) => !prev);
  };
  return (
    <div className="login-form-wrap">
      <Row justify="center" align="middle">
        <Col sm={{ span: 12 }} md={{ span: 12 }} xl={{ span: 6 }}>
          <Row>
            <Card
              hoverable
              className="login-card"
            >
              {visibleFormLogin ? <FormRegistrate /> : <FormLogin />}
              <Button type="link" size="small" onClick={() => showRegForm()}>{!visibleFormLogin ? 'Создать профиль' : 'Войти в профиль' }</Button>
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
