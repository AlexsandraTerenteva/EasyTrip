import '../../TicketList/TicketItem/ticketstyle.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'antd';
import calcAT from '../../../utils/calculateArrivalTime';
import getDur from '../../../utils/getFlightDuration';
import * as actions from '../../../store/actions/personalarea';

const airportTimezone = require('airport-timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
const ContainerBothway = ({ ticket }) => {
  const { auth } = useSelector((state) => state.user.data);
  const depTime = ticket.departure_at;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteTicket = () => {
    dispatch(actions.deleteSagaPersonalTicketList({ ticket, auth }));
    navigate('/personalarea');
  };

  const airlineLogoPath = `http://pics.avs.io/100/100/${ticket?.airline}.png`;

  const tzOrig = airportTimezone.filter((airport) => airport.code === ticket.origin_airport);
  const tzDest = airportTimezone.filter((airport) => airport.code === ticket.destination_airport);
  const timeDiff = tzDest[0].offset.gmt - tzOrig[0].offset.gmt;
  let durationForward;
  let durationBack;
  if (timeDiff < 0) { // летим на Запад
    durationForward = Math.floor(ticket.duration * 0.535);
    durationBack = Math.floor(ticket.duration * 0.465);
  } else if (timeDiff > 0) { // летим на Восток
    durationForward = Math.floor(ticket.duration * 0.465);
    durationBack = Math.floor(ticket.duration * 0.535);
  } else { // летим на Юг
    durationForward = Math.floor(ticket.duration * 0.49);
    durationBack = Math.floor(ticket.duration * 0.51);
  }
  return (
    <div className="container">
      <div className="ticket-wrap">
        <div className="airlineLogoBothway">
          <Row>
            <Col span={6}>
              <img src={airlineLogoPath} alt="airlineLogoPath" />
            </Col>
          </Row>
        </div>
        <Row justify-content="center" justify="center" className="up">
          <Col span={7} className="left-block">
            <div className="departure_at">
              {dayjs(depTime).format('HH:mm')}
            </div>
            <div className="departure_at_info">
              <div>
                {dayjs(depTime).format('DD MMMM YYYY, dddd')}
              </div>
              <div className="cityName">
                {ticket.originCity}
              </div>
            </div>
          </Col>
          <Col span={10} className="center-block">
            <div className="duration" />
            <div>
              <div className="duration-text">
                В пути:
                {' '}
                {getDur(durationForward)}
              </div>
              <div className="origin-airport">
                {ticket.origin_airport}
              </div>
              <div className="destination-airport">
                {ticket.destination_airport}
              </div>
              <div className="line" />
            </div>

          </Col>
          <Col span={7} className="right-block">
            <div className="arrival">
              {dayjs(calcAT(ticket.departure_at, durationForward, tzDest)).format('HH:mm')}
            </div>
            <div className="arrival_info">
              <div>
                {dayjs(calcAT(depTime, durationForward, tzDest)).format('DD MMMM YYYY, dddd')}
                <div className="cityName">
                  {ticket.destinationCity}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row justify-content="center" justify="center" className="down">
          <Col span={7} className="left-block-low">
            <div className="departure_at">
              {dayjs(calcAT(ticket.return_at, 0, tzDest)).format('HH:mm')}
            </div>
            <div className="departure_at_info">
              <div>
                {dayjs(ticket.return_at).format('DD MMMM YYYY, dddd')}
              </div>
              <div className="cityName">
                {ticket.destinationCity}
              </div>
            </div>
          </Col>
          <Col span={10} className="center-block-low">
            <div className="duration" />
            <div>
              <div className="duration-text">
                В пути:
                {' '}
                {getDur(durationBack)}
              </div>
              <div className="origin-airport">
                {ticket.destination_airport}
              </div>
              <div className="destination-airport">
                {ticket.origin_airport}
              </div>
              <div className="line" />
            </div>
          </Col>
          <Col span={7} className="right-block-low">
            <div className="arrival">
              {dayjs(calcAT(ticket.return_at, durationBack, tzOrig)).format('HH:mm')}
            </div>
            <div className="arrival_info">
              <div>
                {dayjs(calcAT(ticket.return_at, durationBack, tzOrig)).format('DD MMMM YYYY, dddd')}
                <div className="cityName">
                  {ticket.originCity}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="ticket-price-block">
        <h2 className="ticket_price">
          {ticket.price}
          {' '}
          ₽
        </h2>
        <Button type="primary" htmlType="submit" className="modal-form-button" size="large" onClick={deleteTicket}>
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default ContainerBothway;
