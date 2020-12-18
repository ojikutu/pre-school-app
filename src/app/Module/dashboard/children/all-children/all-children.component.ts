import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import { ClassService } from '../../../../Core/services/shared/class.service';
import {faArrowLeft, faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-children',
  templateUrl: './all-children.component.html',
  styleUrls: ['./all-children.component.sass']
})
export class AllChildrenComponent implements OnInit {
  heading = 'Children';
  subheading = 'Children';
  icon = 'pe-7s-display2 icon-gradient bg-mean-fruit';
  buttonMessage = 'Dashboard';
  buttonIcon = faArrowLeft;
  buttonDestination = '/app/landing';

  childrenLoading: boolean;
  ngUnsubscribe$ = new Subject();
  childrenListing: [];

  faPencil = faPen;

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.getAllChildren();
  }

  getAllChildren = () => {
    this.classService.allChildren({
      _getChildren: true
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((allChildren) => {
        if (allChildren.statusCode === 200) {
          this.childrenListing = (allChildren.data._details._recordsFound > 0) ? allChildren.data._data : [];
        }
      });
    this.childrenLoading = true;
  }
}
