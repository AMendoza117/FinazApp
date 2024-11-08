import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-financial-advice-modal-content',
  template: `
    <div class="modal-header">
        <h5 class="modal-title text-center">Consejos de Salud Financiera</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-12">
          <h6>{{ adviceTitle }}</h6>
          <p>{{ adviceContent }}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="left-side">
        <button type="button" class="btn btn-primary" (click)="getNewAdvice()">Siguiente Consejo</button>
      </div>
      <div class="right-side">
        <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Cerrar</button>
      </div>
    </div>
  `
})
export class FinancialAdviceModalContent {
  adviceTitle: string = 'Consejo Inicial';
  adviceContent: string = 'Bienvenido al modulo de consejos financieros.';

  adviceList: Array<{title: string, content: string}> = [
    { 
        title: 'Control de Gastos', 
        content: 'Lleva un registro detallado de todos tus gastos, ya sea en una hoja de cálculo, una aplicación o un cuaderno. Esto te permitirá identificar patrones de consumo y áreas donde puedas reducir gastos innecesarios. Además, clasifica tus gastos en categorías (fijos, variables, discrecionales) para entender mejor en qué estás utilizando tu dinero.' 
    },
    { 
        title: 'Ahorro Automático', 
        content: 'Configura transferencias automáticas a una cuenta de ahorros tan pronto como recibas tu salario. Esto no solo facilita el ahorro, sino que también te ayuda a crear un hábito. Si puedes, establece un porcentaje fijo de tu ingreso para ahorrar cada mes, y aumenta esa cantidad gradualmente con el tiempo.' 
    },
    { 
        title: 'Fondo de Emergencia', 
        content: 'Construye un fondo de emergencia que cubra de 3 a 6 meses de tus gastos esenciales. Esto te dará una red de seguridad en caso de pérdida de empleo, emergencias médicas u otros imprevistos. Asegúrate de que este fondo sea fácilmente accesible, pero sepáralo de tu cuenta corriente para evitar gastarlo en necesidades no urgentes.' 
    },
    { 
        title: 'Diversificación de Inversiones', 
        content: 'No pongas todos tus huevos en la misma canasta. Diversifica tus inversiones entre diferentes activos como acciones, bonos, bienes raíces y fondos de inversión. Esto reduce el riesgo y aumenta tus posibilidades de obtener rendimientos más estables a largo plazo.' 
    },
    { 
        title: 'Educación Financiera Continua', 
        content: 'Dedica tiempo a educarte sobre finanzas personales. Lee libros, escucha podcasts, y sigue a expertos en redes sociales para mantenerte informado. La educación financiera te empodera para tomar decisiones más inteligentes con tu dinero.' 
    },
    { 
        title: 'Evita Deudas de Alto Interés', 
        content: 'Las deudas con tasas de interés altas, como las de las tarjetas de crédito, pueden convertirse en una carga financiera significativa. Prioriza el pago de estas deudas lo antes posible y evita acumular más. Considera la consolidación de deudas si te resulta difícil manejar múltiples pagos.' 
    },
    { 
        title: 'Planificación para la Jubilación', 
        content: 'Comienza a planificar tu jubilación lo antes posible. Aprovecha cualquier plan de pensiones o fondos de retiro que ofrezca tu empleador, y considera abrir una cuenta de ahorro individual para la jubilación. Cuanto antes empieces, más tiempo tendrá tu dinero para crecer gracias al interés compuesto.' 
    },
    { 
        title: 'Seguros Adecuados', 
        content: 'Asegúrate de tener seguros adecuados que cubran tus necesidades. Esto incluye seguros de salud, vida, hogar y auto. Un seguro puede parecer un gasto innecesario hasta que lo necesitas, y tener la cobertura adecuada puede evitar que una emergencia se convierta en una catástrofe financiera.' 
    },
    { 
        title: 'Metas Financieras Claras', 
        content: 'Establece metas financieras claras a corto, mediano y largo plazo. Esto te ayudará a mantenerte enfocado y motivado para alcanzar tus objetivos. Asegúrate de que tus metas sean específicas, medibles, alcanzables, relevantes y con un tiempo determinado (SMART).' 
    },
    { 
        title: 'Gastos Inteligentes', 
        content: 'Antes de realizar una compra significativa, pregúntate si realmente la necesitas o si estás comprando por impulso. Espera un par de días antes de hacer compras grandes para asegurarte de que sean decisiones bien pensadas. Además, busca siempre ofertas, compara precios y considera la calidad a largo plazo.' 
    }
];


  constructor(public activeModal: NgbActiveModal) {}

  getNewAdvice() {
    const randomIndex = Math.floor(Math.random() * this.adviceList.length);
    this.adviceTitle = this.adviceList[randomIndex].title;
    this.adviceContent = this.adviceList[randomIndex].content;
  }
}

@Component({
  selector: 'app-financial-advice-modal',
  templateUrl: './financial-advice-modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class FinancialAdviceModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    this.modalService.open(FinancialAdviceModalContent);
  }
}
