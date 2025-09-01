import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
// import { Http, Headers, Response } from '@angular/http';

import { Pokemon } from './pokemon.model';
export type TrainerAction = {
  type: 'catch' | 'release';
  data: Pokemon;
};

@Injectable({ providedIn: 'root' })
export class PokemonService {
  search = new BehaviorSubject('');
  private myPokemon: BehaviorSubject<Pokemon[]> = new BehaviorSubject<
    Pokemon[]
  >(null);
  pokemon$ = this.myPokemon.asObservable();

  private trainerEvents = new Subject<TrainerAction>();

  trainerEvents$ = this.trainerEvents.asObservable();

  constructor(private http: HttpClient) {}

  catchPokemon(pokemon) {
    this.trainerEvents.next({ type: 'catch', data: pokemon });
    // this.myPokeBelt().update([pokemon, ...this.myPokeBelt()]);
  }

  releasePokemon(pokemon) {
    this.trainerEvents.next({ type: 'release', data: pokemon });
  }

  // Don't use Promises
  // list() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   return this.http
  //     .get('https://pokeapi.co/api/v2/pokedex/2/', {
  //       headers: headers,
  //     })
  //     .pipe(map(res: Response) => {
  //       let data = res.json();
  //       let allPokemon = [];

  //       data.pokemon_entries.forEach((entry) => {
  //         let pokemon = new Pokemon();
  //         pokemon.name = entry.pokemon_species.name;
  //         pokemon.id = entry.entry_number;
  //         allPokemon.push(pokemon);
  //       });

  //       return allPokemon;
  //     })
  //     .catch(this.handleError);
  // }

  /**
   *
   *
   * Use Observables instead!
   */
  list$(): Observable<Pokemon[]> {
    if (this.myPokemon.getValue()) {
      return this.pokemon$;
    }
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.http
      .get('https://pokeapi.co/api/v2/pokedex/1/', HTTP_OPTIONS)
      .pipe(
        map((data: any) => {
          let allPokemon = [];
          data.pokemon_entries.forEach((entry) => {
            let pokemon = new Pokemon();
            pokemon.name = entry.pokemon_species.name;
            pokemon.id = entry.entry_number;
            allPokemon.push(pokemon);
          });
          return allPokemon;
        }),
        tap((pokemon) => this.myPokemon.next(pokemon)),
        switchMap((_) => this.pokemon$),
        shareReplay()
      )
      .subscribe();
    return this.pokemon$;
  }

  get(id: number) {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .get('https://pokeapi.co/api/v2/pokemon/' + id + '/', HTTP_OPTIONS)
      .pipe(
        map((data: any) => {
          let pokemon = new Pokemon();
          pokemon.name = data.name;
          pokemon.id = data.id;

          data.types.forEach((eachType) => {
            pokemon.types.push(eachType.type.name);
          });

          data.stats.forEach((eachStat) => {
            pokemon.stats.push({
              name: eachStat.stat.name,
              value: eachStat.base_stat,
            });
          });

          return pokemon;
        })
      );
  }

  // private handleError(error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Promise.reject(errMsg);
  // }
}
