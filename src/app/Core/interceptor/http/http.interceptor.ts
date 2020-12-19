import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

import { ApiInterface } from '../../services/api/api-interface';
import { NotificationService } from '../../services/notification/notification.service';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';

@Injectable()
export class Http implements HttpInterceptor {

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authTokenService: AuthTokenService
  ) {}

  handleError = (error: HttpErrorResponse) => {
    console.log(error);
    this.notificationService.error({
      _title: 'Oops!!! An error occurred.',
      _message: error.error.error.message
    });
    // check some error status and perform needed functions.
    if (error.status === 401) {
      // Authentication token expired.
      // delete the authToken
      this.authTokenService.deleteAuthToken();
      // redirect to the login page
      this.router.navigate(['/auth/sign-in']);
    }
    return throwError(error);
  }

  handleResponse = (response: HttpResponse<ApiInterface>) => {
    // if (response.status === 200) {
    //   this.notificationService.success({
    //     _title: 'Notification.',
    //     _message: 'Operation successful...'
    //   });
    // }
    return response;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    return next.handle(request).pipe(tap(this.handleResponse), catchError(this.handleError));
  }
}
