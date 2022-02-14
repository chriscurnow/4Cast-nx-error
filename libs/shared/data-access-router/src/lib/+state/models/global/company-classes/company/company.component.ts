import { Component, OnInit } from '@angular/core';
import { Company, CompanyInterface } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'lib-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  company!: Company ;
  isNew = false;

  constructor(private companyService: CompanyService ) { }

  ngOnInit(): void {
    const tenantId = 't';
    // const id = 'a'
    // this.companyService.getCompany(tenantId, id)
    // .subscribe(company => {
    //   this.company = new Company(company);
    // })
  }

  onSave(){
    // const companyData = this.form.value
    // const companyData: CompanyInterface = {};
    //   this.companyService.saveDocument(companyData);

    
  }

}
