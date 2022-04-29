import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fourcast-contract-item-array',
  templateUrl: './subcontract-item-array.component.html',
  styleUrls: ['./subcontract-item-array.component.scss'],
})
export class SubontractItemArrayComponent implements OnInit {
  constructor() {
    console.log('Constructor')
  }

  ngOnInit(): void {
    console.log('OnInit')
  }
}
