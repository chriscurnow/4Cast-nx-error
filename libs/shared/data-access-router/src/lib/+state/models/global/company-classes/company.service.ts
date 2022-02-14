// import { Injectable } from '@angular/core';
// import { Company, CompanyInterface } from './company';
// import { DataService } from '../../../data-service';
// import { TenantService } from '../../../tenant-classes/tenant.service';
// import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { ActivatedRoute } from '@angular/router';
// import { Tenant } from '../../../tenant-classes/tenant';


// @Injectable({
//   providedIn: 'root'
// })
// export class CompanyService extends DataService<CompanyInterface> {

// get collectionName(): string { return 'companies'};
// get collectionPath(): string {
//   return `${this.tenantService.documentPath}/${this.collectionName}`;
// }

// get documentPath(): string {
//   return `${this.collectionPath}/${this._companyId}`;
// }

// company!: Company;

// _companyId!: string;
// set companyId(id: string){this._companyId = id}


//   constructor(private tenantService: TenantService) {
//     super();
//    }

//    getCompany(route: ActivatedRoute): Observable<CompanyInterface | undefined> {

//     return route.paramMap.pipe(
//       switchMap(params => {
//         this.companyId = params.get('companyId') as string;
//         this.tenantService.tenantId = params.get('tenantId') as string;
//         return this.getDocument();
//       })
//     );

//   }

//   addCompany(tenantId: string, company: Company) {
//     this.tenantService.tenantId = tenantId;
//     company.tenant = new Tenant({id: tenantId});
//     this.addDocument(company);
//   }

//   //  addCompany(data: CompanyInterface) {
//   //    // company is a top level collection so we don't need to update any ids;
//   //    // so just call addDocument();
//   //    this.addDocument(data)
//   //  }

//     saveCompany(data: CompanyInterface) {

//      this.saveDocument(data)
//     }
// }
