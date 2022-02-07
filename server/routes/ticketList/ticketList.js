/* eslint-disable no-unused-vars */
const router = require('express').Router();
const axios = require('axios');
const { City, Airline } = require('../../db/models');

const makeLink = (origin, destination, departureAt, returnAt) => {
  const apiKey = '0189e1c40946c1f4849b54d331a7c2e4';
  const aviaLink = 'https://api.travelpayouts.com/aviasales/v3/prices_for_dates';
  return `${aviaLink}?origin=${origin}&destination=${destination}&currency=rub&departure_at=${departureAt}&return_at=${returnAt}&sorting=price&direct=true&limit=30&token=${apiKey}`;
};

router
  .route('/')
  .post(async (req, res) => {
    console.log('Прилетел post-request по ручке /tickets!', req.body);
    const {
      origin, destination, departureAt, returnAt,
    } = req.body;

    const airlines = await Airline.findAll({
      attributes: ['code', 'name_translations'],
      raw: true,
    });
    const cities = await City.findAll({
      attributes: ['code', 'name'],
      raw: true,
    });
    // карусель будет в один конец
    const { data } = await axios.get(makeLink(origin, destination, departureAt, ''));

    const result = data.data.map((dataItem) => {
      const originCity = cities.filter((element) => element.code === dataItem.origin);
      const destinationCity = cities.filter((element) => element.code === dataItem.destination);
      const airlineName = airlines.filter((element) => element.code === dataItem.airline);
      const newItem = {
        ...dataItem,
        originCity: originCity[0].name,
        destinationCity: destinationCity[0].name,
        airlineName: airlineName[0].name_translations,
      };
      return newItem;
    });
    res.json({ success: true, data: result, currency: 'rub' });
  });

module.exports = router;
