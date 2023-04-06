import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  faFloppyDisk = faFloppyDisk;
  faX =  faX;
  update: boolean = false;
  updatePokemonInformation: Pokemon = {
    id: -1,
    name: '',
    image: '',
    attack: 0,
    defense: 0, 
    hp: 0, 
    type: '', 
    idAuthor: 1
  };
  pokemonForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    attack: new FormControl(0, [Validators.required] ), 
    urlImage: new FormControl( '', [Validators.required]),   
    defense: new FormControl(0, [Validators.required])
  }); 

  constructor(
    private pokemonService: PokemonService
  ){

    

  }
  ngOnInit(): void {
    this.pokemonService.addPokemonStatus.subscribe( ( pokemonInformation: Pokemon ) => {
      
      if( 
        pokemonInformation.id !== null && 
        pokemonInformation.id !== undefined ){

          if( pokemonInformation.id > 0 ){

            this.pokemonForm.get('name')?.setValue( pokemonInformation.name );
            this.pokemonForm.get('attack')?.setValue( pokemonInformation.attack );
            this.pokemonForm.get('urlImage')?.setValue( pokemonInformation.image );
            this.pokemonForm.get('defense')?.setValue( pokemonInformation.defense );
            this.update = true;
            this.updatePokemonInformation = pokemonInformation;
          } 

      }
      
    });
  }

  clearData(){
    this.updatePokemonInformation = {
      id: -1,
      name: '',
      image: '',
      attack: 0,
      defense: 0, 
      hp: 0, 
      type: '', 
      idAuthor: 1
    };

    this.pokemonService.detectEventPokemon( this.updatePokemonInformation );
    this.pokemonForm.reset( this.updatePokemonInformation );
  }

  addPokemon(){

    if( 
      this.pokemonForm.value.name !== null &&
      this.pokemonForm.value.name !== undefined &&
      this.pokemonForm.value.urlImage !== null &&
      this.pokemonForm.value.urlImage !== undefined &&
      this.pokemonForm.value.attack !== null &&
      this.pokemonForm.value.attack !== undefined &&
      this.pokemonForm.value.defense !== null &&
      this.pokemonForm.value.defense !== undefined
       ){


        if( this.update ){

          const newPokemon: Pokemon = {
            name: this.pokemonForm.value.name,
            image: this.pokemonForm.value.urlImage,
            attack: this.pokemonForm.value.attack,
            defense: this.pokemonForm.value.defense, 
            hp: this.updatePokemonInformation.hp, 
            type: this.updatePokemonInformation.type, 
            idAuthor: this.updatePokemonInformation.idAuthor
          }
  
          this.pokemonService.updatePokemon( newPokemon ).then( result => {
            this.clearData();
          } );


        } else {

          const newPokemon: Pokemon = {
            name: this.pokemonForm.value.name,
            image: this.pokemonForm.value.urlImage,
            attack: this.pokemonForm.value.attack,
            defense: this.pokemonForm.value.defense, 
            hp: 0, 
            type: '', 
            idAuthor: 1
          };
  
          this.pokemonService.createPokemon( newPokemon ).then( result => {
            this.clearData();
          });
        }
       }

  }

}
