import dayjs from 'dayjs';

export default function transformDate(dateToFormate, format) {
  return dayjs(dateToFormate).format(format);
}
