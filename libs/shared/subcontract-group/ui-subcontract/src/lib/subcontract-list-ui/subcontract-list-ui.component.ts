import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'subcontract-list-ui',
  templateUrl: './subcontract-list-ui.component.html',
  styleUrls: ['./subcontract-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubcontractListUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
