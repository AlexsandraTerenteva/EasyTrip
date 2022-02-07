/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const router = require('express').Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const dayjs = require('dayjs');
const updateLocale = require('dayjs/plugin/updateLocale');
const { City } = require('../../db/models');

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  monthsShort: [
    'Янв', 'Фе', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  months: [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ],
});

async function fetchImage(src) {
  const image = await axios
    .get(src, {
      responseType: 'arraybuffer',
    });
  return image.data;
}

async function sendEmailExcursion(payload) {
  const {
    content,
    cityIATA,
    excursion_id,
    date,
    members,
    price,
    duration,
    img_url,
    link,
    full_name,
    phone,
    currency,
    activity_type,
    excursion_type,
    user_id,
    emailAddress,
    userName,
  } = payload;

  const logo = await fetchImage(img_url);
  const cities = await City.findAll({
    attributes: ['code', 'name'],
    raw: true,
  });
  const cityName = cities.filter((element) => element.code === cityIATA)[0].name;
  console.log('cityName: ~~~~~~ ', cityName);
  const pdfDoc = new PDFDocument({ size: 'A4' });
  pdfDoc.pipe(fs.createWriteStream('excursion.pdf'));
  pdfDoc.image(logo);
  pdfDoc.font('fonts/Roboto-Regular.ttf');
  pdfDoc.fontSize(16);
  pdfDoc.text(`
  Данные вашего заказа:
  Название экскурсии: "${content}"
  Город: ${cityName}
  Тип экскурсии: ${excursion_type}
  Вид экскурсии: ${activity_type}
  Дата: ${dayjs(date).format('DD MMMM YYYY HH:mm')}
  Количество персон в заказе: ${members}
  Длительность экскурсии: ${duration}
  Стоимость: ${price} ${currency}
  Ваш контактный номер: ${phone}
  Сервис EasyTrip желает Вам приятного отдыха!`, { width: 410, align: 'justify' });
  pdfDoc.end();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'notificatorpetproject@gmail.com',
      pass: 'mebel12345%%%',
    },
  });
  transporter.sendMail({
    from: '"Уведомление от EasyTrip" <notificatorpetproject@gmail.com>',
    to: emailAddress,
    subject: `Ваш билет на экскурсию в городе ${cityName}! ✔`,
    text: `Дорогой(-ая) ${userName}!
    Поздравляем, Вы успешно забронировали билет на экскурсию "${content}" на портале EasyTrip!
    Данные вашего заказа:
    Название экскурсии: "${content}"
    Город: ${cityName}
    Тип экскурсии: ${excursion_type}
    Вид экскурсии: ${activity_type}
    Дата: ${dayjs(date).format('DD MMMM YYYY HH:mm')}
    Количество персон в заказе: ${members}
    Длительность экскурсии: ${duration}
    Стоимость: ${price} ${currency}
    Ваш контактный номер: ${phone}
    Приятного отдыха!`,
    attachments: [
      { // utf-8 string as an attachment
        filename: 'excursion.pdf',
        path: './excursion.pdf',
        contentType: 'application/pdf',
      }],
    function(err, info) {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    },
  });
  console.log('email with excursion info sent successfully!!');
}

module.exports = sendEmailExcursion;

/*
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
*/
