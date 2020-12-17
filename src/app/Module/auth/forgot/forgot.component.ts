import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from '../../../Core/services/notification/notification.service';
import { ApiService } from '../../../Core/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.sass']
})
export class ForgotComponent implements OnInit {
  ngUnsubscribe$ = new Subject();
  formSubmitted = false;
  formDisplay = false;
  resetProfile: object;

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  constructor(
    private notificationService: NotificationService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  forgotForm = new FormGroup({
    _email: new FormControl('', [Validators.required])
  });

  resetForm = new FormGroup({
    _password: new FormControl('', [Validators.required]),
    _uid: new FormControl(`${this.activatedRoute.snapshot.queryParamMap.get('request')}`)
  });

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.get('request')) {
      // check if uid is valid and usable
      this.apiService.Get('reset', {
        _uid: this.activatedRoute.snapshot.queryParamMap.get('request')
      })
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(result => {
        // set the variables needed here
        this.formDisplay = true;
        this.resetProfile = result.data;
      });
    }
  }

  initiateReset = (): void => {
    if (this.forgotForm.valid) {
      this.formSubmitted = true;
      this.apiService.Post(this.forgotForm.value, 'reset')
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((result) => {
          if (result.statusCode === 201) {
            this.notificationService.success({
              _title: 'Reset Request Successful.',
              _message: `If an account exists for ${this.forgotForm.value._email}, you will receive password reset instructions..`
            });
            this.forgotForm.reset();
          }
        }, () => this.formSubmitted = false);
      this.formSubmitted = false;
    }
  }

  finalizeReset = (): void => {
    if (this.resetForm.valid) {
      this.formSubmitted = true;
      this.apiService.Patch(this.resetForm.value, 'reset')
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          this.formSubmitted = false;
          this.formDisplay = false;
          this.notificationService.success({
            _title: 'Password Change Successful',
            _message: 'Proceed to login.'
          });
          // put a delay and redirect to the login page
          setTimeout ( () => {
            this.router.navigate(['/auth/sign-in']);
          }, 2000);
        });
      this.formSubmitted = false;
    }
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
