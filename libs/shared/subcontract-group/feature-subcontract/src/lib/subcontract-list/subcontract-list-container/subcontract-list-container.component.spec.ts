import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractListPageComponent } from './contract-list-page.component';

describe('ContractListPageComponent', () => {
  let component: ContractListPageComponent;
  let fixture: ComponentFixture<ContractListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
