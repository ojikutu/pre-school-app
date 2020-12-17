import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import { NotificationService } from '../../../../Core/services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import { Location } from '@angular/common';

import {faPen, faWindowClose, faCalendarAlt, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {
  subheading = 'Edit Profile';
  icon = 'pe-7s-female icon-gradient bg-mean-fruit';
  editState: boolean;
  faPen = faPen;
  faWindowClose = faWindowClose;
  faCalendarAlt = faCalendarAlt;
  faArrowLeft = faArrowLeft;

  studentUid: any;
  childLoading: boolean;
  profileFirstName: string;
  profileLastName: string;
  profileContactAddress: string;
  profileBirthday: any;
  profileAllergies: string;
  unixDate: Date;
  ngUnsubscribe$ = new Subject();
  formSubmitted: boolean;

  updateProfile = new FormGroup({
    _address: new FormControl(''),
    _birthday: new FormControl(''),
    _allergies: new FormControl('')
  });

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.studentUid = this.activatedRoute.snapshot.params.id;
    this.getChildProfile();
  }

  getChildProfile = () => {
    this.apiAuthenticationService.fetch('parent', {
      _searchFilter: JSON.stringify({
        _fetchProfile: this.studentUid
      })
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((childProfile) => {
        if (childProfile.statusCode === 200 && childProfile.data !== null) {
          this.profileFirstName = childProfile.data._firstName;
          this.profileLastName = childProfile.data._lastName;
          this.profileContactAddress = (typeof childProfile.data._address === 'undefined') ? '' : childProfile.data._address;
          this.profileBirthday = (typeof childProfile.data._birthday === 'undefined' || childProfile.data._birthday === '') ? new Date(`1900-01-01`).getTime() / 1000 : childProfile.data._birthday;
          this.profileAllergies = (typeof childProfile.data._allergies === 'undefined') ? '' : childProfile.data._allergies;
          this.childLoading = true;
        } else {
          this.notificationService.error({
            _title: 'No child profile found',
            _message: 'No child profile found for provided id.'
          });
          this.location.back();
        }
      });
  }

  editProfile() {
    // assign present values to the form state
    this.unixDate = new Date(this.profileBirthday * 1000);
    this.updateProfile.setValue({
      _address: this.profileContactAddress,
      _birthday: {
        year: this.unixDate.getFullYear(),
        month: this.unixDate.getMonth() + 1,
        day: this.unixDate.getDate()
      },
      _allergies: this.profileAllergies
    });
    this.editState = true;
  }

  childProfileUpdate() {
    if (this.updateProfile.valid) {
      this.formSubmitted = true;
      // include the student uid in the request to be sent
      this.updateProfile.value._uid = this.studentUid;
      // convert birthday to unix time
      this.updateProfile.value._birthday = new Date(`${this.updateProfile.value._birthday.year}-${this.updateProfile.value._birthday.month}-${this.updateProfile.value._birthday.day}`).getTime() / 1000;
      this.apiAuthenticationService.patch('parent', this.updateProfile.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((profileUpdated) => {
          if (profileUpdated.statusCode === 200) {
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: 'Student profile updated successfully.'
            });
            this.editState = false;
          }
        });
      this.formSubmitted = false;
    }
  }
}
