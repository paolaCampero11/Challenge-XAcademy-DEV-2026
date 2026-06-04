import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Chart, ChartType, plugins, registerables, scales } from 'chart.js';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-player-chart',
  imports: [
    CommonModule
  ],
  templateUrl: './player-chart.html',
  styleUrl: './player-chart.css',
})
export class PlayerChart implements OnInit{
  public chart?: Chart;
  @Input() speed: number = 0;
  @Input() shooting: number = 0;
  @Input() passing: number = 0;
  @Input() dribbling: number = 0;

  constructor() {
    
  }

  ngOnInit (): void{
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(){
    
    const labels = ['Velocidad', 'Tiro', 'Pase', 'Regate'];
    const dataValues = [this.speed, this.shooting, this.passing, this.dribbling];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Habilidades',
          data: dataValues,
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
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              display: false
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            pointLabels: {
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          title: {
            display: false
          }
        },
        
      },
    });
  }
}
