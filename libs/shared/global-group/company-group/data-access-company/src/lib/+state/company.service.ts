import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Company } from '@workspace/shared/data-access-models';
import { from, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private afs: AngularFirestore) {}

  getCompanyList() {
    console.log('get company list');
    return this.afs
      .collection<Company>('companies')
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

  updateCompany(company: Company | null) {
    let path = 'companies';
    if (company) {
      if (company.id && company.id !== '') {
        path += `/${company.id}`;
        return from(this.afs.doc<Company>(path).update(company)).pipe(
          map(() => {
            return company;
          })
        );
      } else {
        return from(this.afs.collection<Company>(path).add(company)).pipe(
          map((companyReference) => {
            const id = companyReference.id;
            company.id = id;
            return company;
          })
        );
      }
    } else {
      throw 'company not defined';
    }
  }
}
