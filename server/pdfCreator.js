const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');

async function fetchImage(src) {
  const image = await axios
    .get(src, {
      responseType: 'arraybuffer',
    });
  return image.data;
}

async function doIt() {
  const logo = await fetchImage('https://weatlas.com/images/excursions/11979/list_0327317001522336821.jpeg');
  const pdfDoc = new PDFDocument({ size: 'A4', layout: 'landscape' });
  pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
  pdfDoc.image('3a.png');
  pdfDoc.image(logo);
  pdfDoc.font('fonts/Roboto-Regular.ttf');
  pdfDoc.fontSize(20);
  pdfDoc.text(`Данные билета
asfas
fasdfsadf
sdfsadf
sdafasf
`, 165, 165);
  pdfDoc.end();
}

doIt();
