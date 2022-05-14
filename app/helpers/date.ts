import dayjs from 'dayjs';

import 'dayjs/locale/id';

dayjs.locale('id');

export function dateTime(value: Date | number | string): string {
  return dayjs(value).format('D MMMM YYYY HH:mm');
}

export function fullDate(value: Date | number | string): string {
  return dayjs(value).format('dddd, D MMMM YYYY HH:mm');
}

export function shortDate(value: Date | number | string): string {
  return dayjs(value).format('D MMM YYYY');
}
