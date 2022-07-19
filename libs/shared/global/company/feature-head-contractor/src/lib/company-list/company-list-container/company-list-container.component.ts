import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CompanyPartialState,
  getAllCompanies,
  init,
} from '@workspace/shared/global/company/data-access-company';
import {
  NavigationPartialState,
  getAddEntity,
  showAddButton,
  addEntitySuccess,
} from '@workspace/shared/data-access-navigation';

import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '@workspace/shared/data-access-models'; // import model
import { CompanyListUiComponent } from '../company-list-ui/company-list-ui.component';

@Component({
  selector: 'fourcast-company-list-container',
  standalone: true,
  imports: [CommonModule, CompanyListUiComponent],

  templateUrl: './company-list-container.component.html',
  styleUrls: ['./company-list-container.component.css'],
})
export class CompanyListContainerComponent {
  companies$!: Observable<Company[]>;
  companies!: Company[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<CompanyPartialState>,
    private navStore: Store<NavigationPartialState>
  ) {
    this.companies$ = this.store.select(getAllCompanies);
    this.companies$.subscribe((res) => {
      this.companies = res;
      console.log('Company LIST CONTAINER Companys', this.companies);
    });

    this.navStore.select(getAddEntity).subscribe((res) => {
      if (res) {
        console.log('Got message add entity');
        this.createNew();
        this.navStore.dispatch(addEntitySuccess());
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(init());
     this.navStore.dispatch(showAddButton());
  }

  rowSelected(company: Company) {
    this.router.navigate(['../detail', company.id], {
      relativeTo: this.route,
    });
  }

  createNew() {
    this.router.navigate(['../detail', 'new'], {
      relativeTo: this.route,
    });
  }
}
