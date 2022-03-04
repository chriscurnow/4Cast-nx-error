import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractItemArrayComponent } from './contract-item-array.component';

describe('ContractItemArrayComponent', () => {
  let component: ContractItemArrayComponent;
  let fixture: ComponentFixture<ContractItemArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractItemArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractItemArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
