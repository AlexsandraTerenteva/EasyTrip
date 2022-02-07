import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Carousel, Image, Row, Col,
} from 'antd';
import * as actions from '../../store/actions';

const userSelector = (state) => state.user;

function CarouselComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userData } = useSelector(userSelector);
  const onClick = (destination) => {
    const { iata } = userData.location;
    dispatch(actions.getSliderResSuccess([]));
    dispatch(actions.getSliderRes({ origin: iata, destination }));
    navigate('/tickets');
  };
  return (
    <Row style={{ marginLeft: 50 }}>
      <Col span={24}>
        <Carousel autoplay>
          <div>
            <Row justify="center">
              <Col span={5}>
                <Image
                  className="img-slider"
                  width={350}
                  height={250}
                  src="carousel-london.webp"
                  preview={false}
                  onClick={() => onClick('LON')}
                  style={{ boxShadow: '5px 2px 10px 2px rgba(34, 60, 80, 0.2)' }}
                />
              </Col>
              <Col span={5}>
                <Image
                  className="img-slider"
                  width={350}
                  height={250}
                  src="/carousel-paris.jpg"
                  preview={false}
                  onClick={() => onClick('PAR')}
                  style={{ boxShadow: '5px 2px 10px 2px rgba(34, 60, 80, 0.2)' }}
                />
              </Col>
              <Col span={5}>
                <Image
                  className="img-slider"
                  width={350}
                  height={250}
                  src="carousel-berlin.jpg"
                  preview={false}
                  onClick={() => onClick('BER')}
                  style={{ boxShadow: '5px 2px 10px 2px rgba(34, 60, 80, 0.2)' }}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row justify="center">
              <Col span={5}>
                <Image
                  className="img-slider"
                  width={350}
                  height={250}
                  src="carousel-rome.jpg"
                  preview={false}
                  onClick={() => onClick('ROM')}
                  style={{ boxShadow: '5px 2px 10px 2px rgba(34, 60, 80, 0.2)' }}
                />
              </Col>
              <Col span={5}>
                <Image
                  className="img-slider"
                  width={350}
                  height={250}
                  src="carousel-spb.jpg"
                  preview={false}
                  onClick={() => onClick('LED')}
                  style={{ boxShadow: '5px 2px 10px 2px rgba(34, 60, 80, 0.2)' }}
                />
              </Col>
              <Col span={5}>
                <Image
                  className="img-slider"
                  width={350}
                  height={250}
                  src="carousel-sochi.jpg"
                  preview={false}
                  onClick={() => onClick('AER')}
                  style={{ boxShadow: '5px 2px 10px 2px rgba(34, 60, 80, 0.2)' }}
                />
              </Col>
            </Row>
          </div>
        </Carousel>
      </Col>
    </Row>
  );
}

export default CarouselComponent;
