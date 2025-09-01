import { Component, OnInit, signal } from '@angular/core';
import { PokemonService, TrainerAction } from './pokemon-service';
import { Pokemon } from './pokemon.model';
import { filter, Observable, tap } from 'rxjs';

@Component({
  selector: 'pk-box',
  standalone: false,

  template: `
  <!-- <h1 *ngIf="!pokemon">Loading...</h1> -->
  <ng-template #defaultList let-pokemonList="pokemonList">
    <div *ngIf="pokemonList?.length; else noPokemon">
      <ul class="list-view">
        <li *ngFor="let item of pokemonList; index as i;">
         <ng-container>
            <button (click)="release(i)">-</button>
            <img src="{{ item.image() }}">
            <span>{{ item.formattedName() }}</span>
        </ng-container>
        </li>
      </ul>
    </div>
  </ng-template>
  <ng-template #noPokemon>Got none</ng-template>
  
  <ng-container *ngTemplateOutlet="defaultList; context:{ pokemonList: myPokeBelt() }"></ng-container>
 `,
})
export class PokeBoxComponent implements OnInit {
  constructor(private pokeservice: PokemonService) {}
  myPokeBelt = signal<Pokemon[]>([]);

  ngOnInit(): void {
    const handleCatch = () => (event$: Observable<TrainerAction>) =>
      event$.pipe(
        filter((evt) => evt.type == 'catch'),
        tap(
          (evt) => this.myPokeBelt.update((values) => [...values, evt.data]),
          tap((evt: TrainerAction) =>
            alert(`You caught a ${evt.data.formattedName()}!`)
          )
        )
      );
    this.pokeservice.trainerEvents$.pipe(handleCatch()).subscribe();
  }

  release(pokemon) {
    console.log(pokemon);
    this.myPokeBelt.update((poke) => {
      poke.splice(pokemon, 1);
      return poke;
    });
  }
}
