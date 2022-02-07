const fs = require('fs');
const PDFDocument = require('pdfkit-table');

// const airline = '';
const username = 'Катя';
const airlineName = 'Победа';
const originCity = 'Москва';
const flightNumber = '931';
const originAirport = 'SVE';
const departureAtDate = 'понедельник 22.01.2022 г.';
const departureAtTime = '6 ч 50 мин';
const destinationCity = 'Лондон';
const destinationAirport = 'PAR';
const price = '6565 р';

const doc = new PDFDocument({ margin: 30, size: 'A4' });
doc.font('fonts/Roboto-Regular.ttf');

// file name
doc.pipe(fs.createWriteStream('./file-table.pdf'));

doc.image('easy3small.png');
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
    description: `${username}`, name: 'Имя', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${airlineName}`, name: 'Авиалинии', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${originCity}`, name: 'Откуда', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${flightNumber}`, name: 'Номер рейса', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${originAirport}`, name: 'Аэропорт вылета', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${departureAtDate}`, name: 'Дата вылета', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${departureAtTime}`, name: 'Время вылета', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${destinationCity}`, name: 'Куда', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${destinationAirport}`, name: 'Аэропорт прилета', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  {
    description: `${price}`, name: 'Стоимость', options: { backgroundColor: '#87CEEB', backgroundOpacity: 0.5 },
  },
  ],
  // rows: [[

  // ],
  // [

  // ]],
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
doc.image('airplane.png', 85, 280, { scale: 0.5 });
// doc.image('airplane.png');
// done!
doc.end();
