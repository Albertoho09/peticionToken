import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ServicioTokenService } from '../servicio-token.service';
import Swal from 'sweetalert2';

export interface UsuarioDTO {
  nick: string;
  nombre: string;
  apellidos: string;
  email: string;
  fechaNac: string;
  npublicaciones: string;
  roles: string[];

}


@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent {
  usuarios!: UsuarioDTO[];
  constructor(private servicio: ServicioTokenService) {
    servicio.listarUsuarios("http://localhost:8081/api/v1/users").subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (error) => {
        if (error.status == 403) {
          Swal.fire({
            title: "Error",
            text: "No tienes permisos para acceder a esta pagina",
            icon: "error"
          });
        }
      }
    });
  }

}
