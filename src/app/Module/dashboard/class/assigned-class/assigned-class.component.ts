import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-assigned-class',
  templateUrl: './assigned-class.component.html',
  styleUrls: ['./assigned-class.component.sass']
})
export class AssignedClassComponent implements OnInit {

  contentLoaded = false;
  ngUnsubscribe$ = new Subject();
  classesFetched: object;

  heading = 'Classes';
  subheading = 'Assigned Classes';
  icon = 'pe-7s-display2 icon-gradient bg-mean-fruit';

  faUser = faUser;

  constructor(
    private apiAuthenticationService: ApiAuthenticationService
  ) { }

  ngOnInit(): void {
    this.apiAuthenticationService.fetch('class', {
      _records: 1000
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(result => {
        this.classesFetched = result.data._data;
      });
    this.contentLoaded = true;
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
