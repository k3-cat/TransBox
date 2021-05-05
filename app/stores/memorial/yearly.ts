import { Instance, types } from 'mobx-state-tree';

export const YearlyEventStore = types
  .model({
    id: types.identifier,

    name: types.string,
    baseDate: types.Date, // year, month, day
    offset: types.integer, // in days
    hours: types.integer,
    isHide: types.boolean,
    inAppNotif: types.boolean,
  })

  .views((self) => ({
    get daysCount() {
      return Math.floor((Date.now() - self.baseDate.getTime()) / 86400000);
    },

    get nextDate() {
      let tmp = new Date();
      tmp.setMonth(self.baseDate.getMonth(), self.baseDate.getDate());
      tmp.setHours(0, 0, 0, 0);
      return tmp;
    },
  }))

  .actions((self) => ({
    setName(n: string) { self.name = n.trim(); },
    setOffset(o: number) { self.offset = o; },
    setHours(h: number) { self.hours = h; },
    setIsHide(v: boolean) { self.isHide = v; },
    setIsInAppNotif(v: boolean) { self.inAppNotif = v; },
    setDate(d: Date) {
      let tmp = new Date(self.baseDate);
      tmp.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
      tmp.setHours(0, 0, 0, 0);
    },
  }));

export interface IYearlyEventStore extends Instance<typeof YearlyEventStore> { }
