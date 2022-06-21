import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Company } from '@workspace/shared/data-access-models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private afs: AngularFirestore) {}

  getCompanyList() {
    return this.afs
      .collection<Company>('suppliers') // use suppliers for the momemnt because we have data there
      .valueChanges()
      .pipe(
        map((companies) => {
          return companies;
        })
      );
  }

  getCompany(id: string | null) {
    const path = `companies/${id}`;
    return this.afs
      .doc<Company>(path)
      .valueChanges()
      .pipe(
        map((company) => {
          if (company) {
            return company;
          } else {
            return { id: '' };
          }
        })
      );
  }
}
