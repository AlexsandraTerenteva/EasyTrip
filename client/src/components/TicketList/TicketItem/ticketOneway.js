import dayjs from 'dayjs';
import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal, Row, Col, Button,
} from 'antd';
import calcAT from '../../../utils/calculateArrivalTime';
import getDur from '../../../utils/getFlightDuration';
import * as actions from '../../../store/actions/personalarea';
import * as actionsIndex from '../../../store/actions';
import './ticketstyle.css';

const airportTimezone = require('airport-timezone');

const TicketOneway = ({ ticket }) => {
  const { auth } = useSelector((state) => state.user.data);
  const depTime = ticket.departure_at;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    dispatch(actionsIndex.getSliderResSuccess([]));
    dispatch(actions.givSagaPersonalTicketList({ ticket, auth }));
    navigate('/personalarea');
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const airlineLogoPath = `http://pics.avs.io/100/100/${ticket?.airline}.png`;

  const tzDest = airportTimezone.filter((airport) => airport.code === ticket.destination_airport);

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Купить билет"
        cancelText="Закрыть"
      >
        <img src="img/logo-ticket.png" />
        {' '}
        <h2>
          {ticket.originCity}
          {' '}
          -
          {' '}
          {ticket.destinationCity}
        </h2>
        <div>
          <h3>
            Вылет:
            {' '}
            {dayjs(depTime).format('DD MMMM YYYY, dddd')}
          </h3>
          <h3>
            В полете:
            {' '}
            {getDur(ticket.duration)}
          </h3>
          <h2>
            Стоимость:
            {' '}
            {ticket.price}
            {' '}
            ₽
          </h2>
          <h3 className="ballon-airline">
            <img src={airlineLogoPath} />
            {ticket.airlineName}
          </h3>
        </div>
      </Modal>
      <div className="container">
        <div className="ticket-wrap">
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
        <div className="ticket-price-block">
          <h2 className="ticket_price">
            {ticket.price}
            {' '}
            ₽
          </h2>
          {auth
          && (
          <Button type="primary" htmlType="submit" className="modal-form-button" size="large" onClick={() => showModal()}>
            Выбрать
          </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(TicketOneway);
