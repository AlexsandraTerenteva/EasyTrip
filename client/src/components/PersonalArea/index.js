/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, Card, Avatar, Menu, Typography, Button, Spin, BackTop,
} from 'antd';
import {
  RightCircleOutlined, DollarCircleOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ProfileBox from './ProfileBox';
import { getSagaPersonalTicketList } from '../../store/actions/personalarea';
import { getUserExcursionsStart } from '../../store/actions/user';
import PersonalExcursionList from './PersonalExcursionList';
import * as actions from '../../store/actions/personalarea';
import TicketPersonalAreaList from './TicketPersonalAreaList';

const { Title } = Typography;

const style = {
  height: 40,
  width: 50,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

export default function PersonalArea() {
  const dispatch = useDispatch();
  const [visiblePersonalExcursions, setVisiblePersonalExcursions] = useState(false);
  const [visiblePersonalTickets, setVisiblePersonalTickets] = useState(true);
  const [visiblePersonalTicketsSorted, setVisiblePersonalTicketsSorted] = useState(false);
  const { auth, excursions } = useSelector((state) => state.user.data);
  const { data } = useSelector((state) => state.sliderResSlice);

  const setVisibleExcursionBlock = () => {
    setVisiblePersonalExcursions(true);
    setVisiblePersonalTickets(false);
    setVisiblePersonalTicketsSorted(false);
  };

  const setVisibleTicketsBlock = () => {
    dispatch(getSagaPersonalTicketList());
    setVisiblePersonalTickets(true);
    setVisiblePersonalExcursions(false);
    setVisiblePersonalTicketsSorted(false);
  };

  const setVisibleTicketsBlockSorted = () => {
    dispatch(actions.sortSagaPersonalTicketList(auth));
    setVisiblePersonalTicketsSorted(true);
    setVisiblePersonalTickets(false);
    setVisiblePersonalExcursions(false);
  };

  useEffect(() => {
    dispatch(getUserExcursionsStart());
    dispatch(getSagaPersonalTicketList());
  }, [dispatch]);

  if (!data?.data) return <Spin size="large" style={{ marginTop: 300, marginLeft: 850 }} />;

  return (
    <Row>
      <Col span={4} push={1}>
        <Card
          hoverable
          style={{
            textAlign: 'center',
            width: 340,
            marginTop: 40,
            paddingTop: 20,
            boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
            color: '#1457b4',
          }}
        >
          <img src="profile.png" alt="profile" />
          <Title level={3} style={{ color: '#004aad' }}>{auth?.username}</Title>
          <ProfileBox length={data?.data?.length} />
          <Menu style={{ borderRight: 'none' }}>
            <Menu.Item>
              <Button type="link" icon={<InfoCircleOutlined />}>
                Количество поездок:
                {' '}
                {data.data?.length || 0}
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button type="link" icon={<DollarCircleOutlined />}>
                Количество Бонусы:
                {' '}
                0
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button type="link" onClick={setVisibleTicketsBlock}>
                <RightCircleOutlined />
                {' '}
                Мои Билеты
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button type="link" onClick={setVisibleTicketsBlockSorted} icon={<RightCircleOutlined />}>Ближайшие Поездки</Button>
            </Menu.Item>
            <Menu.Item>
              <Button type="link" onClick={setVisibleExcursionBlock} icon={<RightCircleOutlined />}>Мои Экскурсии</Button>
            </Menu.Item>
          </Menu>
        </Card>
      </Col>
      <Col span={12} offset={3}>
        {visiblePersonalTickets && <TicketPersonalAreaList tickets={data.data} sorted={false} />}
        {visiblePersonalTicketsSorted && <TicketPersonalAreaList tickets={data.data} sorted />}
        {visiblePersonalExcursions && <PersonalExcursionList excursions={excursions} />}
      </Col>
      <BackTop>
        <div style={style}>Вверх</div>
      </BackTop>
    </Row>
  );
}
