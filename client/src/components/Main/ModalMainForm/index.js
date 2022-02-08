/* eslint-disable comma-dangle */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import {
  Modal, Button, Space, 
} from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import Draggable from 'react-draggable';
import RadioModalMainForm from '../RadioModalMainForm';

class ModalMainForm extends React.Component {
  state = {
    visible: false,
    disabled: true,
    bounds: {
      left: 0, top: 0, bottom: 0, right: 0,
    },
    stateAdults: 0,
    stateChildren: 0,
    stateBabies: 0,
  };

  draggleRef = React.createRef();

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = this.draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    this.setState({
      bounds: {
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      },
    });
  };

  offAdults = (e) => {
    console.log(e);
    if (this.state.stateAdults === 0) {
      this.setState({ stateAdults: 0 });
    } else {
      this.setState({
        stateAdults: this.state.stateAdults - 1
      });
    }
  };

  addAdults = (e) => {
    console.log(e);
    this.setState({
      stateAdults: this.state.stateAdults + 1
    });
  };

  offChildren = (e) => {
    console.log(e);
    if (this.state.stateChildren === 0) {
      this.setState({ stateChildren: 0 });
    } else {
      this.setState({
        stateChildren: this.state.stateChildren - 1
      });
    }
  };

  addChildren = (e) => {
    console.log(e);
    this.setState({
      stateChildren: this.state.stateChildren + 1
    });
  };

  offBabies = (e) => {
    console.log(e);
    if (this.state.stateBabies === 0) {
      this.setState({ stateBabies: 0 });
    } else {
      this.setState({
        stateBabies: this.state.stateBabies - 1
      });
    }
  };

  addBabies = (e) => {
    console.log(e);
    this.setState({
      stateBabies: this.state.stateBabies + 1
    });
  };

  render() {
    const { bounds, disabled, visible } = this.state;
    return (
      <>
        <Button size="large" type="primary" ghost onClick={this.showModal} style={{ boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', marginRight: 10 }}>Условия</Button>
        <Modal
          title={(
            <div
              style={{
                width: '100px',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  this.setState({
                    disabled: false,
                  });
                }
              }}
              onMouseOut={() => {
                this.setState({
                  disabled: true,
                });
              }}
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              Выберите условия
            </div>
          )}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          modalRender={(modal) => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => this.onStart(event, uiData)}
            >
              <div ref={this.draggleRef}>{modal}</div>
            </Draggable>
          )}
        >        
              <h4>Взрослые: старше 12 лет</h4>
        <Space align="baseline" size="middle">
            <Button type="primary" shape="circle" onClick={this.offAdults}>
              <MinusCircleTwoTone />
            </Button>
            <h3>
              {this.state.stateAdults}
            </h3>
            <Button type="primary" shape="circle" onClick={this.addAdults}>
              <PlusCircleTwoTone />
            </Button>
        </Space>
          <br />
              <h4>Дети: от 2 до 12 лет</h4>
        <Space align="baseline" size="middle">
            <Button type="primary" shape="circle" onClick={this.offChildren}>
              <MinusCircleTwoTone />
            </Button>
            <h3>
              {this.state.stateChildren}
            </h3>
            <Button type="primary" shape="circle" onClick={this.addChildren}>
              <PlusCircleTwoTone />
            </Button>
        </Space>
          <br />
              <h4>Младенцы: до 2 лет, без места</h4>
              <Space align="baseline" size="middle">
            <Button type="primary" shape="circle" onClick={this.offBabies}>
              <MinusCircleTwoTone />            
            </Button>
            <h3>
              {this.state.stateBabies}
            </h3>
            <Button type="primary" shape="circle" onClick={this.addBabies}>
              <PlusCircleTwoTone />
            </Button>
              </Space>
          <br />
          <br />
          <RadioModalMainForm />
        </Modal>
      </>
    );
  }
}

export default ModalMainForm;
