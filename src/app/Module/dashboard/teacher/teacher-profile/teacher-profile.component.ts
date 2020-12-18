import {Component, OnInit, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { Location } from '@angular/common';

import { ClassService } from '../../../../Core/services/shared/class.service';
import { NotificationService } from '../../../../Core/services/notification/notification.service';
import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';

import {faArrowLeft, faDotCircle, faPlus, faTimesCircle, faUniversity} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.sass']
})
export class TeacherProfileComponent implements OnInit {
  ngUnsubscribe$ = new Subject();
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private classService: ClassService,
    private notificationService: NotificationService,
    private apiAuthenticationService: ApiAuthenticationService,
    private modalService: NgbModal,
    private location: Location
  ) { }

  editState: boolean;
  formSubmitted: boolean;
  contactUpdateStatus: boolean;

  schoolUid: string;
  teacherUid: string;
  profileDetails: string;
  teacherFirstName: string;
  teacherLastName: string;
  teacherEmail: string;
  teacherPhone: string;
  teacherContactAddress: string;
  teacherNextOfKin: string;
  teacherNextOfKinContact: string;

  classList = [];
  allSchoolClass: object;

  subheading = 'Teacher Profile Management.';
  icon = 'pe-7s-users icon-gradient bg-mean-fruit';

  faPlus = faPlus;
  faUniversity = faUniversity;
  faArrowLeft = faArrowLeft;
  faDotCircle = faDotCircle;
  faTimesCircle = faTimesCircle;

  profileUpdate = new FormGroup({
    _firstName: new FormControl('', Validators.required),
    _lastName: new FormControl(this.teacherLastName, Validators.required),
    _email: new FormControl(this.teacherEmail, Validators.required)
  });

  classAssignmentForm = new FormGroup({
    _class_uid: new FormControl('', Validators.required)
  });

  contactAddress = new FormGroup({
    _phoneNumber: new FormControl(''),
    _contactAddress: new FormControl(''),
    _nextOfKin: new FormControl(''),
    _nextOfKinContact: new FormControl('')
  });

  ngOnInit(): void {
    this.schoolUid = this.activatedRoute.snapshot.params.id;
    this.teacherUid = this.activatedRoute.snapshot.params.teacherUid;

    this.classService.schoolDetails(this.schoolUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(fetched => {
      if (fetched.statusCode !== 200 || fetched.data._details._recordsFound < 1) {
        this.router.navigate(['/app/school/teachers/' + this.schoolUid]);
      } else {
        this.profileDetails = fetched.data._data[0]._source._name;
        // confirm if the teacher details are available
        if (typeof fetched.data._data[0]._source._teacher[this.teacherUid] !== 'undefined'){
          this.teacherFirstName = fetched.data._data[0]._source._teacher[this.teacherUid]._firstName;
          this.teacherLastName = fetched.data._data[0]._source._teacher[this.teacherUid]._lastName;
          this.teacherEmail = fetched.data._data[0]._source._teacher[this.teacherUid]._email;
          // contact details of teacher
          this.teacherPhone = (typeof fetched.data._data[0]._source._teacher[this.teacherUid]._phoneNumber === 'undefined') ? null : fetched.data._data[0]._source._teacher[this.teacherUid]._phoneNumber;
          this.teacherContactAddress = (typeof fetched.data._data[0]._source._teacher[this.teacherUid]._contactAddress === 'undefined') ? null : fetched.data._data[0]._source._teacher[this.teacherUid]._contactAddress;
          this.teacherNextOfKin = (typeof fetched.data._data[0]._source._teacher[this.teacherUid]._nextOfKin === 'undefined') ? null : fetched.data._data[0]._source._teacher[this.teacherUid]._nextOfKin;
          this.teacherNextOfKinContact = (typeof fetched.data._data[0]._source._teacher[this.teacherUid]._nextOfKinContact === 'undefined') ? null : fetched.data._data[0]._source._teacher[this.teacherUid]._nextOfKinContact;
        } else {
          this.notificationService.error({
            _title: 'Profile Not Found',
            _message: 'No record found for selected teacher profile.'
          });
          this.router.navigate(['/app/school/teachers/' + this.schoolUid]);
        }
      }
    });

    this.listTeacherClass();
    this.getAllClasses();
  }

  updateState = () => {
    this.editState = true;
    this.profileUpdate.setValue({
      _firstName: this.teacherFirstName,
      _lastName: this.teacherLastName,
      _email: this.teacherEmail
    });

    this.contactAddress.setValue({
      _phoneNumber: this.teacherPhone,
      _contactAddress: this.teacherContactAddress,
      _nextOfKin: this.teacherNextOfKin,
      _nextOfKinContact: this.teacherNextOfKinContact
    });
  }

  updateProfile = () => {
    if (this.profileUpdate.valid) {
      this.formSubmitted = true;
      // add the teacher uid to the profileUpdate form
      this.profileUpdate.value._teacher_uid = this.teacherUid;
      this.teacherProfileUpdate(this.profileUpdate.value);
      this.editState = false;
      this.formSubmitted = false;
    }
  }

  listTeacherClass = () => {
    this.apiAuthenticationService.fetch('class', {
      _searchFilter: JSON.stringify({
        _mustEqual: {
          _school_uid: this.schoolUid,
          _assigned: this.teacherUid
        },
        _records : 1000
      })
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(classes => {
        if (classes.statusCode === 200) {
          if (classes.data !== null) { this.classList = classes.data._data; }
        }
      });
  }

  openModal(teacherAssignModal: TemplateRef<any>) {
    this.modalService.open(teacherAssignModal, {
      size: 'lg'
    });
  }

  getAllClasses = () => {
    this.classService.allSchoolClasses(this.schoolUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(fetchedClasses => {
        if (fetchedClasses.statusCode === 200) {
          if (fetchedClasses.data !== null) { this.allSchoolClass = fetchedClasses.data._data; }
        }
      });
  }

  assignClass() {
    if (this.classAssignmentForm.valid) {
      this.formSubmitted = true;
      // process the class uid received from the form
      const classUid = this.classAssignmentForm.value._class_uid.split('.^.');
      // include the school uid to the payload
      this.classAssignmentForm.value._school_uid = this.schoolUid;
      this.classAssignmentForm.value._teacher_uid = this.teacherUid;
      this.classAssignmentForm.value._action = 'Assign';
      this.classAssignmentForm.value._class_uid = classUid[0];
      this.apiAuthenticationService.patch('teacher', this.classAssignmentForm.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(result => {
          if (result.statusCode === 200) {
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: 'Class assigned successfully.'
            });
            // add the new assigned class to the class list of the teacher.
            this.classList.unshift({
              _source: {
                _name: classUid[1],
                _uid: result.data._uid
              }
            });
            this.modalService.dismissAll();
            this.formSubmitted = false;
          }
        });
    }
  }

  clickRemove(s: string): void {
    const classString = s.split('.^.');
    if (confirm(`Are you sure you want to remove teacher from ${classString[1]}`)) {
      this.apiAuthenticationService.patch('teacher', {
        _action: 'Remove',
        _class_uid: classString[0],
        _teacher_uid: this.teacherUid,
        _school_uid: this.schoolUid
      })
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(removedTeacher => {
          if (removedTeacher.statusCode === 200) {
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: `${classString[1]} un-assigned successfully.`
            });
            // delete the key form the html dom
            delete this.classList[classString[2]];

            // close opened modals
            this.modalService.dismissAll();
          }
        });
    }
  }

  updateContact() {
    if (this.contactAddress.valid) {
      this.contactUpdateStatus = true;
      this.profileUpdate.value._teacher_uid = this.teacherUid;
      this.teacherProfileUpdate(this.contactAddress.value);
      // set the update status to false
      this.contactUpdateStatus = false;
    }
  }

  teacherProfileUpdate = (updateObject) => {
    // build the save query to be sent through api
    const teacherProfile = {
      _uid: this.schoolUid,
      _teacher: {
        [this.teacherUid] : updateObject
      }
    };
    this.apiAuthenticationService.patch('school', teacherProfile)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(response => {
        if (response.statusCode === 200) {
          this.notificationService.success({
            _title: 'Profile Updated',
            _message: 'Operation Successful.'
          });
          // update dom elements
          this.teacherPhone = (typeof updateObject._phoneNumber === 'undefined') ? this.teacherPhone : updateObject._phoneNumber;
          this.teacherContactAddress = (typeof updateObject._contactAddress === 'undefined') ? this.teacherContactAddress : updateObject._contactAddress;
          this.teacherNextOfKin = (typeof updateObject._nextOfKin === 'undefined') ? this.teacherNextOfKin : updateObject._nextOfKin;
          this.teacherNextOfKinContact = (typeof updateObject.teacherNextOfKinContact === 'undefined') ? this.teacherNextOfKinContact : updateObject._nextOfKinContact;
          this.teacherEmail = (typeof updateObject._email === 'undefined') ? this.teacherEmail : updateObject._email;
          this.teacherFirstName = (typeof updateObject._firstName === 'undefined') ? this.teacherFirstName : updateObject._firstName;
          this.teacherLastName = (typeof updateObject._lastName === 'undefined') ? this.teacherLastName : updateObject._lastName;
        }
      }, () => {
        this.formSubmitted = false;
        this.contactUpdateStatus = false;
      });
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  goBack() {
    this.location.back();
  }
}
