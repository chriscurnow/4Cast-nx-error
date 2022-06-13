import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { authTokenUpdate } from '@workspace/shared/data-access-auth';

import { LoginService } from '../login.service';

@Component({
  selector: 'fourcast-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(
    private router: Router,
    private store: Store,
    private fb: UntypedFormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // [STARTER DOCS] example of a plain (simple) state management / data handling
  // suitable for simple isolated features, prefer using NgRx for most features
  handleSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    this.loginService.login(username, password).subscribe(
      ({ token }) => {
        this.store.dispatch(authTokenUpdate({ token }));
        this.router.navigate(['/app']);
      },
      (error) => {
        // [STARTER DOCS] handle errors
        // and show user error feedback
        // maybe build shared error feature
        // with its own ngrx state and actions
        // to show errors in centralized fashion in every app
        this.loginForm.reset({});
      }
    );
  }
}
