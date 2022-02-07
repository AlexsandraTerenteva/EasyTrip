/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Row, Col, Select, Button, Badge, Tag, Typography,
} from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import ModalBooking from '../ExcusionModalBooking';
import transformDate from '../../../utils/transformDate';
import * as actions from '../../../store/actions/excursions';
import { deleteUserBookingStart } from '../../../store/actions/user';
import './ExcursionCard.css';

const { Title } = Typography;
const { Option } = Select;
const initialValue = {
  userName: null,
  members: null,
  phone: null,
  date: null,
};

export default function ExcursionCard({ data }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(initialValue);
  const price = ` ${data.price} ${data.currency}`;

  const checkDate = (date) => {
    const d1 = new Date();
    const d2 = new Date(date);
    console.log({ d1, d2 });
    if (d1 > d2) return true;
    return false;
  };
  const onChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onSelected = (e) => {
    setValue((prev) => ({ ...prev, members: e }));
  };
  const onDateSelected = (e) => {
    setValue((prev) => ({ ...prev, date: e }));
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    if (value.phone && value.date && value.members && value.userName) {
      dispatch(actions.postExcursionBookingStart({ ...value, ...data }));
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    console.log(value);
    setIsModalVisible(false);
  };

  const deleteExcursions = () => {
    dispatch(deleteUserBookingStart(data?.id));
  };

  let optionsDate;
  if (Array.isArray(data?.available_dates)) {
    optionsDate = data?.available_dates?.map((option) => (
      <Option key={option.id} value={option}>
        {option}
      </Option>
    ));
  } else {
    optionsDate = (
      <Option value={data?.available_dates}>
        {data?.available_dates}
      </Option>
    );
  }

  return (
    <>
      <Badge.Ribbon text={price} color="red" style={{ marginTop: 15 }}>
        <Card
          className={() => (checkDate() ? 'past-date' : '')}
          title={data.content}
          hoverable
          style={{
            maxWidth: 650,
            marginTop: 30,
            padding: 0,
            boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
            borderBottom: 0,
          }}
          wrap
        >
          <Row>
            <Col span={10}>
              <img
                alt={data.content}
                src={data.photo || data.img_url}
              />
            </Col>
            <Col span={10} offset={3} style={{ textAlign: 'center' }}>
              <div>
                <Tag color="cyan">
                  {data.excursion_type}
                </Tag>
                <Tag color="cyan">
                  {data.activity_type === 'Group' ? 'Групповая' : 'Индивидуальная'}
                </Tag>
                <Tag color="cyan">
                  <FieldTimeOutlined />
                  {' '}
                  {data.duration}
                </Tag>
              </div>
              <Button style={{ margin: 10, width: 200 }}>
                {' '}
                <a href={data.link} target="_blank" rel="noreferrer">Подробнее</a>
              </Button>
              {!data?.date ? (
                <Select
                  style={{ width: 200 }}
                  placeholder="Доступные даты"
                  optionFilterProp="children"
                >
                  {optionsDate || <Option value="no">Нет свободных мест</Option>}
                </Select>
              ) : (
                <Title level={5}>
                  {transformDate(data.date, ' D MMMM, YYYY')}
                </Title>
              )}
              {!data?.date
                ? <Button onClick={showModal} type="primary" size="large" style={{ marginTop: 20, width: 200 }}>Забронировать</Button>
                : <Button onClick={deleteExcursions} type="primary" size="large" style={{ marginTop: 20, width: 200 }}>Удалить</Button>}

            </Col>
          </Row>
        </Card>
      </Badge.Ribbon>
      <ModalBooking
        availableDates={data?.available_dates}
        showModal={showModal}
        visible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onChange={onChange}
        onSelected={onSelected}
        onDateSelected={onDateSelected}
      />
    </>
  );
}
