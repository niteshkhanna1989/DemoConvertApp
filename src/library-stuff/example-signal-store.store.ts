import { computed, effect } from '@angular/core';
import {
  getState,
  patchState,
  signalStore,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

type ExampleState = {
  firstName: string;
  lastName: string;
};
const initialState: ExampleState = { firstName: '', lastName: '' };

export const NameStore = signalStore(
  withState(initialState),
  // signalStoreFeature defined below
  withLogger('names'),
  withMethods((store) => ({
    updateFirstName(newName: string): void {
      patchState(store, () => ({ firstName: newName }));
    },
  })),
  withComputed(({ firstName, lastName }) => ({
    fullName: computed(() => {
      return `${firstName()} ${lastName()}`;
    }),
  })),
  // ngrx-toolkit
  withStorageSync({ key: 'names', storage: () => localStorage })
);

export function withLogger(name: string) {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        effect(() => {
          const state = getState(store);
          console.log(`${name} state changed`, state);
        });
      },
    })
  );
}
