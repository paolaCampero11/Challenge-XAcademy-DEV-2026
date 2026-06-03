import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-player-chart',
  imports: [],
  templateUrl: './player-chart.html',
  styleUrl: './player-chart.css',
})
export class PlayerChart implements OnInit{
  public chart?: Chart;
  @Input() regate?: number; 

  constructor() {
    
  }

  ngOnInit (): void{
    Chart.register(...registerables);
    const labels = ['Regate', 'Curva', 'Precision tiros libres', 'Pases largos', 'Control del balón'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Habilidades',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }
        
      ]
    };

    this.chart = new Chart("myChart", {
      type: 'radar' as ChartType, 
      data: data,  
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Radar Chart'
          }
        }
      },
    });
  }
}
