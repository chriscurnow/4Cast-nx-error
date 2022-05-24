import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SubcontractItem } from '@workspace/shared/data-access-models';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fourcast-subcontract-item-line',
  templateUrl: './subcontract-item-line.component.html',
  styleUrls: ['./subcontract-item-line.component.scss'],
})
export class SubcontractItemLineComponent implements OnInit {
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

  @Input() set item(value: SubcontractItem | undefined) {

    if (value) {
      this._item = value;
      this.status = this._item.status as number;
      this.itemNumber = this._item.itemNumber as number;

      this.contractItemForm.reset(this._item);
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
 //
  }

  editItem(): void {
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
