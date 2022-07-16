import { Component, Input } from '@angular/core';
import { NavigationPartialState, getHideAddButton, addEntity } from '@workspace/shared/data-access-navigation';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fourcast-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  @Input() appName = '4CastPro';
  showAddButton = true;
  year = new Date().getFullYear();

  constructor( private store: Store<NavigationPartialState>){
    this.store.select(getHideAddButton)
    .subscribe((hide: boolean |undefined) => {
      console.log('Hide add button state', hide);
      this.showAddButton = !hide;

    })
  }


  addButtonClicked() {
    console.log('Add button clicked');
    this.store.dispatch(addEntity())
  }
}
