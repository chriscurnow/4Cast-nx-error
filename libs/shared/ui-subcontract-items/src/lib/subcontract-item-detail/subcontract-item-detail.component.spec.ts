import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemDetailComponent } from './subcontract-item-detail.component';

describe('SubcontractItemDetailComponent', () => {
  let component: SubcontractItemDetailComponent;
  let fixture: ComponentFixture<SubcontractItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
