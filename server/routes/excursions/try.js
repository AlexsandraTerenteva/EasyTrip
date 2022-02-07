/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const router = require('express').Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const dayjs = require('dayjs');
const updateLocale = require('dayjs/plugin/updateLocale');
const localeData = require('dayjs/plugin/localeData');
const { City } = require('../../db/models');

dayjs.extend(updateLocale);

dayjs.extend(localeData);
// dayjs.updateLocale('ru');

dayjs.updateLocale('en', {
  monthsShort: [
    'Янв', 'Фе', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  months: [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ],
  weekdays: [
    'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница',
    'суббота',
  ],
});

const date = '2022-01-20T18:37:49.584Z';
const tryyy = dayjs(date).format('DD MMMM YYYY HH:mm');
console.log(tryyy);
console.log(dayjs.weekdays());
