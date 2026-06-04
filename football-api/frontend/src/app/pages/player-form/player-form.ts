import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';

interface Position {
  value: string;
}

@Component({
  selector: 'app-player-form',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './player-form.html',
  styleUrl: './player-form.css',
})
export class PlayerForm {
  positions : Position[] = [
    {value: 'GK' },
    {value: 'RB' },
    {value: 'RWB' },
    {value: 'CB' },
    {value: 'LB' },
    {value: 'LWB' },
    {value: 'CDM' },
    {value: 'CM' },
    {value: 'CAM' },
    {value: 'RM' },
    {value: 'RW' },
    {value: 'LM' },
    {value: 'LW' },
    {value: 'RF' },
    {value: 'CF' },
    {value: 'LF' },
    {value: 'ST' },
  ];
  playerForm = new FormGroup({
    name: new FormControl('', [Validators.required, this.noNumbersValidator, Validators.minLength(2)]),
    position: new FormControl('', [Validators.required]),
    club: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    nationality: new FormControl('', [Validators.required, Validators.minLength(4)]),
    speed: new FormControl('', [Validators.max(100)]),
    dribbling: new FormControl('', [Validators.max(100)]),
    shooting: new FormControl('', [Validators.max(100)]),
    passing: new FormControl('', [Validators.max(100)]),

  });

  onSubmit() {
    console.warn(this.playerForm.value);
  }

  onResetForm(){
    this.playerForm.reset();
  }
/* 
  get name(){ return this.playerForm.get('name'); } */

  noNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && /\d/.test(value)) { 
      return { noNumbers: true };
    }
    return null;
  }

}
