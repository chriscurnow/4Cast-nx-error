import { Injectable } from '@angular/core';

export const PREFIX = 'FOURCAST_';
export const AUTH_TOKEN = PREFIX + 'AUTH_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storeAuthToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN);
  }

  removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN);
  }
}
