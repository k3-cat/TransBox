import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';
import zhCN from 'date-fns/locale/zh-CN';
import zhTW from 'date-fns/locale/zh-TW';

export const timeLocal = new Map([
  ['en-US', enUS],
  ['zh-CN', zhCN],
  ['zh-TW', zhTW],
]);

export const hour12TimeF = new Map([
  ['en-US', (d: Date) => format(d, 'h:mm aaa', { locale: enUS })],
  ['zh-CN', (d: Date) => format(d, 'aaa h:mm', { locale: zhCN })],
]);

export const hour24TimeF = (d: Date) => format(d, 'HH:mm');

export const dateF = new Map([
  ['en-US', (d: Date) => format(d, 'EEE, dd-MMM', { locale: enUS })],
  ['zh-CN', (d: Date) => format(d, 'MMMdo EEE', { locale: zhCN })],
]);

export const fulldateF = new Map([
  ['en-US', (d: Date) => format(d, 'EEE, dd MMM yyyy', { locale: enUS })],
  ['zh-CN', (d: Date) => format(d, 'yyyy年MMMdo EEE', { locale: zhCN })],
]);
