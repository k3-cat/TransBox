import React, { Fragment } from 'react';

import About from '../About';
import HoUnits from '../HoUnits';
import Memorial from '../Memorial';
import Reminder from '../Reminder';

interface screen {
  name: string;
  title: string;
  comp: React.ComponentType<any>;
}

export const screens: screen[] = [
  { name: 'HoUnits', title: '单位换算', comp: HoUnits },
  { name: 'Reminder', title: '提醒', comp: Reminder },
  { name: 'Memorial', title: '纪念日', comp: Memorial },
  { name: '', title: '', comp: Fragment },
  { name: 'About', title: '关于', comp: About },
];
