import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from './tabla-usuarios/tabla-usuarios.component';
interface RespuestaServicio {
  token: string;
  // Otros campos si los hay
}
@Injectable({
  providedIn: 'root'
})
export class ServicioTokenService {

  constructor(private http: HttpClient) { }

  iniciarSesion(url: string, datos: any): any {
    return this.http.post<any>(url, datos);
  }

  listarUsuarios(url: string): Observable<any> {
    // Obtén el token de tu fuente de autenticación (puedes usar localStorage, cookies, etc.)
    const token = localStorage.getItem('Token');

    // Configura las cabeceras con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realiza la solicitud GET con las cabeceras de autorización
    return this.http.get<any>(url, { headers: headers, withCredentials: true });
  }
}
