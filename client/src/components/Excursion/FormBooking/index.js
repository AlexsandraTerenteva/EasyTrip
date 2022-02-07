import {
  Form, Input, Select,
} from 'antd';

const { Option } = Select;

export default function FormBooking({
  onChange, onSelected, onDateSelected, availableDates,
}) {
  let optionsDate;
  if (Array.isArray(availableDates)) {
    optionsDate = availableDates.map((option) => (
      <Option key={option.id} value={option}>
        {option}
      </Option>
    ));
  } else {
    optionsDate = (
      <Option value={availableDates}>
        {availableDates}
      </Option>
    );
  }

  return (
    <Form
      name="wrap"

    >
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          placeholder="Имя и фамилия"
          size="large"
          name="userName"
          onChange={(onChange)}
          style={{ height: 40, textAlign: 'left' }}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          placeholder="Телефон"
          size="large"
          name="phone"
          onChange={(onChange)}
          style={{ height: 40, textAlign: 'left' }}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}

      >
        <Select
          onChange={(onSelected)}
          name="members"
          placeholder="Количество персон"
          size="large"
          showSearch
          style={{ width: 200, textAlign: 'left' }}
          optionFilterProp="children"
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          size="large"
          name="date"
          onChange={onDateSelected}
          style={{ width: 200, textAlign: 'left' }}
          placeholder="Доступные даты"
          optionFilterProp="children"
        >
          {optionsDate || <Option value="no">Нет свободных мест</Option>}
        </Select>
      </Form.Item>
    </Form>
  );
}
