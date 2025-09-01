import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

// Stackblitz does not infer importable packages until the are imported at least once
const importHack = [
  RouterModule,
  RouterOutlet,
  inject,
  JsonPipe,
  FormsModule,
  ReactiveFormsModule,
];
