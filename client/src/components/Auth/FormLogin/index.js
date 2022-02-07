import {
  Form, Input, Button, Avatar,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as actions from '../../../store/actions/user';
import store from '../../../store';

export default function FormLogin() {
  const allState = store.getState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  console.log(allState.user.data.auth);
  const [alrenNew, setAlertNew] = useState(allState.user.data.auth);
  store.subscribe(() => setAlertNew(store.getState()));
  const onFinish = (values) => {
    if (values) {
      dispatch(actions.authUserStart(values));
      console.log(allState.user.data.auth, 'стэйт сразу после диспатча'); // добавил
    }
  };

  useEffect(() => {
    if (allState.user.data.auth && allState.user.data.auth.username === 'Данные введены неверно!') {
      alert(allState.user.data.auth.username);
    } else if (allState.user.data.auth && allState.user.data.auth.username !== 'Данные введены неверно!') {
      navigate('/');
    }
  }, [alrenNew]);

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Avatar size={64} icon={<UserOutlined />} className="form-avatar" />
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Введите вашу почту' }]}
      >
        <Input
          size="large"
          prefix={(
            <UserOutlined
              className="site-form-item-icon"
            />
)}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введите ваш пароль' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="login-form-button"
        >
          Вход
        </Button>
      </Form.Item>
    </Form>
  );
}
