import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListContainerComponent } from './company-list-container.component';

describe('CompanyListContainerComponent', () => {
  let component: CompanyListContainerComponent;
  let fixture: ComponentFixture<CompanyListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
