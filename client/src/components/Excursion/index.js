import {
  Space, Row, Col, Spin, Typography, BackTop,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import FormSeachExcursions from './FormSeachExcursions';
import ExcursionList from './ExcursionList';
import * as actions from '../../store/actions/excursions';

const { Title } = Typography;

const style = {
  height: 40,
  width: 50,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

export default function Excursions() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.excursions);
  const { location } = useSelector((state) => state.user?.data);

  useEffect(() => {
    if (location) dispatch(actions.getExcursionsCityStart({ city: location?.iata }));
  }, [dispatch]);

  if (data?.loading) {
    return (
      <Row justify="center">
        <Spin size="large" style={{ marginTop: 300 }} />
      </Row>
    );
  }
  if (data?.data.length === 0) {
    return (
      <Row justify="center">
        <Spin size="large" style={{ marginTop: 300 }} />
      </Row>
    );
  }
  return (
    <>
      <Row justify="center">
        <Title className="title-font-adler" level={2} style={{ color: '#1457b4' }}>Выберите экскурсию</Title>
      </Row>
      <Row justify="center">
        <FormSeachExcursions />
      </Row>
      <Row gutter="vertical">
        <ExcursionList data={data?.data} />
      </Row>
      <BackTop>
        <div style={style}>Вверх</div>
      </BackTop>
    </>
  );
}
