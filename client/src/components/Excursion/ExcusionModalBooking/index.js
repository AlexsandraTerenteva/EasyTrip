import { Modal, Typography } from 'antd';
import FormBooking from '../FormBooking';

const { Title } = Typography;

export default function ModalBooking({
  visible, handleOk, handleCancel, onChange, onSelected, onDateSelected, availableDates,
}) {
  return (
    <Modal
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
      onChange={onChange}
      onSelected={onSelected}
      onDateSelected={onDateSelected}
    >
      <img src="1.png" />
      <Title level={3} style={{ color: '#1457b4' }}>Забронировать</Title>
      <FormBooking
        availableDates={availableDates}
        onChange={onChange}
        onSelected={onSelected}
        onDateSelected={onDateSelected}
      />
    </Modal>
  );
}
