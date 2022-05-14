import dayjs from 'dayjs';

import 'dayjs/locale/id';

dayjs.locale('id');

export function dateTime(value: Date | number): string {
  return dayjs(value).format('D MMMM YYYY HH:mm');
}

export function shortDate(value: Date | number): string {
  return dayjs(value).format('D MMM YYYY');
}