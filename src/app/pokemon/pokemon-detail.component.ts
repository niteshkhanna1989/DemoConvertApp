import { Component, Input, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from './pokemon.model';
import { PokemonService } from './pokemon-service';
import { tap, map, switchMap, startWith } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';

@Component({
  selector: 'pk-details',
  //templateUrl: "pokemon-detail.component.html",
  // <ng-container *ngIf="pokemon$ | async as pokemon; else loading">
  // <ng-container *ngIf="pokemonB as pokemon; else loading">
  standalone: false,

  template: `
  <ng-container *ngIf="pokemon$() as pokemon; else loading">
  <h1>{{ pokemon?.formattedName() || 'Loading...' }} <button (click)="catchPokemon(pokemon)">Catch</button></h1>

  <div *ngIf="pokemon?.name" class="details-container">
    <img src="{{ pokemon?.image() }}">
  
    <h4>Types:</h4>
    <ul>
      <li *ngFor="let type of pokemon?.types">
        {{ type }}
      </li>
    </ul>
  value {{pokemon?.value}}
    <h4>Stats:</h4>
    <ul>
      <li *ngFor="let stat of pokemon?.stats">
        {{ stat.name }}: {{ stat.value }}
        <!-- {{getStat(stat)}} -->
      </li>
    </ul>
  </div> </ng-container>
  <ng-template #loading>'Loading...'</ng-template>
  `,
})
export class PokemonDetailComponent implements OnInit {
  pokemon$ = signal(null);
  refresh$ = new Subject<boolean>();
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    const id$: Observable<number> = this.route.params.pipe(
      map((params) => params['id'])
    );
    const reload = this.refresh$.asObservable().pipe(startWith(false));
    const data$ = combineLatest([id$, reload]).pipe(map(([id, refresh]) => id));

    const pokemon$ = data$
      .pipe(
        switchMap((id) => this.pokemonService.get(id)),
        this.addName,
        tap((p) => console.log(`Got details of ${p.formattedName()}`, p)),
        tap((pokemon) => this.pokemon$.set(pokemon))
      )
      .subscribe();
  }

  public catchPokemon(pokemon) {
    this.pokemonService.catchPokemon(pokemon);
  }

  public refreshPage() {
    this.refresh$.next(true);
  }

  addName(obs: Observable<Pokemon>) {
    return obs.pipe(
      map((p) => {
        (p as SaulPokemon).value = ' Saul';
        p.name += '- ***';
        return p as SaulPokemon;
      })
    );
  }

  getStat(stat) {
    console.count(stat?.name);
    return `${stat.name}: ${stat.value}`;
  }
}

type SaulPokemon = Pokemon & { value: any };

@Component({
  selector: 'my-holder',
  standalone: false,

  template: `
  <div class="holder"> {{Title}}
    <div class="holder-header">
      <ng-content select="[holder-header-content]"></ng-content>
    </div>
    <div class="holder-body">
      <ng-content select="[holder-header-body]"></ng-content>
    </div>
  </div>
  `,
})
export class HolderComponent {
  @Input() Title: string = '';
}
