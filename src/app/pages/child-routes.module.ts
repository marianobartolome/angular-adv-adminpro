import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: {titulo:'Dashboard'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: {titulo:'Ajustes de cuenta'} },
  { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo:'Búsquedas'} },
  { path: 'grafica1', component: Grafica1Component, data: {titulo:'Gráfica #1'} },
  { path: 'perfil', component: PerfilComponent, data: {titulo:'Perfil'} },
  { path: 'progress', component: ProgressComponent, data: {titulo:'Barra de progreso'} },
  { path: 'promesas', component: PromesasComponent, data: {titulo:'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data: {titulo:'Rxjs'} },

  //Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: {titulo:'Mantenimiento de hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: {titulo:'Mantenimiento de médicos'} },
  { path: 'medico/:id', component: MedicoComponent, data: {titulo:'Mantenimiento de médicos'} },
  { path: 'usuarios', component: UsuariosComponent, data: {titulo:'Mantenimiento de usuarios'} },
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
