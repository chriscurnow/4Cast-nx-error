import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemsContainerComponent } from './subcontract-items-container.component';

describe('SubcontractItemsContainerComponent', () => {
  let component: SubcontractItemsContainerComponent;
  let fixture: ComponentFixture<SubcontractItemsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractItemsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
