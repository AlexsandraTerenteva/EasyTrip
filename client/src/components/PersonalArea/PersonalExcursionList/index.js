import { Col, Typography } from 'antd';
import ExcursionsCard from '../../Excursion/ExcursionCard';
import './PersonalExcursionList.css';

const { Title } = Typography;

export default function PersonalExcursionList({ excursions }) {
  if (excursions?.length === 0 || !excursions) {
    return (
      <div className="example">
        <Title level={2} className="title-fint-adler" style={{ color: '#1457b4' }}>Экскурсий в этом городе пока нет</Title>
      </div>
    );
  }
  return excursions?.map((item) => (
    <Col span={18} offset={2}>
      {' '}
      <ExcursionsCard data={item} />
    </Col>

  ));
}
