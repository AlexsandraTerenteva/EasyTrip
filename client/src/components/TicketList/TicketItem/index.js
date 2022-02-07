import TicketOneway from './ticketOneway';
import TicketBothway from './ticketBothway';
import transformDateRus from '../../../utils/transformDateRus';

const TicketItem = ({ ticket }) => {
  if (!ticket.return_at) {
    return (
      <TicketOneway ticket={ticket} />);
  }
  return (
    <TicketBothway ticket={ticket} />);
};

export default TicketItem;
