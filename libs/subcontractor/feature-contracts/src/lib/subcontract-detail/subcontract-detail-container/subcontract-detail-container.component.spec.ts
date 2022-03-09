import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractDetailContainerComponent } from './subcontract-detail-container.component';

describe('SubcontractDetailContainerComponent', () => {
  let component: SubcontractDetailContainerComponent;
  let fixture: ComponentFixture<SubcontractDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractDetailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
