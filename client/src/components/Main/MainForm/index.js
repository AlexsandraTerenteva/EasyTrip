/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-multi-spaces */
/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import {
  Input,
  Button,
  Col,
  Row,
  Select,
  InputNumber,
  DatePicker,
  AutoComplete,
  Cascader,
  Tooltip,
  Form,
  Modal,
  ConfigProvider,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ModalMainForm from '../ModalMainForm';
import * as actions from '../../../store/actions/cities';
import * as actionsIndex from '../../../store/actions';
import store from '../../../store';
import toUpFirstLetter from '../../../utils/toUpFirstLetter';
import './MainForm.css';

const { Option } = Select;

const startCitiesFrom = [
  { name: 'Москва', country_code: 'RU', code: 'MOW' },
  { name: 'Дакар', country_code: 'SN', code: 'DKR' },
  { name: 'Мале', country_code: 'MV', code: 'MLE' },
];
const startCitiesTo = [
  { name: 'Сочи', country_code: 'RU', code: 'AER' },
  { name: 'Улан-Удэ', country_code: 'RU', code: 'UUD' },
  { name: 'Хабаровск', country_code: 'RU', code: 'KHV' },
];

const MainForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fromCitiesSelect, setFromCitiesSelect] = useState(startCitiesFrom);
  const [toCitiesSelect, setToCitiesSelect] = useState(startCitiesTo);
  const [newFromCities, setNewFromCities] = useState('');
  const [newToCities, setNewToCities] = useState('');
  const onFinish = (values) => {
    dispatch(actionsIndex.getSliderResSuccess([]));
    let datefrom;
    if (values.datefrom === undefined) {
      datefrom = undefined;
    } else {
      datefrom = dayjs(values.datefrom._d).format('YYYY-MM-DD');
    }
    let dateto;
    if (values.dateto === undefined) {
      dateto = undefined;
    } else {
      dateto = dayjs(values.dateto._d).format('YYYY-MM-DD');
    }
    const infoForSaga = {
      from: values.from, to: values.to, datefrom, dateto,
    };
    dispatch(actions.getNewInfoForSaga(infoForSaga));
    navigate('/tickets');
  };

  useEffect(() => {
    dispatch(actions.getCitiesFrom(newFromCities));
  }, [dispatch, newFromCities]);

  const onChangeFrom = (e) => {
    setNewFromCities(toUpFirstLetter(e.target.value));

    store.subscribe(() => setFromCitiesSelect(store.getState().cities.cities));
    const allState = store.getState().cities;
  };

  useEffect(() => {
    dispatch(actions.getCitiesTo(newToCities));
  }, [dispatch, newToCities]);
  const onChangeTo = (e) => {
    setNewToCities(toUpFirstLetter(e.target.value));
    dispatch(actions.getCitiesTo(newToCities));
    store.subscribe(() => setToCitiesSelect(store.getState().citiesto.citiesto));
    const allStateTo = store.getState().citiesto;
  };

  const optionsFromCities = fromCitiesSelect.map((option, i, options) => (
    <Option key={option.name} value={option.code}>
      {`${option.name} ${option.country_code}`}
    </Option>
  ));

  const optionsToCities = toCitiesSelect.map((optionT) => (
    <Option key={optionT.name} value={optionT.code}>
      {`${optionT.name} ${optionT.country_code}`}
    </Option>
  ));

  return (
    <Row justify="center">
      <Col lg={{ span: 24 }} xl={{ span: 23 }} xxl={{ span: 17 }}>
        <Form
          className="customized_main_form_controls"
          name="complex-form"
          layout="inline"
          onFinish={onFinish}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 210 }}
        >
          <Input.Group compact>
            <Form.Item name="from" onChange={onChangeFrom}>
              <Select
                size="large"
                showSearch
                style={{
                  width: 200, boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', marginRight: 10, textAlign: 'left',
                }}
                placeholder="Откуда"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) => optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())}
              >
                {
                fromCitiesSelect.length > 0 && optionsFromCities
              }
              </Select>
            </Form.Item>

            <Form.Item name="to" onChange={onChangeTo}>
              <Select
                size="large"
                showSearch
                style={{
                  width: 200, boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', marginRight: 10, textAlign: 'left',
                }}
                placeholder="Куда"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) => optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())}
              >
                {
                toCitiesSelect.length > 0 && optionsToCities
              }
              </Select>
            </Form.Item>

            <Form.Item name="datefrom">
              <DatePicker
                placeholder="Когда"
                locale={locale}
                allowClear="false"
                size="large"
                style={{
                  boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', marginRight: 10, textAlign: 'left', width: 180,
                }}
              />
            </Form.Item>

            <Form.Item name="dateto">
              <DatePicker
                placeholder="Обратно"
                locale={locale}
                allowClear="false"
                size="large"
                style={{ boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', marginRight: 10, width: 180  }}
              />
            </Form.Item>

            <Form.Item name="button">

              <Button
                style={{ boxShadow: '0px 5px 10px 0px rgba(34, 60, 80, 0.2)' }}
                size="large"
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Найти
              </Button>

            </Form.Item>

          </Input.Group>
        </Form>
      </Col>
    </Row>
  );
};
export default MainForm;
