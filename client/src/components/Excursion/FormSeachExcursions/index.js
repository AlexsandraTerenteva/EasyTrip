/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import {
  Form, Select, Button, DatePicker,
} from 'antd';
import 'moment/locale/ru';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/excursions';
import { getCitiesFrom } from '../../../store/actions/cities';
import store from '../../../store';
import transformDate from '../../../utils/transformDate';
import toUpFirstLette from '../../../utils/toUpFirstLetter';
import './FormSearchExcursion.css';

const { Option } = Select;

const startCitiesFrom = [
  { name: 'Москва', country_code: 'RU', code: 'MOW' },
  { name: 'Санкт-Петербург', country_code: 'RU', code: 'LED' },
];

export default function FormSeachExcursions() {
  const [fromCitiesSelect, setFromCitiesSelect] = useState(startCitiesFrom);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCitiesFrom(value));
  }, [dispatch, value]);

  const onFinish = (values) => {
    const {
      city, currency, adults_count, date,
    } = values;

    if (!date?._d) {
      return dispatch(actions.getExcursionsCityStart({
        city,
        currency,
        adults_count,
        date: '',
      }));
    }

    return dispatch(actions.getExcursionsCityStart({
      city,
      currency,
      adults_count,
      date: transformDate(date._d, 'YYYY-MM-DD'),
    }));
  };

  const onChangeFrom = (e) => {
    setValue(toUpFirstLette(e.target.value));
    store.subscribe(() => setFromCitiesSelect(store.getState().cities.cities));
    const allState = store.getState().cities;
  };

  const optionsFromCities = fromCitiesSelect.map((option, i, options) => (
    <Option key={option.name} value={option.code}>
      {`${option.name} ${option.country_code}`}
    </Option>
  ));

  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      className="customized_form_controls"
      style={{ padding: 30 }}
    >
      <Form.Item
        name="city"
        rules={[{ required: true, message: 'Введите название города' }]}
        onChange={onChangeFrom}
      >
        <Select
          size="large"
          showSearch
          style={{ width: 200, boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', textAlign: 'left' }}
          placeholder="Куда"
          optionFilterProp="children"
          filterOption={(input, option) => option.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) => optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())}
        >
          {
            fromCitiesSelect.length > 0 && optionsFromCities
          }
        </Select>
      </Form.Item>
      <Form.Item name="date">
        <DatePicker allowClear="false" size="large" style={{ boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', textAlign: 'right' }} />
      </Form.Item>
      <Form.Item name="adults_count">
        <Select
          placeholder="Количество"
          size="large"
          showSearch
          style={{ width: 150, boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', textAlign: 'left' }}
          optionFilterProp="children"
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>
      </Form.Item>
      <Form.Item name="currency">
        <Select
          placeholder="Валюта"
          size="large"
          showSearch
          style={{ width: 150, boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', textAlign: 'left' }}
          optionFilterProp="children"
        >
          <Option value="RUB">RUB</Option>
          <Option value="USD">USD</Option>
          <Option value="EUR">EUR</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', textAlign: 'left' }}
        >
          Найти
        </Button>
      </Form.Item>
    </Form>
  );
}
