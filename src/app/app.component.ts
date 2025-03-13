import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from './empleado.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'EjemploLionConsultingApp';
  empleadoForm: FormGroup;
  empleados: any[] = [];
  columnas: string[] = ['nombre', 'puesto', 'salario', 'acciones'];

  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      puesto: ['', Validators.required],
      salario: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    console.log('Inicializando componente...');
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    console.log('Obteniendo empleados...');
    this.empleadoService.obtenerEmpleados().subscribe(
        data => {
            console.log('Datos recibidos:', data);
            this.empleados = data.data || [];
        },
        error => {
            console.error('Error al obtener empleados', error);
        }
    );
  }

  agregarEmpleado() {
    if (this.empleadoForm.valid) {
        const nuevoEmpleado = this.empleadoForm.value;
        this.empleadoService.agregarEmpleado(nuevoEmpleado).subscribe(
            (response) => {
                console.log('Respuesta del backend:', response);

                this.empleados = [...this.empleados, response.data];
                this.empleadoForm.reset();
                this.obtenerEmpleados();
            },
            (error) => {
                console.error('Error al agregar empleado:', error);
            }
        );
    } else {
        console.error('El formulario no es válido');
    }
  }

  eliminarEmpleado(id: number) {
    console.log('Intentando eliminar empleado con ID:', id);
    this.empleadoService.eliminarEmpleado(id).subscribe(
      response => {
        console.log('Empleado eliminado:', response);
        this.obtenerEmpleados();
      },
      error => {
        console.error('Error al eliminar empleado:', error);
      }
    );
  }
}
