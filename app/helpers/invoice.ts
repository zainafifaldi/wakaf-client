import { Invoice } from 'interfaces/invoice';


export function stateLabel(state: string): string {
  return {
    pending: 'Menunggu pembayaran',
    paid: 'Menunggu verifikasi',
    finished: 'Selesai',
    rejected: 'Ditolak',
    canceled: 'Dibatalkan',
    expired: 'Kedaluwarsa',
  }[state] || state;
}

export function paymentMethod(invoice: Invoice) {
  const method = {
    bank_transfer: 'Transfer Bank',
  }[invoice.payment_method] || invoice.payment_method;

  return `${method} ${invoice.payment_detail.name}`;
}
