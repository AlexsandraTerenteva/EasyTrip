import { useSelector } from 'react-redux';
import {
  Row, Col, Typography, Spin, BackTop,
} from 'antd';
import TicketItem from './TicketItem';
import MainForm from '../Main/MainForm';

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

const sliderResSelector = (state) => state.sliderResSlice;
const { Title } = Typography;

function TicketList() {
  const { data } = useSelector(sliderResSelector);
  if (!data) {
    return <Spin size="large" style={{ marginTop: 300, marginLeft: 850 }} />;
  }

  if (data) {
    if (data.data.length === 0) {
      return (
        <>
          <MainForm />
          <div className="example">
            <Title className="title-font-adler" level={2} style={{ color: '#1457b4' }}>Извините, билетов по заданным условиям поиска не найдено</Title>
          </div>
        </>
      );
    }
  }

  return (
    <div>
      <MainForm />
      <Row>
        <div className="example" style={{ marginBottom: 0, marginTop: 0 }}>
          <label className="title-font-adler" style={{ color: '#004aad', marginBottom: 30, fontSize: 30 }}>
            Найдено билетов по данному направлению:
          </label>
          <label style={{ color: '#004aad', fontSize: 25, fontStyle: 'italic' }}>
            {data.data.length}
          </label>
        </div>
      </Row>
      <Row justify="center">
        <Col span={12} offset={1}>
          {data.data.map((ticket, index) => (
            <div key={String(index)}>
              {' '}
              <TicketItem ticket={ticket} />
            </div>
          ))}
        </Col>
      </Row>
      <BackTop>
        <div style={style}>Вверх</div>
      </BackTop>
    </div>
  );
}

export default TicketList;
