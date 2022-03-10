import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fourcast-subcontract-item',
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
