import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../theme-options';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from '../../../Core/services/notification/notification.service';
import { ApiAuthenticationService } from '../../../Core/services/api/api-authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  ngUnsubscribe$ = new Subject();
  constructor(
    public globals: ThemeOptions,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private apiAuthenticationService: ApiAuthenticationService
  ) {

  }

  @select('config') public config$: Observable<any>;

  public config: PerfectScrollbarConfigInterface = {};
  private newInnerWidth: number;
  private innerWidth: number;
  activeId = 'dashboards';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
    this.globals.sidebarHover = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  sidebarHoverMouseOut() {
    this.globals.sidebarHover = false;
  }

  sidebarHoverMouseIn() {
    this.globals.sidebarHover = true;
  }


  ngOnInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter = this.activatedRoute.snapshot.firstChild.routeConfig.path;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }
  }

  signOut() {
    this.apiAuthenticationService.create('logout', {})
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((sessionTerminated) => {
        if (sessionTerminated.statusCode === 200) {
          this.notificationService.warning({
            _title: 'Operation Successful',
            _message: 'You have been signed out.'
          });
          // redirect to the sign in page
          this.router.navigate(['/auth/sign-in']);
        }
      });
  }
}
