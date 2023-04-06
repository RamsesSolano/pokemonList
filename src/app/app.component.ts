import { Component } from '@angular/core';
import { Pokemon } from './model/pokemon';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-list';

  showAddSection: boolean = false;

  constructor( 
    private pokemonService: PokemonService
  ){
    this.pokemonService.addPokemonStatus.subscribe( ( pokemon: Pokemon ) => {

      if( pokemon.id !== null  && pokemon.id !== undefined )
        this.showAddPokemonSection(pokemon.id);

    });
  }

  showAddPokemonSection( pokemonId: number ){
    if( pokemonId !== -1 ){
      this.showAddSection = true;
    } else {
      this.showAddSection = false;
    }
  }


}
