import About from '../About';
import HoUnits from '../HoUnits';
import Memorial from '../Memorial';
import Reminder from '../Reminder';

interface page {
  name: string;
  title: string;
  screen: any;
}

export const pages: page[] = [
  { name: 'HoUnits', title: '单位换算', screen: HoUnits },
  { name: 'Reminder', title: '提醒', screen: Reminder },
  { name: 'Memorial', title: '纪念日', screen: Memorial },
  { name: '', title: '', screen: null },
  { name: 'About', title: '关于', screen: About },
];
