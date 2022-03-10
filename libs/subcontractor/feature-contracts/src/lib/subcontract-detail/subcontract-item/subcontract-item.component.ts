import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'not-used-subcontract-item',
  templateUrl: './subcontract-item.component.html',
  styleUrls: ['./subcontract-item.component.scss'],
})
export class SubcontractItemComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}


  ngOnInit(): void {
    console.log('SUBCONTRACT ITEM COMPONENT')
  }
}
