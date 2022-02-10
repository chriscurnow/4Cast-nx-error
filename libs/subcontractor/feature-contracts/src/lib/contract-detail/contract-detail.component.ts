import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// TODO: [NX-19] resolve circular dependency
import { Contract, ContractState, loadContractsList, selectContract } from '@workspace/subcontractor/data-access-contract';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'fourcast-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {
contract$: Observable<Contract | undefined>
contractId: string;
detailForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<ContractState>,
              private fb: FormBuilder) {
                this.createForm();
    this.contract$ = this.store.select(selectContract);
    this.contract$
    .subscribe(contract => {
      console.log('CONTRACT DETAIL contract', contract)
      this.contractId =  contract ? contract.id : '';
      if (contract){
        contract.description = 'Plumbing'
      }
      this.detailForm.reset(contract);
    })
   }

   ngOnInit(){
     console.log();
    //  this.store.dispatch(loadContractsList());
   }

   createForm() {
     this.detailForm = this.fb.group({
       id: null,
       name: null,
       description: null
     })
   }

   back(){
     this.router.navigate(['../../contracts-list'], {relativeTo: this.route})
   }


}
