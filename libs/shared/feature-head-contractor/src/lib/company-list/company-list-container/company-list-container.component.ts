import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Company } from '@workspace/shared/data-access-models';

import { loadCompanyList, CompanyPartialState, getAllCompanies, init  } from '@workspace/shared/data-access-head-contractor';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fourcast-company-list-container',
  templateUrl: './company-list-container.component.html',
  styleUrls: ['./company-list-container.component.scss']
})
export class CompanyListContainerComponent implements OnInit {
  companies$: Observable<Company[]>
  companies: Company[];

  constructor(
    private router: Router,
    private store: Store<CompanyPartialState>,

  ) {
    this.companies$ = this.store.select(getAllCompanies)
    this.companies$.subscribe((res) => {
       this.companies = res;
       console.log('COMPANY LIST CONTAINER companies', this.companies)
    }
   )
   }

  ngOnInit(): void {
    this.store.dispatch(init())
  }

}
