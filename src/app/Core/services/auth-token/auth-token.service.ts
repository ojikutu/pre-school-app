import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  saveAuthToken = (authToken): boolean => {
    if (!authToken.token) {
      return false;
    } else {
      // save the authentication token
      localStorage.authToken = authToken.token;
      localStorage._firstName = authToken.profile._firstName;
      localStorage._lastName = authToken.profile._lastName;
      return true;
    }
  }

  // get and return the auth token
  getAuthToken = (): string => {
    const authToken = localStorage.getItem('authToken');
    return (authToken) ? authToken : null;
  }

  getProfile = (): object => {
    return {
      _firstName: localStorage.getItem('_firstName'),
      _lastName: localStorage.getItem('_lastName')
    };
  }

  deleteAuthToken = (): void => {
    localStorage.clear();
  }
}
