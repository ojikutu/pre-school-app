import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthTokenService } from '../auth-token/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthenticationService {
  private readonly options: { headers: { Authorization: string } };

  constructor(
    private apiService: ApiService,
    private authTokenService: AuthTokenService
  ) {
    this.options = {
      headers: {
        Authorization : 'Bearer ' + this.authTokenService.getAuthToken()
      }
    };
  }

  fetch = (endpoint: string, filter = null) => {
    return this.apiService.Get(endpoint, filter, this.options);
  }

  create = (endpoint, data) => {
    return this.apiService.Post(data, endpoint, this.options);
  }

  patch = (endpoint, data) => {
    return this.apiService.Patch(data, endpoint, this.options);
  }
}
