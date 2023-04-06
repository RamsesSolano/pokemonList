import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Pokemon } from '../model/pokemon';


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private apiPath: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon';

  pokemonInformation: Pokemon = {
    id: -1,
    name: '',
    image: '',
    attack: 0,
    defense: 0, 
    hp: 0, 
    type: '', 
    idAuthor: 1
  }

  private eventPokemon: BehaviorSubject<Pokemon> = new BehaviorSubject<Pokemon>(this.pokemonInformation);
  public addPokemonStatus = this.eventPokemon.asObservable();

  constructor( private _http: HttpClient ){

  }

  getApiPath(){
    return this.apiPath;
  }

  detectEventPokemon( pokemon: Pokemon ){
    return this.eventPokemon.next( pokemon ); 
  }

  async getAllPokemons(): Promise<Pokemon[]> {
    const response$ = this._http.get<Pokemon[]>(this.apiPath + '/?idAuthor=1' );
    return await lastValueFrom<Pokemon[]>( response$ );
  }

  async getPokemonById( pokemonId: number ): Promise<Pokemon>{
    const response$ = this._http.get<Pokemon>(`${this.apiPath}/${pokemonId}` );
    return await lastValueFrom<Pokemon>( response$ )
  }

  async updatePokemon( pokemon: Pokemon ): Promise<Pokemon>{
    const response$ = this._http.put<Pokemon>( `${this.apiPath}/${pokemon.id}`, pokemon );
    return await lastValueFrom<Pokemon>( response$ );
  }

  async createPokemon( pokemon: Pokemon ): Promise<Pokemon>{
    const response$ = this._http.post<Pokemon>( `${this.apiPath}/`, pokemon );
    return await lastValueFrom<Pokemon>( response$ );
  }

  async deletePokemon( pokemon: Pokemon ): Promise<Pokemon>{
    const response$ = this._http.delete<Pokemon>( `${this.apiPath}/${ pokemon.id }` );
    return await lastValueFrom<Pokemon>( response$ );
  }

}
