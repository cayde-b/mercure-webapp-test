import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(dayOfYear);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(updateLocale);

export const useDayjs = () => dayjs;
