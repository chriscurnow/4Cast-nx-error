import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDatesComponent } from './contract-dates.component';

describe('ContractDatesComponent', () => {
  let component: ContractDatesComponent;
  let fixture: ComponentFixture<ContractDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
