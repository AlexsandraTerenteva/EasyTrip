import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const calcAT = (date, minutes, tzOrig, tzDest) => {
  const newDate = new Date(date);
  const tz = tzDest[0].offset.gmt; // tzDest[0].offset.gmt
  const locTimeDiffUTC = newDate.getTimezoneOffset(); // localTimeDiffToUTC
  const addMinDate = new Date(newDate.getTime() + (minutes * 60000));
  const arrivalDate = new Date(addMinDate.getTime() + (locTimeDiffUTC * 60000) + (tz * 60 * 60000));
  return arrivalDate;
};

export default calcAT;
