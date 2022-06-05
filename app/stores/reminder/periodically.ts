import addDays from 'date-fns/addDays';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { Instance, types } from 'mobx-state-tree';

function createTrigger(nextDate: Date, period: number, offset: number) {
  let tmp = new Date(nextDate);
  tmp.setMinutes(tmp.getMinutes() - offset);

  if (period === 1) {
    return {
      hour: tmp.getHours(),
      minute: tmp.getMinutes(),
      repeats: true,
    };
  } else if (period === 7) {
    return {
      weekday: tmp.getDay(),
      hour: tmp.getHours(),
      minute: tmp.getMinutes(),
      repeats: true,
    };
  } else {
    return {
      date: tmp,
    };
  }
}

export const PeriodicallyEventStore = types
  .model({
    id: types.identifier,

    name: types.string,
    nextDate: types.Date, // year, month, day, hour, minuts
    period: types.integer, // in days
    offset: types.integer, // in minutes
    isHide: types.boolean,
    notifId: types.maybeNull(types.string),
  })

  .actions((self) => ({
    setName(n: string) { self.name = n.trim(); },
    setPeriod(p: number) { self.period = p; },
    setOffset(o: number) { self.offset = o; },
    setIsHide(v: boolean) { self.isHide = v; },
    setDate(d: Date) {
      let tmp = new Date(self.nextDate);
      tmp.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
      self.nextDate = tmp;
    },
    setTime(t: Date) {
      let tmp = new Date(self.nextDate);
      tmp.setHours(t.getHours(), t.getMinutes(), 0, 0);
      self.nextDate = tmp;
    },

    updateDate() {
      const now = new Date();
      if (differenceInMinutes(now, self.nextDate) < 60) {
        return;
      }
      const diff = differenceInDays(now, self.nextDate); // DST safe
      self.nextDate = addDays(self.nextDate, self.period * Math.floor(1 + diff / self.period)); // round up | at least one period
    },
  }));

export interface IPeriodicallyEventStore extends Instance<typeof PeriodicallyEventStore> { }
