import { Input, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})

export class NotificationComponent {
    verProyecto: any; // Cambia el tipo según la estructura de tus datos de demostración
  idProyecto: number;
  
  constructor(private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
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
  
  terminado(idProyecto: number): void {
    // Simula la acción de marcar el proyecto como terminado
    this.toastr.success('El proyecto se ha marcado como terminado.', 'Exito');
  }

  getPDFUrl(pdf: string): string {
    // Construye la URL completa al archivo PDF (simulación)
    return `http://localhost:8080/pdf/${pdf}`;
  }

  extractFileName(pdf: string): string {
    // Extrae el nombre del archivo de la ruta completa (simulación)
    const parts = pdf.split('/');
    return parts[parts.length - 1];
  }

}