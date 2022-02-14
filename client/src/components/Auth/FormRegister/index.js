import {
  Form, Input, Button, Avatar,
} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../../store/actions/user';

export default function FormRegistrate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(actions.regUserStart(values));
    navigate('/');
    form.resetFields();
  };
  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      onReset
    >
      <Avatar size={64} icon={<UserOutlined />} className="form-avatar" />
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Введите вашу почту' }]}
      >
        <Input
          size="large"
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Введите Вашe имя' }]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Имя"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введите ваш пароль' }]}
      >
        <Input
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" className="login-form-button">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
}
