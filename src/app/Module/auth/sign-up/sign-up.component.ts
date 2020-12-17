import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ApiService } from '../../../Core/services/api/api.service';
import { NotificationService } from '../../../Core/services/notification/notification.service';
import { AuthTokenService } from '../../../Core/services/auth-token/auth-token.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  public formSubmitted: boolean;
  emailActivation: boolean;
  registrationEmail: string;
  uid: string;
  activatingAccount: boolean;

  ngUnsubscribe$ = new Subject();

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private authTokenService: AuthTokenService,
    private router: Router
  ) { }

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  signUpForm = new FormGroup({
    _firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    _lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    _email: new FormControl('', [Validators.required]),
    _password: new FormControl('', [Validators.required])
  });

  accountValidation = new FormGroup({
    _activationCode: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {}

  initiateRegister(): void {
    if (this.signUpForm.valid) {
      this.formSubmitted = true;
      this.apiService.Post(this.signUpForm.value, 'register')
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((result) => {
          if (result.statusCode === 201) {
            this.registrationEmail = this.signUpForm.value._email; // assign email value, for email verification
            this.notificationService.success({
              _title: 'Account created successfully.',
              _message: `An activation code, has been sent to ${this.registrationEmail}.`
            });
            this.uid = result.data._uid;
            this.signUpForm.reset();
            this.emailActivation = true;
          }
        }, () => this.formSubmitted = false);
      this.formSubmitted = false;
    }
  }

  activateAccount(): void {
    if (this.accountValidation.valid) {
      this.activatingAccount = true;
      this.accountValidation.value._email = this.registrationEmail;
      this.apiService.Patch(this.accountValidation.value, 'register')
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          console.log(response);
          if (response.statusCode === 200) {
            // token change successful.
            this.notificationService.success({
              _title: 'Account Validated.',
              _message: 'Email validation successful.'
            });
            // call the service to save token
            if (this.authTokenService.saveAuthToken(response.data)) {
              // redirect member to the dashboard.
              this.notificationService.success({
                _title: 'Login Successful',
                _message: 'Welcome'
              });
              this.router.navigate(['/app/landing']);
            }
          } else {
            this.notificationService.error({
              _title: 'Email Verification Failed.',
              _message: response.statusMessage
            });
          }
        });
      this.activatingAccount = false;
    }
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
