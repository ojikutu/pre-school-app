import {Component, OnInit, TemplateRef} from '@angular/core';
import {faAsterisk, faMinus, faPlus, faSpinner, faUniversity, faUpload, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {FormGroup, FormArray, FormBuilder, Validators, Form} from '@angular/forms';
import { Location } from '@angular/common';

import {ClassService} from '../../../../Core/services/shared/class.service';
import {NotificationService} from '../../../../Core/services/notification/notification.service';
import {ApiAuthenticationService} from '../../../../Core/services/api/api-authentication.service';



@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass']
})
export class AllStudentsComponent implements OnInit {
  heading: string;
  icon = 'pe-7s-user-female icon-gradient bg-mean-fruit';
  subheading: string;

  faUpload = faUpload;
  faPlus = faPlus;
  faMinus = faMinus;
  faUniversity = faUniversity;
  faAsterisk = faAsterisk;
  faSpinner = faSpinner;
  faArrowLeft = faArrowLeft;

  classUid: string;
  ngUnsubscribe$ = new Subject();
  loadingStudents: boolean;
  allStudentProfile: [];
  formSubmitted: boolean;
  generateClassCode = true;
  processingKey: boolean;

  public addMore: FormGroup;

  constructor(
    private modalService: NgbModal,
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private apiAuthenticationService: ApiAuthenticationService,
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.classUid = this.activatedRoute.snapshot.params.id;
    this.addMore = this.formBuilder.group({
      _firstName: [''],
      _lastName: [''],
      itemRows: this.formBuilder.array([this.initItemRows()])
    });
    this.getClassDetails();
    this.getAllStudents();
  }

  openModal(uploadCsv: TemplateRef<any>) {
    this.modalService.open(uploadCsv, {
      size: 'lg'
    });
  }

  getClassDetails = (): void => {
    this.classService.classDetails(this.classUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(result => {
        if (result.statusCode === 200) {
          this.heading = result.data._data[0]._source._name;
          if (typeof result.data._data[0]._source._classKey !== 'undefined') {
            this.generateClassCode = true;
            // tslint:disable-next-line:max-line-length
            this.subheading = `Class Code - ${result.data._data[0]._source._classKey}. Give this code to parents to register their children.`;
          } else { this.generateClassCode = false; }
        }
      }, () => {
        // make notification and redirect
        this.notificationService.error({
          _title: 'Error Occurred.',
          _message: 'No class profile found.'
        });
      });
  }

  getAllStudents = (): void => {
    this.apiAuthenticationService.fetch('student', {
      _searchFilter: JSON.stringify({
        _class_uid: this.classUid
      })
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(studentRecords => {
        if (studentRecords.statusCode === 200) {
          this.allStudentProfile = studentRecords.data._data;
          this.loadingStudents = true;
        }
      });
  }

  private initItemRows() {
    return this.formBuilder.group({
      _firstName: ['', Validators.required],
      _lastName: ['', Validators.required]
    });
  }

  get formArr() {
    return this.addMore.get('itemRows') as FormArray;
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  createStudents() {
    if (this.addMore.valid) {
      this.formSubmitted = true;
      this.loadingStudents = false;
      // add the class uid to the data to be sent
      this.addMore.value._uid = this.classUid;
      this.apiAuthenticationService.create('student', this.addMore.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(result => {
          if (result.statusCode === 201) {
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: `${result.data} Student profiles created successfully.`
            });
            this.modalService.dismissAll();
            setTimeout(() => {
              // call the get student function to reload the student data
              this.getAllStudents();
              // close opened modals
            }, 3000);
          }
        });
      this.formSubmitted = false;
      this.loadingStudents = false;
    } else {
      this.notificationService.error({
        _title: 'Error Occurred',
        _message: 'Please ensure all required fields are filled.'
      });
    }
  }

  studentData($event: []) {
    // check if csv data is present
    if ($event.length > 0) {
      const data = {
        _uid: this.classUid,
        itemRows: $event
      };
      this.apiAuthenticationService.create('student', data)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(uploaded => {
          if (uploaded.statusCode === 201) {
            // call the student profile function to load the student profile again
            this.notificationService.success({
              _title: 'Upload Successful.',
              _message: `${$event.length} Student profiles uploaded successfully.`
            });
            // cleat the data stored in student profile
            this.loadingStudents = false;
            // set a timeout then fetch student details again.
            setTimeout(() => {
              this.allStudentProfile = [];
              this.getAllStudents(); // this will refetch data into allStudentProfile and reset loadingStudents to true
            }, 3000);
          } else {
            // redirect to the class page
          }
        });
    }
  }

  getKey() {
    this.processingKey = true;
    this.apiAuthenticationService.patch('class', {
      _uid: this.classUid,
      _getKey: true
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(keyFetched => {
        if (keyFetched.statusCode === 200) {
          // refresh the class details
          setTimeout(() => {
            this.getClassDetails();
          }, 3000);
          this.notificationService.success({
            _title: 'Operation Successful',
            _message: 'Class key generated.'
          });
        } else {
          this.processingKey = false;
        }
      });
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  back() {
    this.location.back();
  }
}
