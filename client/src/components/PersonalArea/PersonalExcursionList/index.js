import { Col, Typography } from 'antd';
import ExcursionsCard from '../../Excursion/ExcursionCard';
import './PersonalExcursionList.css';

const { Title } = Typography;

export default function PersonalExcursionList({ excursions }) {
  if (excursions?.length === 0 || !excursions) {
    return (
      <div className="example">
        <Title level={2} className="title-font-adler" style={{ color: '#1457b4' }}>Экскурсий в этом городе пока нет</Title>
      </div>
    );
  }
  return excursions?.map((item) => (
    <Col offset={4} key={item.content}>
      <ExcursionsCard key={item.content} data={item} />
    </Col>

  ));
}
