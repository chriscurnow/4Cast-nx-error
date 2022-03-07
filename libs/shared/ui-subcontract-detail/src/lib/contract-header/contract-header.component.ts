import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fourcast-contract-header',
  templateUrl: './contract-header.component.html',
  styleUrls: ['./contract-header.component.scss'],
})
export class ContractHeaderComponent {
  project: any = null;
  headContractor: any = null;
  projectName: string;
  headContractorName: string;
  contactName: string;
  contactEmail: string;
  localSubcontract: any;

  @Input() set subcontract(value: any) {
    this.localSubcontract = value;
    console.log('Setting local subcontract', this.localSubcontract);

    if (value) {
      // this.project = value.project;
      if (value.project) {
        this.project = value.project;
        this.headContractor = this.project.headContractor;
        // this.contactEmail = this.headContractor.contact;
      }
    }
  }
}
