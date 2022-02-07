import { Typography } from 'antd';
import TicketPersonal from '../TicketPersonalArea';

const { Title } = Typography;

export default function TicketPersonalAreaList({ tickets, sorted }) {
  if (tickets?.length === 0 || !tickets) {
    return (
      (sorted
        ? (
          <div className="example">
            <Title level={2} style={{ color: '#1457b4' }}>Нет билетов на ближайшие даты</Title>
          </div>
        )
        : (
          <div className="example">
            <Title level={2} style={{ color: '#1457b4' }}>Нет билетов для отображения</Title>
          </div>
        )
      )
    );
  }
  return tickets?.map((ticket, index) => (
    <div key={String(index)}>
      {' '}
      <TicketPersonal ticket={ticket} />
    </div>
  ));
}
