import { provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFeatureToolbarUserModule } from '../shared-feature-toolbar-user.module';

import { ToolbarUserComponent } from './toolbar-user.component';

describe('ToolbarUserComponent', () => {
  let component: ToolbarUserComponent;
  let fixture: ComponentFixture<ToolbarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFeatureToolbarUserModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
