import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubcontractItemPartialState, loadSubcontractItems, loadItemsForSubcontract} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'fourcast-subcontract-item-list-shared',
  templateUrl: './subcontract-item-list.component.html',
  styleUrls: ['./subcontract-item-list.component.scss']
})
export class SubcontractItemListComponent implements OnInit {

  constructor(private store: Store<SubcontractItemPartialState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.paramMap.pipe(

      switchMap((params: ParamMap ) => {
        const id = params.get('contractId');
        console.log('Id from Params', id);
        return of(id);
      })
    ).subscribe((contractId: string | null) => {
      this.store.dispatch(loadItemsForSubcontract({subcontractId: contractId as string}))
    })

  }

}
