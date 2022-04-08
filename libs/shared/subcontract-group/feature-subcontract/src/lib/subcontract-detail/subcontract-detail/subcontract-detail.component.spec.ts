import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractDetailComponent } from './subcontract-detail.component';

describe('SubcontractDetailComponent', () => {
  let component: SubcontractDetailComponent;
  let fixture: ComponentFixture<SubcontractDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcontractDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
