import numeral from 'numeral';

if (numeral.locales.id === undefined) {
  numeral.register('locale', 'id', {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'ribu',
      million: 'juta',
      billion: 'miliar',
      trillion: 'triliun'
    },
    ordinal: function (number) {
      return number === 1 ? 'er' : 'ème';
    },
    currency: {
      symbol: 'Rp'
    }
  });
}

if (numeral.locale() !== 'id') {
  numeral.locale('id');
}

export function money(value: number): string {
  return numeral(value).format('$0,0');
}

export function thousand(value: number): string {
  return numeral(value).format('0,0');
}
