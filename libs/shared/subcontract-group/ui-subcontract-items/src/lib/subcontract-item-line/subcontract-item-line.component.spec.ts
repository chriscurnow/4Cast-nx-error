import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemLineComponent } from './subcontract-item-line.component';

describe('SubcontractItemLineComponent', () => {
  let component: SubcontractItemLineComponent;
  let fixture: ComponentFixture<SubcontractItemLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcontractItemLineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
