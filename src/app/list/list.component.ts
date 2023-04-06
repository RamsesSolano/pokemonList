import { Component, OnInit } from '@angular/core';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  searchPokemon: string = '';
  pokemonList: Array<Pokemon> = [];
  pokemonDataSource: Array<Pokemon> = []
  faPlus = faPlus;
  faTrash = faTrash;
  faPencil = faPencil;

  constructor( private pokemonService: PokemonService ){

  }

  ngOnInit(): void {

    this.pokemonService.addPokemonStatus.subscribe((pokemonInformation: Pokemon ) => {
      this.getAllPokemons();
    });

    this.getAllPokemons().then( (listPokemon: Array<Pokemon>) => {
      this.pokemonList = listPokemon;
    });
  }

  async getAllPokemons(){
    return await this.pokemonService.getAllPokemons();
  }
  
  deletePokemon( pokemon: Pokemon ){
    this.pokemonService.deletePokemon( pokemon ).then( result => {
      this.onKeypressEvent();
    });
  }

  editPokemon( pokemon: Pokemon ){
    this.pokemonService.detectEventPokemon( pokemon );
  }

  addPokemon( ){
    const newPokemon: Pokemon = {
      id: -2,
      name: '',
      image: '',
      attack: 0,
      defense: 0, 
      hp: 0, 
      type: '', 
      idAuthor: 1
    }
    this.pokemonService.detectEventPokemon(newPokemon);
  }

  filterPokemons( listPokemon: Array<Pokemon> ){
    if( this.searchPokemon.length === 0 ){
      this.pokemonList = listPokemon;
    } else {
      this.pokemonList = listPokemon.filter( ( pokemon: Pokemon ) => {
        return pokemon.name.includes( this.searchPokemon );
      });
    }
  }

  onKeypressEvent(){
    
    this.getAllPokemons().then( (listPokemon: Array<Pokemon>) => {
      this.filterPokemons( listPokemon );  
      
    });

  }

}
