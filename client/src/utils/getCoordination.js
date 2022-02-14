function getCoordination(coordinates) {
  if (Array.isArray(coordinates)) {
    return [coordinates[1], coordinates[0]];
  }
  const location = coordinates?.split(':').map((item) => Number(item));
  return [location[1], location[0]];
}

export default getCoordination;
