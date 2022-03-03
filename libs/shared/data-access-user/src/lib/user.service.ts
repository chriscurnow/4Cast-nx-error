import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserEntity } from './+state/user.models';

export const RESOURCE_URL = '/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUser() {
    return this.httpClient.get<UserEntity>(RESOURCE_URL);
  }
}
