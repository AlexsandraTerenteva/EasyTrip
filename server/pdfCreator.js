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
  // const pdfDoc = new PDFDocument();
  const pdfDoc = new PDFDocument({ size: 'A4', layout: 'landscape' });
  pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
  // pdfDoc.image('5.png', 0, 0, { width: pdfDoc.page.width, height: pdfDoc.page.height });
  pdfDoc.image('3a.png');
  pdfDoc.image(logo);
  // pdfDoc.image('easy3small.png', 165, 5);
  // pdfDoc.font('Times-Roman');
  pdfDoc.font('fonts/Roboto-Regular.ttf');
  pdfDoc.fontSize(20);
  pdfDoc.text(`Данные билета
asfas
fasdfsadf
sdfsadf
sdafasf
`, 165, 165);
  // pdfDoc.font('fonts/Roboto-Regular.ttf').fontSize(15).text('Привет', 50, 50);
  // pdfDoc.image('EasyTripLogo.png', 320, 280, { scale: 0.25 });
  pdfDoc.end();
}
/*
// const pdfDoc = new PDFDocument();
const pdfDoc = new PDFDocument({ size: 'A4', layout: 'landscape' });
pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
// pdfDoc.image('5.png', 0, 0, { width: pdfDoc.page.width, height: pdfDoc.page.height });
pdfDoc.image('3a.png');
pdfDoc.image(logo);
// pdfDoc.image('easy3small.png', 165, 5);
// pdfDoc.font('Times-Roman');
pdfDoc.font('fonts/Roboto-Regular.ttf');
pdfDoc.fontSize(20);
pdfDoc.text(`Данные билета
asfas
fasdfsadf
sdfsadf
sdafasf
`, 165, 165);
// pdfDoc.font('fonts/Roboto-Regular.ttf').fontSize(15).text('Привет', 50, 50);
// pdfDoc.image('EasyTripLogo.png', 320, 280, { scale: 0.25 });
pdfDoc.end();
*/
doIt();
