import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailUiComponent } from './company-detail-ui.component';

describe('CompanyDetailUiComponent', () => {
  let component: CompanyDetailUiComponent;
  let fixture: ComponentFixture<CompanyDetailUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyDetailUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
