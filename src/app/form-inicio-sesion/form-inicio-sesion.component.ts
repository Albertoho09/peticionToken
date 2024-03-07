import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServicioTokenService } from '../servicio-token.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router } from '@angular/router';

interface RespuestaServicio {
  token: string;
  // Otros campos si los hay
}

@Component({
  selector: 'app-form-inicio-sesion',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule],
  templateUrl: './form-inicio-sesion.component.html',
  styleUrl: './form-inicio-sesion.component.scss'
})

export class FormInicioSesionComponent {
  constructor(private servicio: ServicioTokenService, private router: Router) { }

  email!: string;
  password!: string;
  respuesta!: string[];
  botonInciarSesion() {
    const dataForm = {
      email: this.email,
      password: this.password
    }
    this.servicio.iniciarSesion("http://localhost:8081/api/v1/auth/signin", dataForm).subscribe(
      {
        next: (resp: any) => {
          localStorage.setItem("Token", resp.token);
          Swal.fire({
            title: "Inicio de Sesion Correcto",
            text: "Correo o contraseña correctas.",
            icon: "success"
          });

          this.router.navigate(['/tablaUsuario']);
        },
        error: (error: any) => {
          if (error.status == 403) {
            Swal.fire({
              title: "Error al iniciar sesion",
              text: "Correo o contraseña incorrectos",
              icon: "error"
            });
          }
        }
      }
    );

  }
}
