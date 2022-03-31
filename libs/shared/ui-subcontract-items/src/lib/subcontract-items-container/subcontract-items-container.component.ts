import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fourcast-subcontract-items-container',
  templateUrl: './subcontract-items-container.component.html',
  styleUrls: ['./subcontract-items-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubcontractItemsContainerComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    console.log();
  }

}
