/* eslint-disable max-len */
import React from 'react';
import {
  Row, Col, Typography,
} from 'antd';
import MainForm from '../Main/MainForm';
import CarouselComponent from '../Carousel';
import './StartComponent.css';

const { Title } = Typography;

function StartComponent() {
  return (
    <>
      <Row justify="center" align="middle">
        <Col xl={{ span: 6 }} xxl={{ span: 6 }}>
          <img src="img/bg6.png" className="main-bg-left" alt="bg" />
        </Col>
        <Col style={{ textAlign: 'center' }} xl={{ span: 8 }} xxl={{ span: 6 }}>
          <Title level={1} className="title-font-playlist top" style={{ color: '#004aad', fontSize: 70, margin: 0 }}>EasyTrip</Title>
          <Title level={2} className="title-fint-adler" style={{ color: '#13c2c2', marginBottom: 50, paddingTop: 0 }}>ПУТЕШЕСТВУЙТЕ С НАМИ ЛЕГКО!</Title>
        </Col>
        <Col xl={{ span: 6 }} xxl={{ span: 6 }}>
          <img src="img/bg7.png" className="main-bg-right" alt="bg" />
        </Col>
      </Row>
      <MainForm />
      <Row justify="center">
        <Title className="title-fint-adler" level={2} style={{ color: '#004aad', marginBottom: 30 }}> Популярные направления</Title>
      </Row>

      <CarouselComponent className="auto" />
    </>
  );
}

export default StartComponent;
