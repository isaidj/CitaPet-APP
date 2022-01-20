import moment from 'moment';

export const formatearFecha = fecha => {
  moment.locale();
  return moment(fecha).format('LLLL a');
};
