import moment from 'moment';

const getDefaultDateString = (date: string) => moment(date).format('MM-DD hh:mm');


export { getDefaultDateString };
