import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PokemonService } from './pokemon.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Pokemon } from '../model/pokemon';

const pokemon: Pokemon = {
  id: 1,
  name: 'name 1', 
  image: 'image 1',
  attack: 13, 
  defense: 25, 
  hp: 45, 
  type: 'type 1', 
  idAuthor: 1
};

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


describe('PokemonService', () => {

  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], 
      providers: [
        PokemonService
      ], 
      schemas:[ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

  });

  beforeEach( () => {
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject( HttpTestingController );
  })

  afterAll( () => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( 'get all pokemons', () => {

    service.getAllPokemons().then( (result: Array<Pokemon>) => {
      expect( result ).toEqual( listPokemon );
    })
    
    const req = httpMock.expectOne( `${service.getApiPath()}/?idAuthor=1` );
    expect(req.request.method).toBe('GET');
    req.flush( listPokemon );
  });

  it( 'consult pokemon by id', () => {
    service.getPokemonById( 1 ).then((pokemonResult: Pokemon) => {
      expect( pokemonResult ).toEqual( pokemon );
    })

    const req = httpMock.expectOne( `${service.getApiPath()}/1` );
    expect( req.request.method ).toBe( 'GET' );
    req.flush( pokemon );

  });

  it( 'create a new pokemon', () => {

    service.createPokemon( pokemon ).then( (pokemonResult: Pokemon) => {
      expect( pokemonResult ).toBe( pokemon );
    })

    const req = httpMock.expectOne( `${service.getApiPath()}/` );
    expect( req.request.method ).toBe('POST');
    req.flush( pokemon );

  });

  it( 'update a pokemon by id', () => {
    service.updatePokemon( pokemon ).then( ( pokemonResult: Pokemon ) => {
      expect( pokemonResult ).toBe( pokemon )
    });

    const req = httpMock.expectOne( `${service.getApiPath()}/${ pokemon.id }` );
    expect( req.request.method ).toBe('PUT');
    req.flush( pokemon );
  });

  it( 'delete a pokemon by id', () => {
    service.deletePokemon( pokemon ).then( (pokemonResult: Pokemon) => {
      expect( pokemonResult ).toBe( pokemon );
    })

    const req = httpMock.expectOne( `${service.getApiPath()}/${ pokemon.id }` );
    expect( req.request.method ).toBe('DELETE');
    req.flush( pokemon );
  });

});
