import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostingContainerComponent } from './costing-container.component';

describe('CostingContainerComponent', () => {
  let component: CostingContainerComponent;
  let fixture: ComponentFixture<CostingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostingContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
