/* eslint-disable jsx-a11y/alt-text */
import transformDate from '../../../utils/transformDate';

export default function TicketDetale({ ticket, origin }) {
  const photo = `http://pics.avs.io/100/100/${ticket?.price?.airline}.png`;
  const date = transformDate(ticket?.price?.depart_date, 'D MMMM YYYY, dddd');
  return (
    <>
      <img src="img/logo-ticket.png" />
      <h2>
        {origin.name}
        {' '}
        -
        {' '}
        {ticket?.name}
        {' '}
        {ticket?.price?.value}
        p
      </h2>
      <div>
        <h3>
          Вылет:
          {' '}
          {date}
        </h3>
        <div className="ballon-airline">
          <div><img src={photo} /></div>
          <div>{ticket?.price?.airline_name}</div>
        </div>

      </div>
    </>
  );
}
