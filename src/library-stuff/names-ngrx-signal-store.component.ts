import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NameStore } from './example-signal-store.store';

@Component({
  selector: 'app-names-ngrx-signal-store',
  imports: [],
  template: `
    <p>
      names-ngrx-signal-store works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NameStore],
})
export class NamesNgrxSignalStoreComponent {
  nameStore = inject(NameStore);

  ngOnInit() {
    this.nameStore.updateFirstName('Michael');
  }
}
