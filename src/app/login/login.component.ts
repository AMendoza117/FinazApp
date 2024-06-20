import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Lógica del componente aquí
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService, private apiService: ApiService, private http: HttpClient) {  }
  login() {
    this.apiService.login(this.email, this.password).subscribe((response) => {
      if (response.success) {
        //this.toastr.info('Token enviado al correo electrónico', 'Éxito');
        this.router.navigate(['/login2FA']);
      } else {
        //this.toastr.error('Datos incorrectos', 'Error');
        console.log('Error de inicio de sesión');
      }
    });
  }
}
