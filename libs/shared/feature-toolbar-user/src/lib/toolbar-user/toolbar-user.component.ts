import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { authLogout } from '@workspace/shared/data-access-auth';

@Component({
  selector: 'fourcast-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent {
  constructor(private store: Store) {}

  handleLogout() {
    this.store.dispatch(authLogout());
  }
}
