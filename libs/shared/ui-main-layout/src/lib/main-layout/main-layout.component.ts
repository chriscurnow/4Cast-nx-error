import { Component, Input } from '@angular/core';

@Component({
  selector: 'fourcast-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  @Input() appName = '4CastPro';

  year = new Date().getFullYear();
}
