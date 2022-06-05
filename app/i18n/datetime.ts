import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import enUS from 'date-fns/locale/en-US';
import zhCN from 'date-fns/locale/zh-CN';
import zhTW from 'date-fns/locale/zh-TW';

import { rootStore as R } from '../stores';

const timeLocal = new Map([
  ['en-US', enUS],
  ['zh-CN', zhCN],
  ['zh-TW', zhTW],
]);

const hour12TimeM = new Map([
  ['en-US', 'h:mm aaa'],
  ['zh-CN', 'aaa h:mm'],
]);

const hour24TimeF = (d: Date) => format(d, 'HH:mm');

const dateM = new Map([
  ['en-US', 'EEE, dd-MMM'],
  ['zh-CN', 'MMMdo EEE'],
]);

const fullDateM = new Map([
  ['en-US', 'EEE, dd MMM yyyy'],
  ['zh-CN', 'yyyy年MMMdo EEE'],
]);


// - - - - - - - - - - - - - - - -
const localCode = R.settings.timeLocalCode;
const local = timeLocal.get(localCode)!;

export const formatY = (d: Date) => format(d, fullDateM.get(localCode)!, { locale: local });
export const formatD = (d: Date) => format(d, dateM.get(localCode)!, { locale: local });
export const formatW = (d: Date) => format(d, 'EEE', { locale: local });
export const formatT = R.settings.hour24 ? hour24TimeF : (d: Date) => format(d, hour12TimeM.get(localCode)!, { locale: local });
export const formatDistance = (d: Date) => formatDistanceToNow(d, { includeSeconds: false, locale: timeLocal.get(R.settings.timeLocalCode)! });
