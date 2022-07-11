import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChild, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Project } from '@workspace/shared/data-access-models'; // import model name





@Component({
  selector: 'fourcast-project-list-ui',


  standalone: true,
  imports: [CommonModule, MatTableModule],


  templateUrl: './project-list-ui.component.html',
  styleUrls: ['./project-list-ui.component.css']
})
export class ProjectListUiComponent  {
  dataSource!: MatTableDataSource<Project>;
  selection!: SelectionModel<Project>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable< Project>;

  displayedColumns = [
    "number", "name"
  ];

   @Input() set entities(value:  Project[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.sort = this.sort;
  }

  @Output() entitySelected = new EventEmitter<Project>();



  rowSelected(entity: Project) {
    this.entitySelected.emit(entity)
  }

}
