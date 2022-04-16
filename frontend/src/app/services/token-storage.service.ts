import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut() {
    window.sessionStorage.clear();
  }
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): string | any {
   // return JSON.parse(sessionStorage.getItem(USER_KEY));
   const serializableState = sessionStorage.getItem(USER_KEY);
    return serializableState !== null || serializableState === undefined ? JSON.parse(serializableState) : undefined;
  }
}
