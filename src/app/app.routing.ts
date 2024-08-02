import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth.guard.service';
import { GetTokenComponent } from './components/recuperarContraseña/getToken/getToken.component';
import { ActualizarContraseñaComponent } from './components/recuperarContraseña/actualizarContraseña/actualizarContraseña.component';
import { Login2FAComponent } from './examples/login2FA/login2FA.component';
import { NotificationComponent } from './components/notification/notification.component';
import { EditarPerfilComponent } from './components/miPerfil/editar-perfil.component';
import { RegisterComponent } from './examples/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ComponentsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'nucleoicons', component: NucleoiconsComponent, canActivate: [AuthGuardService] },
  { path: 'gastos', component: NotificationComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'recuperar-contrasena', component: GetTokenComponent},
  { path: 'actualizar-contrasena', component: ActualizarContraseñaComponent},
  { path: 'login2FA', component: Login2FAComponent},
  { path: 'mi-perfil', component: EditarPerfilComponent,  canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
