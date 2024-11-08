import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidator } from 'app/services/password.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;

    formulario: FormGroup;

    constructor(
        private router: Router, 
        private formBuilder: FormBuilder, 
        private authService: AuthService, 
        private toastr: ToastrService, 
        private apiService: ApiService
    ) {
        this.formulario = this.formBuilder.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            username: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                PasswordValidator.strong
            ]]
        });
    }

    ngOnInit() { }

    register() {
        if (this.formulario.valid) {
            this.apiService.register(this.formulario.value).subscribe((response) => {
                if (response.success) {
                    this.toastr.success('Registro exitoso', 'Éxito');
                    this.router.navigate(['/signup']);
                } else {
                    this.toastr.error('Error en el registro', 'Error');
                }
            });
        }
    }

    rc() {
        this.router.navigate(['/signup']);
    }
}
