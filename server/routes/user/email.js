/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const router = require('express').Router();
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const dayjs = require('dayjs');
const updateLocale = require('dayjs/plugin/updateLocale');

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
// /user/sendticketbyemail
router
  .route('/')
  .get(async (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'notificatorpetproject@gmail.com',
        pass: 'mebel12345%%%',
      },
    });
    transporter.sendMail({
      from: '"Уведомление от мастера" <mebelmebel545@gmail.com>',
      to: 'ekaterina.tugutova@gmail.com',
      subject: `Отчет по заказу №${req.params.order} отправлен! ✔`,
      text: `Отчет по заказу №${req.params.order} отправлен!`,
    });
    res.json(200);
  })
  .post(async (req, res) => {
    // Прилетел post-request по ручке /user/sendticketbyemail!
    const { userTicket } = req.body;
    const { auth } = req.body;
    let emailAddress;
    if (auth.email === req.session.user.email) {
      emailAddress = auth.email;
    } else {
      console.log('ERROR: auth.email !== req.session.user.email');
    }

    const {
      airline,
      airlineName,
      departure_at,
      destination,
      destinationCity,
      duration,
      flight_number,
      link,
      origin,
      originCity,
      price,
      transfers,
    } = userTicket;
    const departureAt = userTicket.departure_at;
    const originAirport = userTicket.origin_airport;
    const destinationAirport = userTicket.destination_airport;

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    doc.font('fonts/Roboto-Regular.ttf');

    // file name
    doc.pipe(fs.createWriteStream('./pdf/ticket.pdf'));

    doc.image('img/easy3small.png');
    // table
    const table = {
      title: '',
      headers: [{
        label: 'Данные билета', property: 'name', width: 250, renderer: null, headerColor: '#4682B4', headerOpacity: '1',
      },
      {
        label: '', property: 'description', width: 250, renderer: null, headerColor: '#4682B4', headerOpacity: '1',
      },
      ],
      datas: [{
        description: `${auth.username}`, name: 'Имя', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      {
        description: `${dayjs(departureAt).format('DD MMMM YYYY HH:mm')}`, name: 'Вылет', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      {
        description: `${userTicket.originCity}`, name: 'Откуда', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      {
        description: `${originAirport}`, name: 'Аэропорт вылета', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      {
        description: `${userTicket.destinationCity}`, name: 'Куда', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      {
        description: `${destinationAirport}`, name: 'Аэропорт прилета', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      {
        description: `${userTicket.airlineName}`, name: 'Авиалинии', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      {
        description: `${userTicket.flight_number}`, name: 'Номер рейса', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      {
        description: `${userTicket.price} руб.`, name: 'Стоимость', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
      },
      ],
    };
    // options
    const options = {};
    // callback
    const callback = () => {};
    // the magic

    doc.table(table, {
      prepareHeader: () => doc.font('fonts/Roboto-Regular.ttf').fontSize(12),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font('fonts/Roboto-Regular.ttf').fontSize(10);
        // indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
      },
    }); // is a Promise to async/await function
    doc.image('img/airplane.png', 85, 280, { scale: 0.5 });
    // doc.image('airplane.png');
    // done!
    doc.end();

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
      subject: `Ваш билет в город ${destinationCity}! ✔`,
      text: `Дорогой(-ая) ${auth.username}!
  Поздравляем, Вы успешно приобрели билет на портале EasyTrip!
  Данные вашего билета:
  ${originCity}(${originAirport}) - ${destinationCity}(${destinationAirport})
  Дата вылета: ${departureAt}
  Авиакомпания: ${airlineName}
  Рейс: ${userTicket.flight_number}
  Стоимость билета: ${price} руб.
      
  Вы всегда можете получить актуальную информацию у нашего телеграм-бота: https://t.me/easytripmessagebot

  Желаем Вам приятного полета!`,
      attachments: [
        { // utf-8 string as an attachment
          filename: 'ticket.pdf',
          path: './pdf/ticket.pdf',
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
    console.log('email sent successfully!!');
    res.json(200);
  });

module.exports = router;
