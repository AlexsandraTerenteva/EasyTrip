/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const router = require('express').Router();
const axios = require('axios');
const dayjs = require('dayjs');
// eslint-disable-next-line no-unused-vars
const { Booking } = require('../../db/models');
// const { data } = yield call(axios.get, `https://api.travelpayouts.com/weatlas/v1/search_prices_by_iata?code=${payload.city}&token=${apiKey}`);
const apiKey = '0189e1c40946c1f4849b54d331a7c2e4';
const sendEmailExcursion = require('./emailExcursions');

router
  .route('/')
  .post(async (req, res) => {
    const {
      city, adults_count, currency, date,
    } = req.body;
    try {
      const { data } = await axios.get(`https://api.travelpayouts.com/weatlas/v1/search_prices_by_iata?code=${city}&currency=${currency ?? 'RUB'}&date=${date ?? ''}&adults_count=${adults_count ?? '2'}&token=${apiKey}`);
      if (data) {
        const availableDates = data.data.filter((item) => item?.available_dates.length !== 0);
        const newAvailableDates = [];
        for (let i = 0; i < availableDates.length; i++) {
          const arrDate = availableDates[i].available_dates.map((dateNew) => dayjs(dateNew).format('YYYY-MM-DD'));
          availableDates[i].available_dates = arrDate;
          newAvailableDates.push(availableDates[i]);
        }
        if (date) {
          const availableDatesOne = availableDates.filter((item) => item.available_dates.includes(date));
          const newNewAvailableDates = [];
          for (let i = 0; i < availableDatesOne.length; i++) {
            availableDatesOne[i].available_dates = date;
            newNewAvailableDates.push(availableDatesOne[i]);
          }
          return res.json(newNewAvailableDates);
        }
        return res.json(availableDates);
      }
      throw Error({ message: 'Данных нет' });
    } catch (error) {
      return res.status(400).json(error);
    }
  });

router
  .route('/booking')
  .post(async (req, res) => {
    const {
      content,
      city_iata,
      excursion_id,
      date,
      members,
      price,
      duration,
      photo,
      link,
      userName,
      phone,
      currency,
      activity_type,
      excursion_type,
    } = req.body;
    try {
      const bookingExcursion = await Booking.create(({
        content,
        city: city_iata,
        excursion_id,
        date,
        members: Number(members),
        price,
        duration,
        img_url: photo,
        link,
        full_name: userName,
        phone,
        currency,
        activity_type,
        excursion_type,
        user_id: req.session.user.id,
      }));
      const payload = {
        content,
        cityIATA: city_iata,
        excursion_id,
        date,
        members: Number(members),
        price,
        duration,
        img_url: photo,
        link,
        full_name: userName,
        phone,
        currency,
        activity_type,
        excursion_type,
        user_id: req.session.user.id,
        emailAddress: req.session.user.email,
        userName: req.session.user.username,
      };
      sendEmailExcursion(payload);
      if (bookingExcursion) {
        return res.sendStatus(200);
      }
      throw Error({ message: 'Данных нет' });
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router;
