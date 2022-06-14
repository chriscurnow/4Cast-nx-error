import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractListUiComponent } from './subcontract-list-ui.component';

describe('SubcontractListUiComponent', () => {
  let component: SubcontractListUiComponent;
  let fixture: ComponentFixture<SubcontractListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcontractListUiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
