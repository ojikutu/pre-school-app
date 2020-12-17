import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService } from '../../../Core/services/api/api.service';
import {NotificationService} from '../../../Core/services/notification/notification.service';
import { AuthTokenService } from '../../../Core/services/auth-token/auth-token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  ngUnsubscribe$ = new Subject();
  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  loginForm = new FormGroup({
    _email: new FormControl('', [Validators.required]),
    _password: new FormControl('', [Validators.required]),
    _remember: new FormControl('')
  });

  public formSubmitted: boolean;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private authTokenService: AuthTokenService
  ) { }

  ngOnInit(): void {
  }

  login = (): void => {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.apiService.Post({}, 'auth', {
        headers: {
          Authorization : 'Basic ' + btoa(this.loginForm.value._email + ':' + this.loginForm.value._password)
        }
      })
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(result => {
          if (!this.authTokenService.saveAuthToken(result.data)) {
            this.notificationService.error({
              _title: 'Error Occurred.',
              _message: 'Unable to process authentication token. Contact administrator.'
            });
          } else {
            setTimeout(() => {
              // redirect to dashboard component.
              this.router.navigate(['/app/landing']);
              this.notificationService.success({
                _title: 'Log-in Successful',
                _message: 'Welcome Back.'
              });
            }, 3000);
          }
        }, () => this.formSubmitted = false);
    }
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
