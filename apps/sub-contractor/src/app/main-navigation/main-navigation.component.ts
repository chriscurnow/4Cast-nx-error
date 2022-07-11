import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fourcast-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent {

  links = ['Head Contractors', 'Projects', 'Contracts'];
  activeLink = this.links[0];
  // implements OnInit

  // constructor() {

  // }
  // ngOnInit(): void {

  // }
}
