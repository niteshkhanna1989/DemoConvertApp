import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-default-page',
  imports: [],
  template: `
    <p>
      default-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent {}
