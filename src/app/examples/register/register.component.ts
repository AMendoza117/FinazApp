import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;

    nombre: string = '';
    apellidos: string = '';
    username: string = '';
    password: string = '';

    constructor(
        private router: Router, 
        private formBuilder: FormBuilder, 
        private authService: AuthService, 
        private toastr: ToastrService, 
        private apiService: ApiService
    ) {}

    ngOnInit() { }

    register() {
        const user = {
            nombre: this.nombre,
            apellidos: this.apellidos,
            username: this.username,
            password: this.password
        };

        this.apiService.register(user).subscribe((response) => {
            if (response.success) {
                this.toastr.success('Registro exitoso', 'Éxito');
                this.rc();
            } else {
                this.toastr.error('Error en el registro', 'Error');
            }
        });
    }

    rc() {
        this.router.navigate(['/signup']);
    }
}
