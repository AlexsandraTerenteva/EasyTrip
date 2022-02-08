/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const router = require('express').Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const PDFDocument = require('pdfkit-table');
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
  const pdfDoc = new PDFDocument({ margin: 30, size: 'A4' });
  pdfDoc.font('fonts/Roboto-Regular.ttf');

  // file name
  // pdfDoc.pipe(fs.createWriteStream('./file-table.pdf'));
  pdfDoc.pipe(fs.createWriteStream('pdf/excursion.pdf'));
  pdfDoc.image('img/easy3small.png');
  pdfDoc.image(logo);
  pdfDoc.fontSize(16);

  const table = {
    title: '',
    headers: [{
      label: 'Данные заказа', property: 'name', width: 250, renderer: null, headerColor: '#00CED1', headerOpacity: '1',
    },
    {
      label: `${content}`, property: 'description', width: 250, renderer: null, headerColor: '#00CED1', headerOpacity: '1',
    },
    ],
    datas: [{
      description: `${cityName}`, name: 'Город', options: { backgroundColor: '#7FFFD4', backgroundOpacity: 0.5 },
    },
    {
      description: `${excursion_type}`, name: 'Тип экскурсии', options: { backgroundColor: '#7FFFD4', backgroundOpacity: 0.5 },
    },
    {
      description: `${activity_type}`, name: 'Вид экскурсии', options: { backgroundColor: '#7FFFD4', backgroundOpacity: 0.5 },
    },
    {
      description: `${dayjs(date).format('DD MMMM YYYY HH:mm')}`, name: 'Дата', options: { backgroundColor: '#7FFFD4', backgroundOpacity: 0.5 },
    },
    {
      description: `${members}`, name: 'Количество персон в заказе', options: { backgroundColor: '#7FFFD4', backgroundOpacity: 0.5 },
    },
    {
      description: `${duration}`, name: 'Длительность экскурсии', options: { backgroundColor: '#7FFFD4', backgroundOpacity: 0.5 },
    },
    {
      description: `${price + currency}`, name: 'Стоимость', options: { backgroundColor: '#7FFFD4', backgroundOpacity: 0.5 },
    },
    ],
  };
  // options
  const options = {};
  // callback
  const callback = () => {};
  // the magic

  // Сервис EasyTrip желает Вам приятного отдыха!`, { width: 410, align: 'justify' });
  // pdfDoc.end();

  pdfDoc.table(table, {
    prepareHeader: () => pdfDoc.font('fonts/Roboto-Regular.ttf').fontSize(12),
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
      // indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
    },
  }); // is a Promise to async/await function
  pdfDoc.text(`
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

    Вы всегда можете получить актуальную информацию у нашего телеграм-бота: https://t.me/easytripmessagebot
    
    Приятного отдыха!`,
    attachments: [
      { // utf-8 string as an attachment
        filename: 'excursion.pdf',
        path: './pdf/excursion.pdf',
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
