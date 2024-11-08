import { Component, OnInit } from '@angular/core';
import { NgbdModalComponent } from 'app/components/modal/modal.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    test : Date = new Date();

    constructor() { }

    ngOnInit() {}
}
