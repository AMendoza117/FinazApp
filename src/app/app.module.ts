import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importante: debes importar BrowserAnimationsModule
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ActualizarContraseñaComponent } from './components/recuperarContraseña/actualizarContraseña/actualizarContraseña.component';
import { GetTokenComponent } from './components/recuperarContraseña/getToken/getToken.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EditarPerfilComponent } from './components/miPerfil/editar-perfil.component';
import { NavbarComponent2 } from './shared/navbar2/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    //ActualizarContraseñaComponent,
    //GetTokenComponent
    EditarPerfilComponent,
    NavbarComponent2


  ],
  imports: [
    BrowserModule,
    //NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Asegúrate de importar BrowserAnimationsModule aquí
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

