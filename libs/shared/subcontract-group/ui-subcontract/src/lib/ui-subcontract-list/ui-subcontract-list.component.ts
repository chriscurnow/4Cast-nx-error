import {
  Component,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Subcontract } from '@workspace/shared/data-access-models';
import { createCurrency, DateUtilsService } from '@workspace/shared/util';
import { Currency, CurrencyClass } from '@workspace/shared/util';

@Component({
  selector: 'fourcast-ui-subcontract-list',
  templateUrl: './ui-subcontract-list.component.html',
  styleUrls: ['./ui-subcontract-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSubcontractListComponent  {
  public selection: SelectionModel<any>;
  public dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = [
    'project',
    'headContractor',
    'date',
    'original',
    'variations',
    'revised',
  ];

  @Input() set subcontracts(value: Subcontract[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.sort = this.sort;
  }

  @Output() subcontractSelected = new EventEmitter<Subcontract>();

  rowClicked(subcontract: Subcontract) {
    this.subcontractSelected.emit(subcontract);
  }

  formatCurrency(value: number): string {
    if (value) {
      const currencyObject: Currency = { amount: value };

      const currency = new CurrencyClass(currencyObject);

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
}
