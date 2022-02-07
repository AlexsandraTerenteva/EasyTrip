const fs = require('fs');
const PDFDocument = require('pdfkit-table');

const doc = new PDFDocument({ margin: 30, size: 'A4' });
doc.font('fonts/Roboto-Regular.ttf');

// file name
doc.pipe(fs.createWriteStream('./file-table.pdf'));

doc.image('easy3small.png');
// table
const table = {
  title: '',
  headers: [{
    label: 'ИМЯ', property: 'name', width: 60, renderer: null,
  },
  {
    label: 'Description', property: 'description', width: 150, renderer: null,
  },
  {
    label: 'Price 1', property: 'price1', width: 100, renderer: null,
  },
  {
    label: 'Price 2', property: 'price2', width: 100, renderer: null,
  },
  {
    label: 'Price 3', property: 'price3', width: 80, renderer: null,
  },
  {
    label: 'Price 3', property: 'price3', width: 80, renderer: null,
  }],
  datas: [{
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ', price1: '$1', price3: '$ 3', price2: '$2', price4: '4', name: 'Name 1',
  },
  {
    name: 'bold:Name 2', description: 'bold:Lorem ipsum dolor.', price1: 'bold:$1', price3: '$3', price2: '$2', price4: '4', options: { fontSize: 10, separation: true },
  },
  {
    name: 'Name 3', description: 'Lorem ipsum dolor.', price1: 'bold:$1', price4: '4.111111', price2: '$2', price3: { label: 'PRICE $3', options: { fontSize: 12 } },
  }],
  rows: [[
    'Apple',
    'Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.',
    '$ 105,99',
    '$ 105,99',
    '$ 105,99',
    '105.99',
  ],
  [
    'Tire',
    'Donec ac tincidunt nisi, sit amet tincidunt mauris. Fusce venenatis tristique quam, nec rhoncus eros volutpat nec. Donec fringilla ut lorem vitae maximus. Morbi ex erat, luctus eu nulla sit amet, facilisis porttitor mi.',
    '$ 105,99',
    '$ 105,99',
    '$ 105,99',
    '105.99',
  ]],
};
// options
const options = {};
// callback
const callback = () => {};
// the magic

doc.table(table, {
  prepareHeader: () => doc.font('fonts/Roboto-Regular.ttf').fontSize(8),
  prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
    doc.font('Helvetica').fontSize(8);
    // indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
  },
}); // is a Promise to async/await function

doc.image('airplane.png');
// done!
doc.end();
