import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginService } from '../login.service';
import { SharedFeatureLoginModule } from '../shared-feature-login.module';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockLoginService: jest.Mocked<Partial<LoginService>>;

  beforeEach(async () => {
    mockLoginService = {
      login: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        SharedFeatureLoginModule,
      ],
      providers: [
        // [STARTER DOCS] ignore Angular Material theme warnings in tests
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        { provide: LoginService, useValue: mockLoginService },
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
