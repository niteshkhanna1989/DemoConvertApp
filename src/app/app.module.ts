import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  PokemonDetailComponent,
  HolderComponent,
} from './pokemon/pokemon-detail.component';
import {
  PokemonListComponent,
  CanClickPipe,
  PaganatePipe,
} from './pokemon/pokemon-list.component';
import { PokeBoxComponent } from './pokemon/pokebox.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailComponent,
    HolderComponent,
    PokemonListComponent,
    CanClickPipe,
    PaganatePipe,
    PokeBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
