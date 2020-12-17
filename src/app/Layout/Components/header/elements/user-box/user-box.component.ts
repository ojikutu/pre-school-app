import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThemeOptions } from '../../../../../theme-options';
import { AuthTokenService } from '../../../../../Core/services/auth-token/auth-token.service';
import { ClassService } from '../../../../../Core/services/shared/class.service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  ngUnsubscribe$ = new Subject();
  children = 0;
  profile: any;
  firstName: string;
  lastName: string;

  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  constructor(
    public globals: ThemeOptions,
    private authTokenService: AuthTokenService,
    private classService: ClassService
  ) {}

  ngOnInit() {
    this.profile = this.authTokenService.getProfile();
    this.firstName = this.profile._firstName;
    this.lastName = this.profile._lastName;
    this.getChildren();
  }

  getChildren = () => {
    this.classService.allChildren({
      _countChildren: true
    })
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        if (data.statusCode === 200) { this.children = data.data._count; }
      });
  }
}
