/* eslint-disable max-len */
import {
  Spin, Typography, Col,
} from 'antd';
import ExcursionCard from '../ExcursionCard';
import './ExcursionList.css';

const { Title } = Typography;

export default function ExcursionList({ data }) {
  if (!data || data.loading) {
    return (
      <div className="example">
        <Spin />
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="example">
        <Title level={2} style={{ color: '#1457b4' }}>Экскурсий пока нет...</Title>
      </div>
    );
  }
  return data.map((item) => (
    <Col offset={8}>
      <ExcursionCard key={item.id} data={item} />
    </Col>
  ));
}
