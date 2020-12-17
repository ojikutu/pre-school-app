import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // check to confirm the authentication token
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.notificationService.warning({
        _title: 'Oops!!!',
        _message: 'Please login to proceed.'
      });
      this.router.navigate(['/auth/sign-in']);
    }
    return !!authToken;
  }
}
