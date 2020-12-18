import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotificationService } from '../../../../Core/services/notification/notification.service';
import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import { ClassService } from '../../../../Core/services/shared/class.service';
import {faCalendarAlt, faMailBulk, faPen, faPlus, faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.sass']
})
export class StudentProfileComponent implements OnInit {

  ngUnsubscribe$ = new Subject();
  studentUid: string;
  classUid: string;
  schoolUid: string;
  schoolRelatedClasses: object;
  classChangeSettings: object;
  editState: boolean;
  formSubmitted: boolean;
  unixDate: any;

  profileFirstName: string;
  profileLastName: string;
  profileContactAddress: string;
  profileBirthday: any;
  profileAllergies: string;
  parentStatus: boolean;

  parentName: string;
  parentEmail: string;
  parentPhone: string;
  pickUpName: string;
  pickUpCode: string;

  faPen = faPen;
  faPlus = faPlus;
  faMailBulk = faMailBulk;
  faWindowClose = faWindowClose;
  faCalendarAlt = faCalendarAlt;

  updateProfile = new FormGroup({
    _firstName: new FormControl('', Validators.required),
    _lastName: new FormControl('', Validators.required),
    _address: new FormControl(''),
    _birthday: new FormControl(''),
    _allergies: new FormControl('')
  });

  parentInvitation = new FormGroup({
    _parent_email: new FormControl('', Validators.email)
  });

  changeClass = new FormGroup({
    _new_class_uid: new FormControl('', Validators.required),
    _action: new FormControl('', Validators.required)
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private apiAuthenticationService: ApiAuthenticationService,
    private classService: ClassService,
    private location: Location,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.studentUid = this.activatedRoute.snapshot.params.studentUid;
    this.classUid = this.activatedRoute.snapshot.params.id;
    // get the students details
    this.getStudentDetails();
  }

  getStudentDetails = () => {
    this.classService.getStudentDetails(this.classUid, this.studentUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((result) => {
        if (result.statusCode === 200 && result.data._details._recordsFound > 0) {
          this.profileFirstName = result.data._data[0]._source._firstName;
          this.profileLastName = result.data._data[0]._source._lastName;
          this.profileContactAddress = (typeof result.data._data[0]._source._address === 'undefined') ? '' : result.data._data[0]._source._address;
          this.profileBirthday = (result.data._data[0]._source._birthday === '') ? new Date(`1900-01-01`).getTime() / 1000 : result.data._data[0]._source._birthday;
          this.profileAllergies = (typeof result.data._data[0]._source._allergies === 'undefined') ? '' : result.data._data[0]._source._allergies;
          this.parentName = (typeof result.data._data[0]._source._parent._name === 'undefined') ? '' : result.data._data[0]._source._parent._name;
          this.parentPhone = (typeof result.data._data[0]._source._parent._phone === 'undefined') ? '' : result.data._data[0]._source._parent._phone;
          this.parentEmail = (typeof result.data._data[0]._source._parent._email === 'undefined') ? '' : result.data._data[0]._source._parent._email;
          this.parentPhone = (typeof result.data._data[0]._source._parent._pickUpPhone === 'undefined') ? '' : typeof result.data._data[0]._source._parent._pickUpPhone;
          this.pickUpName = (typeof result.data._data[0]._source._parent._pickUpContact === 'undefined') ? '' : result.data._data[0]._source._parent._pickUpContact;
          this.pickUpCode = (typeof result.data._data[0]._source._parent._pickUpCode === 'undefined') ? '' : typeof result.data._data[0]._source._parent._pickUpCode;
          this.parentStatus = !!(result.data._data[0]._source._parent._status);
          this.schoolUid = result.data._data[0]._source._school_uid;
          console.log(result.data._data[0]);
        } else {
          this.location.back(); // returns back to incoming url
        }
      });
  }

  editProfile() {
    // assign present values to the form state
    this.unixDate = new Date(this.profileBirthday * 1000);
    this.updateProfile.setValue({
      _firstName: this.profileFirstName,
      _lastName: this.profileLastName,
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

  studentUpdate() {
    if (this.updateProfile.valid) {
      // add the student and the class id to the outgoing request
      this.updateProfile.value._uid = this.studentUid;
      this.updateProfile.value._class_uid = this.classUid;
      // convert birthday to unix time
      this.updateProfile.value._birthday = new Date(`${this.updateProfile.value._birthday.year}-${this.updateProfile.value._birthday.month}-${this.updateProfile.value._birthday.day}`).getTime() / 1000;
      this.apiAuthenticationService.patch('student', this.updateProfile.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((updatedResponse) => {
          if (updatedResponse.statusCode === 200) {
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: 'Student profile updated successfully.'
            });
            // update the html dom with lates updated details
            this.profileFirstName = this.updateProfile.value._firstName;
            this.profileLastName = this.updateProfile.value._lastName;
            this.profileContactAddress = this.updateProfile.value._address;
            this.profileBirthday = this.updateProfile.value._birthday;
            this.profileAllergies = this.updateProfile.value._allergies;
            // disable editState and form status
            this.editState = false;
            this.formSubmitted = false;
          } else {
            this.formSubmitted = false;
          }
        });
    }
  }

  openModal(modalTarget: any, value  = '') {
    if (value === 'changeClass') {
      console.log('Called.');
      // get all classes related to school
      this.getSchoolClasses();
      this.getClassChangeSettings();
    }
    this.modalService.open(modalTarget, {
      size: 'lg'
    });
  }

  sendInvite() {
    if (this.parentInvitation.valid) {
      this.formSubmitted = true;
      // include the class, student in the outgoing
      this.parentInvitation.value._uid = this.studentUid;
      this.parentInvitation.value._class_uid = this.classUid;
      this.apiAuthenticationService.patch('student', this.parentInvitation.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((inviteSent) => {
          if (inviteSent.statusCode === 200) {
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: `A parent invitation has been sent to ${this.parentInvitation.value._parent_email}`
            });
            this.modalService.dismissAll();
            this.parentInvitation.reset();
          }
        }, () => { this.formSubmitted = false; });
      this.formSubmitted = false;
    }
  }

  getSchoolClasses = () => {
    this.classService.allSchoolClasses(this.schoolUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((allClasses) => {
        if (allClasses.statusCode === 200) {
          this.schoolRelatedClasses = allClasses.data._data;
          console.log(this.schoolRelatedClasses);
        }
      });
  }

  getClassChangeSettings = () => {
    this.classService.schoolDetails(this.schoolUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((settings) => {
        if (settings.statusCode === 200) {
          this.classChangeSettings = settings.data._data[0]._source._classSetting;
        }
      });
  }

  changeStudentClass() {
    if (this.changeClass.valid) {
      this.formSubmitted = true;
      // add the class uid and student uid to outgoing request
      this.changeClass.value._class_uid = this.classUid;
      this.changeClass.value._uid = this.studentUid;
      this.changeClass.value._changeClass = true;
      // include the school uid
      this.changeClass.value._school_uid = this.schoolUid;
      this.apiAuthenticationService.patch('student', this.changeClass.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((updated) => {
          if (updated.statusCode === 200) {
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: 'Student class changed successfully.'
            });
            this.modalService.dismissAll();
            this.location.back(); // returns back to incoming url
          }
        }, () => { this.formSubmitted = false; });
    }
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
