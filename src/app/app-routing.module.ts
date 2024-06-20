import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { TokenComponent } from './token/token.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: TokenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
