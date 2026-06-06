import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerService } from '../../services/player/player';

interface Position {
  value: string;
}

@Component({
  selector: 'app-player-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './player-form.html',
  styleUrl: './player-form.css',
})
export class PlayerForm {
  
  isEditMode = false;
  playerId  : number =0 ;
  loading = false;
  successMessage = '';
  errorMessage = '';
  
  constructor(private route: ActivatedRoute,
  private router: Router,
  private playerService: PlayerService){

  }

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
    club: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rating: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99)]),
    nationality: new FormControl('', [Validators.required, Validators.minLength(4)]),
    speed: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    dribbling: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    shooting: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    passing: new FormControl(0, [Validators.min(0), Validators.max(100)]),

  });

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.isEditMode = true;
      this.playerId = +id;
      this.loadPlayer(this.playerId);
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit() {
    if (this.playerForm.invalid) return;
  
    if (this.isEditMode) {
      this.playerService.updatePlayer(this.playerId, this.playerForm.value).subscribe({
        next: () => {
          this.successMessage = '¡Jugador actualizado exitosamente!';
          setTimeout(() => {
            this.router.navigate(['/players', this.playerId]);
          }, 2000);        
        }, 
        error: (err) => {
          console.error(err);
          alert('Error al actualizar. Revisa los datos.');
          this.loading = false;
        }
      })
    } else {
      this.playerService.createPlayer(this.playerForm.value).subscribe({
        next: () => {
          this.successMessage = '¡Jugador registrado exitosamente!';
          setTimeout(() => {
            this.router.navigate(['/players', this.playerId]);
          }, 2000); 
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar. Revisa los datos.');
          this.loading = false;
        }
      });
    }
  }
  onResetForm(){
    this.playerForm.reset();
  }

  private loadPlayer(id: number) {
    this.playerService.getPlayer(id).subscribe({
      next: (data) => {
        this.playerForm.patchValue({
          name: data.name,
          club: data.club,
          position: data.position,
          nationality: data.nationality,
          rating: data.rating,
          speed: data.speed,
          shooting: data.shooting,
          passing: data.passing,
          dribbling: data.dribbling
        });
      }
    });
  }
  noNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && /\d/.test(value)) { 
      return { noNumbers: true };
    }
    return null;
  }

}
