/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { SubcontractItem } from '@workspace/shared/data-access-models';

import { Observable } from 'rxjs';
import { CurrencyClass, Currency } from '@workspace/shared/util';

@Component({
  selector: 'fourcast-subcontract-item-list',
  templateUrl: './subcontract-item-list.component.html',
  styleUrls: ['./subcontract-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcontractItemListComponent implements OnInit {
  public selection: SelectionModel<any>;
  public dataSource: MatTableDataSource<any>;

  items$: Observable<SubcontractItem | undefined>;
  _subcontractItems: SubcontractItem[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = [
    'variationNumber',
    'title',
    'contractAmount',
    'claimedToDate',
    'claimedPercent',
    'approvedToDate',
    'approvedPercent',
    'amountRemaining',
  ];

  @Input() set subcontractItems(v: SubcontractItem[]) {
    console.log('SUBCONTRACT ITEMS LIST COMPONENT Subcontract Items', v);
    this._subcontractItems = v;
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.sort = this.sort;
    console.log('data source', this.dataSource);
  }

  ngOnInit(): void {
    console.log('SUBCONTRACT ITEMS LIST COMPONENT');
  }

  formatCurrency(value: any): string {
    console.log('formatCurrency value', value);
    if (value) {
      const currencyObject: Currency = { amount: value.amount };

      const currency = new CurrencyClass(currencyObject);

      return currency.dinero ? currency.dinero.toFormat('0,0.00') : '';
    } else {
      return '';
    }
  }

  rowClicked(row: any) {
    console.log('row clicked', row);
  }
}
