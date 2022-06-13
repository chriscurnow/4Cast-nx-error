import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractGeneralDetailComponent } from './contract-general-detail.component';

describe('ContractGeneralDetailComponent', () => {
  let component: ContractGeneralDetailComponent;
  let fixture: ComponentFixture<ContractGeneralDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractGeneralDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractGeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
