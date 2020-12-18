import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClassService } from '../../../../Core/services/shared/class.service';
import {NotificationService} from '../../../../Core/services/notification/notification.service';
import {ApiAuthenticationService} from '../../../../Core/services/api/api-authentication.service';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.sass']
})
export class SchoolDetailsComponent implements OnInit {
  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private apiAuthenticationService: ApiAuthenticationService
  ) { }

  heading: string;
  subheading = 'Settings';
  icon = 'pe-7s-display2 icon-gradient bg-mean-fruit';
  buttonMessage = 'Back';
  buttonIcon = faArrowLeft;
  buttonDestination = '/app/school';

  ngUnsubscribe$ = new Subject();
  schoolUid: string;
  schoolDetails = {
    _uid: null,
    _name: null,
    _address: {
      _country: null,
      _state: null,
      _zipCode: null,
      _street: null,
    }
  };
  dataFetching: boolean;
  formSubmitted: boolean;

  form = new FormGroup({
    _name: new FormControl('', Validators.required),
    _address: new FormGroup({
      _country: new FormControl(''),
      _state: new FormControl(''),
      _zipCode: new FormControl(''),
      _street: new FormControl('')
    })
  });

  ngOnInit(): void {
    this.schoolUid = this.activatedRoute.snapshot.params.id;
    this.validateSchoolUid();
  }

  validateSchoolUid = () => {
    this.classService.schoolDetails(this.schoolUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(result => {
        if (result.statusCode === 200 && result.data._details._recordsFound > 0) {
          this.schoolDetails = {
            _uid: result.data._data[0]._source._uid,
            _name: result.data._data[0]._source._name,
            _address: {
              _country: result.data._data[0]._source._address._country,
              _state: result.data._data[0]._source._address._state,
              _zipCode: result.data._data[0]._source._address._zipCode,
              _street: result.data._data[0]._source._address._street
            }
          };

          this.form.setValue({
            _name: result.data._data[0]._source._name,
            _address: {
              _country: result.data._data[0]._source._address._country,
              _state: result.data._data[0]._source._address._state,
              _zipCode: result.data._data[0]._source._address._zipCode,
              _street: result.data._data[0]._source._address._street
            }
          });
          this.dataFetching = true;
        } else {
          this.notificationService.error({
            _title: 'Error Occurred.',
            _message: 'No school profile found.'
          });
          this.router.navigate(['/app/school']);
        }
      }, () => {
        // redirect back if an error is throw.
        this.notificationService.error({
          _title: 'Error Occurred.',
          _message: 'No school profile found.'
        });
        this.router.navigate(['/app/school']);
      });
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmitted = true;
      this.form.value._uid = this.schoolDetails._uid;
      this.apiAuthenticationService.patch('school', this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(update => {
          if (update.statusCode === 200) {
            // make notification and update name to current value
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: 'Details updated successfully.'
            });
            // set new name value
            this.schoolDetails._name = this.form.value._name;
            this.formSubmitted = false;
          }
        });
    }
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
