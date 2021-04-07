import About from '../screens/About';
import HoUnits from '../screens/ho_units/Index';
import Lollipop from '../screens/Lollipop';
import Memorial from '../screens/memorial/Index';
import Reminder from '../screens/reminder/Index';

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
  { name: '-Lollipop', title: '棒棒糖~', screen: Lollipop },
];
