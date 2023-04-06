import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Pokemon } from './model/pokemon';
import { PokemonService } from './services/pokemon.service';

describe('AppComponent', () => {

  let service: PokemonService;
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const pokemonNotOperation: Pokemon = {
    id: -1,
    name: '',
    image: '',
    attack: 0,
    defense: 0, 
    hp: 0, 
    type: '', 
    idAuthor: 1
  }

  const pokemonCreateOperation: Pokemon = {
    id: -2,
    name: '',
    image: '',
    attack: 0,
    defense: 0, 
    hp: 0, 
    type: '', 
    idAuthor: 1
  }

  const pokemonUpdateOperation: Pokemon = {
    id: 20,
    name: '',
    image: '',
    attack: 0,
    defense: 0, 
    hp: 0, 
    type: '', 
    idAuthor: 1
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[ PokemonService ], 
      schemas:[ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = fixture.debugElement.injector.get( PokemonService );

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('detect status of section add, by default pokemon information id is -1', () => {
    service.addPokemonStatus.subscribe( ( pokemonResult: Pokemon ) => {
      expect( pokemonResult.id ).toEqual( -1 );
    });
  });

  it('detect status of section add, create operation pokemon information id is -2', () => {
    service.detectEventPokemon( pokemonCreateOperation );
    service.addPokemonStatus.subscribe( ( pokemonResult: Pokemon ) => {
      expect( pokemonResult.id ).toEqual( -2 );
    });
  });

  it('detect status of section add, update operation pokemon information id is greater than 0', () => {
    service.detectEventPokemon( pokemonUpdateOperation );
    service.addPokemonStatus.subscribe( ( pokemonResult: Pokemon ) => {
      expect( pokemonResult.id ).toEqual( 20 );
    });
  });

  it('pokemon id is -1 so do not show add section', () => {
    if( pokemonNotOperation.id !== null && pokemonNotOperation.id !== undefined ){
      app.showAddPokemonSection( pokemonNotOperation.id );
      expect( app.showAddSection ).toBeFalse();
    }
  });

  it('create pokemon operation so show add section', () => {
    if( pokemonCreateOperation.id !== null && pokemonCreateOperation.id !== undefined ){
      app.showAddPokemonSection( pokemonCreateOperation.id );
      expect( app.showAddSection ).toBeTrue();
    }
  });

  it('update pokemon operation so show add section', () => {
    if( pokemonUpdateOperation.id !== null && pokemonUpdateOperation.id !== undefined ){
      app.showAddPokemonSection( pokemonUpdateOperation.id );
      expect( app.showAddSection ).toBeTrue();
    }
  });

});
