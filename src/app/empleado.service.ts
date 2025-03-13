import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/empleados';

  constructor(private http: HttpClient) {}

  obtenerEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  agregarEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.apiUrl, empleado);
  }

  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
