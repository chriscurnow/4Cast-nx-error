import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemListComponent } from './subcontract-item-list.component';

describe('SubcontractItemListComponent', () => {
  let component: SubcontractItemListComponent;
  let fixture: ComponentFixture<SubcontractItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
