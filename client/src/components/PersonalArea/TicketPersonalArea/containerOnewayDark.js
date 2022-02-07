import '../../TicketList/TicketItem/ticketstyle.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'antd';
import calcAT from '../../../utils/calculateArrivalTime';
import getDur from '../../../utils/getFlightDuration';
import * as actions from '../../../store/actions/personalarea';

const airportTimezone = require('airport-timezone');

const ContainerOnewayDark = ({ ticket }) => {
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

  return (
    <div className="container">
      <div className="ticket-wrap-dark">
        <div className="airlineLogo">
          <Row>
            <Col span={24}>
              <img src={airlineLogoPath} alt="airlineLogoPath" />
            </Col>
          </Row>
        </div>
        <div className="flightNumber">
          <Row>
            <Col span={24}>
              Рейс
              {' '}
              {ticket.flight_number}
            </Col>
          </Row>
        </div>
        <Row justify-content="center" justify="center" className="one-way">
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
                {getDur(ticket.duration)}
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
              {dayjs(calcAT(depTime, ticket.duration, tzDest)).format('HH:mm')}
            </div>
            <div className="arrival_info">
              <div>
                {dayjs(calcAT(depTime, ticket.duration, tzDest)).format('DD MMMM YYYY, dddd')}
                <div className="cityName">
                  {ticket.destinationCity}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="ticket-price-block-dark">
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

export default ContainerOnewayDark;
