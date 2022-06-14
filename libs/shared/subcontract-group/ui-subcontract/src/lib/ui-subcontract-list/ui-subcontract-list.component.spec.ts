import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSubcontractListComponent } from './ui-subcontract-list.component';

describe('UiSubcontractListComponent', () => {
  let component: UiSubcontractListComponent;
  let fixture: ComponentFixture<UiSubcontractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSubcontractListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSubcontractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
