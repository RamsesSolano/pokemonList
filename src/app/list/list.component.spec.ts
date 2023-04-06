import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../services/pokemon.service';

import { ListComponent } from './list.component';

const pokemonToAdd: Pokemon = {
  id: -2,
  name: '',
  image: '',
  attack: 0,
  defense: 0, 
  hp: 0, 
  type: '', 
  idAuthor: 1
}

const listPokemon: Pokemon[] = [
  {
    id: 1,
    name: 'name 1', 
    image: 'image 1',
    attack: 13, 
    defense: 25, 
    hp: 45, 
    type: 'type 1', 
    idAuthor: 1
  },
  {
    id: 2,
    name: 'name 2', 
    image: 'image 2',
    attack: 13, 
    defense: 25, 
    hp: 45, 
    type: 'type 2', 
    idAuthor: 1
  },
  {
    id: 3,
    name: 'name 3', 
    image: 'image 3',
    attack: 13, 
    defense: 25, 
    hp: 45, 
    type: 'type 3', 
    idAuthor: 1
  }
]



describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: PokemonService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ ListComponent ],
      providers:[ PokemonService ], 
      schemas:[ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get( PokemonService );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('get all pokemons', () => {
    const spyPokemonService = spyOn( service, 'getAllPokemons' ); 
    component.getAllPokemons();
    expect( spyPokemonService ).toHaveBeenCalled();
  });

  
  it('detect add pokemon event', () => {
    const spyPokemonService = spyOn( service, 'detectEventPokemon' ).and.callFake( () => pokemonToAdd ); 
    component.addPokemon();
    expect( spyPokemonService ).toHaveBeenCalled();

  });
  
  it('detect edit pokemon event', () => {
    const spyPokemonService = spyOn( service, 'detectEventPokemon' ).and.callFake( () => pokemonToAdd ); 
    component.editPokemon( pokemonToAdd );
    expect( spyPokemonService ).toHaveBeenCalled();

  });

  it('detect search pokemon event', () => {
    const spyPokemonService = spyOn( service, 'getAllPokemons' ); 
    component.onKeypressEvent();
    expect( spyPokemonService ).toHaveBeenCalled()

  });

  it('filter pokemon with search empty is equals at list pokemon', () => {
    const spyPokemonService = spyOn( service, 'getAllPokemons' ); 
    component.searchPokemon = '';
    component.pokemonList = listPokemon;
    component.filterPokemons( listPokemon );

    expect( component.pokemonList ).toBe( listPokemon );

  });

  it('filter pokemon with search "ka" string is equals at empty list', () => {
    const spyPokemonService = spyOn( service, 'getAllPokemons' ); 
    component.searchPokemon = 'ka';
    component.pokemonList = listPokemon;
    component.filterPokemons( listPokemon );
    const listEmpty: Array<Pokemon> = [];
    expect( component.pokemonList ).toEqual( listEmpty );

  });

  it('filter pokemon with search "name 1" string is equals pokemon in position 0 of list', () => {
    const spyPokemonService = spyOn( service, 'getAllPokemons' ); 
    component.searchPokemon = 'name 1';
    component.pokemonList = listPokemon;
    component.filterPokemons( listPokemon );
    expect( component.pokemonList.length ).toEqual( 1 );
    expect( component.pokemonList[0] ).toEqual( listPokemon[0] );

  });

});
