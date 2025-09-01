import '@angular/localize/init';
import {
  ChangeDetectionStrategy,
  Component,
  importProvidersFrom,
  VERSION,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { VERSION as CDK_VERSION } from '@angular/cdk';
import {
  VERSION as MAT_VERSION,
  MatNativeDateModule,
} from '@angular/material/core';
import {
  provideRouter,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { routes } from './routes';
import { JsonPipe } from '@angular/common';
import { inject } from '@angular/core';
import { NameStore } from './library-stuff/example-signal-store.store';

/* eslint-disable no-console */
console.info('Angular CDK version', CDK_VERSION.full);
console.info('Angular Material version', MAT_VERSION.full);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, JsonPipe],
  template: `
    <section id="navigation">
        <a [routerLink]="['/']">Home</a>
        <a [routerLink]="['/ngrx-signal-store']">Signal Store</a>
    </section>

    <section id="about-this-starter">
      <p>This is Michael Small's template starter Stackblitz project for Angular. May be using experimental features and versions.</p>
      <p>Includes libraries</p>
      <ul>
        <li><a href="https://material.angular.io/" target="_blank">Angular Material + CDK</a></li>
        <li><a href="https://ngxtension.netlify.app/getting-started/introduction/" target="_blank">ngxtension</a></li>
        <li><a href="https://ngrx.io/guide/signals" target="_blank">ngrx/signals</a> + <a href="https://github.com/angular-architects/ngrx-toolkit" target="_blank">ngrx-toolkit</a></li> 
      </ul>
    </section>

    <router-outlet />

    <section id="app-info">
      <p>Current URL: {{router.url | json}}</p>
      <p>Current build: {{angularVersion.full | json}}</p>
    </section>
  `,
  styles: `
    #app-info { 
      padding: 4px;
      margin-top: 2rem; 
      border: 1px dotted black; 
      p {
        margin: 0;
      }
    }
    #navigation {
      display: flex;
      flex-direction: row;
      gap: 4px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  router = inject(Router);
  angularVersion = VERSION;

  ngOnInit() {
    this.router.navigate(['/']);
  }
}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
