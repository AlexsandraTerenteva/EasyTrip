const fs = require('fs');

function renderCities() {
  const cities = [];

  const newData = fs.readFileSync('./cities.json', 'utf-8');
  const data = JSON.parse(newData);

  data.forEach((city) => {
    cities.push({
      country_code: city.country_code,
      code: city.code,
      name: city.name,
      name_translations: city.name_translations.en,
      time_zone: city.time_zone,
      coordinates_lat: city.coordinates.lat,
      coordinates_lon: city.coordinates.lon,
    });
  });

  return cities;
}

function renderAirLines() {
  const airlines = [];
  const newData = fs.readFileSync('./airlines.json', 'utf-8');
  const data = JSON.parse(newData);

  data.forEach((line) => {
    airlines.push({
      name: line.name,
      code: line.code,
      name_translations: line.name_translations.en,
    });
  });
  return airlines;
}

function renderAirPorts() {
  const airPorts = [];
  const newData = fs.readFileSync('./airports.json', 'utf-8');
  const data = JSON.parse(newData);

  data.forEach((port) => {
    airPorts.push({
      name: port.name,
      city_code: port.city_code,
      country_code: port.country_code,
      name_translations: port.name_translations.en,
      time_zone: port.time_zone,
      flightable: port.flightable,
      coordinates_lat: port.coordinates.lat,
      coordinates_lon: port.coordinates.lon,
      code: port.code,
      iata_type: port.iata_type,
    });
  });
  return airPorts;
}

module.exports = { renderCities, renderAirLines, renderAirPorts };
