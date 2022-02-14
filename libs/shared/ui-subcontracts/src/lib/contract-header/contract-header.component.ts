import { Component, OnInit } from '@angular/core';
// import {
//   HeadContractor,
//   Project,
//   Subcontract,
// } from '@workspace/shared/data-access-router';

@Component({
  selector: 'fourcast-contract-header',
  templateUrl: './contract-header.component.html',
  styleUrls: ['./contract-header.component.scss'],
})
export class ContractHeaderComponent  {
  // project: Project = null;
  // headContractor: HeadContractorInterface = null;
  projectName: string;
  headContractorName: string;
  contactName: string;
  contactEmail: string;
  // localSubcontract: Subcontract;

  // constructor() {}

  // @Input() set subcontract(value: Subcontract) {
  //   this.localSubcontract = value;
  //   console.log('Setting local subcontract', this.localSubcontract);

  //   if (value) {
  //     // this.project = value.project;
  //     if (value.project) {
  //       this.project = value.project;
  //       this.headContractor = this.project.headContractor;
  //       this.contactEmail = this.headContractor.contact;
  //     }
  //   }
  // }

  // ngOnInit(): void {}
}
