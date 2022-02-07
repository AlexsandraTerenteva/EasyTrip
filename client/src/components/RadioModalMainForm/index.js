/* eslint-disable arrow-parens */
/* eslint-disable react/state-in-constructor */
import { Radio, Space } from 'antd';
import React from 'react';

class RadioModalMainForm extends React.Component {
  state = {
    value: 1,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <Radio.Group onChange={this.onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Эконом</Radio>
          <Radio value="lskdjf">Комфорт</Radio>
          <Radio value={3}>Бизнес</Radio>
          <Radio value={4}>Первый класс</Radio>
        </Space>
      </Radio.Group>
    );
  }
}

export default RadioModalMainForm;
//! в радио велью возможно будет нужно заменить значения. сейчас там цифры
