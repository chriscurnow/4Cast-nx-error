import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract, ContractState, selectContract } from '@workspace/subcontractor/data-access-contract';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'fourcast-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent  {
contract$ = this.store.select(selectContract);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<ContractState>) {

    this.contract$
    .subscribe(contract => {
      console.log('CONTRACT DETAIL contract', contract)
    })
   }

   back(){
     this.router.navigate(['../../contracts-list'], {relativeTo: this.route})
   }


}
