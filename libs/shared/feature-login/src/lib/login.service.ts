import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginResponse } from './+state/login.models';
import { of } from 'rxjs';

export const RESOURCE_URL = '/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    // return this.httpClient.post<LoginResponse>(RESOURCE_URL, { username, password });
    return of({ token: 'some-mock-token' }); // mock response
  }
}
