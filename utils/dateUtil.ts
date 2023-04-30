import dayjs from 'dayjs';

interface IDay {
  (nowDays: dayjs.Dayjs, timestamDayjs: dayjs.Dayjs): string;
}
interface IpadWithZeros {
  (number: number, length: number): string;
}

const padWithZeros: IpadWithZeros = (number, length) => {
  const numberString = number.toString();
  if (numberString.length >= length) return numberString;
  return '0'.repeat(length - numberString.length) + numberString;
};

const getRemainingSeconds: IDay = (nowDayjs, timestamDayjs) => {
  const seconds = timestamDayjs.diff(nowDayjs, 'second') % 60;
  return padWithZeros(seconds, 2);
};
const getRemainingMinutes: IDay = (nowDayjs, timestamDayjs) => {
  const minutes = timestamDayjs.diff(nowDayjs, 'minute') % 60;
  return padWithZeros(minutes, 2);
};
const getRemainingHours: IDay = (nowDayjs, timestamDayjs) => {
  const hours = timestamDayjs.diff(nowDayjs, 'hour') % 60;
  return padWithZeros(hours, 2);
};

const getRemainingDays: IDay = (nowDayjs, timestamDayjs) => {
  const days = timestamDayjs.diff(nowDayjs, 'day');
  return days.toString();
};

const calcaulateDiff = (timeInMs: number) => {
  const timestamDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();

  if (nowDayjs.isBefore(nowDayjs)) {
    return {
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00',
    };
  }

  return {
    seconds: getRemainingSeconds(nowDayjs, timestamDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestamDayjs),
    hours: getRemainingHours(nowDayjs, timestamDayjs),
    days: getRemainingDays(nowDayjs, timestamDayjs),
  };
};

export default calcaulateDiff;
