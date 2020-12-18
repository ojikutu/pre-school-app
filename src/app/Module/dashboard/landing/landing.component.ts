import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {faEdit, faSearch, faUniversity} from '@fortawesome/free-solid-svg-icons';
import { ApiAuthenticationService } from '../../../Core/services/api/api-authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  heading = 'Dashboard';
  subheading = 'Quick View of recent activities.';
  icon = 'pe-7s-display2 icon-gradient bg-mean-fruit';

  faSearch = faSearch;
  faUniversity = faUniversity;

  displayRecords = [];
  quickAccessReady = false;
  pendingInvites: number;
  dataFetched: string;
  formSubmitted: boolean;
  private ngUnsubscribe$ = new Subject();

  classCode = new FormGroup({
    _class_code: new FormControl('', Validators.required)
  });

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.apiAuthenticationService.fetch('school')
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(result => {
        // check school records fetched
        if (result.data._details._recordsFound < 1) {
          // no school records fetched.
          // call the class endpoint
          this.apiAuthenticationService.fetch('class')
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe( (response) => {
              if (response.data._details._recordsFound < 1) {
                this.displayRecords = [];
              } else {
                this.dataFetched = 'class';
                this.displayRecords = response.data._data;
              }
            });
        } else {
          this.dataFetched = 'school';
          this.displayRecords = result.data._data;
        }
        this.quickAccessReady = true;
      });
    this.pendingInvitations();
  }

  newNameAdded = (data): void => {
    // add data to the top of records to be displayed.
    this.displayRecords.unshift({
      _source: {
        _name: data._name,
        _uid: data._uid
      }
    });
    this.modalService.dismissAll();
  }

  openCreateSchool = (createSchool) => {
    this.modalService.open(createSchool, {
      size: 'lg'
    });
  }

  pendingInvitations = () => {
    this.apiAuthenticationService.fetch('invites', {
      _searchFilter: JSON.stringify({
        _mustEqual: {
          _status: false
        },
        _count: true
      })
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(pendingInvites => {
        if (pendingInvites.statusCode === 200) {
          this.pendingInvites = (typeof pendingInvites.data === 'undefined') ? 0 : pendingInvites.data._count;
        }
      });
  }

  validateClassCode() {

  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
