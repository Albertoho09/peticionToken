import { RouterModule, Routes } from '@angular/router';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'tablaUsuario', component: TablaUsuariosComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }