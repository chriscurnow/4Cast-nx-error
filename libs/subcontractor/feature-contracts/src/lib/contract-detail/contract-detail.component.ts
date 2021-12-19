import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// TODO: [NX-19] resolve circular dependency
import { Contract, ContractState, selectContract } from '@workspace/subcontractor/data-access-contract';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'fourcast-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent  {
contract$: Observable<Contract | undefined>
contractId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<ContractState>) {
    this.contract$ = this.store.select(selectContract);
    this.contract$
    .subscribe(contract => {
      console.log('CONTRACT DETAIL contract', contract)
      this.contractId =  contract ? contract.id : '';
    })
   }

   back(){
     this.router.navigate(['../../contracts-list'], {relativeTo: this.route})
   }


}
