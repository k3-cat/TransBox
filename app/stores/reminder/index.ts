import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { PeriodicallyEventStore } from './periodically';

export const ReminderStore = types
  .model({
    adding: false,
    index: NaN,
    // store
    events: types.array(PeriodicallyEventStore),
  })

  .actions((self) => ({
    add() {
      self.adding = true;
    },

    edit(i: number) {
      self.index = i;
    },

    flush(n: string, d: Date, p: number, o: number, isHide: boolean, isNotif: boolean) {
      if (self.adding) {
        let e = PeriodicallyEventStore.create({
          name: n,
          nextDate: d,
          period: p,
          offset: o,
          isHide: isHide,
        });

        if (isNotif) {
          e.createNotif();
        }

        self.events.push(e);
        self.adding = false;

      } else {
        let e = self.events[self.index];
        e.name = n;
        e.period = p;
        e.offset = o;
        e.isHide = isHide;

        if (p === 1) {
          let tmp = new Date();
          tmp.setHours(d.getHours(), d.getMinutes(), 0, 0);
          e.nextDate = tmp;
        } else {
          e.nextDate = d;
        }

        if (isNotif) {
          e.createNotif();
        } else {
          e.cancelNotif();
        }

        self.index = NaN;
      }
    },

    remove() {
      self.events[self.index].cancelNotif();
      self.events.splice(self.index, 1);
      self.index = NaN;
    },

    refreshAll() {
      for (let e of self.events) {
        e.updateDate();
      }
    },
  }))

  .extend(withStorage({ key: 'reminder', mode: 'inclusive', 'names': ['events'] }));

export function loadReminderStore() {
  const store = ReminderStore.create();
  store.load();
  return store;
}
