import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { YearlyEventStore } from './yearly';

export const MemorialStore = types
  .model({
    adding: false,
    index: NaN,
    //store
    events: types.array(YearlyEventStore),
  })

  .actions((self) => ({
    add() {
      self.adding = true;
    },

    edit(i: number) {
      self.index = i;
    },

    flush(n: string, d: Date, o: number, h: number, isHide: boolean, isInAppNotif: boolean, isNotif: boolean) {
      if (self.adding) {
        let e = YearlyEventStore.create({
          name: n,
          baseDate: d,
          offset: o,
          hours: h,
          isHide: isHide,
          isInAppNotif: isInAppNotif,
        });
        if (isInAppNotif && isNotif) {
          e.createNotif();
        }
        self.events.push(e);
        self.adding = false;

      } else {
        let e = self.events[self.index];
        e.name = n;
        e.baseDate = d;
        e.offset = o;
        e.hours = h;
        e.isHide = isHide;
        e.isInAppNotif = isInAppNotif;

        if (isInAppNotif && isNotif) {
          e.createNotif();
        } else {
          e.cancelNotif();
        }
        self.index = NaN;
      }
    },

    remove() {
      // self.events[self.index].cancelNotif();
      self.events.splice(self.index, 1);
      self.index = NaN;
    },
  }))

  .extend(withStorage({ key: 'memorial', mode: 'inclusive', 'names': ['events'] }));
