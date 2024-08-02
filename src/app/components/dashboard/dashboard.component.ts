import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'app/Models/Proyecto.model';
import { LiderConProyectos } from 'app/Models/liderConProyectos.model';
import { Lider } from 'app/Models/Lider.model';
import { AuthService } from 'app/services/auth.service';
import { ApiService } from 'app/api.service';
import { Actividad } from 'app/Models/Actividad.model';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  proyectos: Proyecto[];
  mostrarTabla = true;
  lideresConProyectos: LiderConProyectos[];
  numProyectos: number;
  numProyectosActivos: number;
  numProyectosCompletados: number;
  nuevoLider: Lider = {
    idLiderProyecto: null,
    nombre: ''
  };
  actividades: Actividad[];
  lideresConProyectos1: LiderConProyectos[];
  numActividades: number;
  numActividadesActivas: number;
  numActividadesCompletadas: number;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeChart();
  }
  
  initializeChart() {
    const ctx = document.getElementById('expensesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Débito', 'Crédito'],
        datasets: [{
          label: 'Gastos',
          data: [23099.76, 4500.00],
          backgroundColor: [
            '#007bff',
            '#f44336'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }


  // Implementar el método update para refrescar la información
  update(): void {
    this.loadActividades();
    this.loadProyectos();
    this.loadLideresConProyectos();
  }

  redirectToRegistrarProyecto() {
    this.router.navigate(['/registrar-proyecto']);
  }


  loadProyectos() {
    this.apiService.loadProyectos().subscribe(
      (proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
        this.numProyectos = proyectos.length;
        this.numProyectosActivos = proyectos.filter(p => p.estadoProyecto === 'Activo').length;
        this.numProyectosCompletados = proyectos.filter(p => p.estadoProyecto === 'Completado').length;
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

  loadActividades() {
    this.apiService.loadActividades().subscribe(
      (actividades: Actividad[]) => {
        this.actividades = actividades;
        this.numActividades = actividades.length;
        this.numActividadesActivas = actividades.filter(p => p.estadoActividad === 'Activa').length;
        this.numActividadesCompletadas = actividades.filter(p => p.estadoActividad === 'Completada').length;
      },
      (error) => {
        console.error('Error al cargar actividades:', error);
      }
    );
  }

  loadLideresConProyectos() {
    this.apiService.loadLideresConProyectos().subscribe(
      (lideres: LiderConProyectos[]) => {
        this.lideresConProyectos = lideres;
      },
      (error) => {
        console.error('Error al cargar líderes con proyectos:', error);
      }
    );
  }

  redirectToProyectoDetalle(proyecto: Proyecto) {
    if (proyecto && proyecto.idProyecto) {
      const url = ['ver-proyecto', proyecto.idProyecto];
      this.router.navigate(url);
    } else {
      console.error('ID de proyecto indefinido. No se puede navegar.');
    }
  }

  redirectToRegistrarActividad() {
    this.router.navigate(['/registrar-actividad']);
  }

  agregarLider() {
    this.apiService.registrarLider(this.nuevoLider).subscribe(
      (response) => {
        if (response && response.success) {
          this.loadLideresConProyectos();
        } else {
          console.error('Error al agregar lider.');
        }
      },
      (error) => {
        console.error('Error en la solicitud para agregar lider: ', error);
      }
    )
  }

}


