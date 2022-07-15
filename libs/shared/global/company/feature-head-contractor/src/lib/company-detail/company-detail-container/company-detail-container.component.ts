import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadCompanyList,
  CompanyPartialState,
  getSelectedCompany,
  init,
  updateCompany,
  getCompanyLoaded,
} from '@workspace/shared/global/company/data-access-company';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '@workspace/shared/data-access-models'; // import model
import { CompanyDetailUiComponent } from '../company-detail-ui/company-detail-ui.component';

@Component({
  standalone: true,
  imports: [CommonModule, CompanyDetailUiComponent],

  templateUrl: './company-detail-container.component.html',
  styleUrls: ['./company-detail-container.component.css'],
})
export class CompanyDetailContainerComponent implements OnInit, OnDestroy {
  company$!: Observable<Company | undefined>;
  company!: Company | undefined;
  updatedSubscription!: Subscription


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store<CompanyPartialState>
  ) {
    this.company$ = this.store.select(getSelectedCompany);

    this.company$.subscribe((res) => {
      this.company = res;
      console.log('COMPANY DETAIL CONTAINER company', this.company);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(init());
  }

  update(company: Company) {
    this.store.dispatch(updateCompany({ company: company }));
    const loaded$ = this.store.select(getCompanyLoaded);
    this.updatedSubscription = loaded$.subscribe((loaded: boolean) => {
      if (loaded) {
        this.location.back();
      }
    });
  }

  ngOnDestroy(): void{
    if(this.updatedSubscription){
      this.updatedSubscription.unsubscribe();
    }
  }
}
