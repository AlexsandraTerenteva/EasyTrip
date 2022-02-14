import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form, Button, Select,
} from 'antd';
import '../MapFormSearch.css';
import * as actions from '../../../store/actions/map';
import { getCitiesFrom } from '../../../store/actions/cities';
import store from '../../../store';
import toUpFirstLetter from '../../../utils/toUpFirstLetter';

const { Option } = Select;

const startCitiesFrom = [
  { name: 'Москва', country_code: 'RU', code: 'MOW' },
  { name: 'Мале', country_code: 'MV', code: 'MLE' },
];

export default function MapFormSearch({ originCity }) {
  const [fromCitiesSelect, setFromCitiesSelect] = useState(startCitiesFrom);
  const [value, setValue] = useState(originCity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCitiesFrom(value));
  }, [dispatch, value]);

  const onFinish = (values) => {
    dispatch(actions.getCitiesLocationSaga({ iata: values.origin_city }));
  };

  const onChangeFrom = (e) => {
    setValue(toUpFirstLetter(e.target.value));
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
      name="normal_login custom-form"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{
        marginLeft: 10,
        backgroundColor: '#fff',
        padding: 20,
        width: 300,
        boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
      }}
    >
      <img src="img/mapphoto.png" alt="map" />
      <Form.Item
        name="origin_city"
        rules={[{ required: true, message: 'Введите название города' }]}
        onChange={onChangeFrom}
      >
        <Select
          showSearch
          placeholder="Откуда"
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
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" size="large">
          Найти
        </Button>
      </Form.Item>
    </Form>
  );
}
