import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fourcast-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  constructor() {
    console.log('constructor')
  }

  ngOnInit(): void {
    console.log('on init')
  }

}
