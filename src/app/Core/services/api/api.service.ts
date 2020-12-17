import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { ApiInterface } from './api-interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  Post = (data: object, url: string, options = {
    headers: {}
  }): Observable<ApiInterface> => {
    // check the option keys for key headers
    let headers;
    if ('headers' in options) {
      headers = new HttpHeaders();
      // loop and include all the headers
      for (const keys in options.headers) { headers = headers.append( keys, options.headers[keys]); }
    }
    return this.httpClient.post<ApiInterface>(`${environment.url}/${url}/`, data, {headers});
  }

  Get = (url: string, filter: any, options = {
    headers: {}
  }): Observable<ApiInterface> => {
    let headers = new HttpHeaders();
    if ('headers' in options) {
      // loop and include all the headers
      for (const keys in options.headers) { headers = headers.append( keys, options.headers[keys]); }
    }
    return this.httpClient.get<ApiInterface>(`${environment.url}/${url}`, {params: filter, headers});
  }

  Patch = (data: object, url: string, options = {
    headers: {}
  }): Observable<ApiInterface> => {
    let headers = new HttpHeaders();
    if ('headers' in options) {
      // loop and include all the headers
      for (const keys in options.headers) { headers = headers.append( keys, options.headers[keys]); }
    }
    return this.httpClient.patch<ApiInterface>(`${environment.url}/${url}/`, data, {headers});
  }
}
