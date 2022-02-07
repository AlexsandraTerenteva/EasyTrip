/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import {
  Drawer, List, Form, Button, Input, Avatar, Space,
} from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';
import store from '../../../store';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">
      {title}
      :
    </p>
    {content}
  </div>
);

const allState = store.getState();
console.log('allState', allState);

class ProfileBox extends React.Component {
  state = {
    visible: false,
    name: allState.user?.data?.auth?.username,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onFinish = async (values) => {
    console.log(values);
    const res = await axios.post('http://localhost:4000/auth/newpass', values, { withCredentials: true });
    console.log(res.data);
    alert(res.data);
  };

  render() {
    return (
      <>
        <List
          dataSource={[
            {
              name: this.state.name,
            },
          ]}
          bordered
          style={{ marginLeft: 0 }}
          renderItem={(item) => (
            <List.Item
              key={item?.id}
              style={{ marginLeft: 0, textAlign: 'center' }}
              actions={[
                <a onClick={this.showDrawer} key={`a-${item?.id}`}>
                  Редактировать профиль
                </a>,
              ]}
            />

          )}
        />
        <Drawer
          width={320}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Space direction="vertical" align="center">
            <Avatar
              size={100}
              style={{
                backgroundColor: '#13c2c2',
              }}
              icon={<UserOutlined />}
            />
            <p>
              {' '}
              {this.state.name}
            </p>
            <Form
              onFinish={this.onFinish}
            >
              <p>Введите старый пароль</p>
              <Form.Item
                name="oldpass"
                rules={[
                  {
                    required: true, message: 'Введите пароль',
                  },
                  { whitespace: true },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <p>Введите новый пароль</p>
              <Form.Item
                name="newpass"
                rules={[
                  {
                    required: true, message: 'Введите новый пароль',
                  },
                  { whitespace: true },
                ]}

              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Изменить профиль</Button>
              </Form.Item>
            </Form>
          </Space>

        </Drawer>
      </>
    );
  }
}

export default ProfileBox;
