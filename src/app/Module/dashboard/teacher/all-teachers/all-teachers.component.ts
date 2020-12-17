import {Component, OnInit, TemplateRef} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import { NotificationService } from '../../../../Core/services/notification/notification.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.sass']
})
export class AllTeachersComponent implements OnInit {

  ngUnsubscribe$ = new Subject();
  dataFetching: boolean;
  recordsRetrieved: object;

  faPlus = faPlus;

  schoolUid = {
    _uid: null,
    _name: null
  };


  heading = 'Teachers';
  subheading = 'Teacher Management.';
  icon = 'pe-7s-users icon-gradient bg-mean-fruit';

  constructor(
    private notificationService: NotificationService,
    private apiAuthenticationService: ApiAuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // verify school exists and then load teachers
    this.schoolUid._uid = this.activatedRoute.snapshot.params.id;
    if (this.schoolUid._uid) {
      // confirm school uid exists else redirect to
      this.apiAuthenticationService.fetch('school', {
        _searchFilter: JSON.stringify({
          _mustEqual: {
            _uid: this.schoolUid._uid
          }
        })
      }).pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(schoolFound => {
          if (schoolFound.data._details._recordsFound > 0) {
            this.schoolUid._name = schoolFound.data._data[0]._source._name;
            // fetch all the list of classes associated to the user
            this.apiAuthenticationService.fetch('teacher', {
              _searchFilter: JSON.stringify({
                _school_uid: this.schoolUid._uid,
                _records : 1000
              })
            })
              .pipe(takeUntil(this.ngUnsubscribe$))
              .subscribe(result => {
                if (typeof result.data === undefined ) {
                  this.recordsRetrieved = [];
                } else {
                  this.recordsRetrieved = result.data;
                }
                this.dataFetching = true;
              });
          } else {
            this.notificationService.error({
              _title: 'School Profile',
              _message: 'School profile not found.'
            });
            this.router.navigate(['/app/school']);
          }
        });
    }
  }

  openModal(teacherCreateModal: TemplateRef<any>) {
    this.modalService.open(teacherCreateModal, {
      size: 'lg'
    });
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
