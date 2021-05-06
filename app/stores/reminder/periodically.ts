import addDays from 'date-fns/addDays';
import differenceInDays from 'date-fns/differenceInDays';
import { Instance, types } from 'mobx-state-tree';
import { clock } from './../../globals';

export const PeriodicallyEventStore = types
  .model('PeriodicallyEventStore', {
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
      d.setHours(self.nextDate.getHours(), self.nextDate.getMinutes(), 0, 0);
      self.nextDate = d;
    },
    setTime(t: Date) {
      t.setFullYear(self.nextDate.getFullYear(), self.nextDate.getMonth(), self.nextDate.getDate());
      self.nextDate = t;
    },

    updateDate() {
      if (clock.getTime() - self.nextDate.getTime() < 3600000) {
        return false;
      }
      const diff = differenceInDays(clock.getDate(), self.nextDate); // DST safe
      self.nextDate = addDays(self.nextDate, self.period * Math.floor(1 + diff / self.period)); // round up | at least one period
      return true;
    },
  }));

export interface IPeriodicallyEventStore extends Instance<typeof PeriodicallyEventStore> { }
