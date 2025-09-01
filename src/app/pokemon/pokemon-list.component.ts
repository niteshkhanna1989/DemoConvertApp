import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

import { Pokemon } from './pokemon.model';
import { PokemonService } from './pokemon-service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pk-items',
  // templateUrl: 'pokemon-list.component.html'
  standalone: false,

  template: `<h1 *ngIf="!(pokemon | async)">Loading...</h1>
  Gotta catchem all
  <ng-template #defaultList let-pokemonList="pokemonList">
    <div *ngIf="pokemonList?.length; else noPokemon">
      <ul class="list-view">
        <li *ngFor="let item of pokemonList | paganate: { itemsPerPage: 10, currentPage: page }; index as i;">
          <!--Calling method in tehmaplte is Bad-->
          <!-- <a [class.disabled]="canClick(item)" [routerLink]="['/details', item.id]">  -->
          <!-- Using a Pipe is good and better -->
          <a [class.disabled]="item | canClick" [routerLink]="['/details', item.id]">
            <img src="{{ item.image() }}">
            <span>{{ item.formattedName() }}</span>
          </a>
        </li>
      </ul>
    </div>
  </ng-template>
  <ng-template #noPokemon>Got none</ng-template>
  <div>
     <button (click)="prev()"> < </button> {{ page }} <button (click)="next()"> > </button>
  </div>
  <ng-container *ngTemplateOutlet="defaultList; context:{ pokemonList: (pokemon | async) }"></ng-container>
 `,
})
export class PokemonListComponent implements OnInit {
  pokemon: Observable<Pokemon[]>;
  page = 1;
  constructor(private pokemonService: PokemonService) {}

  next() {
    this.page++;
  }

  prev() {
    this.page--;
  }

  ngOnInit(): void {
    this.pokemon = this.pokemonService.pokemon$;
    this.pokemonService.list$().pipe(take(1)).subscribe(); //;
  }
  canClick(pokemon) {
    console.count(`Can Click ${pokemon.name} [Function]`);
    return pokemon.id === 1;
  }
}

@Pipe({
  name: 'canClick',
  standalone: false,
})
export class CanClickPipe implements PipeTransform {
  transform(pokemon: any, ...args: any[]) {
    console.count(`Can Click ${pokemon.name} [Pipe]`);
    return pokemon.id === 1;
  }
}

@Pipe({
  name: 'paganate',
  standalone: false,
})
export class PaganatePipe {
  transform(value, args) {
    const { itemsPerPage, currentPage, search = '' } = args;
    console.log(args);
    let filteredArr =
      value?.filter((item) => {
        return `${item?.name}`
          .toLowerCase()
          .includes(search?.toLowerCase() ?? '');
      }) ?? [];
    const batch = itemsPerPage * (currentPage - 1);
    return filteredArr.slice(batch, batch + itemsPerPage);
  }
}
