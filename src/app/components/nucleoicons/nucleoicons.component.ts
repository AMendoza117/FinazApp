import { Component, OnInit, Inject, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-nucleoicons',
    templateUrl: './nucleoicons.component.html',
    styleUrls: ['./nucleoicons.component.css']
})
export class NucleoiconsComponent implements OnInit {

    constructor( private element : ElementRef) {}

    ngOnInit() {
        this.initializeChart();
    }

    initializeChart() {
        const ctx = document.getElementById('expensesLineChart') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['1 ene', '5 ene', '10 ene', '15 ene', '20 ene', '25 ene', '31 ene'],
            datasets: [{
              label: 'Gastos',
              data: [500, 1500, 2500, 3000, 4000, 4500, 27599.76],
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              fill: true,
              tension: 0.1,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }

}
