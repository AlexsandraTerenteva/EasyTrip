import dayjs from 'dayjs';

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
  weekdays: [
    'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница',
    'суббота',
  ],
});

export default function transformDateRus(dateToFormate, format) {
  return dayjs(dateToFormate).format(format);
}
