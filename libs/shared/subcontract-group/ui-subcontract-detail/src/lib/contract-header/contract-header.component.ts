/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, Input } from '@angular/core';
import { Project } from '@workspace/shared/data-access-models';
import { Subcontract } from '@workspace/shared/data-access-models';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'fourcast-subcontract-header',
  templateUrl: './contract-header.component.html',
  styleUrls: ['./contract-header.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class SubcontractHeaderComponent {
  project: Project;
  headContractor: any = null;
  projectName = '';
  companyName = '';
  headContractorName: string;

  contactName = '';
  contactEmail = '';
  localSubcontract: any;

  @Input() set subcontract(value: Subcontract) {
    this.localSubcontract = value;

    if (value) {
      // this.project = value.project;
      if (value.project) {
        this.project = value.project;

        if (this.project) {
          this.projectName = this.project.name ? this.project.name : '';
          const company = this.project.company;
          if (company) {
            this.companyName = company.companyName ? company.companyName : '';
            const companyContact = company.companyContact;
            if (companyContact) {
              this.contactName = companyContact.concatName
                ? companyContact.concatName
                : '';
              this.contactEmail = companyContact.preferredEmail
                ? companyContact.preferredEmail.address
                  ? companyContact.preferredEmail.address
                  : ''
                : '';
            }
          }
        }

        // this.contactEmail = this.headContractor.contact;
      }
    }
  }
}
