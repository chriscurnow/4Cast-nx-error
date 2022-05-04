import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemDetailUiComponent } from './subcontract-item-detail-ui.component';

describe('SubcontractItemDetailUiComponent', () => {
  let component: SubcontractItemDetailUiComponent;
  let fixture: ComponentFixture<SubcontractItemDetailUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractItemDetailUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemDetailUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
