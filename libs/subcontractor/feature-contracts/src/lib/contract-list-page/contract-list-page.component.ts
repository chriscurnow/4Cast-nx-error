import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadContracts, Contract } from '@workspace/subcontractor/data-access-contract'
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';


import { getAllContracts } from '@workspace/subcontractor/data-access-contract';
import { CurrencyInterface, Currency } from '@workspace/shared/util'
import { DateUtilsService } from '@workspace/shared/util';


@Component({
  selector: 'fourcast-contract-list-page',
  templateUrl: './contract-list-page.component.html',
  styleUrls: ['./contract-list-page.component.scss'],
})
export class ContractListPageComponent implements OnInit {
  contracts$: Observable<Contract[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  public selection: SelectionModel<any>;
  public filteredSubcontracts: any[];
  public subcontracts: any[];
  public subcontractorId: string;
  // public subcontractor: SupplierInterface;
  public dataSource: MatTableDataSource<any>;

  displayedColumns = [
    'project',
    'headContractor',
    'date',
    'original',
    'variations',
    'revised',
  ];

  constructor(private store: Store) {
    this.contracts$ = store.select(getAllContracts);
    this.contracts$.subscribe((res) => {
      this.filteredSubcontracts = res;
      this.subcontracts = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      console.log('Table from contracts list', this.table);
      if (this.table) {
        this.table.dataSource = this.dataSource;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadContracts());
  }

  formatCurrency(value: number): string {
    if (value) {
      const currencyObject: CurrencyInterface = { amount: value };

      const currency = new Currency(currencyObject);

      return currency.dinero ? currency.dinero.toFormat('0,0.00') : '';
    } else {
      return '';
    }
  }

  formatDate(date: any): string {
    // const returnValue = this.dateUtils.setDate(date);
    // return returnValue;

    if (date) {
      return DateUtilsService.formatDate(date);
    } else {
      return '';
    }
  }

  rowClicked(row: any) {
    console.log('row clicked', row);
  }
}
