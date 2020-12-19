import {Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import {faArrowLeft, faBars, faChild, faCog, faPlus, faTrash, faUniversity, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-schools',
  templateUrl: './all-schools.component.html',
  styleUrls: ['./all-schools.component.sass']
})
export class AllSchoolsComponent implements OnInit {
  ngUnsubscribe$ = new Subject();
  displayRecords: object;
  fetchSchools = false;
  schoolUid: string;

  heading = 'Schools';
  subheading = 'School Management.';
  icon = 'pe-7s-display2 icon-gradient bg-mean-fruit';
  buttonMessage = 'Dashboard';
  buttonIcon = faArrowLeft;
  buttonDestination = '/app/landing';

  faUniversity = faUniversity;
  faPlus = faPlus;
  faCog = faCog;
  faTrash = faTrash;
  faChild = faChild;
  faUser = faUser;
  faBars = faBars;

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // load all school associated with logged in user here
    this.apiAuthenticationService.fetch('school', {
      _searchFilter: JSON.stringify({
        _records : 1000
      })
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(result => {
        // check school records fetched
        if (result.data !== null && result.data._details._recordsFound > 0) {
          this.displayRecords = result.data._data;
        } else { this.displayRecords = []; }
        this.fetchSchools = true;
      });
  }

  createClass = (modalid, schoolDetails: any) => {
    this.modalService.open(modalid, {
      size: 'lg'
    });
    this.schoolUid = schoolDetails;
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
