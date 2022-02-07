/* eslint-disable consistent-return */
const router = require('express').Router();
const axios = require('axios');

router
  .route('/')
  .post(async (req, res) => {
    const ip = req.body;
    try {
      const { data } = await axios.get(`http://www.travelpayouts.com/whereami?locale=ru&${ip}`);
      if (data) {
        return res.json(data);
      }
      throw Error({ message: 'Данных нет' });
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router;
