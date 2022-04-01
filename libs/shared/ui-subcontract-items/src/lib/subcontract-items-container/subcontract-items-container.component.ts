/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadItemsForSubcontract,
  selectItemsForSubcontract,
  SubcontractItemPartialState,
} from '@workspace/shared/data-access-subcontract-items';
import { Observable } from 'rxjs';
import { Subcontract, SubcontractItem } from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-items-container',
  templateUrl: './subcontract-items-container.component.html',
  styleUrls: ['./subcontract-items-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcontractItemsContainerComponent implements OnInit {
  items$: Observable<SubcontractItem[]>;
  items: SubcontractItem[];
  subcontract: Subcontract = {}

  constructor(private store: Store<SubcontractItemPartialState>) {
    this.items$ = this.store.select(selectItemsForSubcontract);
    this.items$.subscribe((items) => {
      this.items = items;
      console.log("Items loaded", items)
    });
  }

  ngOnInit(): void {
    console.log();
    this.store.dispatch(loadItemsForSubcontract({subcontract: this.subcontract}))
  }
}
