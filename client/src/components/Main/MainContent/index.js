import {
  Layout, Button, Row, Col,
} from 'antd';
import { Link } from 'react-router-dom';
import CarouselComponent from '../../Carousel';

const {
  Content,
} = Layout;

export default function MainContent() {
  return (
    <Content>
      <Row>
        <Col span={12} offset={10}>
          <Link to="/map" key="map">
            <Button size="large">Карта низких цен</Button>
          </Link>
        </Col>
      </Row>
      <div style={{ width: '30%', maxHeight: '150px', margin: 'auto' }}>
        <label> Популярные направления</label>
        <CarouselComponent />
      </div>
      <div style={{ width: '30%', maxHeight: '150px', margin: 'auto' }}>
        <label> Ответ на dog-запрос</label>
      </div>
    </Content>
  );
}
