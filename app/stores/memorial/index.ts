import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { YearlyEventStore } from './yearly';

export const MemorialStore = types
  .model({
    adding: false,
    t: types.safeReference(YearlyEventStore),
    //stores
    events: types.array(YearlyEventStore),
    notifs: types.map(types.string),
  })

  .preProcessSnapshot((s) => {
    if (s.events === undefined || 'id' in s.events[0]) { return s; }
    return {
      events: s.events.map((o: any) =>
        YearlyEventStore.create({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),

          name: o.name,
          baseDate: o.baseDate,
          offset: o.offset,
          hours: o.hours,
          isHide: o.isHide,
          inAppNotif: o.isInAppNotif,
        })
      ),
    };
  })

  .actions((self) => ({
    add() {
      self.adding = true;
      const e = YearlyEventStore.create({
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),

        name: '',
        baseDate: new Date(),
        offset: 0,
        hours: 0,
        isHide: true,
        inAppNotif: true,
      });
      self.adding = true;
      self.events.push(e);
      self.t = e.id as any;
    },

    edit(i: number) {
      self.t = self.events[i].id as any;
    },

    flush(isNotif: boolean) {
      if (self.t!.inAppNotif && isNotif) {
        this.createNotif();
      } else {
        this.cancelNotif(self.t!.id);
      }

      self.t = undefined;
      self.adding = false;
    },

    sort(from: number, to: number) {
      if (from === to) { return; }
      const tmp = self.events.slice();
      tmp.splice(to, 0, ...tmp.splice(from, 1));
      self.events.replace(tmp);
    },

    remove(i: number) {
      this.cancelNotif(self.events[i].id);
      self.events.splice(i, 1);
    },

    cancelNotif(id: string) { },
    createNotif() { },
  }))

  .extend(withStorage({ key: 'memorial', autoSave: false, mode: 'inclusive', 'names': ['events', 'notifs'] }));

export function loadMemorialStore() {
  const store = MemorialStore.create();
  store.load();
  return store;
}
