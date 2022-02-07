/* eslint-disable no-template-curly-in-string */
import { Placemark } from 'react-yandex-maps';
import { useState } from 'react';
import { Spin, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TicketDetale from '../TicketDetale';
import * as actions from '../../../store/actions/map';
import * as actionsIndex from '../../../store/actions';
import '../MapFormSearch.css';

export default function PlaceMarkList({ data }) {
  const { origin, ticket } = useSelector((state) => state.map?.data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ data });
  function getTicket(current) {
    showModal();
    dispatch(actions.setCurrentTicketStart());
    try {
      if (current) {
        dispatch(actions.setCurrentTicketSuccess(current));
      }
    } catch (error) {
      dispatch(actions.setCurrentTicketError(error));
    }
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(actionsIndex.getSliderResSuccess([]));
    dispatch(actions.findCurrentTicketStart({ ticket, origin }));
    navigate('/tickets');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (data.loading) {
    return <Spin />;
  }

  if (data.data?.destination?.length === 0 || !data.data.destination) {
    return <Placemark geometry={[55.751574, 37.573856]} options={{ preset: 'islands#grayCircleDotIcon' }} />;
  }
  return data.data?.destination?.map((city) => (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Подробнее"
        cancelText="Закрыть"
      >
        <TicketDetale ticket={ticket} origin={origin} />
      </Modal>
      <Placemark
        onClick={() => getTicket(city)}
        key={city.coordinates}
        geometry={[city.coordinates[1], city.coordinates[0]]}
        options={{
          preset: 'islands#grayCircleDotIcon',

        }}
        properties={
          {
            iconCaption: `${city.name} ${city.price?.value}p`,
          }
        }
      />
    </>
  ));
}
