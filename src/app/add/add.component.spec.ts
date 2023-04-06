import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let service: PokemonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ AddComponent ], 
      providers:[ PokemonService ], 
      schemas:[ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get( PokemonService );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name field is empty so is not validand form is not valid', () => {
    const nameFiled = component.pokemonForm.get( 'name' );
    nameFiled?.setValue( '' );
    expect(nameFiled?.valid).toBeFalse();
    expect(component.pokemonForm.valid).toBeFalse();
  });

  it('name field is not empty so name field is valid and form is not valid', () => {
    const nameFiled = component.pokemonForm.get( 'name' );
    nameFiled?.setValue( 'pikachu' );
    expect(nameFiled?.valid).toBeTrue();
    expect(component.pokemonForm.valid).toBeFalse();
  });

  it('image url field is empty so is not validand form is not valid', () => {
    const imageUrlFiled = component.pokemonForm.get( 'urlImage' );
    imageUrlFiled?.setValue( '' );
    expect(imageUrlFiled?.valid).toBeFalse();
    expect(component.pokemonForm.valid).toBeFalse();
  });

  it('url image field is not empty so url image field is valid and form is not valid', () => {
    const imageUrlFiled = component.pokemonForm.get( 'urlImage' );
    imageUrlFiled?.setValue( 'http://urlimage.com' );
    expect(imageUrlFiled?.valid).toBeTrue();
    expect(component.pokemonForm.valid).toBeFalse();
  });

  it('url image field and name field is not empty so url image field and name field is valid and form is valid', () => {
    const imageUrlFiled = component.pokemonForm.get( 'urlImage' );
    imageUrlFiled?.setValue( 'http://urlimage.com' );
    const nameFiled = component.pokemonForm.get( 'name' );
    nameFiled?.setValue( 'pikachu' );
    expect(nameFiled?.valid).toBeTrue();
    expect(imageUrlFiled?.valid).toBeTrue();
    expect(component.pokemonForm.valid).toBeTrue();
  });

  it('when call clear data method the pokemon form is invalid', () => {
  
    let imageUrlFiled = component.pokemonForm.get( 'urlImage' );
    imageUrlFiled?.setValue( 'http://urlimage.com' );
    let nameFiled = component.pokemonForm.get( 'name' );
    nameFiled?.setValue( 'pikachu' );
    expect(nameFiled?.valid).toBeTrue();
    expect(imageUrlFiled?.valid).toBeTrue();
    expect(component.pokemonForm.valid).toBeTrue();

    component.clearData();

    expect(component.pokemonForm.get( 'urlImage' )?.valid).toBeFalse();
    expect(component.pokemonForm.get( 'name' )?.valid).toBeFalse();
    expect(component.pokemonForm.valid).toBeFalse();

  });


});
