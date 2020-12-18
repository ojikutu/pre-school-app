import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { ClassService } from '../../../../Core/services/shared/class.service';
import { NotificationService } from '../../../../Core/services/notification/notification.service';
import {school} from 'ionicons/icons';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass']
})
export class AllStudentsComponent implements OnInit {

  heading: string;
  subheading = 'All Student Lists';
  icon = 'pe-7s-display2 icon-gradient bg-mean-fruit';
  buttonMessage = 'Back';
  buttonDestination = '/app/school';
  buttonIcon = faArrowLeft;

  ngUnsubscribe$ = new Subject();
  schoolUid: string;
  loadingStudentProfiles: boolean;
  studentRecords: [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private classService: ClassService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.schoolUid = this.activatedRoute.snapshot.params.id;
    // get the school details to confirm school exists
    this.getSchoolDetails(this.schoolUid);
    this.getSchoolStudents(this.schoolUid);
  }

  getSchoolDetails = (schoolUid) => {
    this.classService.schoolDetails(schoolUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((schoolData) => {
        if (schoolData.statusCode === 200) {
          this.heading = schoolData.data._data[0]._source._name;
        } else {
          // return back to the school page
          this.notificationService.error({
            _title: 'Profile Not Found',
            _message: 'Selected school profile could not be loaded. Please try again.'
          });
        }
      });
  }

  getSchoolStudents = (schoolUid) => {
    this.classService.allSchoolStudents(this.schoolUid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        if (data.statusCode === 200) {
          this.studentRecords = data.data._data;
        }
        this.loadingStudentProfiles = true;
      });
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
