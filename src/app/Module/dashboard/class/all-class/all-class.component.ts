import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../../Core/services/notification/notification.service';

import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import {faCog, faPlus, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-class',
  templateUrl: './all-class.component.html',
  styleUrls: ['./all-class.component.sass']
})
export class AllClassComponent implements OnInit {

  heading = 'Classes';
  subheading = 'Class Management.';
  icon = 'pe-7s-bookmarks icon-gradient bg-mean-fruit';

  ngUnsubscribe$ = new Subject();
  dataFetching = false;
  records: any;

  schoolUid = {
    _uid: null,
    _name: null
  };

  faCog = faCog;
  faUser = faUser;
  faPlus = faPlus;

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
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
            this.apiAuthenticationService.fetch('class', {
              _searchFilter: JSON.stringify({
                _mustEqual: {
                  _school_uid: this.schoolUid._uid
                },
                _records : 1000
              })
            })
              .pipe(takeUntil(this.ngUnsubscribe$))
              .subscribe(result => {
                if (result.data._details._recordsFound > 0) {
                  this.records = result.data._data;
                } else { this.records = []; }
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

  createdClass(data): void {
    this.records.unshift({
      _source: {
        _name: data._name,
        _uid: data._uid,
        _school_name: data._school_name,
        _assigned: []
      }
    });
  }

  openModal = (modalUid) => {
    this.modalService.open(modalUid, {
      size: 'lg'
    });
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
