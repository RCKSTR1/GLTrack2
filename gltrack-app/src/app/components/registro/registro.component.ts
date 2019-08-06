import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MedicionGlucosa } from 'src/app/models/models';
import { MedicionesService } from 'src/app/services/mediciones.service';
import { mcall } from 'q';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registros = [] as MedicionGlucosa[];
  nuevoRegistro = {} as MedicionGlucosa;

  displayedColumns: string[] = ['fecha', 'nivel', 'comida', 'antesDespues', 'actions'];
  dataSource: MatTableDataSource<MedicionGlucosa>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private mediciones: MedicionesService) {
  }

  ngOnInit() {
    this.registros = this.mediciones.GetAll();
    this.dataSource = new MatTableDataSource(this.registros);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Guardar() {
    if (!this.IsInvalid()) {
      this.mediciones.Create(this.nuevoRegistro);
      this.LimpiarForma();
      this.registros = this.mediciones.GetAll();
      this.dataSource.data = this.registros;
    }
  }

  Eliminar(id: string) {
    this.mediciones.Delete(id);
    this.registros = this.mediciones.GetAll();
    this.dataSource.data = this.registros;
  }

  LimpiarForma() {
    this.nuevoRegistro = {} as MedicionGlucosa;
  }

  IsInvalid() {
    return this.nuevoRegistro.Nivel === undefined
      || this.nuevoRegistro.Comida === undefined
      || this.nuevoRegistro.AntesDespues === undefined
      || this.nuevoRegistro.Comida === undefined
      || this.nuevoRegistro.Fecha === undefined;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
