import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importa los módulos de Angular Material que necesites
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  empleado = { id: null, nombre: '', puesto: '', salario: null };
  empleados: any[] = [];
  columnas: string[] = ['nombre', 'puesto', 'salario', 'acciones'];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit() {
    console.log('Inicializando componente...'); // Depuración
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    console.log('Obteniendo empleados...'); // Depuración
    this.empleadoService.obtenerEmpleados().subscribe(
        data => {
            console.log('Datos recibidos:', data); // Depuración
            this.empleados = data.data; // Actualiza la lista de empleados
        },
        error => {
            console.error('Error al obtener empleados', error);
        }
    );
  }

  agregarEmpleado() {
    this.empleadoService.agregarEmpleado(this.empleado).subscribe(
        (response) => {
            console.log('Respuesta del backend:', response);
            this.empleados = response.data; // Actualizar directamente la lista
            this.empleado = { id: null, nombre: '', puesto: '', salario: null }; // Limpiar el formulario
        },
        (error) => {
            console.error('Error al agregar empleado:', error);
        }
    );
  }

  eliminarEmpleado(id: number) {
    console.log('Intentando eliminar empleado con ID:', id); // Depuración
    this.empleadoService.eliminarEmpleado(id).subscribe(
        response => {
            console.log('Empleado eliminado:', response);
            this.obtenerEmpleados(); // Actualizar la lista de empleados
        },
        error => {
            console.error('Error al eliminar empleado:', error);
        }
    );
  }
}
