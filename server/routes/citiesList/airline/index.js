/* eslint-disable camelcase */
const router = require('express').Router();
const { Airline } = require('../../../db/models');

router
  .route('/')
  .post(async (req, res) => {
    const data = req.body;

    try {
      const airline = await Airline.findAll();
      if (data) {
        const dataAirlineName = data.map((item) => {
          const airlineName = airline.find((line) => line.code === item.airline);
          if (airlineName) {
            return {
              ...item, airline_name: airlineName.dataValues.name_translations,
            };
          }
          return item;
        });
        return res.json(dataAirlineName);
      }
      throw Error();
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router;
