import { memo } from 'react';
import ContainerOneway from './containerOneway';
import ContainerOnewayDark from './containerOnewayDark';
import ContainerBothway from './containerBothway';
import ContainerBothwayDark from './containerBothwayDark';

const TicketPersonal = ({ ticket }) => {
  const depTime = ticket.departure_at;
  if (!ticket.return_at) {
    if (new Date(depTime) < Date.now()) {
      return (
        <ContainerOnewayDark ticket={ticket} />
      );
    }
    return (
      <ContainerOneway ticket={ticket} />);
  }
  if (new Date(depTime) < Date.now()) {
    return (
      <ContainerBothwayDark ticket={ticket} />
    );
  }
  return (
    <ContainerBothway ticket={ticket} />);
};

export default memo(TicketPersonal);
