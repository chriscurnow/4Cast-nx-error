

import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SubcontractItem } from '@workspace/shared/data-access-models';


import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


@Component({
  selector: 'fourcast-subcontract-item-line',
  templateUrl: './subcontract-item-line.component.html',
  styleUrls: ['./subcontract-item-line.component.scss'],

})
export class SubcontractItemLineComponent implements OnInit, OnChanges {
  contractItemForm: FormGroup;
  _item: SubcontractItem;
  status: number;
  itemNumber: number;
  projectId: string | null;
  subcontractId: string | null;
  items$: Observable<SubcontractItem[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.contractItemForm = this.fb.group({
      itemNumber: [],
      contractAmount: [],
      title: [],
      approvedToDate: [],
      approvedPercent: [],
      claimedToDate: [],
      claimedPercent: [],
      amountRemaining: [],
    });
  }

  @Input() set item(value: SubcontractItem) {
     console.log('CONTRACT ITEM COMPONENT, set item - value', value);
    if (value) {

      this._item = value;
      this.status = this._item.status as number;
      this.itemNumber = this._item.itemNumber as number;

      this.contractItemForm.reset(this._item);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('item', this._item)
    console.log('changes', changes)
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this.store.dispatch(loadItemsForSubcontract());
    // this.route.paramMap.subscribe((params) => {
    //   console.log('Params', params);
    //   const idName = 'subcontractId';
    //   this.subcontractId = params.get(idName);
    //   this.projectId = params.get('projectId');
    // });
  }

  editItem(): void {
    console.log('Edit item', this._item);
    // TODO: Implement following line once we fix 'routeToItem'
    // this.routeToItem(this.localItem);
    // const variationId = this.localItem.id;
    // // const subcontractId = this.localItem ;
    // const subcontractId = this.localItem.subcontractId;
    // this.dialog.open(VariationsDetailComponent,
    //   {data:
    //     {
    //       variationId,
    //       subcontractId
    //     },
    //     disableClose: true
    //   });
  }

  // TODO: [NX-54] Implement 'routeToItem' function
  // routeToItem(item: ContractItem) {
  //   this.router.navigate([
  //     'projects',
  //     this.projectId,
  //     'subcontracts',
  //     this.subcontractId,
  //     item.id,
  //   ]);
  // }
}
