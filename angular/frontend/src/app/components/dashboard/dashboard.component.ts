import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    // Registrar todos los componentes de Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // Inicializar todos los gráficos después de que la vista se haya inicializado
    this.initializeChart();
    this.initializeMonthlyExpensesChart();
    this.initializeCategoryExpensesChart();
  }

  // Gráfico de pastel para gastos
  initializeChart() {
    const ctx = document.getElementById('expensesChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Débito', 'Crédito'],
          datasets: [{
            label: 'Gastos',
            data: [23099.76, 4500.00],
            backgroundColor: ['#117C5D', '#f44336'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del canvas para el gráfico de pastel.');
    }
  }

  // Gráfico de línea para gastos por mes
  initializeMonthlyExpensesChart() {
    const ctx = document.getElementById('monthlyExpensesChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [{
            label: 'Gastos Mensuales',
            data: [500, 600, 700, 800, 750, 650, 700, 720, 680, 730, 780, 800], // Datos de ejemplo
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.label}: $${tooltipItem.raw}`
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del canvas para el gráfico de línea.');
    }
  }

  // Gráfico de barras para gastos por categoría
  initializeCategoryExpensesChart() {
    const ctx = document.getElementById('categoryExpensesChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Vivienda'],
          datasets: [{
            label: 'Gastos por Categoría',
            data: [300, 150, 200, 180, 250], // Datos de ejemplo
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: '#117C5D',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.label}: $${tooltipItem.raw}`
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del canvas para el gráfico de barras.');
    }
  }
}
