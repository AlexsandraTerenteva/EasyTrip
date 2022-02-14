import { Placemark } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import PlaceMarkItem from '../PlaceMarkItem';
import '../MapFormSearch.css';

function PlaceMarkList() {
  const { destination } = useSelector((state) => state.map?.data);
  const { origin } = useSelector((state) => state.map?.data);
  const { ticket } = useSelector((state) => state.map?.data);

  if (destination?.length === 0 || !destination) {
    return <Placemark geometry={[55.751574, 37.573856]} options={{ preset: 'islands#grayCircleDotIcon' }} />;
  }
  return destination?.map((city) => (
    <div key={city.name}>
      <PlaceMarkItem city={city} ticket={ticket} origin={origin} />
    </div>
  ));
}

export default PlaceMarkList;
