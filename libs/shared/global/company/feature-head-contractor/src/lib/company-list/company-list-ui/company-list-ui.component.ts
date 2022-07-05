import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ViewChild,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { Company } from '@workspace/shared/data-access-models'; // import model name

@Component({
  selector: 'fourcast-company-list-ui',

  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],

  templateUrl: './company-list-ui.component.html',
  styleUrls: ['./company-list-ui.component.scss'],
})
export class CompanyListUiComponent {
  dataSource!: MatTableDataSource<Company>;
  selection!: SelectionModel<Company>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Company>;

  displayedColumns = [
    'companyName',
    'abn',
    'addr1',
    'city',
    'state',
    'postcode',
  ];

  @Input() set entities(value: Company[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.sort = this.sort;
  }

  @Output() entitySelected = new EventEmitter<Company>();
  @Output() createNew = new EventEmitter<null>();

  rowSelected(entity: Company) {
    this.entitySelected.emit(entity);
  }

  create() {
    this.createNew.emit();
  }
}
