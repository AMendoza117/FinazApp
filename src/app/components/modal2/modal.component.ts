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
  adviceContent: string = 'Este es un ejemplo de un consejo financiero.';

  adviceList: Array<{title: string, content: string}> = [
    { title: 'Control de Gastos', content: 'Lleva un registro de todos tus gastos para identificar áreas de mejora.' },
    { title: 'Ahorro Automático', content: 'Configura transferencias automáticas a una cuenta de ahorros.' },
    { title: 'Fondo de Emergencia', content: 'Destina parte de tus ingresos a un fondo de emergencia.' },
    // Agrega más consejos aquí
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
