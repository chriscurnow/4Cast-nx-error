import { Component, OnInit } from '@angular/core';
import {
  SubcontractPartialState,
  selectSubcontract,
} from '@workspace/shared/data-access-subcontract';
import { Subcontract } from '@workspace/shared/data-access-models';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loadSubcontractsList } from '@workspace/shared/data-access-subcontract';

@Component({
  templateUrl: './subcontract-detail-container.component.html',
  styleUrls: ['./subcontract-detail-container.component.scss'],
})
export class SubcontractDetailContainerComponent implements OnInit {
  contract$: Observable<Subcontract | undefined>;
  subcontract: Subcontract | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<SubcontractPartialState>
  ) {
     this.contract$ = this.store.select(selectSubcontract)
    this.contract$.subscribe(res => {
      console.log('Result of select subcontract', res)
      this.subcontract = res})
}

  ngOnInit(): void {
    this.store.dispatch(loadSubcontractsList());
    console.log('')
  }

  backToList(){
    this.router.navigate(['../../contract-list'])
  }
}

