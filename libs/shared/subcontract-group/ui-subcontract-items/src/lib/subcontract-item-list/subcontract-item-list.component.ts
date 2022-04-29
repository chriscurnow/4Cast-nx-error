/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import { SubcontractItemPartialState } from '@workspace/shared/data-access-subcontract-items';
import { Observable } from 'rxjs';

@Component({
  selector: 'fourcast-subcontract-item-list',
  templateUrl: './subcontract-item-list.component.html',
  styleUrls: ['./subcontract-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcontractItemListComponent implements OnInit {
  items$: Observable<SubcontractItem | undefined>;
  subcontractItems: SubcontractItem[];

  constructor(private store: Store<SubcontractItemPartialState>) {}

  ngOnInit(): void {
    console.log();
  }
}
