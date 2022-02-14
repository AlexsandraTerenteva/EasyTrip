import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  YMaps, Map, Placemark,
} from 'react-yandex-maps';
import { Space, Spin } from 'antd';
import PlaceMarkList from './PlaceMarketList';
import MapFormSearch from './MapFormSearch';
import getCoordination from '../../utils/getCoordination';
import * as actions from '../../store/actions/map';

export default function MapCities() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const map = useSelector((state) => state.map);
  const { data } = map;
  const initialState = user.data?.location;
  const [origin, setOrigin] = useState(initialState);

  useEffect(() => {
    dispatch(actions.getCitiesLocationSaga({ iata: origin.iata }));
  }, [dispatch]);

  useEffect(() => {
    if (data?.origin) {
      setOrigin(data.origin);
    }
  }, [data]);

  if (map.loading) return <Spin size="large" style={{ marginTop: 300, marginLeft: 850 }} />;

  return (
    <Space align="start" className="margin-top">
      <MapFormSearch originCity={origin?.name} />
      <YMaps>
        <Map
          state={{
            center: getCoordination(origin?.coordinates),
            zoom: 5,
          }}
          width="80vw"
          height="80vh"
        >
          <Placemark
            geometry={getCoordination(origin?.coordinates)}
            options={{
              preset: 'islands#redAirportIcon',

            }}
          />
          <PlaceMarkList />
        </Map>
      </YMaps>
    </Space>
  );
}
